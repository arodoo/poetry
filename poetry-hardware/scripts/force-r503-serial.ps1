# File: force-r503-serial.ps1
# Purpose: Force R503 to use Windows generic USB Serial driver
# Removes CDROM driver and installs usbser.sys automatically
# All Rights Reserved. Arodi Emmanuel

#Requires -RunAsAdministrator

$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "R503 Serial Mode Auto-Installer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Find R503 device
Write-Host "[1/4] Locating R503 device..." -ForegroundColor Yellow

$r503 = Get-PnpDevice -PresentOnly | Where-Object {
    $_.FriendlyName -like "*Finger*"
}

if (-not $r503) {
    Write-Host "ERROR: R503 not found." -ForegroundColor Red
    exit 1
}

Write-Host "Found: $($r503.FriendlyName)" -ForegroundColor Green
Write-Host "Class: $($r503.Class)" -ForegroundColor Yellow

if ($r503.Class -eq "Ports") {
    Write-Host "Already configured as COM port!" -ForegroundColor Green
    $comPort = $r503.FriendlyName -replace '.*\(COM(\d+)\).*', 'COM$1'
    $envPath = Join-Path $PSScriptRoot "..\.env"
    (Get-Content $envPath -Raw) -replace "FINGERPRINT_PORT=.*", "FINGERPRINT_PORT=$comPort" -replace "MOCK_MODE=.*", "MOCK_MODE=false" | Set-Content $envPath -NoNewline
    Write-Host "Updated .env: FINGERPRINT_PORT=$comPort" -ForegroundColor Green
    exit 0
}

# Remove CDROM driver
Write-Host ""
Write-Host "[2/4] Removing CDROM driver..." -ForegroundColor Yellow

pnputil /remove-device $r503.InstanceId /force 2>&1 | Out-Null
Write-Host "Driver removed." -ForegroundColor Green

# Install generic USB Serial driver
Write-Host ""
Write-Host "[3/4] Installing USB Serial driver..." -ForegroundColor Yellow

$infPath = "C:\Windows\INF\mdmcpq.inf"
if (-not (Test-Path $infPath)) {
    $infPath = "C:\Windows\INF\usbser.inf"
}

pnputil /add-driver $infPath /install 2>&1 | Out-Null
Write-Host "Generic USB Serial driver staged." -ForegroundColor Green

Write-Host ""
Write-Host "[4/4] Reconnecting device..." -ForegroundColor Yellow
Write-Host "DISCONNECT and RECONNECT the R503 USB cable NOW." -ForegroundColor Cyan
Read-Host "Press Enter after reconnecting"

Start-Sleep -Seconds 5

# Verify
$comPorts = Get-PnpDevice -Class Ports -Status OK | Where-Object {
    $_.FriendlyName -match '\(COM\d+\)'
}

$newPort = $comPorts | Sort-Object -Property @{Expression={[int]($_.FriendlyName -replace '.*COM(\d+).*','$1')}} | Select-Object -Last 1

if ($newPort) {
    $portName = $newPort.FriendlyName -replace '.*\(COM(\d+)\).*', 'COM$1'
    Write-Host ""
    Write-Host "SUCCESS! COM port detected: $portName" -ForegroundColor Green
    
    $envPath = Join-Path $PSScriptRoot "..\.env"
    (Get-Content $envPath -Raw) -replace "FINGERPRINT_PORT=.*", "FINGERPRINT_PORT=$portName" -replace "MOCK_MODE=.*", "MOCK_MODE=false" | Set-Content $envPath -NoNewline
    
    Write-Host "Updated .env: FINGERPRINT_PORT=$portName" -ForegroundColor Green
    Write-Host ""
    Write-Host "Run: npm run dev" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "No new COM port detected." -ForegroundColor Yellow
    Write-Host "Open Device Manager and manually install 'USB Serial Device' driver." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to exit"
