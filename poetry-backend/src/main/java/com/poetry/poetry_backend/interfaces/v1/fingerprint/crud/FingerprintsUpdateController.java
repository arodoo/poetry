/*
 * File: FingerprintsUpdateController.java
 * Purpose: Placeholder controller for fingerprint updates. Fingerprints
 * are immutable per security policy, use delete and re-enroll workflow.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.crud;

import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "fingerprints")
@RestController
@RequestMapping("/api/v1/fingerprints")
public class FingerprintsUpdateController {
}
