/*
 * File: ZonesPagedListController.java
 * Purpose: Placeholder paged-list controller for zone endpoints. Delegates
 * to the main `ZoneController` implementation while keeping legacy route
 * compatibility.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "zones")
@RestController
@RequestMapping("/api/v1/zones")
public class ZonesPagedListController {
	// Placeholder - delegates to ZoneController
}
