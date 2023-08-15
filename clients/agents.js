import {createClient} from '@supabase/supabase-js';

class Agents {
  static async connect({
    supabaseUrl,
    supabasePublicApiKey,
  }) {
    const client = createClient(supabaseUrl, supabasePublicApiKey, {
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