/*
 File: User.java
 Purpose: Domain User aggregate root model (no persistence annotations).
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.domain.user.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@Getter
@AllArgsConstructor
public class User {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private boolean active;
    private Set<String> roles;
}
