/*
 * File: FileStoragePort.java
 * Purpose: Abstracts file storage operations for carousel media uploads.
 * Allows the application layer to store and delete files without coupling
 * to a specific filesystem or cloud storage implementation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.carousel.port;

import java.nio.file.Path;

public interface FileStoragePort {
    String store(byte[] data, String originalName);
    void delete(String filename);
    Path resolve(String filename);
}
