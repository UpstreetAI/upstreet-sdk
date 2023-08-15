import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Agent as AgentClient } from './agent-client.js';

dotenv.config();
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://friddlbqibjnxjoxeocc.supabase.co";
const SUPABASE_PUBLIC_API_KEY = process.env.VITE_SUPABASE_PUBLIC_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaWRkbGJxaWJqbnhqb3hlb2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwNjMxMjcsImV4cCI6MjAwNDYzOTEyN30.cP4pmsmvztz-In-xHxVGXpjU-2vEnNKxxKiGV2R7irw";

export class Agent extends AgentClient {
  constructor(spec) {
    const {
      supabaseUrl = SUPABASE_URL,
      supabasePublicApiKey = SUPABASE_PUBLIC_API_KEY,
    } = spec ?? {};

    const supabaseClient = createClient(
      supabaseUrl,
      supabasePublicApiKey,
      {
        auth: {
          persistSession: false,
        },
      }
    );
    super(supabaseClient);
  }
  async connect() {
    return await super.connect();
  }
}