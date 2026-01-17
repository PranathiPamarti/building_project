import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface User {
  id: string;
  email: string;
  role: 'user' | 'owner';
  name?: string;
  fatherName?: string;
  dob?: string;
  village?: string;
  city?: string;
  contactNo?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: session.user.user_metadata?.role || 'user',
          name: session.user.user_metadata?.name,
          fatherName: session.user.user_metadata?.fatherName,
          dob: session.user.user_metadata?.dob,
          village: session.user.user_metadata?.village,
          city: session.user.user_metadata?.city,
          contactNo: session.user.user_metadata?.contactNo,
        });
        setAccessToken(session.access_token);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: session.user.user_metadata?.role || 'user',
          name: session.user.user_metadata?.name,
          fatherName: session.user.user_metadata?.fatherName,
          dob: session.user.user_metadata?.dob,
          village: session.user.user_metadata?.village,
          city: session.user.user_metadata?.city,
          contactNo: session.user.user_metadata?.contactNo,
        });
        setAccessToken(session.access_token);
      } else {
        setUser(null);
        setAccessToken(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    setUser({
      id: data.user.id,
      email: data.user.email!,
      role: data.user.user_metadata?.role || 'user',
      name: data.user.user_metadata?.name,
      fatherName: data.user.user_metadata?.fatherName,
      dob: data.user.user_metadata?.dob,
      village: data.user.user_metadata?.village,
      city: data.user.user_metadata?.city,
      contactNo: data.user.user_metadata?.contactNo,
    });
    setAccessToken(data.session.access_token);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAccessToken(null);
  };

  const register = async (userData: any) => {
    try {
      console.log('Starting client-side registration...');
      
      // Register user directly with Supabase Auth (client-side)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            fatherName: userData.fatherName,
            dob: userData.dob,
            village: userData.village,
            city: userData.city,
            contactNo: userData.contactNo,
            role: 'user',
          },
          emailRedirectTo: undefined,
        },
      });

      if (authError) {
        console.error('Registration error:', authError);
        
        // Handle rate limit errors with user-friendly message
        if (authError.message.includes('rate limit') || authError.message.includes('Email rate limit')) {
          throw new Error('Too many registration attempts. Please wait 5-10 minutes before trying again, or try logging in if you already have an account.');
        }
        
        // Handle email already exists
        if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
          throw new Error('This email is already registered. Please try logging in instead.');
        }
        
        throw new Error(authError.message);
      }

      console.log('Registration successful!', authData);

      // Auto login after registration
      if (authData.user && !authData.session) {
        // If email confirmation is required, inform user
        console.log('Please check your email to confirm your account');
      }
      
      // Try to login immediately (works if email confirmation is disabled)
      try {
        await login(userData.email, userData.password);
        console.log('Auto-login successful');
      } catch (loginError) {
        console.log('Auto-login skipped - email confirmation may be required');
        // Still consider it successful registration
      }
    } catch (error: any) {
      console.error('Registration error in AuthContext:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}