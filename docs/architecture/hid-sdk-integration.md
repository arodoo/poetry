# HID Digital Persona SDK Integration

## Overview

This document describes the integration of the HID Digital Persona U.are.U SDK
for fingerprint capture in the backend.

## SDK Location

```
C:\Program Files\DigitalPersona\U.are.U RTE\Windows\
├── Bin\           # Native DLLs (dpfpdd.dll, dpfj.dll, etc.)
└── Lib\
    └── Java\
        └── dpuareu.jar   # Java API JAR
```

## System Requirements

- Windows 7/8.1/10/11 (64-bit)
- JRE/JDK 1.7 or 1.8 (Oracle JRE 1.8.0_51 or earlier for U.are.U 4500)
- USB port for fingerprint reader

## Installation

1. Run `sdk\UareU\SDK\x64\setup.exe` as Administrator
2. Follow the installation wizard
3. Connect U.are.U 4500 reader via USB

## Maven Configuration

Add the local JAR to your Maven project:

```xml
<dependency>
    <groupId>com.digitalpersona</groupId>
    <artifactId>dpuareu</artifactId>
    <version>3.2.0</version>
    <scope>system</scope>
    <systemPath>C:/Program Files/DigitalPersona/U.are.U RTE/Windows/Lib/Java/dpuareu.jar</systemPath>
</dependency>
```

Or install locally:

```bash
mvn install:install-file \
  -Dfile="C:\Program Files\DigitalPersona\U.are.U RTE\Windows\Lib\Java\dpuareu.jar" \
  -DgroupId=com.digitalpersona \
  -DartifactId=dpuareu \
  -Dversion=3.2.0 \
  -Dpackaging=jar
```

## JNI Native Library Path

The Java application must find the native DLLs. Configure in `application.yml`:

```yaml
hid:
  sdk:
    native-path: "C:/Program Files/DigitalPersona/Bin"
```

Or set JVM argument:
```
-Djava.library.path="C:\Program Files\DigitalPersona\Bin"
```

## Key Classes

| Class | Purpose |
|-------|---------|
| `UareUGlobal` | SDK initialization |
| `Reader` | Individual reader device |
| `ReaderCollection` | Enumerate connected readers |
| `Fmd` | Fingerprint Minutiae Data |
| `Engine` | Comparison/identification |

## Basic Capture Flow

```java
// 1. Initialize SDK
UareUGlobal.Initialize();

// 2. Get reader collection
ReaderCollection readers = UareUGlobal.GetReaderCollection();
readers.GetReaders();

// 3. Open first reader
Reader reader = readers.get(0);
reader.Open(Reader.Priority.EXCLUSIVE);

// 4. Capture fingerprint
Reader.CaptureResult result = reader.Capture(
    Fmd.Format.ANSI_378_2004,
    Reader.ImageProcessing.IMG_PROC_DEFAULT,
    30000, // timeout ms
    -1     // no cancel
);

// 5. Get FMD
if (result.quality == Reader.CaptureQuality.GOOD) {
    Fmd fmd = result.fmd;
    String base64 = Base64.getEncoder().encodeToString(fmd.getData());
}

// 6. Cleanup
reader.Close();
UareUGlobal.Destroy();
```

## Known Issues

- **JRE 1.8.0_60+**: U.are.U 4500 does not work with Oracle JDK 1.8.0_60+ on
  Windows 10. Use JDK 1.8.0_51 or earlier.
- **WBF Driver**: When using Windows Biometric Framework driver, disconnect/
  reconnect may require reboot.

## Reader Models Supported

- U.are.U 4500 (optical)
- U.are.U 5100 (optical)
- U.are.U 5300 (optical, with PAD)

## References

- SDK Documentation: `sdk\UareU\Docs\`
- Developer Portal: https://devportal.digitalpersona.com

All Rights Reserved. Arodi Emmanuel
