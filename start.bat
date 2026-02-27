@echo off
rem File: start.bat
rem Purpose: Single-click launcher for the full Poetry application stack.
rem Builds the backend, starts Docker containers (PostgreSQL + frontend),
rem then launches the Spring Boot JAR on this Windows host.
rem All Rights Reserved Arodi Emmanuel

echo =============================================
echo   Poetry App Launcher
echo =============================================

if not exist ".env" (
  echo [WARN] .env file not found. Copying from .env.example...
  copy .env.example .env
  echo [WARN] Edit .env with your actual secrets before continuing.
  pause
)

echo [1/3] Building backend...
cd poetry-backend
call mvn package -DskipTests -q
if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Backend build failed.
  exit /b 1
)
cd ..

echo [2/3] Starting containers (postgres + frontend)...
docker compose up --build -d
if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Docker Compose failed.
  exit /b 1
)

echo [3/3] Starting backend (this window stays open)...
echo Frontend  : http://localhost
echo Backend   : http://localhost:8080
echo Swagger   : http://localhost:8080/swagger-ui.html
echo.
java -jar poetry-backend\target\poetry-backend-0.0.1-SNAPSHOT.jar
