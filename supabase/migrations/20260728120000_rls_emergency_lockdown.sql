-- =============================================================================
-- EMERGENCY RLS LOCKDOWN
-- =============================================================================
-- Before this migration:
--   * properties           : RLS DISABLED -> anon key had full read/write/delete
--   * property_submissions : RLS DISABLED -> anon key had full read/write/delete
--                            (exposed every owner's whatsapp_number publicly)
--   * contact_submissions  : anon policy ALL/true/true -> anyone could read and
--                            delete every contact message
--   * flatmate_queries     : public INSERT with no check -> anyone could insert
--                            verified = true and skip review; any authenticated
--                            user could UPDATE/DELETE every row
--
-- After this migration, writes are denied to everyone from the client. Public
-- reads are preserved exactly as the frontend already uses them, so the live
-- site keeps working. Admin write access is restored in the NEXT migration,
-- once the admin JWT claim is confirmed.
--
-- Safe to run on production. Wrapped in a transaction: all-or-nothing.
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- properties : public listings
-- -----------------------------------------------------------------------------
alter table public.properties enable row level security;

-- Anyone may read listings that are meant to be live. This mirrors the filter
-- the frontend already applies in src/pages/Properties.tsx, and additionally
-- hides 'pending_details' drafts, which were previously readable by anyone.
drop policy if exists "public_read_live_listings" on public.properties;
create policy "public_read_live_listings"
  on public.properties
  for select
  to anon, authenticated
  using (status in ('available', 'contact-owner', 'not-available'));

-- No INSERT / UPDATE / DELETE policies are defined, so with RLS enabled all
-- writes from the client are denied. The service role bypasses RLS, so the
-- Supabase dashboard and edge functions are unaffected.


-- -----------------------------------------------------------------------------
-- property_submissions : owner-submitted listings awaiting review
-- -----------------------------------------------------------------------------
alter table public.property_submissions enable row level security;

-- An owner may read only their own submissions. Previously every submission,
-- including every whatsapp_number, was readable by anonymous callers.
drop policy if exists "owners_read_own_submissions" on public.property_submissions;
create policy "owners_read_own_submissions"
  on public.property_submissions
  for select
  to authenticated
  using (user_id = auth.uid());

-- An owner may submit only as themselves, and only with status 'pending'.
-- This stops a caller from self-approving by sending status = 'approved'.
drop policy if exists "owners_create_own_submissions" on public.property_submissions;
create policy "owners_create_own_submissions"
  on public.property_submissions
  for insert
  to authenticated
  with check (user_id = auth.uid() and status = 'pending');

-- No UPDATE / DELETE policies: submissions are immutable from the client.


-- -----------------------------------------------------------------------------
-- contact_submissions : contact form inbox
-- -----------------------------------------------------------------------------
-- These two policies granted ALL commands with USING true / WITH CHECK true,
-- to anon and authenticated respectively. Anyone could read and delete the inbox.
drop policy if exists "anon_all_policy"          on public.contact_submissions;
drop policy if exists "authenticated_all_policy" on public.contact_submissions;

-- Write-only mailbox: submit yes, read no. Read it from the Supabase dashboard.
drop policy if exists "anyone_can_submit_contact_form" on public.contact_submissions;
create policy "anyone_can_submit_contact_form"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);


-- -----------------------------------------------------------------------------
-- flatmate_queries : student flatmate requests
-- -----------------------------------------------------------------------------
-- Any authenticated user could rewrite or wipe every row.
drop policy if exists "Allow authenticated users to update" on public.flatmate_queries;
drop policy if exists "Allow authenticated users to delete" on public.flatmate_queries;

-- Unrestricted insert let a caller set verified = true and appear on the public
-- page without review. Replace it with a check that pins verified to false.
drop policy if exists "Allow public insert" on public.flatmate_queries;
drop policy if exists "anyone_can_submit_query" on public.flatmate_queries;
create policy "anyone_can_submit_query"
  on public.flatmate_queries
  for insert
  to anon, authenticated
  with check (verified = false);

-- The existing SELECT policy (verified = true) is intentionally kept as-is so
-- the flatmate page keeps working. Note it still exposes contact_no publicly --
-- addressed separately alongside the owner_phone fix.


-- -----------------------------------------------------------------------------
-- compass_waitlist : already correct (insert-only, no read policy). No change.
-- -----------------------------------------------------------------------------

commit;
