import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://evvufxutulshxbmpvwdt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dnVmeHV0dWxzaHhibXB2d2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MDg4MDEsImV4cCI6MjAzNjE4NDgwMX0.TdOELmjeRMDg4Ss0c5IjxO8-ViA41HVVzlAANMTEARU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
