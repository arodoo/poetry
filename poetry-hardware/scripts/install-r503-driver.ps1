# File: install-r503-driver.ps1
# Purpose: Automated R503 fingerprint reader driver installation
# Downloads CH340 driver, installs, and configures COM port
# All Rights Reserved. Arodi Emmanuel

#Requires -RunAsAdministrator

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "R503 Fingerprint Driver Installer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$driverUrl = "https://github.com/nodemcu/nodemcu-devkit/raw/master/Drivers/CH341SER.EXE"
$driverPath = "$env:TEMP\CH341SER.EXE"
$extractPath = "$env:TEMP\CH341_Driver"

# Step 1: Check current device status
Write-Host "[1/6] Checking R503 device status..." -ForegroundColor Yellow

$r503Device = Get-PnpDevice -PresentOnly | Where-Object {
    $_.FriendlyName -like "*Finger*" -or 
    $_.FriendlyName -like "*R503*" -or
    $_.InstanceId -like "*VID_1A86*"
}

if (-not $r503Device) {
    Write-Host "ERROR: R503 device not detected." -ForegroundColor Red
    Write-Host "Please ensure the device is connected via USB." -ForegroundColor Yellow
    exit 1
}

Write-Host "Found: $($r503Device.FriendlyName)" -ForegroundColor Green
Write-Host "Status: $($r503Device.Status)" -ForegroundColor Green
Write-Host "Class: $($r503Device.Class)" -ForegroundColor Yellow

if ($r503Device.Class -eq "Ports") {
    Write-Host ""
    Write-Host "Device already configured as COM port!" -ForegroundColor Green
    
    $comPort = $r503Device.FriendlyName -replace '.*\(COM(\d+)\).*', 'COM$1'
    Write-Host "Port: $comPort" -ForegroundColor Cyan
    
    Write-Host ""
    Write-Host "Updating .env file..." -ForegroundColor Yellow
    
    $envPath = Join-Path $PSScriptRoot "..\.env"
    if (Test-Path $envPath) {
        $envContent = Get-Content $envPath -Raw
        $envContent = $envContent -replace "FINGERPRINT_PORT=.*", "FINGERPRINT_PORT=$comPort"
        $envContent = $envContent -replace "MOCK_MODE=.*", "MOCK_MODE=false"
        Set-Content -Path $envPath -Value $envContent -NoNewline
        
        Write-Host "Updated .env:" -ForegroundColor Green
        Write-Host "  FINGERPRINT_PORT=$comPort" -ForegroundColor White
        Write-Host "  MOCK_MODE=false" -ForegroundColor White
    }
    
    exit 0
}

# Step 2: Download CH340 driver
Write-Host ""
Write-Host "[2/6] Downloading CH340 driver..." -ForegroundColor Yellow

if (Test-Path $driverPath) {
    Write-Host "Driver already downloaded, skipping..." -ForegroundColor Gray
} else {
    try {
        Invoke-WebRequest -Uri $driverUrl -OutFile $driverPath -UseBasicParsing
        Write-Host "Download complete: $driverPath" -ForegroundColor Green
    } catch {
        Write-Host "Download failed from primary source." -ForegroundColor Yellow
        Write-Host "Trying alternative source..." -ForegroundColor Yellow
        
        $altUrl = "http://www.wch-ic.com/downloads/file/5.html"
        Write-Host "Please download manually from:" -ForegroundColor Red
        Write-Host $altUrl -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Save as: $driverPath" -ForegroundColor Yellow
        Read-Host "Press Enter after download completes"
        
        if (-not (Test-Path $driverPath)) {
            Write-Host "Driver file not found. Exiting." -ForegroundColor Red
            exit 1
        }
    }
}

# Step 3: Extract driver (if needed)
Write-Host ""
Write-Host "[3/6] Preparing driver files..." -ForegroundColor Yellow

if ($driverPath -like "*.EXE") {
    if (-not (Test-Path $extractPath)) {
        New-Item -ItemType Directory -Path $extractPath -Force | Out-Null
    }
    
    Write-Host "Extracting driver..." -ForegroundColor Gray
    Start-Process -FilePath $driverPath -ArgumentList "/VERYSILENT", "/DIR=$extractPath" -Wait -NoNewWindow
}

