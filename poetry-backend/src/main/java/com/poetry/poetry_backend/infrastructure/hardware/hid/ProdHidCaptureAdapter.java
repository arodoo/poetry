/*
 * File: ProdHidCaptureAdapter.java
 * Purpose: HID SDK adapter for U.are.U 4500 fingerprint capture and compare.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.hardware.hid;

import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.digitalpersona.uareu.*;
import com.poetry.poetry_backend.application.fingerprint.port.*;

import jakarta.annotation.PreDestroy;

@Component
public class ProdHidCaptureAdapter implements HidCapturePort {
    private static final Logger log = LoggerFactory.getLogger(
            ProdHidCaptureAdapter.class);
    private Reader reader;

    @PreDestroy
    public void destroy() {
        closeReader();
        try {
            UareUGlobal.DestroyReaderCollection();
        } catch (UareUException e) {
            log.warn("Cleanup error: {}", e.getMessage());
        }
    }

    @Override
    public synchronized String capture(int timeoutMs) throws HidCaptureException {
        try {
            openReader();
            Reader.CaptureResult result = reader.Capture(
                    Fid.Format.ANSI_381_2004,
                    Reader.ImageProcessing.IMG_PROC_DEFAULT,
                    reader.GetCapabilities().resolutions[0], timeoutMs);
            if (result.quality != Reader.CaptureQuality.GOOD) {
                throw new HidCaptureException(
                        HidCaptureException.HidErrorCode.UNKNOWN_ERROR,
                        "Poor quality: " + result.quality);
            }
            Fmd fmd = UareUGlobal.GetEngine().CreateFmd(
                    result.image, Fmd.Format.ANSI_378_2004);
            return Base64.getEncoder().encodeToString(fmd.getData());
        } catch (UareUException e) {
            log.error("Capture failed: {}", e.getMessage());
            throw mapException(e);
        }
    }

    @Override
    public int compare(String probeFmd, String storedFmd) throws HidCaptureException {
        try {
            byte[] probeBytes = decodeFmd(probeFmd);
            byte[] storedBytes = decodeFmd(storedFmd);
            log.debug("probe len={} stored len={}", probeBytes.length, storedBytes.length);
            Fmd probe = importFmd(probeBytes);
            Fmd stored = importFmd(storedBytes);
            return UareUGlobal.GetEngine().Compare(probe, 0, stored, 0);
        } catch (UareUException e) {
            log.error("Compare UareU error: {}", e.getMessage());
            throw mapException(e);
        } catch (Exception e) {
            log.error("Compare SDK error: {} - probe[{}] stored[{}]",
                    e.getMessage(), probeFmd.length(), storedFmd.length());
            throw new HidCaptureException(
                    HidCaptureException.HidErrorCode.UNKNOWN_ERROR, e.getMessage());
        }
    }

    private Fmd importFmd(byte[] bytes) throws UareUException {
        return UareUGlobal.GetImporter().ImportFmd(
                bytes, Fmd.Format.ANSI_378_2004, Fmd.Format.ANSI_378_2004);
    }

    private byte[] decodeFmd(String fmd) {
        String normalized = fmd.replace('-', '+').replace('_', '/');
        int pad = normalized.length() % 4;
        if (pad == 2) normalized += "==";
        else if (pad == 3) normalized += "=";
        return Base64.getDecoder().decode(normalized);
    }

    @Override
    public boolean isReaderConnected() {
        try {
            ReaderCollection readers = UareUGlobal.GetReaderCollection();
            readers.GetReaders();
            return !readers.isEmpty();
        } catch (UareUException e) {
            return false;
        }
    }

    @Override
    public HidReaderStatus getReaderStatus() {
        try {
            ReaderCollection readers = UareUGlobal.GetReaderCollection();
            readers.GetReaders();
            if (readers.isEmpty())
                return HidReaderStatus.disconnected();
            return HidReaderStatus.connected(
                    readers.get(0).GetDescription().name, "3.2.0");
        } catch (UareUException e) {
            return new HidReaderStatus(false, null, null, e.getMessage());
        }
    }

    private synchronized void openReader() throws HidCaptureException {
        try {
            if (reader != null)
                return;
            ReaderCollection readers = UareUGlobal.GetReaderCollection();
            readers.GetReaders();
            if (readers.isEmpty()) {
                throw new HidCaptureException(
                        HidCaptureException.HidErrorCode.READER_NOT_CONNECTED,
                        "No reader connected");
            }
            reader = readers.get(0);
            reader.Open(Reader.Priority.EXCLUSIVE);
            log.info("Opened reader: {}", reader.GetDescription().name);
        } catch (UareUException e) {
            throw mapException(e);
        }
    }

    private void closeReader() {
        if (reader == null)
            return;
        try {
            reader.Close();
        } catch (UareUException e) {
            log.warn("Close error: {}", e.getMessage());
        }
        reader = null;
    }

    private HidCaptureException mapException(UareUException e) {
        return new HidCaptureException(
                HidCaptureException.HidErrorCode.UNKNOWN_ERROR, e.getMessage());
    }
}
