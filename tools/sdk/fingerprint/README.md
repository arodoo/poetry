# R503Pro Fingerprint SDK

SDK for GROW R503Pro USB fingerprint module integration.

## Contents

```
lib/
├── FMBioFpr.dll    # Main SDK DLL (x64)
└── libFpr.h        # C API header
```

## Device Specifications

- **Model**: R503Pro-USB
- **VID**: 4612
- **PID**: 04B4
- **Interface**: USB (proprietary protocol)
- **Capacity**: 1500 fingerprints
- **Resolution**: 192x192 pixels @ 508dpi

## SDK Source

Downloaded from GROW official website:
- URL: https://www.hzgrow.com/Download.html
- Package: 指纹系列开发资料 (Fingerprint Development Materials)
- Version: FMBioFpr_Win_V2.1.1_Build[20200608]

## API Quick Reference

```c
// Open device (USB auto-detect)
int FMAutoOpen(HANDLE* pHandle, int *type, int nAddr, UINT uPwd, int bVfy);

// Capture fingerprint image
int FMGetImage(HANDLE hHandle, int nAddr);

// Generate feature from image
int FMGenChar(HANDLE hHandle, int nAddr, int iBufferID);

// Search fingerprint in database
int FMSearch(HANDLE hHandle, int nAddr, int iBufferID, 
             int iStartPage, int iPageNum, int *iMbAddress, int *iscore);

// Store fingerprint template
int FMStoreChar(HANDLE hHandle, int nAddr, int iBufferID, int iPageID);

// Control LED ring
int FMAuraLedCtl(HANDLE hHandle, int nAddr, 
                 unsigned char chCtlCode, unsigned char chSpeed, 
                 unsigned char chColor, unsigned char chTime);

// Close device
int FMCloseDeviceEx(HANDLE hHandle);
```

## Constants

```c
#define DEVICE_USB    0
#define DEVICE_COM    1
#define PS_OK         0x00
#define PS_NO_FINGER  0x02
#define PS_NOT_MATCH  0x08
```

## Local Development Setup

For local testing with full SDK (not tracked in git):

1. Download SDK from https://www.hzgrow.com/Download.html
2. Extract to `tools/sdk/fingerprint/` folder
3. Run demos from extracted folders

## License

SDK is property of Hangzhou Grow Technology Co., Ltd.
For commercial use, contact: zy@hzgrow.com
