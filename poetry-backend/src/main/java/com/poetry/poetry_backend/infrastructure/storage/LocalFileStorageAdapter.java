/*
 * File: LocalFileStorageAdapter.java
 * Purpose: File storage adapter that persists uploaded files to the local
 * filesystem. Generates unique filenames using UUID to prevent collisions
 * and creates the upload directory on first use. Implements the file
 * storage port for carousel media management.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.storage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import com.poetry.poetry_backend.application.carousel.port.FileStoragePort;

public class LocalFileStorageAdapter implements FileStoragePort {
    private final Path uploadDir;

    public LocalFileStorageAdapter(Path uploadDir) {
        this.uploadDir = uploadDir;
    }

    @Override
    public String store(byte[] data, String originalName) {
        try {
            Files.createDirectories(uploadDir);
            String ext = extractExtension(originalName);
            String filename = UUID.randomUUID() + ext;
            Files.write(uploadDir.resolve(filename), data);
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("file.storage.write.failed", e);
        }
    }

    @Override
    public void delete(String filename) {
        try {
            Files.deleteIfExists(uploadDir.resolve(filename));
        } catch (IOException e) {
            throw new RuntimeException("file.storage.delete.failed", e);
        }
    }

    @Override
    public Path resolve(String filename) {
        return uploadDir.resolve(filename);
    }

    private String extractExtension(String name) {
        int dot = name.lastIndexOf('.');
        return dot >= 0 ? name.substring(dot) : "";
    }
}
