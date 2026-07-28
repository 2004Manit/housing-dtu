-- =============================================================================
-- ADMIN WRITE POLICIES
-- =============================================================================
-- Restores the admin dashboard's write access that 20260728120000 removed, but
-- enforces it in the database instead of in the browser.
--
-- Authorization source: app_metadata.is_admin in the caller's JWT.
-- app_metadata can only be written with the service role, so a user cannot
-- grant it to themselves. (user_metadata, by contrast, IS user-writable and
-- must never be used for this.)
--
-- Safe to run on production. Wrapped in a transaction.
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- Helper: is the caller an admin?
-- -----------------------------------------------------------------------------
-- Reads the verified JWT claims for the current request. Returns false for the
-- anon role and for any user without the claim, never null.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean,
    false
  );
$$;

comment on function public.is_admin() is
  'True when the caller''s JWT carries app_metadata.is_admin = true. '
  'app_metadata is service-role-only, so this claim cannot be self-granted.';

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;


-- -----------------------------------------------------------------------------
-- properties : admin manages the live catalogue
-- -----------------------------------------------------------------------------
-- Read every row regardless of status, so drafts ('pending_details') are
-- visible to the admin but to nobody else.
drop policy if exists "admin_read_all_properties" on public.properties;
create policy "admin_read_all_properties"
  on public.properties
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_insert_properties" on public.properties;
create policy "admin_insert_properties"
  on public.properties
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "admin_update_properties" on public.properties;
create policy "admin_update_properties"
  on public.properties
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin_delete_properties" on public.properties;
create policy "admin_delete_properties"
  on public.properties
  for delete
  to authenticated
  using (public.is_admin());


-- -----------------------------------------------------------------------------
-- property_submissions : admin reviews the queue
-- -----------------------------------------------------------------------------
-- The dashboard fetches the whole queue (src/pages/AdminDashboard.tsx), which
-- the owner-scoped policy from the previous migration does not allow.
drop policy if exists "admin_read_all_submissions" on public.property_submissions;
create policy "admin_read_all_submissions"
  on public.property_submissions
  for select
  to authenticated
  using (public.is_admin());

-- Approve / reject: sets status, reviewed_at, rejection_reason.
drop policy if exists "admin_update_submissions" on public.property_submissions;
create policy "admin_update_submissions"
  on public.property_submissions
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin_delete_submissions" on public.property_submissions;
create policy "admin_delete_submissions"
  on public.property_submissions
  for delete
  to authenticated
  using (public.is_admin());


-- -----------------------------------------------------------------------------
-- flatmate_queries : admin verifies and removes queries
-- -----------------------------------------------------------------------------
-- Replaces the old policies that let ANY authenticated user rewrite or wipe
-- every row. Admin can also read unverified rows in order to review them.
drop policy if exists "admin_read_all_queries" on public.flatmate_queries;
create policy "admin_read_all_queries"
  on public.flatmate_queries
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_update_queries" on public.flatmate_queries;
create policy "admin_update_queries"
  on public.flatmate_queries
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin_delete_queries" on public.flatmate_queries;
create policy "admin_delete_queries"
  on public.flatmate_queries
  for delete
  to authenticated
  using (public.is_admin());


-- -----------------------------------------------------------------------------
-- contact_submissions : admin reads the inbox
-- -----------------------------------------------------------------------------
drop policy if exists "admin_read_contact_submissions" on public.contact_submissions;
create policy "admin_read_contact_submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (public.is_admin());


-- -----------------------------------------------------------------------------
-- compass_waitlist : admin reads the waitlist
-- -----------------------------------------------------------------------------
drop policy if exists "admin_read_compass_waitlist" on public.compass_waitlist;
create policy "admin_read_compass_waitlist"
  on public.compass_waitlist
  for select
  to authenticated
  using (public.is_admin());

commit;
