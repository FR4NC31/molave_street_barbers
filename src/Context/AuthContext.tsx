import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../Lib/Supabase/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interfaces
interface AuthContextType {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signOut: () => Promise<any>;
  refreshSession: () => Promise<any>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Clean up stale authentication data
  const cleanupStaleAuthData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const authKeys = keys.filter(key => key.includes('supabase.auth.token'));
      console.log('Found auth keys:', authKeys);
      
      for (const key of authKeys) {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value) {
            const tokenData = JSON.parse(value);
            // Check if token is expired or invalid
            if (tokenData.expires_at && tokenData.expires_at < Date.now() / 1000) {
              console.log('Removing expired token:', key);
              await AsyncStorage.removeItem(key);
            }
          }
        } catch (parseError) {
          console.log('Error parsing token data, removing:', key, parseError);
          await AsyncStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('Error cleaning up auth data:', error);
    }
  };

  // Refresh session function
  const refreshSession = async () => {
    try {
      console.log('Attempting to refresh session...');
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('Session refresh error:', error);
        if (error.message.includes('Invalid Refresh Token')) {
          console.log('Invalid refresh token detected, cleaning up stale data...');
          await cleanupStaleAuthData();
        }
        return { data: null, error };
      }
      
      console.log('Session refreshed successfully');
      setUser(session?.user || null);
      return { data: session, error: null };
    } catch (error) {
      console.error('Unexpected error during session refresh:', error);
      return { data: null, error };
    }
  };

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        console.log('Checking existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check error:', error);
          if (error.message.includes('Invalid Refresh Token')) {
            console.log('Invalid refresh token found, attempting cleanup...');
            await cleanupStaleAuthData();
            // Try to get session again after cleanup
            const { data: { session: newSession } } = await supabase.auth.getSession();
            setUser(newSession?.user || null);
          }
        } else {
          console.log('Session found:', session ? 'valid' : 'none');
          setUser(session?.user || null);
        }
      } catch (error) {
        console.error('Unexpected session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session ? 'session exists' : 'no session');
        
        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out, cleaning up...');
          await cleanupStaleAuthData();
        }
        
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log('Signing up user:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: userData }
      });
      
      if (error) {
        console.error('Sign up error:', error);
      } else {
        console.log('Sign up successful');
      }
      
      return { data, error };
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      return { data: null, error };
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      // First attempt to authenticate with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        if (error.message.includes('Invalid Refresh Token')) {
          await cleanupStaleAuthData();
          // Retry sign in after cleanup
          const retryResult = await supabase.auth.signInWithPassword({
            email,
            password
          });
          return retryResult;
        } else if (error.message.includes('Invalid login credentials')) {
          return { 
            data: null, 
            error: new Error('Invalid email or password. Please try again.') 
          };
        } else if (error.message.includes('Email not confirmed')) {
          return {
            data: null,
            error: new Error('Please verify your email before logging in.')
          };
        }
        
        // For other errors, return the original error
        return { data, error };
      }
      
      // Authentication successful, now check if user has a profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .single();
        
        if (profileError) {
          // User authenticated but no profile found
          // This could happen if profile creation failed during signup
          // We still return success since authentication worked
        }
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      console.log('Signing out user...');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
      } else {
        console.log('Sign out successful');
        await cleanupStaleAuthData();
      }
      
      return { error };
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      return { error };
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    refreshSession
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
