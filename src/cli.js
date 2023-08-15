import repl from 'repl';
import { Agent } from './index.js';

const test = async () => {
  const customEval = (cmd) => {
    cmd = cmd.replace(/\n+$/, '');
    const match = cmd.match(/^\/(\S+)\s*([\s\S]*)$/);
    if (match) {
      const [_, command, commandArgumentsString] = match;
      const commandArguments = commandArgumentsString.split(/\s+/);

      connection.send({
        type: 'broadcast',
        event: 'json',
        payload: {
          message: JSON.stringify({
            command,
            commandArguments,
          }, null, 2),
        },
      });
    } else {
      connection.send({
        type: 'broadcast',
        event: 'chat',
        payload: {
          message: cmd,
        },
      });
    }
  };

  const agent = new Agent();
  const connection = await agent.connect();

  // Run a repl with custom evaluation
  const r = repl.start({
    prompt: '',
    eval: customEval
  });
  r.context.connection = connection;

  connection.addEventListener('message', (e) => {
    console.log(e.data);
  });
};

test();
