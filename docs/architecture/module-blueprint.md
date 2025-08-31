/_ File: module-blueprint.md Purpose: Human-readable backend feature file/folder
structure blueprint. For automated validation see module-blueprint.json
(canonical, structure-only) For example check User implementation. All Rights
Reserved. _/

# Backend Feature Module Structure (Structure-Only)

This document describes ONLY the required file & folder layout for a backend
feature module. All semantic concerns (headers, line limits, naming, i18n,
ETag/Idempotency, OpenAPI validation, etc.) are enforced by dedicated CI scripts
(see tools/ci). Canonical machine-readable source:
`docs/architecture/module-blueprint.json`.

Each listed file is REQUIRED unless marked optional. Filenames use the singular
PascalCase base (Feature) auto‑pluralized where noted.

## 1. Folder Tree (replace <feature>)

```
poetry-backend/src/main/java/com/poetry/poetry_backend/domain/<feature>/
  model/Feature.java                (aggregate root)
  model/value/*                     (value objects, optional)
poetry-backend/src/main/java/com/poetry/poetry_backend/application/<feature>/
  port/FeatureQueryPort.java
  port/FeatureCommandPort.java
  usecase/GetAllFeaturesUseCase.java
  usecase/GetFeatureByIdUseCase.java
  usecase/CreateFeatureUseCase.java
  usecase/UpdateFeatureUseCase.java
  usecase/DeleteFeatureUseCase.java
poetry-backend/src/main/java/com/poetry/poetry_backend/infrastructure/jpa/<feature>/
  FeatureEntity.java
  FeatureJpaRepository.java
  FeatureJpaMapper.java
  FeatureJpaAdapter.java
poetry-backend/src/main/java/com/poetry/poetry_backend/infrastructure/memory/<feature>/ (optional)
  InMemoryFeatureAdapter.java
  InMemoryFeatureStore.java
  InMemoryFeatureFactory.java
poetry-backend/src/main/java/com/poetry/poetry_backend/interfaces/v1/<feature>/
  FeatureController.java
  FeatureDtos.java
poetry-backend/src/main/java/com/poetry/poetry_backend/config/<feature>/
  FeatureComposition.java

# Documentation & OpenAPI
/docs/domains/<feature>.md
/docs/api/openapi/paths/<feature>-*.yaml

# Tests (one per file below)
poetry-backend/src/test/java/com/poetry/poetry_backend/domain/<feature>/model/FeatureTest.java
poetry-backend/src/test/java/com/poetry/poetry_backend/application/<feature>/usecase/CreateFeatureUseCaseTest.java
poetry-backend/src/test/java/com/poetry/poetry_backend/application/<feature>/usecase/GetAllFeaturesUseCaseTest.java
poetry-backend/src/test/java/com/poetry/poetry_backend/application/<feature>/usecase/GetFeatureByIdUseCaseTest.java
poetry-backend/src/test/java/com/poetry/poetry_backend/application/<feature>/usecase/UpdateFeatureUseCaseTest.java
poetry-backend/src/test/java/com/poetry/poetry_backend/application/<feature>/usecase/DeleteFeatureUseCaseTest.java
poetry-backend/src/test/java/com/poetry/poetry_backend/interfaces/v1/<feature>/FeatureControllerTest.java
```

## 2. Scope

The checker validates ONLY existence of the paths above (plus optional files
when present). Adjust the JSON to evolve structure; avoid embedding semantic
rules here to prevent duplication across CI tasks.

(End)
