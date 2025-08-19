/*
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.util.List;
import java.util.Set;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.user.model.User;

@Transactional
public class UserJpaAdapter implements UserQueryPort, UserCommandPort {
  private final UserJpaRepository repo;

  public UserJpaAdapter(UserJpaRepository repo) {
    this.repo = repo;
  }

  public List<User> findAll() {
    return repo.findAllActive().stream().map(UserJpaAdapter::toDomain).toList();
  }

  public User findById(Long id) {
    return repo.findActiveById(id).map(UserJpaAdapter::toDomain).orElseThrow();
  }

  public User create(
      String f,
      String l,
      String e,
      String u,
      String p,
      Set<String> r) {
    UserEntity en = new UserEntity();
    en.setFirstName(f);
    en.setLastName(l);
    en.setEmail(e);
    en.setUsername(u);
    en.setRoles(r);
    en.setActive(true);
    return toDomain(repo.save(en));
  }

  public User update(
      Long id,
      String f,
      String l,
      String e,
      Set<String> r,
      boolean a) {
    UserEntity en = repo.findById(id).orElseThrow();
    en.setFirstName(f);
    en.setLastName(l);
    en.setEmail(e);
    en.setRoles(r);
    en.setActive(a);
    return toDomain(repo.save(en));
  }

  public void softDelete(Long id) {
    UserEntity en = repo.findById(id).orElseThrow();
    en.setActive(false);
    repo.save(en);
  }

  private static User toDomain(UserEntity e) {
    return new User(
        e.getId(), e.getFirstName(), e.getLastName(), e.getEmail(),
        e.getUsername(), e.isActive(), e.getRoles());
  }
}
