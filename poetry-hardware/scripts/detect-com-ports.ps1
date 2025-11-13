# File: detect-com-ports.ps1
# Purpose: Detect available COM ports and identify FTDI
# All Rights Reserved. Arodi Emmanuel

Write-Host "Detecting COM Ports..." -ForegroundColor Green
Write-Host ""

# Try multiple methods to detect COM ports
$ports = @()

# Method 1: Registry query (most reliable)
try {
    $regPorts = Get-ItemProperty -Path "HKLM:\HARDWARE\DEVICEMAP\SERIALCOMM" -ErrorAction SilentlyContinue
    if ($regPorts) {
        $regPorts.PSObject.Properties | ForEach-Object {
            $comPort = $_.Value
            $devicePath = $_.Name
            
            # Get friendly name from PnP devices
            $pnpDevice = Get-PnpDevice -Class Ports | Where-Object { 
                $_.FriendlyName -like "*$comPort*" 
            } | Select-Object -First 1
            
            if ($pnpDevice) {
                $ports += [PSCustomObject]@{
                    DeviceID = $comPort
                    Description = $pnpDevice.FriendlyName
                    PNPDeviceID = $pnpDevice.InstanceId
                }
            }
        }
    }
} catch {
    Write-Host "Registry method failed, trying alternative..." -ForegroundColor Yellow
}

# Method 2: Fallback to WMI
if ($ports.Count -eq 0) {
    $ports = Get-WmiObject Win32_SerialPort -ErrorAction SilentlyContinue | 
        Select-Object DeviceID, Description, PNPDeviceID
}

# Method 3: Fallback to PnpDevice
if ($ports.Count -eq 0) {
    $pnpPorts = Get-PnpDevice -Class Ports -Status OK -ErrorAction SilentlyContinue
    foreach ($pnp in $pnpPorts) {
        if ($pnp.FriendlyName -match '\(COM(\d+)\)') {
            $ports += [PSCustomObject]@{
                DeviceID = "COM$($matches[1])"
                Description = $pnp.FriendlyName
                PNPDeviceID = $pnp.InstanceId
            }
        }
    }
}

if ($ports.Count -eq 0) {
    Write-Host "No COM ports detected." -ForegroundColor Red
    Write-Host "Please ensure your USB-TTL adapter is connected." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Found COM ports:" -ForegroundColor Cyan
Write-Host ""

$ftdiPort = $null

foreach ($port in $ports) {
    Write-Host "Port: $($port.DeviceID)" -ForegroundColor White
    Write-Host "  Description: $($port.Description)"
    Write-Host "  PNP ID: $($port.PNPDeviceID)"
    Write-Host ""
    
    if ($port.Description -like "*FTDI*" -or 
        $port.Description -like "*FT232*" -or
        $port.PNPDeviceID -like "*FTDI*" -or
        $port.PNPDeviceID -like "*VID_0403*") {
        $ftdiPort = $port.DeviceID
        Write-Host "  *** FTDI USB-TTL Adapter Detected ***" -ForegroundColor Green
        Write-Host ""
    }
}

if ($ftdiPort) {
    Write-Host "Recommended configuration:" -ForegroundColor Yellow
    Write-Host "USB_TTL_PORT=$ftdiPort" -ForegroundColor Cyan
    Write-Host ""
    
    # Auto-update .env file
    $envPath = Join-Path $PSScriptRoot "..\.env"
    
    if (Test-Path $envPath) {
        Write-Host "Updating .env file..." -ForegroundColor Cyan
        
        $envContent = Get-Content $envPath -Raw
        
        # Update USB_TTL_PORT
        if ($envContent -match "USB_TTL_PORT=.*") {
            $envContent = $envContent -replace "USB_TTL_PORT=.*", "USB_TTL_PORT=$ftdiPort"
        }
        
        # Update MOCK_MODE to false
        if ($envContent -match "MOCK_MODE=.*") {
            $envContent = $envContent -replace "MOCK_MODE=.*", "MOCK_MODE=false"
        }
        
        Set-Content -Path $envPath -Value $envContent -NoNewline
        
        Write-Host "Updated .env successfully:" -ForegroundColor Green
        Write-Host "  MOCK_MODE=false" -ForegroundColor White
        Write-Host "  USB_TTL_PORT=$ftdiPort" -ForegroundColor White
        Write-Host ""
        Write-Host "Ready to run: npm run dev" -ForegroundColor Yellow
    } else {
        Write-Host "Warning: .env file not found" -ForegroundColor Yellow
        Write-Host "Run: cp .env.example .env" -ForegroundColor Yellow
    }
} else {
    Write-Host "FTDI adapter not found. Available ports listed above." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to exit"
