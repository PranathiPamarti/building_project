// Centralized Supabase Client - Single instance for entire app
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

// Create a single Supabase client instance
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Export project info for convenience
export { projectId, publicAnonKey };
