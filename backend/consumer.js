const Kafka = require('kafkajs').Kafka;
const amqp = require('amqplib/callback_api');

// Kafka consumer setup
const kafka = new Kafka({
  clientId: 'real-time-system',
  brokers: ['localhost:9093']
});
const consumer = kafka.consumer({ groupId: 'transaction-group' });

// RabbitMQ consumer setup
const rabbitmqUrl = 'amqp://localhost';

async function consumeFromKafka() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'transactions', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Message from Kafka: ${message.value.toString()}`);
    },
  });
}

function consumeFromRabbitMQ() {
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
      console.log('Waiting for messages in %s. To exit press CTRL+C', queue);
      channel.consume(queue, function (msg) {
        console.log('Message from RabbitMQ: %s', msg.content.toString());
      }, {
        noAck: true
      });
    });
  });
}

consumeFromKafka();
consumeFromRabbitMQ();
