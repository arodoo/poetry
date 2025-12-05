/*
 * File: SystemSelectionPersistenceTest.java
 * Purpose: Tests persistence and retrieval of system UI customization selection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.application.theme.usecase.selection.GetSystemSelectionUseCase;
import com.poetry.poetry_backend.application.theme.usecase.selection.SaveSystemSelectionUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;

@SpringBootTest
class SystemSelectionPersistenceTest {
  @Autowired
  private SaveSystemSelectionUseCase save;
  @Autowired
  private GetSystemSelectionUseCase get;
  @Autowired
  private ThemeCommandPort themeCmd;

  @Test
  void savesAndRetrievesSelection() {
    Theme t = themeCmd.save(Theme.createNew("persist-key", "Persist Key", Map.of("p", "#111111")));
    UiCustomizationSelection sel = new UiCustomizationSelection(
        t.getKey(), "Inter", "default", "default", "default", "default");
    save.execute(sel);
    assertThat(get.execute()).isPresent().get().extracting(UiCustomizationSelection::themeKey)
        .isEqualTo(t.getKey());
  }
}
