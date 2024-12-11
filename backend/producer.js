const Kafka = require('kafkajs').Kafka;
const amqp = require('amqplib/callback_api');

// Kafka producer setup
const kafka = new Kafka({
  clientId: 'real-time-system',
  brokers: ['localhost:9093']
});
const producer = kafka.producer();

// RabbitMQ producer setup
const rabbitmqUrl = 'amqp://localhost';

async function sendToKafka(message) {
  await producer.connect();
  await producer.send({
    topic: 'transactions',
    messages: [{ value: message }],
  });
  console.log('Message sent to Kafka');
}

function sendToRabbitMQ(message) {
  amqp.connect(rabbitmqUrl, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const queue = 'transactions_queue';
      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(message));
      console.log('Message sent to RabbitMQ');
    });
  });
}

async function processMessages() {
  const message = 'Transaction data at ' + new Date();
  await sendToKafka(message);
  sendToRabbitMQ(message);
}

setInterval(processMessages, 5000); // Send a message every 5 seconds
