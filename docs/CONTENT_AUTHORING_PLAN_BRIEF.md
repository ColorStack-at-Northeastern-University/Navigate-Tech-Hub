# Content Authoring Plan Brief

This document defines the next planning phase after schema contract lock.

This phase is design-only. It does not include drafting full guide content.

## Phase Objective

Define a complete content authoring system for Navigate Tech Hub that specifies:
- what internal guides should be created,
- how guides are prioritized,
- how guide quality is reviewed,
- how guide freshness is maintained over time.

## Inputs

- `docs/CONTENT_CONTRACT_AND_EDITORIAL_TAXONOMY.md`
- `docs/API_ENDPOINT_DESIGN.md`
- Current Strapi schema and seeded external resources

## Required Outputs

1. Internal guide inventory with clear titles and slugs.
2. Audience-stage mapping for each planned guide.
3. Category assignment for each guide (single-category rule).
4. Outcome statement per guide.
5. Estimated reading time per guide.
6. Volatility level per guide (`high`, `medium`, `low`).
7. Editorial review cadence and ownership process.
8. Initial publication sequence (batch order).

## Scope Boundaries

Included:
- architecture for creating internal guide content,
- topic and guide selection framework,
- editorial quality controls for guide creation.

Excluded:
- writing full guide drafts,
- UI redesign,
- backend schema changes beyond locked contract.

## Content Domains for Planning

### Internal Guides

The planning set must include:
- interview preparation,
- classes/course navigation,
- project building and portfolio,
- hackathon strategy,
- community and networking guidance,
- coding with AI workflows and guardrails.

### External Resources

External resources are schema-complete and seeded.

The planning phase includes one maintenance pass:
- identify gaps by `resourceType`,
- propose additions where category or type coverage is thin,
- define ongoing curation criteria.

## Planning Deliverable Format

The content authoring plan should be delivered as one canonical doc in `docs/` with:
- guide inventory table,
- publication sequencing section,
- editorial operations section,
- maintenance and freshness policy section.

## Exit Criteria

The phase is complete when:
- the guide inventory is finalized,
- required metadata is defined for each planned guide,
- publication order is approved,
- editorial workflow for future additions is documented.
