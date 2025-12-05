/*
 * File: FingerprintsPagedListController.java
 * Purpose: Placeholder for paged fingerprint listing. Fingerprint
 * enumeration not required per security requirements, use list endpoint.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.crud;

import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "fingerprints")
@RestController
@RequestMapping("/api/v1/fingerprints")
public class FingerprintsPagedListController {
}
