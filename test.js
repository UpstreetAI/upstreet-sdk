import repl from 'repl';
import {agents} from './index.js';

const test = async () => {
  const customEval = (cmd, context, filename, callback) => {
    cmd = cmd.replace(/\n+$/, '');
    const match = cmd.match(/^\/(\S+)\s*([\s\S]*)$/);
    // console.log('match', [cmd, match]);
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
    // callback(null, '');
  };

  const connection = await agents.connect();

  // Run a repl with custom evaluation
  const r = repl.start({
    // prompt: '> ',
    prompt: '',
    eval: customEval
  });
  r.context.connection = connection;

  connection.addEventListener('chat', (e) => {
    console.log(e.data);
  });
  connection.addEventListener('json', (e) => {
    console.log(e.data);
  });
};

test();
