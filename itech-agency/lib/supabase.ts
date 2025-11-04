import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cyqtazypkrdsbclsntbn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5cXRhenlwa3Jkc2JjbHNudGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1OTA5NjYsImV4cCI6MjA0NjE2Njk2Nn0.kUeqyZ0FeF_Xn5fqPMaDqfLG_qxBWjKDnJnDZFxT4SQ';

// Create Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  return user;
}

// Helper function to get user profile with role
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error getting profile:', error);
    return null;
  }
  return data;
}

// Helper function to check if user is admin
export async function isAdmin() {
  const user = await getCurrentUser();
  if (!user) return false;

  const profile = await getUserProfile(user.id);
  return profile && (profile.role === 'admin' || profile.role === 'super_admin');
}

// Helper function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}
