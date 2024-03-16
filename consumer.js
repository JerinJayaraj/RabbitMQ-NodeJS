
const amqp = require('amqplib')


const queue = "jobs"
// Create a connection to server
connect();
async function connect() {
  try {
    // create connection 

    const connection = await amqp.connect('amqp://localhost:5672');
    // create channel
    const channel1 = await connection.createChannel();
    // Create a queue if doesn't exist
    const result = await channel1.assertQueue(queue);

    // We have to keep the consumer alive unless likw the publisher
    channel1.consume(queue, (msg) => {
      if (msg !== null) {
        console.log('Recieved:', msg.content.toString());
        // we have to tell server we received the message / acknowlegment
        channel1.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    });

  }
  catch (ex) {
    console.error(ex)
  }
}


