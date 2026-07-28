-- =============================================================================
-- WITHHOLD CONTACT NUMBERS FROM THE BROWSER
-- =============================================================================
-- The app already hid contact details behind a `{user ? ...}` check in React,
-- but the numbers were still present in the JSON that Supabase sent to every
-- anonymous visitor -- the gate decided whether to paint them, not whether to
-- send them. Anyone could read them from the network tab, or skip the site
-- entirely and query the REST API with the anon key from the JS bundle.
--
-- This migration makes the withholding real:
--   * properties.owner_phone      -- not selectable by anon or authenticated
--   * flatmate_queries.contact_no -- not selectable by anon or authenticated
--   * two RPCs return ONE number at a time to signed-in callers only
--
-- Note on Postgres semantics: a column-level REVOKE cannot subtract from a
-- table-level SELECT grant. The grant must be dropped and re-issued per column.
-- The DO blocks below do that from the live column list, so no column is
-- accidentally dropped from the app.
--
-- RUN THIS ONLY AFTER the matching frontend deploy is live. Once it applies,
-- any `select('*')` against these tables is rejected outright.
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- properties.owner_phone
-- -----------------------------------------------------------------------------
do $$
declare
  v_cols text;
begin
  select string_agg(quote_ident(column_name), ', ' order by ordinal_position)
    into v_cols
  from information_schema.columns
  where table_schema = 'public'
    and table_name   = 'properties'
    and column_name <> 'owner_phone';

  -- Drop the blanket table grant, then re-grant every column except the phone.
  execute 'revoke select on public.properties from anon, authenticated';
  execute format('grant select (%s) on public.properties to anon, authenticated', v_cols);
end $$;

-- -----------------------------------------------------------------------------
-- flatmate_queries.contact_no
-- -----------------------------------------------------------------------------
do $$
declare
  v_cols text;
begin
  select string_agg(quote_ident(column_name), ', ' order by ordinal_position)
    into v_cols
  from information_schema.columns
  where table_schema = 'public'
    and table_name   = 'flatmate_queries'
    and column_name <> 'contact_no';

  execute 'revoke select on public.flatmate_queries from anon, authenticated';
  execute format('grant select (%s) on public.flatmate_queries to anon, authenticated', v_cols);
end $$;

-- INSERT is unaffected by the above: students still submit their own contact
-- number, they just cannot read anyone else's back out.


-- -----------------------------------------------------------------------------
-- RPC: one property owner's number, for signed-in users
-- -----------------------------------------------------------------------------
-- SECURITY DEFINER so the function can read the column its caller cannot. That
-- is safe only because the body checks auth.uid() and constrains which rows it
-- will read. search_path is pinned so the body cannot be hijacked by a
-- caller-controlled schema.
create or replace function public.get_property_contact(p_property_id bigint)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_phone text;
begin
  if auth.uid() is null then
    raise exception 'Sign in to view contact details'
      using errcode = '42501';
  end if;

  select owner_phone
    into v_phone
  from public.properties
  where id = p_property_id
    and status in ('available', 'contact-owner', 'not-available');

  return v_phone;  -- null when the listing is hidden or has no number on file
end $$;

revoke all on function public.get_property_contact(bigint) from public, anon;
grant execute on function public.get_property_contact(bigint) to authenticated;


-- -----------------------------------------------------------------------------
-- RPC: one flatmate query's number, for signed-in users
-- -----------------------------------------------------------------------------
create or replace function public.get_flatmate_contact(p_query_id uuid)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_phone text;
begin
  if auth.uid() is null then
    raise exception 'Sign in to view contact details'
      using errcode = '42501';
  end if;

  select contact_no
    into v_phone
  from public.flatmate_queries
  where id = p_query_id
    and verified = true;

  return v_phone;
end $$;

revoke all on function public.get_flatmate_contact(uuid) from public, anon;
grant execute on function public.get_flatmate_contact(uuid) to authenticated;

commit;
