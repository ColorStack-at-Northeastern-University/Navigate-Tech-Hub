# External Resource Coverage and Maintenance

This document defines ongoing maintenance standards for external resources.

The current external resource schema is complete and seeded. This document governs quality and coverage over time.

## 1) Required Field Compliance

Every external resource entry must include:
- `title`
- `description`
- `url`
- `category`
- `resourceType`

Optional fields:
- `badge`
- `officialStatus`

## 2) Coverage Model

Coverage is reviewed along two dimensions:

1. Category coverage:
- `interview-prep`
- `classes`
- `projects`
- `hackathons`
- `community`

2. Resource type coverage:
- `learning-platform`
- `opportunities-board`
- `scholarship-funding`
- `community-network`
- `events-conference`
- `career-tool`
- `documentation-reference`

## 3) Minimum Coverage Expectations

For each category:
- at least one high-confidence resource in each applicable `resourceType`.

For platform quality:
- no dead links,
- no duplicate entries with same URL intent,
- descriptions are concise and specific.

## 4) Curation Criteria

A resource is eligible when it is:
- relevant to Black and Latinx CS student outcomes,
- credible and maintained,
- accessible with clear usage value,
- not redundant with existing higher-quality entries.

## 5) Review Cadence

- Monthly: full coverage and quality review.
- Bi-weekly: dead-link and stale-description check.
- As-needed: add new resources from validated intake.

## 6) Maintenance Workflow

1. Intake
- Capture suggestions through approved intake channel.

2. Validation
- Verify required fields and enum alignment.
- Validate URL health and destination relevance.

3. Classification
- Assign category and `resourceType`.
- Add optional `officialStatus` when source context is clear.

4. Publish
- Add to Strapi and verify frontend rendering.

5. Audit
- Include in next monthly coverage pass.

## 7) QA Checklist

For each monthly pass:
- required field completeness is 100%,
- enum values are valid,
- URL checks pass,
- category grouping behavior remains correct in UI,
- no cards crash on malformed or missing values.

## 8) Gap Tracking

Track and resolve:
- category/type combinations with low coverage,
- outdated resources replaced by higher-quality alternatives,
- missing scholarship/funding and opportunity-board updates.

## 9) Ownership

- Project lead approves additions/removals.
- Contributors prepare candidate resources and metadata.
- Reviewer validates classification and quality gates.
