/*
 * File: docs-generator/content/anexos/a.2_codigo_fuente.md
 * Purpose: Source code for thesis annexes.
 * All Rights Reserved Arodi Emmanuel
 */

# A.2 Código Fuente Relevante

A continuación se exponen extractos representativos del código desarrollado para el "Sistema Poetry", evidenciando la adopción de los principios de diseño orientado a dominio (DDD) y arquitectura limpia.

## A.2.1 Entidad de Dominio: Member

El núcleo del negocio encapsula sus reglas intrínsecas, careciendo de dependencias hacia componentes de infraestructura o marcos de trabajo externos (frameworks).

```java
package com.poetry.domain.entities;
import java.util.UUID;
public class Member {
    private final UUID id;
    private final String fullName;
    private final String fingerprintId;
    private MemberStatus status;
    public Member(UUID id, String fullName, String fingerprintId) {
        this.id = id;
        this.fullName = fullName;
        this.fingerprintId = fingerprintId;
        this.status = MemberStatus.INACTIVE;
    }
    public void activate() {
        this.status = MemberStatus.ACTIVE;
    }
    public boolean isActive() {
        return this.status == MemberStatus.ACTIVE;
    }
}
```

## A.2.2 Caso de Uso: ProcessAccessUseCase

El orquestador de la capa de aplicación coordina la recuperación de la identidad y la verificación algorítmica, interactuando exclusivamente con abstracciones (puertos).

```java
package com.poetry.application.usecases;
import com.poetry.domain.entities.Member;
import com.poetry.domain.ports.MemberRepository;
import java.util.Optional;
public class ProcessAccessUseCase {
    private final MemberRepository repository;
    public ProcessAccessUseCase(MemberRepository repository) {
        this.repository = repository;
    }
    public AccessStatus execute(String biometricHash) {
        Optional<Member> memberOpt = repository.findByFingerprint(biometricHash);
        if (memberOpt.isEmpty()) {
            return AccessStatus.DENIED_UNREGISTERED;
        }
        Member member = memberOpt.get();
        if (!member.isActive()) {
            return AccessStatus.DENIED_INACTIVE;
        }
        return AccessStatus.GRANTED;
    }
}
```
