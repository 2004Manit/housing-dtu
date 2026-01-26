import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers for the response
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the request body
    const { email, method } = await req.json()

    // Validate input
    if (!email || !method) {
      return new Response(
        JSON.stringify({ error: 'Email and method are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Check if user exists with this email
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers()

    if (listError) {
      console.error('Error listing users:', listError)
      return new Response(
        JSON.stringify({ error: 'Failed to check user existence' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Find user with this email
    const existingUser = users.users.find((u: any) => u.email?.toLowerCase() === email.toLowerCase())

    // CASE 1: User doesn't exist - allow signup
    if (!existingUser) {
      return new Response(
        JSON.stringify({ 
          action: 'create',
          message: 'Email is available'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // CASE 2: User exists - check the scenario
    const isGoogleUser = existingUser.app_metadata?.provider === 'google' || 
                     existingUser.app_metadata?.providers?.includes('google')
const isEmailUser = existingUser.app_metadata?.provider === 'email' || 
                    existingUser.app_metadata?.providers?.includes('email')

// Fixed: Check for both null and undefined
const isConfirmed = existingUser.email_confirmed_at != null

console.log('DEBUG - Confirmation check:', {
  email_confirmed_at: existingUser.email_confirmed_at,
  isConfirmed: isConfirmed
})

 // CASE 2A: Trying to sign up with email, but email is registered via Google only
if (method === 'email' && isGoogleUser && !isEmailUser) {
  return new Response(
    JSON.stringify({ 
      action: 'error',
      message: 'This email is registered with Google Sign-In. Please use the "Continue with Google" button.'
    }),
    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// CASE 2B: Trying to sign up with email, email exists but NOT confirmed (CHECK THIS FIRST!)
if (method === 'email' && !isConfirmed) {
  // Return action to let frontend update password and resend
  return new Response(
    JSON.stringify({ 
      action: 'update_and_resend',
      message: "We've sent a new confirmation email. Please check your inbox."
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// CASE 2C: Trying to sign up with email, email exists and is confirmed
if (method === 'email' && isConfirmed) {
  return new Response(
    JSON.stringify({ 
      action: 'error',
      message: 'This email is already registered. Please log in.'
    }),
    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

    // CASE 2D: Trying to sign in with Google, email exists (allow - will be linked)
    if (method === 'google') {
      return new Response(
        JSON.stringify({ 
          action: 'link',
          message: 'Proceed with Google sign-in'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Default fallback
    return new Response(
      JSON.stringify({ 
        action: 'create',
        message: 'Proceed with signup'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in check-signup function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})