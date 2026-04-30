# Navigate Tech Hub Content Authoring Plan

This document defines how internal guide content is selected, structured, reviewed, and sequenced for publication.

This phase is design-only. It does not include drafting final guide bodies.

## 1) Purpose

The purpose of this plan is to operationalize the locked content contract and taxonomy into a repeatable authoring system.

The plan covers:
- guide inventory design,
- publication sequencing,
- editorial workflow,
- freshness and maintenance operations.

## 2) Scope

Included:
- internal guide planning and metadata design,
- editorial quality and review gates,
- external-resource maintenance checks.

Excluded:
- UI redesign,
- schema changes,
- full guide drafting.

## 3) Source of Truth

- `docs/CONTENT_CONTRACT_AND_EDITORIAL_TAXONOMY.md`
- `docs/API_ENDPOINT_DESIGN.md`

## 4) Authoring Principles

1. Every guide maps to one primary student problem.
2. Every guide has one canonical category.
3. Every guide has one clear outcome statement.
4. Metadata is complete before publication.
5. Freshness policy is enforced through review cadence.
6. Discovery quality is preserved through controlled tags.

## 5) Internal Guide System

The internal guide program is defined in:
- `docs/INTERNAL_GUIDE_INVENTORY.md`

That inventory includes, for each guide:
- `slug`
- `title`
- `category`
- `audienceStage`
- `outcome`
- `timeToReadMinutes`
- `contentVolatility`
- planned publication batch

## 6) Publication Sequence

Publishing is executed in three batches.

### Batch 1: Foundation and Immediate Need

Goal:
- cover first-semester and first-year onboarding gaps.

Includes:
- interview-prep basics,
- class planning fundamentals,
- portfolio and project basics,
- first networking actions.

### Batch 2: Execution and Opportunity Readiness

Goal:
- help students execute with stronger systems and measurable progress.

Includes:
- technical interview frameworks,
- high-impact project planning,
- hackathon execution,
- internship/co-op readiness workflows.

### Batch 3: Advanced and Specialized Tracks

Goal:
- provide deeper support for specialized growth paths.

Includes:
- advanced interview strategy,
- applied AI coding workflows and guardrails,
- conference/funding strategy,
- long-term career compounding playbooks.

## 7) Editorial Workflow

Workflow stages:
1. `draft`
2. `review`
3. `publish`

Required checks per stage:

- Draft:
  - required metadata complete,
  - category and audience stage validated,
  - outcome statement present.

- Review:
  - factual and link accuracy checked,
  - readability and plain-language check passed,
  - tag quality and taxonomy consistency verified.

- Publish:
  - final metadata confirmation,
  - freshness baseline set (`lastReviewedAt`),
  - release batch assignment confirmed.

## 8) Quality Requirements

A guide is publish-ready only when all are true:
- metadata fields satisfy contract requirements,
- problem statement is explicit,
- outcome statement is explicit and practical,
- recommendations are specific and testable,
- links and references are valid,
- terminology is consistent with taxonomy.

## 9) Freshness and Maintenance

Freshness policy follows contract thresholds:
- `high`: 15 days
- `medium`: 30 days
- `low`: 45 days

Operational behavior:
- stale guides enter review queue,
- stale guides are auto-unfeatured,
- stale guides are not auto-deleted.

## 10) External Resource Maintenance

External-resource maintenance is defined in:
- `docs/EXTERNAL_RESOURCE_COVERAGE_AND_MAINTENANCE.md`

Maintenance includes:
- type coverage checks by `resourceType`,
- category coverage checks,
- dead-link and quality checks,
- monthly curation pass.

## 11) Operating Cadence

- Weekly: intake triage and backlog updates.
- Bi-weekly: freshness and featured-content review.
- Monthly: external resource coverage and quality maintenance.

## 12) Roles and Accountability

- Project lead: final publishing and prioritization decisions.
- Contributors: draft and revision work under contract constraints.
- Reviewer role: contract, taxonomy, and quality gate checks.

## 13) Deliverables and Exit Criteria

This planning phase is complete when:
- internal inventory is finalized and approved,
- publication batches are finalized,
- editorial workflow and gates are documented,
- external maintenance framework is active.

## 14) Next Step After This Plan

Next phase is content drafting and production execution against the approved inventory and sequence.
