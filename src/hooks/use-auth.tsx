import { useAuthContext } from '@/contexts/AuthContext';

// Simple hook to access auth context
// Usage in any component: const { user, signIn, signOut } = useAuth();
export const useAuth = () => {
  return useAuthContext();
};