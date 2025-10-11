#!/bin/bash
# File: generate-sdk.sh
# Purpose: Generate mobile SDK from OpenAPI spec using hey-api.
# This script pulls the OpenAPI spec from the backend-generated
# v1 directory and creates type-safe Axios client wrappers in
# src/api/generated. Run after backend changes to stay in sync.
# All Rights Reserved. Arodi Emmanuel

npx @hey-api/openapi-ts \
  -i ../docs/api/backend-generated/v1/openapi.yaml \
  -o src/api/generated \
  -c @hey-api/client-axios
