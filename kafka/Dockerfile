# Use the official Kafka image as the base image
FROM wurstmeister/kafka:latest

# Set environment variables for Kafka
ENV KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9093
ENV KAFKA_LISTENER_SECURITY_PROTOCOL=PLAINTEXT
ENV KAFKA_LISTENER_PORT=9093
ENV KAFKA_LISTENER_NAME=INTERNAL
ENV KAFKA_LISTENER_TYPE=internal
ENV KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181

# Set the listeners so that Kafka knows where to bind
ENV KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9093

# Expose necessary ports
EXPOSE 9093
