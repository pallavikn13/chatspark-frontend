# ─── Stage 1: Build with Maven ───────────────────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

# Install Maven (since there is no mvnw in this project)
RUN apk add --no-cache maven

# Copy pom first (layer cache: only re-downloads deps when pom changes)
COPY pom.xml .

# Download dependencies (cached layer)
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests -B

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -S chatspark && adduser -S chatspark -G chatspark

COPY --from=build /app/target/*.jar app.jar

RUN chown chatspark:chatspark app.jar
USER chatspark

# Render sets PORT dynamically; default 8080 for local Docker testing
EXPOSE 8080

# Use the PORT env var that Render provides
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
