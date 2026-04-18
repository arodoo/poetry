# File: poetry-backend/Dockerfile
# Purpose: Builds a Linux container image for the Spring Boot backend.
# NOTE: This image requires the U.are.U RTE native drivers available on the
# host via USB passthrough. For Windows hosts, run via run-backend.bat instead.
# All Rights Reserved Arodi Emmanuel

FROM eclipse-temurin:21-jre-alpine AS runner

WORKDIR /app

COPY target/poetry-backend-*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=prod
# Explicit upload dir — mount a volume here for persistence:
# docker run -v poetry_uploads:/data/uploads ...
ENV POETRY_UPLOADS_DIR=/data/uploads/carousel
RUN mkdir -p /data/uploads/carousel

EXPOSE 8080

ENTRYPOINT ["java", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "/app/app.jar"]
