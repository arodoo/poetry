/*
 * File: EventsComposition.java
 * Purpose: Composition root for Events domain. Wires all use cases with ports.
 * Enables dependency injection via Spring @Configuration.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.events;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.events.port.EventsCommandPort;
import com.poetry.poetry_backend.application.events.port.EventsQueryPort;
import com.poetry.poetry_backend.application.events.usecase.*;

@Configuration
public class EventsComposition {
  @Bean
  public CreateEventUseCase createEventUseCase(EventsCommandPort commandPort) {
    return new CreateEventUseCase(commandPort);
  }

  @Bean
  public GetEventByIdUseCase getEventByIdUseCase(EventsQueryPort queryPort) {
    return new GetEventByIdUseCase(queryPort);
  }

  @Bean
  public GetAllEventsUseCase getAllEventsUseCase(EventsQueryPort queryPort) {
    return new GetAllEventsUseCase(queryPort);
  }

  @Bean
  public GetNearbyEventsUseCase getNearbyEventsUseCase(EventsQueryPort queryPort) {
    return new GetNearbyEventsUseCase(queryPort);
  }

  @Bean
  public UpdateEventUseCase updateEventUseCase(
      EventsQueryPort queryPort, EventsCommandPort commandPort) {
    return new UpdateEventUseCase(queryPort, commandPort);
  }

  @Bean
  public DeleteEventUseCase deleteEventUseCase(
      EventsQueryPort queryPort, EventsCommandPort commandPort) {
    return new DeleteEventUseCase(queryPort, commandPort);
  }
}
