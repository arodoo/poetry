# kill-port-processes.ps1
# Kills poetry-hardware processes using specified COM port
# Preserves fingerprint-bridge (32-bit Node.js on port 3001)
# IMPORTANT: Only kills poetry-hardware processes, not other Node.js
# All Rights Reserved. Arodi Emmanuel

param(
    [string]$ComPort = "COM3"
)

Write-Host "Checking for poetry-hardware processes using $ComPort..."

# Get all Node.js processes with their command lines
$hardwareProcesses = @()

Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" | ForEach-Object {
    $cmdLine = $_.CommandLine
    $procId = $_.ProcessId
    $procPath = $_.ExecutablePath
    
    # Only target poetry-hardware processes (check command line)
    if ($cmdLine -and $cmdLine -like "*poetry-hardware*") {
        # Skip 32-bit (fingerprint-bridge)
        if ($procPath -and $procPath -notlike "*x86*") {
            $hardwareProcesses += @{
                Id = $procId
                Path = $procPath
                CmdLine = $cmdLine
            }
        }
    }
}

if ($hardwareProcesses.Count -gt 0) {
    Write-Host "Found $($hardwareProcesses.Count) poetry-hardware process(es)"
    
    foreach ($proc in $hardwareProcesses) {
        try {
            Write-Host "  PID $($proc.Id)" -ForegroundColor Gray
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
            Write-Host "  OK Killed PID $($proc.Id)" -ForegroundColor Green
        }
        catch {
            Write-Host "  SKIP Could not kill $($proc.Id)" -ForegroundColor Yellow
        }
    }
    
    Start-Sleep -Milliseconds 500
    Write-Host "Cleanup complete" -ForegroundColor Green
}
else {
    Write-Host "No poetry-hardware processes found" -ForegroundColor Green
}
