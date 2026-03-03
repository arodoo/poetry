#!/usr/bin/env bash
# File: build.sh
# Purpose: One-command build for the Poetry desktop installer.
# Requires ONLY Docker. Produces PoetrySetup-1.0.0.exe in
# desktop/output/. Cross-platform (Linux/macOS CI runners).
# All Rights Reserved Arodi Emmanuel

set -euo pipefail
cd "$(dirname "$0")/.."

echo "============================================="
echo "  Poetry Desktop Installer Build"
echo "  Requires: Docker (only)"
echo "============================================="
echo

echo "[1/2] Building installer via Docker..."
docker build \
  -f desktop/Dockerfile \
  --output type=local,dest=desktop/output \
  .

echo
echo "============================================="
echo "  Done: desktop/output/PoetrySetup-1.0.0.exe"
echo "============================================="
