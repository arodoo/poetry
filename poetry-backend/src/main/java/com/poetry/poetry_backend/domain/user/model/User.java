/*
 File: User.java
 Purpose: Domain User aggregate root model (no persistence annotations).
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.domain.user.model;

import java.util.Set;

public class User {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private boolean active;
    private Set<String> roles;

    public User(Long id, String firstName, String lastName, String email, String username, boolean active, Set<String> roles) {
        this.id = id; this.firstName = firstName; this.lastName = lastName;
        this.email = email; this.username = username; this.active = active; this.roles = roles;
    }
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getUsername() { return username; }
    public boolean isActive() { return active; }
    public Set<String> getRoles() { return roles; }
}