# Step 4: Uninstall current driver
Write-Host ""
Write-Host "[4/6] Removing incorrect driver..." -ForegroundColor Yellow

try {
    $r503Device | ForEach-Object {
        Write-Host "Uninstalling: $($_.FriendlyName)" -ForegroundColor Gray
        pnputil /remove-device $_.InstanceId /force 2>&1 | Out-Null
    }
    Write-Host "Old driver removed." -ForegroundColor Green
} catch {
    Write-Host "Warning: Could not remove old driver automatically." -ForegroundColor Yellow
}

# Step 5: Install CH340 driver
Write-Host ""
Write-Host "[5/6] Installing CH340 driver..." -ForegroundColor Yellow

$infFiles = Get-ChildItem -Path $extractPath -Filter "*.inf" -Recurse

if ($infFiles.Count -eq 0) {
    # Try direct installation
    Write-Host "Attempting direct driver installation..." -ForegroundColor Gray
    Start-Process -FilePath $driverPath -Wait -NoNewWindow
} else {
    $infFile = $infFiles[0].FullName
    Write-Host "Installing from: $infFile" -ForegroundColor Gray
    
    pnputil /add-driver $infFile /install
}

# Step 6: Reconnect device
Write-Host ""
Write-Host "[6/6] Reconfiguring device..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Please DISCONNECT and RECONNECT the R503 USB cable now." -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter after reconnecting"

# Wait for device to re-enumerate
Start-Sleep -Seconds 3

# Verify COM port
Write-Host ""
Write-Host "Scanning for COM port..." -ForegroundColor Yellow

$comDevice = Get-PnpDevice -Class Ports -Status OK | Where-Object {
    $_.FriendlyName -like "*USB*" -or
    $_.FriendlyName -like "*Serial*" -or
    $_.FriendlyName -like "*CH340*" -or
    $_.FriendlyName -like "*CH341*"
}

if ($comDevice) {
    Write-Host ""
    Write-Host "SUCCESS! COM port detected:" -ForegroundColor Green
    
    $comDevice | ForEach-Object {
        $portName = $_.FriendlyName -replace '.*\(COM(\d+)\).*', 'COM$1'
        Write-Host "  $($_.FriendlyName)" -ForegroundColor White
        Write-Host "  Port: $portName" -ForegroundColor Cyan
        
        # Update .env
        $envPath = Join-Path $PSScriptRoot "..\.env"
        if (Test-Path $envPath) {
            $envContent = Get-Content $envPath -Raw
            $envContent = $envContent -replace "FINGERPRINT_PORT=.*", "FINGERPRINT_PORT=$portName"
            $envContent = $envContent -replace "MOCK_MODE=.*", "MOCK_MODE=false"
            Set-Content -Path $envPath -Value $envContent -NoNewline
            
            Write-Host ""
            Write-Host "Updated .env configuration:" -ForegroundColor Green
            Write-Host "  FINGERPRINT_PORT=$portName" -ForegroundColor White
            Write-Host "  MOCK_MODE=false" -ForegroundColor White
        }
    }
    
    Write-Host ""
    Write-Host "Installation complete! You can now run:" -ForegroundColor Green
    Write-Host "  cd poetry-hardware" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor Cyan
    
} else {
    Write-Host ""
    Write-Host "WARNING: No COM port detected yet." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Troubleshooting steps:" -ForegroundColor Yellow
    Write-Host "1. Open Device Manager (Win + X > Device Manager)" -ForegroundColor White
    Write-Host "2. Look for 'Other devices' or 'Universal Serial Bus devices'" -ForegroundColor White
    Write-Host "3. Right-click the R503 device > Update Driver" -ForegroundColor White
    Write-Host "4. Choose 'Search automatically for drivers'" -ForegroundColor White
    Write-Host ""
    Write-Host "Or check:" -ForegroundColor Yellow
    Write-Host "  - Try a different USB port" -ForegroundColor White
    Write-Host "  - Check USB cable integrity" -ForegroundColor White
    Write-Host "  - Verify R503 has power LED on" -ForegroundColor White
}

Write-Host ""
Read-Host "Press Enter to exit"
