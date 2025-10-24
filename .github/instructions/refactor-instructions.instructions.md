---
applyTo: '**'
---

# Refactoring Instructions
When refactoring code, follow these guidelines to ensure maintainability and clarity:

## Important Considerations
- If you stablish new patterns (DRY, abstractions, etc.), make sure you generate a checker to enforce them in CI so all code adopt them.

## General Principles
- Don't apply your personal style. Follow existing project conventions and logic.
- When splitting files, ensure logic keeps intact, don't break/change/improve methods or classes.
- Ensure all tests pass after refactoring to confirm no functionality is broken.
- Maintain consistent naming conventions and coding styles throughout the codebase.
- Document any significant changes in structure or organization for future reference.
