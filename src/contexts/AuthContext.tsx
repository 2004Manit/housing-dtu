import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Define what data the Auth context will provide
interface AuthContextType {
  user: User | null;           
  session: Session | null;     
  loading: boolean;            
  signUp: (email: string, password: string) => Promise<{ error: any; message?: string }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithMagicLink: (email: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    // Get current session (if user was previously logged in)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Handle redirect after Google OAuth sign-in
      if (event === 'SIGNED_IN' && session) {
        // Check if there's a stored return URL from before OAuth redirect
        const returnUrl = localStorage.getItem('auth_return_url');
        
        if (returnUrl) {
          // Clear it immediately to prevent reuse
          localStorage.removeItem('auth_return_url');
          
          // Small delay to ensure state is fully updated
          setTimeout(() => {
            window.location.href = returnUrl;
          }, 100);
        }
      }
    });

    // Cleanup listener on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Sign up with email and password ( updated on 24 jan 2026)
 const signUp = async (email: string, password: string) => {
  try {
    // Step 1: Check with Edge Function first
    const checkResponse = await fetch(
      'https://dhqaahtebxvmqvvhkkzr.supabase.co/functions/v1/check-signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ 
          email, 
          method: 'email' 
        })
      }
    );

    const checkResult = await checkResponse.json();

    console.log('Edge Function Response:', checkResult);


    // Step 2: Handle different scenarios
    if (checkResult.action === 'error') {
      // Email exists with Google or already confirmed
      return { error: { message: checkResult.message } };
    }

    if (checkResult.action === 'update_and_resend') {
      // Email exists but not confirmed - update password and resend
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        return { error };
      }
      
      return { error: null, message: checkResult.message };
    }

    // Step 3: Email is available - proceed with signup
    if (checkResult.action === 'create') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { error };
    }

    // Fallback
    return { error: { message: 'Unexpected response from server' } };

  } catch (error) {
    console.error('Signup check error:', error);
    return { error: { message: 'Failed to verify email. Please try again.' } };
  }
};

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  // Sign in with Google (updated on 24 jan 2026)
 const signInWithGoogle = async () => {
  // Check localStorage for stored return URL (from AuthCard)
  const storedReturnUrl = localStorage.getItem('auth_return_url');
  
  const redirectTo = storedReturnUrl 
    ? `${window.location.origin}${storedReturnUrl}`
    : `${window.location.origin}/`;
  
  // Google sign-in handles account linking automatically
  // If email exists with email/password, Google will be linked to that account
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  });
  return { error };
};

  // Sign in with Magic Link (passwordless)
  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    return { error };
  };

  // Sign out
  const signOut = async () => {
    // Clear any stored return URLs before signing out
    localStorage.removeItem('auth_return_url');
    await supabase.auth.signOut();
  };

  // Provide all auth data and functions to the entire app
  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithMagicLink,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};