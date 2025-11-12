# File: setup-environment.ps1
# Purpose: Complete setup for poetry-hardware
# All Rights Reserved. Arodi Emmanuel

Write-Host "Poetry Hardware Service Setup" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green
Write-Host ""

$hardwarePath = $PSScriptRoot | Split-Path -Parent

Write-Host "Step 1: Checking Node.js installation..." -ForegroundColor Cyan
$nodeVersion = node --version 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "  Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "  Node.js not found!" -ForegroundColor Red
    Write-Host "  Please install Node.js 20+ from https://nodejs.org" -ForegroundColor Yellow
    Read-Host "`nPress Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Step 2: Installing npm dependencies..." -ForegroundColor Cyan
Set-Location $hardwarePath

npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "  Failed to install dependencies!" -ForegroundColor Red
    Read-Host "`nPress Enter to exit"
    exit 1
}

Write-Host "  Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "Step 3: Setting up environment file..." -ForegroundColor Cyan
$envExample = Join-Path $hardwarePath ".env.example"
$envFile = Join-Path $hardwarePath ".env"

if (Test-Path $envFile) {
    Write-Host "  .env file already exists" -ForegroundColor Yellow
} else {
    Copy-Item $envExample $envFile
    Write-Host "  Created .env file from template" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 4: FTDI Driver installation..." -ForegroundColor Cyan
$installDrivers = Read-Host "Install FTDI drivers now? (y/n)"

if ($installDrivers -eq 'y') {
    & "$PSScriptRoot\install-drivers.ps1"
}

Write-Host ""
Write-Host "Setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Connect your USB-TTL adapter" -ForegroundColor White
Write-Host "2. Run: npm run detect:ports" -ForegroundColor White
Write-Host "3. Update .env with detected COM port" -ForegroundColor White
Write-Host "4. Run: npm run dev (starts in mock mode)" -ForegroundColor White
Write-Host "5. Test: curl http://localhost:3001/health" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to exit"
