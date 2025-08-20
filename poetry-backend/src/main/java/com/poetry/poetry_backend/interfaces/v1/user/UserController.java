/*
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.user;

import static com.poetry.poetry_backend.interfaces.v1.user.UserDtos.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.user.usecase.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
  private final GetAllUsersUseCase getAll;
  private final GetUserByIdUseCase getById;
  private final CreateUserUseCase create;
  private final UpdateUserUseCase update;
  private final DeleteUserUseCase delete;

  public UserController(
      GetAllUsersUseCase getAll,
      GetUserByIdUseCase getById,
      CreateUserUseCase create,
      UpdateUserUseCase update,
      DeleteUserUseCase delete) {
    this.getAll = getAll;
    this.getById = getById;
    this.create = create;
    this.update = update;
    this.delete = delete;
  }

  @GetMapping
  public ResponseEntity<List<UserResponse>> all() {
    return ResponseEntity.ok(
        getAll.execute().stream().map(UserDtos::toResponse).toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserResponse> byId(@PathVariable Long id) {
    return ResponseEntity.ok(UserDtos.toResponse(getById.execute(id)));
  }

  @PostMapping
  public ResponseEntity<UserResponse> create(@RequestBody UserCreateRequest r) {
    var u = create.execute(
        r.firstName(), r.lastName(), r.email(), r.username(),
        r.password(), r.roles());
    return ResponseEntity.ok(UserDtos.toResponse(u));
  }

  @PutMapping("/{id}")
  public ResponseEntity<UserResponse> update(
      @PathVariable Long id, @RequestBody UserUpdateRequest r) {
    var u = update.execute(
        id, r.firstName(), r.lastName(), r.email(), r.roles(), r.active());
    return ResponseEntity.ok(UserDtos.toResponse(u));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    delete.execute(id);
    return ResponseEntity.noContent().build();
  }
}
