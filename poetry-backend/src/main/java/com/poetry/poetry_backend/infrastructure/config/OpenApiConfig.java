/*
 * File: OpenApiConfig.java
 * Purpose: Configuration for springdoc OpenAPI documentation
 * generation from controller annotations.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenApiConfig {

  @Bean
  public OpenAPI poetryOpenAPI() {
    String securitySchemeName = "bearerAuth";
    return new OpenAPI()
      .info(
        new Info()
          .title("Poetry API")
          .version("1.0.0")
          .license(new License().name("Proprietary"))
      )
      .addSecurityItem(
        new SecurityRequirement().addList(securitySchemeName)
      )
      .components(
        new Components()
          .addSecuritySchemes(
            securitySchemeName,
            new SecurityScheme()
              .type(SecurityScheme.Type.HTTP)
              .scheme("bearer")
              .bearerFormat("JWT")
          )
      );
  }
}
