import { SupabaseClient, createClient } from '@supabase/supabase-js';

const url: string = process.env.REACT_APP_SUPABASE_URL || '';
const key: string = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const sb: SupabaseClient = createClient(url, key);
