/*
 * File: SubscriptionModelSmokeTest.java
 * Purpose: Confirm SubscriptionRehydrator class exists and is accessible.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.subscription.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class SubscriptionModelSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.subscription.model.SubscriptionRehydrator");
        assertNotNull(cls);
        assertTrue(cls.getDeclaredConstructors().length >= 0);
    }
}
