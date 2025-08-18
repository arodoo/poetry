/*
 File: InMemoryUserAdapter.java
 Purpose: Temporary in-memory adapter implementing user ports until JPA migration.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.infrastructure.memory.user;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.user.model.User;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

public class InMemoryUserAdapter implements UserQueryPort, UserCommandPort {
    private final Map<Long, User> store = new HashMap<>();
    private final AtomicLong seq = new AtomicLong(1);

    public List<User> findAll(){ return new ArrayList<>(store.values()); }
    public User findById(Long id){ return Optional.ofNullable(store.get(id)).orElseThrow(); }
    public User create(String f, String l, String e, String u, String p, Set<String> r){
        Long id = seq.getAndIncrement();
        User user = new User(id, f, l, e, u, true, r!=null? r: Set.of("USER"));
        store.put(id, user); return user;
    }
    public User update(Long id, String f, String l, String e, Set<String> r, boolean a){
        User ex = findById(id);
        User up = new User(ex.getId(), f, l, e, ex.getUsername(), a, r!=null? r: ex.getRoles());
        store.put(id, up); return up;
    }
    public void softDelete(Long id){
        User ex = findById(id);
        User up = new User(ex.getId(), ex.getFirstName(), ex.getLastName(), ex.getEmail(), ex.getUsername(), false, ex.getRoles());
        store.put(id, up);
    }
}
