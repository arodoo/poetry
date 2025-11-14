# safe-start.ps1
# Safely starts hardware service by cleaning up ports first
# All Rights Reserved. Arodi Emmanuel

$ErrorActionPreference = "Stop"

Write-Host "=== Poetry Hardware Service Safe Start ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill processes using COM ports
Write-Host "[1/3] Cleaning up COM port processes..." -ForegroundColor Yellow
& "$PSScriptRoot\kill-port-processes.ps1" -ComPort "COM3"
Write-Host ""

# Step 2: Verify .env exists
Write-Host "[2/3] Checking configuration..." -ForegroundColor Yellow
$projectRoot = Join-Path $PSScriptRoot ".."
$envPath = Join-Path $projectRoot ".env"
if (Test-Path $envPath) {
    Write-Host "  OK .env file found" -ForegroundColor Green
}
else {
    Write-Host "  ERROR .env file not found" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 3: Start the service
Write-Host "[3/3] Starting hardware service..." -ForegroundColor Yellow
Set-Location $projectRoot

npm run dev:direct
