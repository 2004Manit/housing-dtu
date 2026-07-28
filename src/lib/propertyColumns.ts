/**
 * Explicit column lists for `properties` reads.
 *
 * Why not `select('*')`:
 *   `owner_phone` is deliberately excluded. At the database level, anon and
 *   authenticated roles have SELECT granted on every column EXCEPT owner_phone,
 *   so a `select('*')` request is rejected outright by Postgres. Contact numbers
 *   are fetched one at a time, for logged-in users only, via the
 *   `get_property_contact` RPC — see fetchOwnerPhone() below.
 *
 * These are written as single string literals rather than array joins because
 * supabase-js can only infer result types from a literal `.select()` argument;
 * a runtime-built string degrades the return type to GenericStringError.
 *
 * IMPORTANT: when you add a column to the `properties` table, add it here AND
 * grant SELECT on it to anon/authenticated, or it will be invisible to the app.
 */

import { supabase } from './supabase';

// Each list below must stay a SINGLE string literal. Concatenation ('a' + 'b')
// widens the type to `string`, and supabase-js then cannot parse the column list
// and degrades every field to GenericStringError. That is also why the detail
// list repeats the grid's columns instead of building on it.

/** Columns needed by the listings grid (src/pages/Properties.tsx). */
export const PROPERTY_LIST_COLUMNS = 'id,title,description,type,status,images,location_address,location_city,location_state,location_lat,location_lng,time_to_entrance_gate,time_to_main_market,featured_amenities,show_distance_to_dtu,floor_number,flat_size,listed_date,room_pricing_single,room_pricing_double,flat_rent,basic_facilities,room_amenities,flat_amenities,video,security_deposit,mess_included,created_at';

/** Columns needed by the detail page (src/pages/PropertyDetail.tsx). */
export const PROPERTY_DETAIL_COLUMNS = 'id,title,description,type,status,images,location_address,location_city,location_state,location_lat,location_lng,time_to_entrance_gate,time_to_main_market,featured_amenities,show_distance_to_dtu,floor_number,flat_size,listed_date,room_pricing_single,room_pricing_double,flat_rent,basic_facilities,room_amenities,flat_amenities,video,security_deposit,mess_included,created_at,current_flatmates,flatmates_required,brokerage,verification_status';

/**
 * Fetch a single listing's owner phone number.
 *
 * Returns null when the caller is not signed in, when the listing is not
 * publicly visible, or when no number is on file. Never throws — callers treat
 * null as "no contact available" so a failure degrades the contact card rather
 * than the whole page.
 */
export async function fetchOwnerPhone(propertyId: number | string): Promise<string | null> {
  const id = typeof propertyId === 'string' ? parseInt(propertyId, 10) : propertyId;

  if (!Number.isFinite(id)) return null;

  const { data, error } = await supabase.rpc('get_property_contact', {
    p_property_id: id,
  });

  if (error) {
    console.error('Could not load owner contact:', error.message);
    return null;
  }

  return (data as string | null) ?? null;
}

/**
 * Fetch a single flatmate query's contact number. Same contract as above.
 */
export async function fetchFlatmateContact(queryId: string): Promise<string | null> {
  const { data, error } = await supabase.rpc('get_flatmate_contact', {
    p_query_id: queryId,
  });

  if (error) {
    console.error('Could not load flatmate contact:', error.message);
    return null;
  }

  return (data as string | null) ?? null;
}
