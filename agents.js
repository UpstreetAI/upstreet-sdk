import dotenv from 'dotenv';
import {createClient} from '@supabase/supabase-js';

dotenv.config();
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://friddlbqibjnxjoxeocc.supabase.co";
const SUPABASE_PUBLIC_API_KEY = process.env.VITE_SUPABASE_PUBLIC_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaWRkbGJxaWJqbnhqb3hlb2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwNjMxMjcsImV4cCI6MjAwNDYzOTEyN30.cP4pmsmvztz-In-xHxVGXpjU-2vEnNKxxKiGV2R7irw";

class Agents {
  static async connect() {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_API_KEY, {
      auth: {
        persistSession: false,
      },
    });
    const c = client.channel('room-1');
    c
      .on(
        'broadcast',
        {
          event: 'test',
        },
        (payload) => {
          console.log('got payload', payload);
        },
      )
      .subscribe();
    return c;
  }
}
export const agents = Agents;