/*
 File: AppConfigComposition.java
 Purpose: Composition root for application configuration wiring. This
 class provides beans and adapters that configure HTTP clients, retry
 policies and application configuration binding for the backend. It
 keeps wiring explicit and isolated from business logic to respect
 separation of concerns and make testing wiring simpler.
 All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.app;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.retry.backoff.FixedBackOffPolicy;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.web.client.RestClient;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;
import com.poetry.poetry_backend.application.common.http.NonRetryableException;
import com.poetry.poetry_backend.infrastructure.config.AppConfigAdapter;
import com.poetry.poetry_backend.infrastructure.config.AppProperties;

@Configuration
@EnableConfigurationProperties(AppProperties.class)
public class AppConfigComposition {
  // Dedicated for config wiring only.

  @Bean
  AppConfigPort appConfigPort(AppProperties props) {
    return new AppConfigAdapter(props);
  }

  @Bean
  ClientHttpRequestFactory httpRequestFactory(AppConfigPort cfg) {
    var f = new SimpleClientHttpRequestFactory();
    f.setConnectTimeout(cfg.httpConnectTimeoutMs());
    f.setReadTimeout(cfg.httpReadTimeoutMs());
    return f;
  }

  @Bean
  RestClient restClient(ClientHttpRequestFactory f) {
    return RestClient.builder().requestFactory(f).build();
  }

  @Bean
  RetryTemplate httpRetryTemplate(AppConfigPort cfg) {
    var t = new RetryTemplate();
    var map = new java.util.HashMap<Class<? extends Throwable>, Boolean>();
    map.put(NonRetryableException.class, Boolean.FALSE);
    var p = new SimpleRetryPolicy(cfg.httpRetryMaxAttempts(), map, true);
    var b = new FixedBackOffPolicy();
    b.setBackOffPeriod(cfg.httpRetryBackoffMs());
    t.setRetryPolicy(p);
    t.setBackOffPolicy(b);
    return t;
  }
}
