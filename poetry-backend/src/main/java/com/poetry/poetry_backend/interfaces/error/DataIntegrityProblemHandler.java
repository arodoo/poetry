/*
 * File: DataIntegrityProblemHandler.java
 * Purpose: Handles database constraint violations and converts them to
 * user-friendly RFC7807 error responses. Extracts constraint names to
 * return specific messages like 'username already exists'.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.error;

import java.net.URI;

import org.springframework.core.annotation.Order;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Order(1)
public class DataIntegrityProblemHandler {
    private static final URI TYPE = URI.create(
            "https://datatracker.ietf.org/doc/html/rfc7807");

    @ExceptionHandler(DataIntegrityViolationException.class)
    ProblemDetail onDataIntegrity(DataIntegrityViolationException ex) {
        String message = ex.getMostSpecificCause().getMessage();
        String field = extractField(message);
        var pd = ProblemDetail.forStatus(HttpStatus.CONFLICT);
        pd.setTitle("error.duplicate");
        pd.setDetail(field != null ? "error." + field + ".exists" : message);
        pd.setType(TYPE);
        return pd;
    }

    private String extractField(String message) {
        if (message == null)
            return null;
        String lower = message.toLowerCase();
        if (lower.contains("username"))
            return "username";
        if (lower.contains("email"))
            return "email";
        if (lower.contains("seller_codes_code"))
            return "sellerCode";
        if (lower.contains("code"))
            return "code";
        return null;
    }
}
