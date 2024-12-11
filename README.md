# Real-Time Data Processing System

## Overview

The Real-Time Data Processing System is a low-latency, high-throughput pipeline designed to process live transaction data in real-time. Leveraging Kafka, RabbitMQ, Node.js, and Asyncio, this project ensures scalable performance, efficient message handling, and data integrity.

## Key Features

- **Low Latency:** Efficient real-time transaction processing.
- **Scalability:** Built to handle increasing loads with ease.
- **Multi-Broker Support:** Utilizes Kafka and RabbitMQ for robust message brokering.
- **Asynchronous Backend:** Optimized using Asyncio and Node.js.

## System Architecture

1. **Producers**: Generate and send transaction messages to Kafka and RabbitMQ.
2. **Consumers**: Retrieve and process messages from Kafka and RabbitMQ.
3. **Backend Server**: Acts as the orchestrator of the pipeline.

## Prerequisites

- Docker
- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SaiSriDattaAdduri/Real-Time-Data-Processing-System.git
cd Real-Time-Data-Processing-System
```

### 2. Build Docker Images

#### Build RabbitMQ Image

```bash
cd rabbitmq
docker build -t rabbitmq-image .
```

#### Build Kafka Image

```bash
cd ../kafka
docker build -t kafka-image .
```

### 3. Start Docker Containers

#### Run Zookeeper (Required for Kafka)

```bash
docker run -d --name zookeeper -p 2181:2181 wurstmeister/zookeeper
```

#### Run RabbitMQ

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq-image
```

#### Run Kafka

```bash
docker run -d --name kafka --link zookeeper -p 9093:9093 kafka-image
```

### 4. Backend Setup

Navigate to the backend directory, initialize a Node.js project, and install the required dependencies:

```bash
cd ../backend
npm init -y
npm install express kafkajs amqplib
```

## Running the System

### Start the Backend Server

```bash
node server.js
```

### Expected Behavior

- Producers send messages to both Kafka and RabbitMQ.
- Consumers retrieve and log messages from both brokers.

Logs should display:

- **Messages sent to Kafka and RabbitMQ**
- **Messages received from Kafka and RabbitMQ**

## Testing the Pipeline

- Verify the Kafka producer and consumer functionality.
- Ensure RabbitMQ messages are delivered and consumed accurately.

## Troubleshooting

- If Docker containers fail to start, check logs with:

  ```bash
  docker logs <container-name> (kafka or rabbitmq)
  ```

- Ensure required ports (e.g., 2181, 5672, 9093) are free.

- Reinstall dependencies if needed using:

  ```bash
  npm install
  ```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance this project.
