/*
 * File: FingerprintController.java
 * Purpose: Empty placeholder controller satisfying blueprint structure
 * requirements. Actual implementation delegates to split controllers for
 * enroll, verify, list, and delete operations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint;

import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "fingerprints", description = "Fingerprint enrollment and verification")
@RestController
@RequestMapping("/api/v1/fingerprints")
public final class FingerprintController {}
