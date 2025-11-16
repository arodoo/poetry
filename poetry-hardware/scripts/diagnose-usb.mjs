#!/usr/bin/env node
// File: diagnose-usb.mjs
// Purpose: Diagnose R503 USB connection, detect VID/PID, suggest driver
// All Rights Reserved. Arodi Emmanuel

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('╔══════════════════════════════════════════╗');
console.log('║   R503 USB Diagnostic Tool              ║');
console.log('╚══════════════════════════════════════════╝\n');

async function runPowerShell(command) {
  try {
    const escapedCmd = command.replace(/"/g, '\\"');
    const { stdout } = await execAsync(`powershell -Command "${escapedCmd}"`, {
      shell: 'powershell.exe'
    });
    return stdout.trim();
  } catch (error) {
    console.error('PowerShell error:', error.message);
    return null;
  }
}

async function getAllUSBDevices() {
  const cmd = `Get-PnpDevice -PresentOnly | Select-Object FriendlyName, InstanceId, Status, Class | ConvertTo-Json -Compress`;
  
  const result = await runPowerShell(cmd);
  if (!result || result === 'null') return [];
  
  try {
    const devices = JSON.parse(result);
    return Array.isArray(devices) ? devices : [devices];
  } catch (err) {
    console.error('JSON parse error:', err.message);
    console.error('Raw output:', result);
    return [];
  }
}

function extractVidPid(instanceId) {
  const vidMatch = instanceId.match(/VID[_&]([0-9A-F]{4})/i);
  const pidMatch = instanceId.match(/PID[_&]([0-9A-F]{4})/i);
  
  return {
    vid: vidMatch ? vidMatch[1] : null,
    pid: pidMatch ? pidMatch[1] : null
  };
}

const KNOWN_FINGERPRINT_VIDS = {
  '1A86': 'WCH CH340/CH341 (Common in R503)',
  '0403': 'FTDI (FT232, alternative)',
  '10C4': 'Silicon Labs CP210x',
  '067B': 'Prolific PL2303',
  '1A86': 'QinHeng Electronics'
};

async function main() {
  console.log('[1] Scanning USB devices...\n');
  
  const devices = await getAllUSBDevices();
  
  if (devices.length === 0) {
    console.log('❌ No USB devices detected.\n');
    console.log('Possible causes:');
    console.log('  • R503 not connected');
    console.log('  • USB cable faulty');
    console.log('  • USB port disabled\n');
    process.exit(1);
  }
  
  console.log(`Found ${devices.length} USB device(s)\n`);
  
  let r503Candidates = [];
  
  devices.forEach((dev, idx) => {
    const { vid, pid } = extractVidPid(dev.InstanceId);
    
    const isFinger = dev.FriendlyName?.toLowerCase().includes('finger') ||
                     dev.FriendlyName?.toLowerCase().includes('r503') ||
                     dev.InstanceId?.toLowerCase().includes('finger');
    
    if (isFinger || vid) {
      console.log(`[${idx + 1}] ${dev.FriendlyName || 'Unknown Device'}`);
      console.log(`    Class: ${dev.Class || 'N/A'}`);
      console.log(`    Status: ${dev.Status}`);
      
      if (vid && pid) {
        console.log(`    VID: ${vid}  PID: ${pid}`);
        
        if (KNOWN_FINGERPRINT_VIDS[vid.toUpperCase()]) {
          console.log(`    🎯 Chip: ${KNOWN_FINGERPRINT_VIDS[vid.toUpperCase()]}`);
          r503Candidates.push({ ...dev, vid, pid });
        }
      }
      
      if (dev.Class === 'CDROM' || dev.Class === 'USB') {
        console.log('    ⚠️  Wrong driver! Should be "Ports" class');
      } else if (dev.Class === 'Ports') {
        console.log('    ✅ Correct driver installed');
      }
      
      console.log('');
    }
  });
  
  if (r503Candidates.length === 0) {
    console.log('\n❓ R503 device not clearly identified.\n');
    console.log('Manual check:');
    console.log('  1. Open Device Manager (Win + X)');
    console.log('  2. Look under "Other devices" or "Universal Serial Bus"');
    console.log('  3. Find device with exclamation mark or labeled "Finger"');
    console.log('  4. Right-click > Properties > Details > Hardware IDs');
    console.log('  5. Note the VID and PID values\n');
    process.exit(1);
  }
  
  console.log('═══════════════════════════════════════════\n');
  console.log('🔍 R503 Device Found!\n');
  
  const candidate = r503Candidates[0];
  const { vid, pid } = candidate;
  
  console.log(`Device: ${candidate.FriendlyName}`);
  console.log(`VID: ${vid}  PID: ${pid}`);
  console.log(`Current Class: ${candidate.Class}`);
  console.log(`Status: ${candidate.Status}\n`);
  
  if (candidate.Class === 'Ports') {
    console.log('✅ Device already configured correctly!\n');
    console.log('COM port should be available. Run:');
    console.log('  npm run detect:ports\n');
    process.exit(0);
  }
  
  console.log('📋 Recommended Actions:\n');
  
  if (vid.toUpperCase() === '1A86') {
    console.log('Driver needed: CH340/CH341 USB Serial');
    console.log('\nAutomatic installation:');
    console.log('  npm run setup:r503\n');
    console.log('Or download manually:');
    console.log('  http://www.wch-ic.com/downloads/CH341SER_EXE.html\n');
  } else if (vid.toUpperCase() === '0403') {
    console.log('Driver needed: FTDI VCP Driver');
    console.log('\nAutomatic installation:');
    console.log('  npm run setup:drivers\n');
    console.log('Or download manually:');
    console.log('  https://ftdichip.com/drivers/vcp-drivers/\n');
  } else {
    console.log(`Unknown chipset (VID: ${vid})`);
    console.log('\nSearch online for:');
    console.log(`  "USB VID_${vid} PID_${pid} driver download"\n`);
  }
  
  console.log('After driver installation:');
  console.log('  1. Disconnect and reconnect R503');
  console.log('  2. Run: npm run detect:ports');
  console.log('  3. Device should appear as COM port\n');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
