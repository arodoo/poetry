/*
 * File: HidCapturePort.java
 * Purpose: Port interface for HID Digital Persona fingerprint operations.
 * Defines contract for capture, comparison, and reader status.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

/**
 * Port for fingerprint operations via HID U.are.U SDK.
 */
public interface HidCapturePort {

    /**
     * Captures fingerprint and returns FMD as Base64.
     *
     * @param timeoutMs maximum wait time in milliseconds
     * @return captured FMD as Base64 string
     * @throws HidCaptureException if capture fails
     */
    String capture(int timeoutMs) throws HidCaptureException;

    /**
     * Compares two FMDs and returns match score.
     *
     * @param probeFmd  captured FMD as Base64
     * @param storedFmd enrolled FMD as Base64
     * @return match score (0-100000), higher is better
     * @throws HidCaptureException if comparison fails
     */
    int compare(String probeFmd, String storedFmd) throws HidCaptureException;

    /**
     * Checks if the reader is connected.
     *
     * @return true if reader is available
     */
    boolean isReaderConnected();

    /**
     * Gets current reader status.
     *
     * @return reader status information
     */
    HidReaderStatus getReaderStatus();
}
