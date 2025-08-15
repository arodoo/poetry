/*
 File: GlobalProblemHandler.java
 Purpose: Global RFC 7807 ProblemDetail exception handling.
 All Rights Reserved. Emmanuel
*/
package com.poetry.poetry_backend.interfaces.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalProblemHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ProblemDetail onValidation(MethodArgumentNotValidException ex) {
        ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        pd.setTitle("Validation failed");
        Map<String, String> errors = new HashMap<>();
        for (var err : ex.getBindingResult().getAllErrors()) {
            String field = err instanceof FieldError fe ? fe.getField() : err.getObjectName();
            errors.put(field, err.getDefaultMessage());
        }
        pd.setProperty("errors", errors);
        pd.setType(URI.create("https://datatracker.ietf.org/doc/html/rfc7807"));
        return pd;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    ProblemDetail onIllegalArgument(IllegalArgumentException ex) {
        ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        pd.setTitle("Invalid argument");
        pd.setDetail(ex.getMessage());
        pd.setType(URI.create("https://datatracker.ietf.org/doc/html/rfc7807"));
        return pd;
    }

    @ExceptionHandler(RuntimeException.class)
    ProblemDetail onGeneric(RuntimeException ex) {
        ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        pd.setTitle("Unexpected error");
        pd.setDetail("Please contact support with the correlation id.");
        pd.setType(URI.create("https://datatracker.ietf.org/doc/html/rfc7807"));
        return pd;
    }
}
