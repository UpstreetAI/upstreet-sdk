import {agents} from './index.js';

const test = async () => {
  const c1 = await agents.connect();
  c1.send({
    type: 'broadcast',
    event: 'test',
    payload: {
      message: 'hello, world 1'
    },
  });

  const c2 = await agents.connect();
  c2.send({
    type: 'broadcast',
    event: 'test',
    payload: {
      message: 'hello, world 2'
    },
  });
};
test();