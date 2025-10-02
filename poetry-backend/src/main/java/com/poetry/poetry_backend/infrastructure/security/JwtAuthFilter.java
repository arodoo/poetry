/*
 * File: JwtAuthFilter.java
 * Purpose: Populate SecurityContext from Bearer JWT access tokens.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.security;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.poetry.poetry_backend.config.auth.AuthProperties;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthFilter extends OncePerRequestFilter {
  private final SecretKey key;

  public JwtAuthFilter(AuthProperties props) {
    this.key = Keys.hmacShaKeyFor(props.getSecretKey().getBytes());
  }

  @Override
  protected void doFilterInternal(
    @NonNull HttpServletRequest req,
    @NonNull HttpServletResponse res,
    @NonNull FilterChain chain) throws ServletException, IOException {
    String h = req.getHeader("Authorization");
    if (h != null && h.startsWith("Bearer ")) {
      String token = h.substring(7);
      try {
        Claims c = Jwts.parserBuilder().setSigningKey(key)
          .build().parseClaimsJws(token).getBody();
        String sub = c.getSubject();
        if (sub != null && !sub.isBlank()) {
          @SuppressWarnings("unchecked")
          List<String> roles = c.get("roles", List.class);
          List<GrantedAuthority> authorities = roles == null ? List.of()
            : roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
          var auth = new UsernamePasswordAuthenticationToken(sub, null, authorities);
          SecurityContextHolder.getContext().setAuthentication(auth);
        }
      } catch (Exception _e) { /* ignore invalid tokens */ }
    }
    chain.doFilter(req, res);
  }
}
