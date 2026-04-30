---
name: python-type-discipline
description: Activate when generating or refactoring Python code that involves function signatures, models, interfaces, or typing decisions.
---
# Python Type Discipline
- All public functions must have explicit type hints.
- Avoid `Any` unless absolutely necessary and justified.
- Do not weaken types to satisfy static checkers.
- Handle Optional types explicitly.
- Prefer Protocol for behavior-based contracts; avoid unnecessary interfaces.
