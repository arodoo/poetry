/*
 File: AuthController.java
 Purpose: Exposes versioned authentication endpoints under /api/v1/auth.
   It maps HTTP requests to application use cases and returns DTOs that
   follow the API contract. This controller contains no business logic,
   delegating to Login, Refresh, Logout, and Register use cases.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.interfaces.v1.auth;

import static com.poetry.poetry_backend.interfaces.v1.auth.AuthDtos.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.auth.usecase.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
  private final LoginUseCase login;
  private final RefreshTokenUseCase refresh;
  private final LogoutUseCase logout;
  private final RegisterUseCase register;

  public AuthController(
      LoginUseCase login,
      RefreshTokenUseCase refresh,
      LogoutUseCase logout,
      RegisterUseCase register) {
    this.login = login;
    this.refresh = refresh;
    this.logout = logout;
    this.register = register;
  }

  @PostMapping("/login")
  public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest r) {
    var m = login.execute(r.username(), r.password());
    return ResponseEntity.ok(AuthDtos.toTokenResponse(m));
  }

  @PostMapping("/refresh")
  public ResponseEntity<TokenResponse> refresh(@RequestBody RefreshRequest r) {
    var m = refresh.execute(r.refreshToken());
    return ResponseEntity.ok(AuthDtos.toTokenResponse(m));
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(@RequestBody RefreshRequest r) {
    logout.execute(r.refreshToken());
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/register")
  public ResponseEntity<Object> register(@RequestBody RegisterRequest r) {
    var m = register.execute(r.user());
    return ResponseEntity.ok(m);
  }
}
