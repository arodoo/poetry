/*
 File: AuthComposition.java
 Purpose: Composition root for authentication related wiring and beans.
 This class exposes beans and adapters necessary to connect the
 authentication application ports with infrastructure implementations.
 Keeping composition isolated helps maintain clear dependency direction
 and simplifies testing of authentication flows. Extended with hashing,
 token generation, clock, audit, rate limiting and properties beans.
 All Rights Reserved. Arodi Emmanuel
*/

package com.poetry.poetry_backend.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(AuthProperties.class)
public class AuthComposition { }
