@echo off
rem File: run-backend.bat
rem Purpose: Builds and launches the Spring Boot backend on the Windows host.
rem Must run on the machine with the U.are.U RTE drivers installed.
rem Requires: Java 21+, Maven 3.8+, USB fingerprint reader connected.
rem All Rights Reserved Arodi Emmanuel

echo Building backend (skip tests for speed)...
cd poetry-backend
mvn package -DskipTests -q

if %ERRORLEVEL% NEQ 0 (
  echo Build failed. Check compile errors above.
  exit /b 1
)

echo Starting backend on port 8080...
java -jar target\poetry-backend-0.0.1-SNAPSHOT.jar
