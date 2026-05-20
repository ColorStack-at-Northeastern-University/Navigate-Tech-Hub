/** Launch-day guide slugs (prod visibility + featured flags). */

export const START_HERE_SLUG = 'start-here-navigate-tech-hub';

/** Ten guides besides Start Here for v1 launch. */
export const LAUNCH_GUIDE_SLUGS = [
  'first-internship-without-experience',
  'resume-for-tech-roles',
  'application-to-offer-timeline',
  'interview-process-map',
  'outreach-templates-that-work',
  'cs-course-planning-neu',
  'project-selection-framework',
  'portfolio-that-converts',
  'linkedin-profile-system',
  'colorstack-nsbe-afrotech-guide',
];

/** Homepage featured carousel (must be subset of published launch guides). */
export const FEATURED_GUIDE_SLUGS = [
  'cs-course-planning-neu',
  'first-internship-without-experience',
  'resume-for-tech-roles',
  'application-to-offer-timeline',
  'colorstack-nsbe-afrotech-guide',
];

export const PUBLISHED_LAUNCH_SLUGS = [START_HERE_SLUG, ...LAUNCH_GUIDE_SLUGS];
