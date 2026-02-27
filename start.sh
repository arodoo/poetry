#!/usr/bin/env bash
# File: start.sh
# Purpose: Single-click launcher for Poetry on Linux/macOS. Intended for
# future use when the SDK is migrated to a Linux-compatible driver.
# Currently the fingerprint hardware requires Windows (U.are.U RTE).
# All Rights Reserved Arodi Emmanuel

set -euo pipefail

echo "============================================="
echo "  Poetry App Launcher (Linux/macOS)"
echo "============================================="

if [ ! -f ".env" ]; then
  echo "[WARN] .env not found. Copying .env.example..."
  cp .env.example .env
  echo "[WARN] Edit .env before continuing."
  read -r -p "Press Enter to continue..."
fi

echo "[1/3] Building backend..."
cd poetry-backend
mvn package -DskipTests -q
cd ..

echo "[2/3] Starting containers..."
docker compose up --build -d

echo "[3/3] Starting backend..."
echo "Frontend : http://localhost"
echo "Backend  : http://localhost:8080"
echo "Swagger  : http://localhost:8080/swagger-ui.html"
java -jar poetry-backend/target/poetry-backend-*.jar
