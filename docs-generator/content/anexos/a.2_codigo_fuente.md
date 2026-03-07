/*
 * File: docs-generator/content/anexos/a.2_codigo_fuente.md
 * Purpose: Source code appendix for thesis. Shows real production code
 *          demonstrating DDD, Clean Architecture and SOLID principles.
 * All Rights Reserved Arodi Emmanuel
 */

# A.2 Código Fuente Relevante

Se presentan extractos del código de producción de Poetry, seleccionados por su representatividad arquitectónica. Cada bloque ilustra un principio de diseño distinto, desde la capa de dominio hasta la capa de interfaces.

## A.2.1 Dominio: Entidad de Suscripción

El siguiente `record` inmutable de Java modeliza el aggregate `Subscription`. Al ser un tipo de valor sin setters, su estado solo puede cambiar si se construye un nuevo objeto —garantizando la consistencia del dominio por compilación, no por convención.

```java
package com.poetry.poetry_backend.domain.subscription.model;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;
public record Subscription(
    Long id, String name, String description,
    BigDecimal price, String currency, Integer durationDays,
    Set<String> features, String status,
    Instant createdAt, Instant updatedAt, Instant deletedAt,
    long version) {
  public boolean isDeleted() {
    return deletedAt != null;
  }
}
```

## A.2.2 Aplicación: Puerto de Consulta Biométrica

La interfaz `FingerprintQueryPort` define el contrato de lectura que el dominio y la aplicación esperan. Ninguna clase fuera de infraestructura conoce su implementación concreta — la Regla de Dependencia de Clean Architecture en acción.

```java
package com.poetry.poetry_backend.application.fingerprint.port;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
public interface FingerprintQueryPort {
  Optional<Fingerprint> findById(Long id);
  List<Fingerprint> findAll();
  List<Fingerprint> findByUserId(Long userId);
  List<Fingerprint> findActiveByUserId(Long userId);
  boolean existsByUserId(Long userId);
  List<Fingerprint> findInactiveOlderThan(Instant cutoff, int limit);
  List<Fingerprint> findActiveWithFmd();
}
```

## A.2.3 Aplicación: Caso de Uso de Verificación Dactilar

`VerifyFingerprintUseCase` orquestra la verificación biométrica. Recupera los candidatos activos, itera comparando una puntuación de disimilitud binaria (ANSI 378-2004), y declara un match si el mejor puntaje cae bajo el umbral estático `MATCH_THRESHOLD = 21474`.

```java
package com.poetry.poetry_backend.application.fingerprint.usecase;
import com.poetry.poetry_backend.application.fingerprint.port.*;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
public class VerifyFingerprintUseCase {
  private static final int MATCH_THRESHOLD = 21474;
  private final FingerprintQueryPort queryPort;
  private final HidCapturePort capturePort;
  public VerifyFingerprintUseCase(
      FingerprintQueryPort queryPort, HidCapturePort capturePort) {
    this.queryPort = queryPort;
    this.capturePort = capturePort;
  }
  public VerifyFingerprintResult execute(String fmd) {
    if (fmd == null || fmd.isBlank()) return VerifyFingerprintResult.failure();
    var candidates = queryPort.findActiveWithFmd();
    Fingerprint bestMatch = null;
    int bestScore = Integer.MAX_VALUE;
    for (Fingerprint candidate : candidates) {
      if (candidate.fmd() == null) continue;
      int score = capturePort.compare(fmd, candidate.fmd());
      if (score < bestScore) { bestScore = score; bestMatch = candidate; }
    }
    if (bestMatch != null && bestScore <= MATCH_THRESHOLD)
      return VerifyFingerprintResult.success(bestMatch.userId(), bestMatch.id());
    return VerifyFingerprintResult.failure();
  }
}
```

## A.2.4 Interfaces: Controlador REST de Verificación

`FingerprintsVerifyController` expone el endpoint `POST /api/v1/fingerprints/verify`. Únicamente delega al caso de uso y mapea el resultado al DTO de respuesta. No posee lógica de negocio —respondes la Regla de Responsabilidad Única del principio SRP.

