/*
 * File: CarouselConfigEntity.java
 * Purpose: JPA entity for the singleton carousel configuration row.
 * Stores the auto-advance interval and optional overlay filename.
 * A single row with id=1 acts as the configuration aggregate root
 * in the database, simplifying reads and writes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.carousel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "carousel_config")
@Getter
@Setter
public class CarouselConfigEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer intervalMs = 5000;

    @Column(length = 255)
    private String overlayFilename;
}
