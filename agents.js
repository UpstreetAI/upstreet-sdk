import dotenv from 'dotenv';

dotenv.config();
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://friddlbqibjnxjoxeocc.supabase.co";
const SUPABASE_PUBLIC_API_KEY = process.env.VITE_SUPABASE_PUBLIC_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaWRkbGJxaWJqbnhqb3hlb2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwNjMxMjcsImV4cCI6MjAwNDYzOTEyN30.cP4pmsmvztz-In-xHxVGXpjU-2vEnNKxxKiGV2R7irw";

class Agents {
  static async connect({
    supabaseUrl = SUPABASE_URL,
    supabasePublicApiKey = SUPABASE_PUBLIC_API_KEY,
  } = {}) {
    return AgentsClient.connect({
      supabaseUrl,
      supabasePublicApiKey,
    });
  }
}
export const agents = Agents;