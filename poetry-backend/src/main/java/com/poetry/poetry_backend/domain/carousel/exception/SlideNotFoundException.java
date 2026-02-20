/*
 * File: SlideNotFoundException.java
 * Purpose: Domain exception thrown when a carousel slide cannot be found
 * by its identifier. Ensures consistent error semantics across the
 * application layer without leaking infrastructure details.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.carousel.exception;

public class SlideNotFoundException extends RuntimeException {
    public SlideNotFoundException(Long id) {
        super("error.notfound.carousel.slide");
    }
}
