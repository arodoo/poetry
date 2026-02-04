# File: install-digitalpersona.ps1
# Purpose: Installer for HID DigitalPersona components for fingerprint capture.
# Supports: Authentication Device Client (free) or U.are.U RTE (from CD/download).
# Run with: powershell -ExecutionPolicy Bypass -File ./scripts/install-digitalpersona.ps1
# All Rights Reserved. Arodi Emmanuel

param(
    [switch]$Force,
    [switch]$Uninstall,
    [string]$RtePath = ""
)

$ErrorActionPreference = "Stop"

$TEMP_DIR = "$env:TEMP\dp-installer"

# Known download URLs (may change)
$DOWNLOAD_URLS = @(
    "https://www.hidglobal.com/sites/default/files/digitalpersona/HIDAuthenticationDeviceClient_x64.msi",
    "https://www.hidglobal.com/sites/default/files/digitalpersona/DPAuthDeviceClient_x64.msi"
)

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $color = switch ($Level) {
        "WARN" { "Yellow" }
        "ERROR" { "Red" }
        "SUCCESS" { "Green" }
        default { "White" }
    }
    Write-Host "[$timestamp] [$Level] $Message" -ForegroundColor $color
}

function Test-DPInstalled {
    $paths = @(
        "C:\Program Files\DigitalPersona",
        "C:\Program Files\HID\DigitalPersona"
    )
    foreach ($p in $paths) {
        if (Test-Path $p) { return $true }
    }
    $services = @("DpHostW", "DPAgent", "DPDevice")
    foreach ($svc in $services) {
        if (Get-Service -Name $svc -ErrorAction SilentlyContinue) { return $true }
    }
    return $false
}

function Find-LocalInstaller {
    $patterns = @("*DigitalPersona*.msi", "*DPAuthDevice*.msi", "*UareU*.msi", "*RTE*.msi")
    $searchPaths = @(".", "..", "$PSScriptRoot", "$PSScriptRoot\..")
    
    foreach ($path in $searchPaths) {
        foreach ($pattern in $patterns) {
            $found = Get-ChildItem -Path $path -Filter $pattern -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
            if ($found) { return $found.FullName }
        }
    }
    return $null
}

function Install-DigitalPersona {
    Write-Log "=== HID DigitalPersona Installer ==="
    
    if ((Test-DPInstalled) -and (-not $Force)) {
        Write-Log "DigitalPersona components already installed." "SUCCESS"
        Write-Log "Use -Force to reinstall."
        return
    }

    # Check for provided RTE path
    if ($RtePath -and (Test-Path $RtePath)) {
        Write-Log "Using provided installer: $RtePath"
        Install-MSI $RtePath
        return
    }

    # Check for local installer
    $localInstaller = Find-LocalInstaller
    if ($localInstaller) {
        Write-Log "Found local installer: $localInstaller"
        Install-MSI $localInstaller
        return
    }

    # Try downloading
    if (-not (Test-Path $TEMP_DIR)) {
        New-Item -ItemType Directory -Path $TEMP_DIR -Force | Out-Null
    }

    $downloaded = $false
    foreach ($url in $DOWNLOAD_URLS) {
        $fileName = Split-Path $url -Leaf
        $outPath = "$TEMP_DIR\$fileName"
        Write-Log "Trying to download from: $url"
        try {
            Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -TimeoutSec 30
            if (Test-Path $outPath) {
                Write-Log "Download successful!"
                Install-MSI $outPath
                $downloaded = $true
                break
            }
        } catch {
            Write-Log "Download failed: $($_.Exception.Message)" "WARN"
        }
    }

    if (-not $downloaded) {
        Write-Log "============================================" "ERROR"
        Write-Log "Could not download installer automatically." "ERROR"
        Write-Log "" "ERROR"
        Write-Log "Please download the U.are.U RTE manually:" "WARN"
        Write-Log "1. Go to: https://developer.hidglobal.com" "WARN"
        Write-Log "2. Download 'U.are.U RTE' or 'Authentication Device Client'" "WARN"
        Write-Log "3. Place the .msi file in: $PSScriptRoot" "WARN"
        Write-Log "4. Run this script again" "WARN"
        Write-Log "" "WARN"
        Write-Log "Or use: npm run setup:fingerprint -- -RtePath 'C:\path\to\installer.msi'" "WARN"
        Write-Log "============================================" "ERROR"
        exit 1
    }
}

function Install-MSI {
    param([string]$MsiPath)
    
    Write-Log "Installing: $MsiPath"
    $msiArgs = "/i `"$MsiPath`" /qn /norestart"
    $process = Start-Process -FilePath "msiexec.exe" -ArgumentList $msiArgs -Wait -PassThru
    
    if ($process.ExitCode -eq 0) {
        Write-Log "Installation completed successfully!" "SUCCESS"
    } elseif ($process.ExitCode -eq 3010) {
        Write-Log "Installation completed. Restart may be required." "WARN"
    } else {
        throw "Installation failed with exit code: $($process.ExitCode)"
    }
    
    # Cleanup temp
    if (Test-Path $TEMP_DIR) {
        Remove-Item -Path $TEMP_DIR -Recurse -Force -ErrorAction SilentlyContinue
    }
}

function Uninstall-DigitalPersona {
    Write-Log "Uninstalling DigitalPersona..."
    
    $uninstallKeys = Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*" -ErrorAction SilentlyContinue |
        Where-Object { $_.DisplayName -like "*DigitalPersona*" -or $_.DisplayName -like "*U.are.U*" }
    
    foreach ($key in $uninstallKeys) {
        $productCode = $key.PSChildName
        Write-Log "Removing: $($key.DisplayName)"
        $msiArgs = "/x $productCode /qn /norestart"
        Start-Process -FilePath "msiexec.exe" -ArgumentList $msiArgs -Wait
    }
    
    Write-Log "Uninstallation completed." "SUCCESS"
}

# Main
if ($Uninstall) {
    Uninstall-DigitalPersona
} else {
    Install-DigitalPersona
}
