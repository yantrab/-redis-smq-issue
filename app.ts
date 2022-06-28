import {Message, Producer, QueueManager} from 'redis-smq';
import {RedisClientName} from "redis-smq-common/dist/types";

QueueManager.createInstance({
  redis: {
    client: RedisClientName.REDIS,
    options: {
      host: 'redis-server'
    },
  },
}, (err, queueManager) => {
  if (err) return console.log(err);
  queueManager.queue.create('test_queue', false, console.log);

  const message = new Message();
  message
    .setBody({hello: 'world'})
    .setQueue('test_queue');

  message.getId() // null

  const producer = new Producer();
  producer.produce(message, (err) => {
    if (err) console.log(err);
    else {
      const msgId = message.getId(); // string
      console.log('Successfully produced. Message ID is ', msgId);
    }
  });
})




