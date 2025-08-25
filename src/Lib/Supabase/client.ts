import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://roacqfrsnqtmqaydtypp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvYWNxZnJzbnF0bXFheWR0eXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODA4ODIsImV4cCI6MjA3MDc1Njg4Mn0.1srxXxGAuVZTzdMRtZdm1OxJ1jF7q-WuZwSyQprHukA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce', // Use PKCE flow for better security
  },
  global: {
    headers: {
      'X-Client-Info': 'molave-street-barbers'
    }
  }
});
