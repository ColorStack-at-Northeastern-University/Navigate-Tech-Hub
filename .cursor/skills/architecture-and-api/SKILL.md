---
name: architecture-and-api
description: Activate when planning module structure, designing APIs, refactoring system boundaries, or making changes to any externally consumed interface. Prevents unnecessary complexity and protects contract stability.
---
# Architecture and API
## Structure
- Organize code by feature domain, not by technical layer (avoid `utils/`, `helpers/` as catch-alls).
- Do not introduce abstractions without at least two concrete consumers.
- Do not apply heavy patterns (hexagonal, event sourcing, CQRS) unless the problem demonstrably requires them.
- Prefer direct imports over dependency injection unless testability is materially improved.
- New features in a monolith file: prefer a new module or component unless the addition is genuinely trivial.
## API contracts
- Never change a public function signature without explicitly flagging it.
- Do not alter external behavior silently — call out breaking changes clearly.
- Do not expose internal models or ORM entities across service boundaries.
- Do not leak internal exception types upward; map to domain or HTTP errors at the boundary.
- Ensure backward compatibility unless the user explicitly approves a breaking change.
## When to apply
- Designing module or package boundaries
- Introducing new services, components, or integration seams
- Large refactors touching multiple files
- Any change to a public API, endpoint signature, or shared type
