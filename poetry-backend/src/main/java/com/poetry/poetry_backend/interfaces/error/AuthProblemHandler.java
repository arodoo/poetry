/*
 * File: AuthProblemHandler.java
 * Purpose: Maps authentication domain exceptions to RFC7807 problem
 * details with stable machine-readable error codes. Split out from
 * GlobalProblemHandler for file size compliance. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.error;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.poetry.poetry_backend.application.auth.exception.*;

@ControllerAdvice
class AuthProblemHandler {
  private static final URI TYPE = URI.create(
      "https://datatracker.ietf.org/doc/html/rfc7807");

  @ExceptionHandler(InvalidCredentialsException.class)
  ProblemDetail invalidCreds(InvalidCredentialsException ex) {
    return authProblem(HttpStatus.UNAUTHORIZED, "auth.invalid_credentials");
  }

  @ExceptionHandler(InvalidRefreshTokenException.class)
  ProblemDetail invalidRefresh(InvalidRefreshTokenException ex) {
    return authProblem(HttpStatus.UNAUTHORIZED, "auth.invalid_refresh_token");
  }

  @ExceptionHandler(DuplicateUserException.class)
  ProblemDetail duplicate(DuplicateUserException ex) {
    return authProblem(HttpStatus.CONFLICT, "auth.duplicate_user");
  }

  private ProblemDetail authProblem(HttpStatus status, String code) {
    var pd = ProblemDetail.forStatus(status);
    pd.setTitle("auth.error.generic");
    pd.setDetail("auth.error.unauthorized");
    pd.setProperty("code", code);
    pd.setType(TYPE);
    return pd;
  }

  @ExceptionHandler(RateLimitExceededException.class)
  ProblemDetail rateLimit(RateLimitExceededException ex) {
    var pd = authProblem(
        HttpStatus.TOO_MANY_REQUESTS, "rate_limit.exceeded");
    pd.setDetail("auth.rate.limit");
    return pd;
  }

  @ExceptionHandler(AccountLockedException.class)
  ProblemDetail locked(AccountLockedException ex) {
    var pd = authProblem(HttpStatus.LOCKED, "auth.account_locked");
    pd.setDetail("auth.account.locked");
    return pd;
  }

  @ExceptionHandler(PasswordPolicyViolationException.class)
  ProblemDetail passwordViolation(PasswordPolicyViolationException ex) {
    var pd = authProblem(HttpStatus.BAD_REQUEST, "auth.password_policy");
    pd.setDetail(ex.getMessage());
    return pd;
  }
}
