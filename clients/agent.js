export class Agent {
    constructor(supabaseClient) {
        this.supabaseClient = supabaseClient;
    }
    async connect(roomName = 'adventureRoom') {
        const c = this.supabaseClient.channel(roomName);
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