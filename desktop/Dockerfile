# File: Dockerfile
# Purpose: Multi-stage Docker build that compiles the entire Poetry
# stack (backend, frontend, launcher, JRE) and produces a Windows
# installer EXE via Inno Setup. Only Docker is needed to build.
# All Rights Reserved. Arodi Emmanuel

# ── Stage 1: Build backend fat JAR ─────────────────────
FROM eclipse-temurin:21-jdk-alpine AS backend
WORKDIR /build
COPY poetry-backend/ ./poetry-backend/
COPY sdk/ ./sdk/
RUN cd poetry-backend && \
    chmod +x mvnw && \
    ./mvnw package -DskipTests -q -B

# ── Stage 2: Build frontend static files ───────────────
FROM node:20-alpine AS frontend
WORKDIR /build
COPY poetry-frontend/ ./
RUN npm ci --silent && \
    npx vite build --mode desktop

# ── Stage 3: Compile launcher JAR ──────────────────────
FROM eclipse-temurin:21-jdk-alpine AS launcher
WORKDIR /build
COPY desktop/launcher/src/ ./src/
RUN mkdir -p out && \
    javac -d out src/*.java && \
    cd out && \
    jar cfe /build/poetry-launcher.jar \
      poetry.desktop.PoetryLauncher \
      poetry/desktop/*.class

# ── Stage 5a: Build standalone uninstaller EXE ────────
FROM amake/innosetup:latest AS uninstaller
COPY desktop/uninstall.iss /work/
WORKDIR /work
RUN mkdir -p /work/Output && iscc uninstall.iss

# ── Stage 4: Download Windows JRE 21 (Adoptium) ───────
FROM alpine:3.19 AS jre
RUN apk add --no-cache curl unzip
RUN curl -fSL -o /tmp/jre.zip \
    "https://api.adoptium.net/v3/binary/latest/21/ga/\
windows/x64/jre/hotspot/normal/eclipse" && \
    mkdir /jre-win && \
    unzip -q /tmp/jre.zip -d /jre-win && \
    mv /jre-win/jdk-*-jre /jre-win/jre && \
    rm /tmp/jre.zip

# ── Stage 5: Assemble the app bundle ──────────────────
FROM alpine:3.19 AS bundler
RUN apk add --no-cache curl unzip imagemagick rsvg-convert

WORKDIR /bundle/Poetry

# JRE
COPY --from=jre /jre-win/jre/ ./jre/

# Backend JAR
COPY --from=backend \
  /build/poetry-backend/target/poetry-backend-*.jar \
  ./poetry-backend.jar

# Frontend static
COPY --from=frontend /build/dist/ ./static/

# Launcher JAR
COPY --from=launcher /build/poetry-launcher.jar ./

# SDK native drivers (from local project)
COPY sdk/UareU/RTE/x64/ ./native/rte-x64/

# SDK Java JAR
COPY poetry-backend/libs/dpuareu-3.2.0.jar ./

# Desktop icon assets
COPY desktop/poetry.svg ./poetry.svg
RUN rsvg-convert -w 256 -h 256 poetry.svg > poetry.png && \
  convert poetry.png poetry.ico

# Portable PostgreSQL 16 (Windows x64 binaries)
RUN curl -fSL -o /tmp/pg.zip \
  "https://get.enterprisedb.com/postgresql/\
postgresql-16.6-1-windows-x64-binaries.zip" && \
  unzip -q /tmp/pg.zip -d ./ && \
  rm /tmp/pg.zip

# Launcher BAT (entry point for the installed app)
COPY desktop/launcher.bat ./Poetry.bat

# Uninstaller EXE
COPY --from=uninstaller /work/Output/un-install.exe \
  ./un-install.exe

# Fix permissions for Inno Setup compatibility
RUN chmod -R a+rX /bundle

# ── Stage 6: Build installer via Inno Setup ────────────
FROM amake/innosetup:latest AS installer
COPY --from=bundler /bundle/ /work/bundle/
COPY desktop/installer.iss /work/
WORKDIR /work
RUN mkdir -p /work/Output && iscc installer.iss

# ── Output stage: extract the installer and uninstaller ─
FROM scratch AS output
COPY --from=installer /work/Output/ /