```java
package com.poetry.poetry_backend.interfaces.v1.fingerprint;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.poetry.poetry_backend.application.fingerprint.usecase.*;
import com.poetry.poetry_backend.interfaces.v1.fingerprint.dto.FingerprintDto;
@RestController
@RequestMapping("/api/v1/fingerprints")
public class FingerprintsVerifyController {
  private final VerifyFingerprintUseCase verifyUseCase;
  public FingerprintsVerifyController(VerifyFingerprintUseCase verifyUseCase) {
    this.verifyUseCase = verifyUseCase;
  }
  @PostMapping("/verify")
  public ResponseEntity<FingerprintDto.VerifyResponse> verify(
      @RequestBody FingerprintDto.VerifyRequest request) {
    VerifyFingerprintResult result = verifyUseCase.execute(request.fmd());
    var response = new FingerprintDto.VerifyResponse(
        result.matched(), result.userId(), result.fingerprintId(), result.message());
    return ResponseEntity.ok(response);
  }
}
```

## A.2.5 Dominio: Resultado de Verificación como Value Object

`VerifyFingerprintResult` encapsula el resultado de la operación biométrica como un objeto de valor inmutable. El patrón `static factory method` ( `success()` / `failure()`) impide la construcción de estados incoherentes, reforzando la invarianza del aggregate.

```java
package com.poetry.poetry_backend.application.fingerprint.usecase;
public record VerifyFingerprintResult(
    boolean matched, Long userId, Long fingerprintId, String message) {
  public static VerifyFingerprintResult success(Long userId, Long fpId) {
    return new VerifyFingerprintResult(true, userId, fpId, "ACCESS_GRANTED");
  }
  public static VerifyFingerprintResult failure() {
    return new VerifyFingerprintResult(false, null, null, "ACCESS_DENIED");
  }
}
```

## A.2.6 Infraestructura: Seguridad y RBAC con Spring Security

El filtro JWT valida el token en cada solicitud y delega la autorización al contexto de seguridad de Spring. La lógica de roles (RBAC) se declara como anotaciones `@PreAuthorize` en los controladores, manteniendo la infraestructura de seguridad separada del dominio.

```java
package com.poetry.poetry_backend.infrastructure.security;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;
  public JwtAuthenticationFilter(JwtService jwtService,
      UserDetailsService userDetailsService) {
    this.jwtService = jwtService;
    this.userDetailsService = userDetailsService;
  }
  @Override
  protected void doFilterInternal(HttpServletRequest req,
      HttpServletResponse res, FilterChain chain) throws Exception {
    String header = req.getHeader("Authorization");
    if (header == null || !header.startsWith("Bearer ")) {
      chain.doFilter(req, res); return;
    }
    String token = header.substring(7);
    String username = jwtService.extractUsername(token);
    if (username != null &&
        SecurityContextHolder.getContext().getAuthentication() == null) {
      var user = userDetailsService.loadUserByUsername(username);
      if (jwtService.isTokenValid(token, user)) {
        var auth = new UsernamePasswordAuthenticationToken(
            user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
      }
    }
    chain.doFilter(req, res);
  }
}
```

## A.2.7 Aplicación: Consulta de Dashboard con Proyecciones

El siguiente caso de uso agrega métricas para el cuadro de mando del academy. Usa proyecciones JPA nativas para evitar cargar entidades completas cuando solo se necesitan conteos — una optimización de N+1 evitada por diseño.

```java
package com.poetry.poetry_backend.application.dashboard;
import com.poetry.poetry_backend.domain.dashboard.DashboardSummary;
public class GetDashboardSummaryUseCase {
  private final DashboardProjectionPort projectionPort;
  public GetDashboardSummaryUseCase(DashboardProjectionPort port) {
    this.projectionPort = port;
  }
  public DashboardSummary execute() {
    long activeMembers = projectionPort.countActiveMembers();
    long expiringThisMonth = projectionPort.countExpiringThisMonth();
    long accessesToday = projectionPort.countAccessesToday();
    long pendingRenewals = projectionPort.countPendingRenewals();
    return new DashboardSummary(
        activeMembers, expiringThisMonth, accessesToday, pendingRenewals);
  }
}
```
