// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ieeccqxtlbigzdfaxfqs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZWNjcXh0bGJpZ3pkZmF4ZnFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5ODMzNTcsImV4cCI6MjA1NjU1OTM1N30.C_B5_gkLXe82hXkf27sOaucQU4yf6WhrM0ajO751uzw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);