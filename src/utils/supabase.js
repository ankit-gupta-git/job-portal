import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = (supabaseAccessToken) => {
  const options = supabaseAccessToken
    ? { global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } } }
    : {};
  return createClient(supabaseUrl, supabaseKey, options);
};

export default supabaseClient;
