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
    // client gets bastardized inheritance of the methods from EventEmitter
    // https://nodejs.org/api/events.html#events_class_eventemitter

    const c = client.channel('room-1');
    c
      .on(
        'broadcast',
        {
          event: 'chat',
        },
        (o) => {
            c2.dispatchEvent(new MessageEvent('chat', {
                data: o.payload.message,
            }));
        },
      )
    c
      .on(
        'broadcast',
        {
          event: 'json',
        },
        (o) => {
            let result, error;
            try {
                result = JSON.parse(o.payload.message);
            } catch(err) {
                error = err;
            }
            if (!error) {
                c2.dispatchEvent(new MessageEvent('json', {
                    data: result,
                }));
            } else {
                console.warn(error);
            }
        },
      )
    c.subscribe();

    const c2 = new EventTarget();
    c2.send = function() {
        return c.send.apply(c, arguments);
    }
    return c2;
  }
}
export const agents = Agents;