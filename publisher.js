const amqp = require('amqplib')


const queue = "jobs"
const msg = { "name": process.argv[2] }
// Create a connection to server
connect();
async function connect() {
  try {
    // create connection 

    const connection = await amqp.connect('amqp://localhost:5672');
    // create channel
    const channel = await connection.createChannel();
    // Create a queue if doesn't exist
    const result = await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)))
    console.log(`Job send successfully ${msg.name}`)

  }
  catch (ex) {
    console.error(ex)
  }
}