# Start from OpenJDK 21 slim image
FROM openjdk:21-slim

# Set working directory
WORKDIR /app

# Copy Maven build output
COPY target/notenmanager-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port (standardmäßig 8080 für Spring Boot)
EXPOSE 8080

# Start Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
