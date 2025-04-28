# 1. Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Nur pom.xml kopieren und dependencies cachen
COPY pom.xml .
RUN mvn dependency:go-offline

# Quellcode kopieren
COPY src ./src

# Projekt bauen
RUN mvn clean package -DskipTests

# 2. Run Stage
FROM eclipse-temurin:21-jre

WORKDIR /app

# Die gebaute JAR-Datei kopieren
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
