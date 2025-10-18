/*
 * File: EventComposition.java
 * Purpose: Composition root for Events domain. Wires all use cases with ports.
 * Enables dependency injection via Spring @Configuration.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.events;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.events.port.EventCommandPort;
import com.poetry.poetry_backend.application.events.port.EventQueryPort;
import com.poetry.poetry_backend.application.events.usecase.*;

@Configuration
public class EventComposition {
  @Bean
  public CreateEventUseCase createEventUseCase(EventCommandPort commandPort) {
    return new CreateEventUseCase(commandPort);
  }

  @Bean
  public GetEventByIdUseCase getEventByIdUseCase(EventQueryPort queryPort) {
    return new GetEventByIdUseCase(queryPort);
  }

  @Bean
  public GetAllEventsUseCase getAllEventsUseCase(EventQueryPort queryPort) {
    return new GetAllEventsUseCase(queryPort);
  }

  @Bean
  public GetNearbyEventsUseCase getNearbyEventsUseCase(EventQueryPort queryPort) {
    return new GetNearbyEventsUseCase(queryPort);
  }

  @Bean
  public UpdateEventUseCase updateEventUseCase(
      EventQueryPort queryPort, EventCommandPort commandPort) {
    return new UpdateEventUseCase(queryPort, commandPort);
  }

  @Bean
  public DeleteEventUseCase deleteEventUseCase(
      EventQueryPort queryPort, EventCommandPort commandPort) {
    return new DeleteEventUseCase(queryPort, commandPort);
  }
}
