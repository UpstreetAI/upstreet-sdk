import {createClient} from '@supabase/supabase-js';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://friddlbqibjnxjoxeocc.supabase.co";
export const SUPABASE_PUBLIC_API_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaWRkbGJxaWJqbnhqb3hlb2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwNjMxMjcsImV4cCI6MjAwNDYzOTEyN30.cP4pmsmvztz-In-xHxVGXpjU-2vEnNKxxKiGV2R7irw";

const clientA = createClient(SUPABASE_URL, SUPABASE_PUBLIC_API_KEY);
const channelA = clientA.channel('room-1');
channelA
  .on(
    'broadcast',
    {
      event: 'test',
    },
    (payload) => {
      console.log(payload);
    },
  )
  .subscribe();