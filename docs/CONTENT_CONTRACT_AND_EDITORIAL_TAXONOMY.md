# Navigate Tech Hub Content Contract and Editorial Taxonomy

This document defines the content contract, taxonomy, and editorial workflow for Navigate Tech Hub.

This is the canonical reference for:
- Strapi content model decisions
- content quality requirements
- editorial operations
- freshness policy
- taxonomy governance

This document is written to be implementation-ready and easy to maintain.

---

## 1) Product Context

### 1.1 Primary Decision Maker
- Primary decision maker: project lead.

### 1.2 Primary Audience
- Primary audience: first-year ColorStack students at Northeastern University.
- Priority context: Khoury College of Computer Sciences schedules, classes, and majors.
- Secondary audience: underclassmen in tech.

### 1.3 Content Voice
- Voice: hybrid.
- Style: direct, structured, mentorship-oriented.
- Authoring workflow: human-authored core content with editorial cleanup and structuring support.

---

## 2) Content Domains

Navigate Tech Hub contains two content domains:

1. **Internal Resources**  
   Original guides/articles written and maintained by the team.

2. **External Resources**  
   Curated links to third-party tools, organizations, and platforms.

---

## 3) Editorial Taxonomy

### 3.1 Category Set (Canonical)

Internal and external content both use this category set:
- `interview-prep`
- `classes`
- `projects`
- `hackathons`
- `community`

### 3.2 Category Assignment Rule
- Internal guides use **one canonical category per guide**.
- Multi-category assignment is not part of the current contract.
- Cross-cutting relevance is handled through tags.

### 3.3 Tag System
- Tags are controlled vocabulary.
- New tags can be added by editorial approval.
- Tag usage is for discovery and related-content relevance.

### 3.4 Problem-First Discovery Model
- Taxonomy supports problem-first user journeys.
- Category remains the canonical classification axis.
- Tags provide cross-category lookup for user intent.

---

## 4) Internal Resource Contract

### 4.1 Required Fields
- `title`
- `slug`
- `category` (single enum value)
- `description`
- `content` (markdown)
- `audienceStage` (enum)
- `timeToReadMinutes` (numeric)
- `outcome` (short result statement)
- `contentVolatility` (enum)

### 4.2 Optional Fields
- `tags` (controlled vocabulary)
- `featured` (editorial flag)
- `image`
- `author`
- `difficulty` (legacy compatibility field)
- `lastReviewedAt` (recommended operational field)

### 4.3 Audience Stage
- `audienceStage` replaces difficulty as primary audience fit signal.
- `difficulty` remains for backward compatibility.

Audience stage enum:
- `first-semester`
- `first-year`
- `underclassmen`
- `all-levels`

### 4.4 Freshness and Volatility
Volatility enum:
- `high`
- `medium`
- `low`

Freshness thresholds:
- `high`: 15 days
- `medium`: 30 days
- `low`: 45 days

Freshness behavior:
- Content that crosses threshold is marked stale for review.
- `featured` is automatically removed from stale content.
- Content is not auto-deleted.
- Content is not auto-unpublished.

Reference timestamp:
- Use `lastReviewedAt` when present.
- Fall back to `updatedAt` when `lastReviewedAt` is absent.

### 4.5 Publish Quality Criteria
A publish-ready internal guide has:
- complete required metadata
- clear problem statement
- clear outcome statement
- accurate category assignment
- approved tags
- readable markdown structure
- valid links (if included)

---

## 5) External Resource Contract

### 5.1 Required Fields
- `title`
- `url`
- `description`
- `category`
- `resourceType`

### 5.2 Optional Fields
- `badge`
- `officialStatus`

### 5.3 Resource Type
External resources include `resourceType` for structured filtering.

Resource type enum:
- `learning-platform`
- `opportunities-board`
- `scholarship-funding`
- `community-network`
- `events-conference`
- `career-tool`
- `documentation-reference`

### 5.4 Official Status
`officialStatus` is optional and signals source context.

Official status enum:
- `official-org`
- `community-vetted`

---

## 6) Editorial Workflow

### 6.1 Workflow States
- `draft`
- `review`
- `publish`

### 6.2 Review Cadence
- Bi-weekly review cadence for freshness and relevance checks.

### 6.3 Intake Channels
- Initial rollout: manual population by project lead.
- Ongoing intake: GitHub Issues.

### 6.4 Ownership Model
- Primary decision maker controls publish decisions.
- Per-entry owner field is not required in current contract.

---

## 7) Featured Content Policy

- Featured content is editorially curated.
- Selection is based on frequently asked and high-impact student needs.
- Stale content is automatically unfeatured based on volatility thresholds.

---

## 8) UX Content Behavior Requirements

### 8.1 Freshness Display
- Internal guide surfaces display freshness metadata (`publishedAt`, `updatedAt`, and review-derived freshness state where applicable).

### 8.2 Related Content
- Related content logic uses:
  1) same category
  2) shared tags

### 8.3 Discovery Enhancements
- "New this week" is included as a supported discovery pattern.

### 8.4 Empty and Error States
- Empty states are explicit and action-oriented.
- Copy remains plain English and non-jargon.

---

## 9) Content Governance Rules

### 9.1 Controlled Vocabulary Governance
- Tag additions require editorial approval.
- Taxonomy drift is prevented through category tie-break rules and controlled tags.

### 9.2 Contract Stability Rule
- Content model changes are treated as API contract changes.
- Destructive schema changes require explicit migration plan and impact review.

### 9.3 Documentation Sync Rule
When contract fields or taxonomy change:
- update this document
- update `docs/API_ENDPOINT_DESIGN.md`
- update frontend types and Strapi mapping in the same implementation set

---

## 10) Implementation Order

Execution order is:

1. Finalize and approve this content contract document.
2. Apply schema/model changes in Strapi.
3. Update frontend types and mapping.
4. Update import/seed/validation scripts.
5. Populate content.
6. Run editorial QA and freshness checks.

This order keeps product, editorial, and implementation decisions aligned.

---

## 11) Open Items

The following items remain open for explicit decision:

1. External resource legal/compliance constraints (if any).
2. External-link disclaimer requirements.
3. Sensitive-topic review policy boundaries.
4. Category-level tie-break examples (finalized per category in an appendix or follow-up update).

Until these are resolved, implementation proceeds with current approved contract fields and workflow.

---

## 12) Change Log

### Initial Contract Baseline
- Established canonical categories.
- Established single-category internal guide rule.
- Established controlled-tag policy.
- Introduced `audienceStage` with `difficulty` compatibility.
- Introduced volatility-based staleness policy (15/30/45 days).
- Added `resourceType` required for external resources.
- Added optional `officialStatus`.
- Locked editorial workflow to draft-review-publish with bi-weekly review cadence.
