/**
 * seed-programs.mjs
 *
 * Bulk-inserts verified Programs entries into Strapi for the 2026 External
 * Resources overhaul. Run from repo root:
 *   node docs/opportunities-radar/scripts/seed-programs.mjs
 *
 * Entries already in Strapi are skipped by title to make the script
 * re-runnable without duplicates.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const STRAPI_URL = 'http://localhost:1337';
const LAST_VERIFIED = '2026-05-10';

function loadApiKey() {
  // Resolve backend/.env relative to this script (docs/opportunities-radar/scripts/)
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const envPath = join(scriptDir, '..', '..', '..', 'backend', '.env');
  try {
    const raw = readFileSync(envPath, 'utf8');
    const match = raw.match(/^FULL_ACCESS_API_TOKEN\s*=\s*(.+)$/m);
    if (!match) throw new Error('FULL_ACCESS_API_TOKEN not found in backend/.env');
    return match[1].trim();
  } catch (err) {
    throw new Error(
      `Could not read FULL_ACCESS_API_TOKEN from backend/.env: ${err.message}\n` +
        'Set STRAPI_API_KEY env var as an alternative.',
    );
  }
}

const API_KEY = process.env.STRAPI_API_KEY ?? loadApiKey();

// ---------------------------------------------------------------------------
// Programs to seed
// ---------------------------------------------------------------------------

const programs = [
  // ── early-career-program ────────────────────────────────────────────────
  {
    title: 'LinkedIn — First Play Internship',
    description:
      'LinkedIn\'s early-career SWE internship for first- and second-year students, focused on product engineering across the LinkedIn platform.',
    url: 'https://careers.linkedin.com/students',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Two Sigma — First Year SWE Internship',
    description:
      'Two Sigma\'s first-year software engineering internship in quantitative finance and data science. Opens in fall recruiting season.',
    url: 'https://careers.twosigma.com/careers/Careers?level=University',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Citadel — Launch Internship',
    description:
      'Citadel\'s paid freshman/sophomore internship for aspiring quant developers and software engineers. Selective cohort with structured mentorship.',
    url: 'https://www.citadel.com/careers/students/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Hudson River Trading — Sophomore Internship',
    description:
      'HRT\'s structured sophomore SWE internship in algorithmic trading and high-frequency systems. Separate from the WiTTI insight program.',
    url: 'https://www.hudsonrivertrading.com/campus/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'SIG — First Year Discovery Program',
    description:
      'Susquehanna International Group\'s 2–3 day insight program introducing first-year students to trading, technology, and quantitative research.',
    url: 'https://sig.com/campus-programs/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'insight-event',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'JPMorgan Chase — Code for Good Hackathon',
    description:
      'Overnight hackathon where students build tech solutions for nonprofits. Top performers get fast-tracked to JPMC\'s internship interview process.',
    url: 'https://careers.jpmorgan.com/us/en/students/programs/code-for-good',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Morgan Stanley — TSAP Boston',
    description:
      'Morgan Stanley\'s Technology Summer Analyst Program with a Boston office track. Strong pipeline for underrepresented students in financial tech.',
    url: 'https://careers.morganstanley.com/students-and-graduates',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: true,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Liberty Mutual — Spark Summit',
    description:
      'Liberty Mutual\'s 2-day undergraduate immersion event (Aug 6–7, 2026) in Boston. Includes tech panels, networking with engineers, and recruiting pipeline.',
    url: 'https://jobs.libertymutual.com/early-career/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'insight-event',
    applicationStatus: 'apply-now',
    applicationDeadline: '2026-07-15',
    audienceSpecific: false,
    bostonLocal: true,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Bloomberg — First Year Insights Program',
    description:
      'Bloomberg\'s early access program for first-year students. Includes technology tours, engineer panels, and networking. Verify 2026 dates on Bloomberg\'s careers site.',
    url: 'https://careers.bloomberg.com/job/detail/students',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'uncertain-2026',
    audienceSpecific: false,
    bostonLocal: false,
    riskFlag: 'verify-before-applying',
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Goldman Sachs — Engineering Essentials',
    description:
      'Goldman Sachs\' virtual insight series for engineering students. Verify 2026 dates and format on GS careers page — program runs but cycle timing varies.',
    url: 'https://www.goldmansachs.com/careers/students/programs/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'insight-event',
    applicationStatus: 'uncertain-2026',
    audienceSpecific: false,
    bostonLocal: false,
    riskFlag: 'verify-before-applying',
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'IBM — Accelerate',
    description:
      'IBM\'s virtual learning and networking program for underrepresented students in tech. Pathways to IBM internship pipeline. Verify 2026 cohort status before applying.',
    url: 'https://www.ibm.com/careers/us-en/entry-level/accelerate/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'uncertain-2026',
    audienceSpecific: true,
    bostonLocal: false,
    riskFlag: 'verify-before-applying',
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Capital One — Early Internship Program (Sophomore)',
    description:
      'Capital One\'s dedicated sophomore SWE internship track. Separate from the TEIP cohort \u2014 applications open in fall semester.',
    url: 'https://www.capitalonecareers.com/students',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Google — BOLD Immersion Program',
    description:
      'Google\'s Building Opportunities for Leadership and Development program for Black and Latino undergraduates. Includes paid internship pipeline and mentorship.',
    url: 'https://buildyourfuture.withgoogle.com/programs/bold',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },

  // ── insight-event ────────────────────────────────────────────────────────
  {
    title: 'Jane Street — WiSE Program',
    description:
      'Multi-day program for self-identifying women, transgender, and gender-expansive students. Explore how Jane Street applies math and CS to real-world challenges across NY, London, and HK.',
    url: 'https://www.janestreet.com/join-jane-street/programs-and-events/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'insight-event',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Jane Street — INSIGHT',
    description:
      'Multi-day immersive for undergraduates and grad students from underrepresented STEM backgrounds. Focuses on trading, software development, and strategy/product work.',
    url: 'https://www.janestreet.com/join-jane-street/programs-and-events/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'insight-event',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Jane Street — FTTP (First-Year Trading & Tech)',
    description:
      'Two-day program introducing first-year students to Jane Street\'s trading and technology teams. One of the few explicitly first-year insight events at a top quant firm.',
    url: 'https://www.janestreet.com/join-jane-street/programs-and-events/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'insight-event',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Goldman Sachs — Possibilities Series (Freshman)',
    description:
      'Goldman Sachs\' freshman-exclusive virtual insight series covering engineering, finance, and sales & trading divisions. Gateway to GS internship pipeline.',
    url: 'https://www.goldmansachs.com/careers/students/programs/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'insight-event',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Akuna Capital — Sneak Peek (Women+)',
    description:
      'Akuna Capital\'s multi-day insight event for women and underrepresented students. Covers options trading, quantitative research, and software engineering. Multiple sessions in 2026.',
    url: 'https://akunacapital.com/careers',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'insight-event',
    applicationStatus: 'apply-now',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'D. E. Shaw — Nexus Fellowship',
    description:
      'D.E. Shaw\'s fellowship for students with exceptional quantitative and computational backgrounds. Includes a paid research project and pathway to the DESCO internship.',
    url: 'https://www.deshaw.com/careers/fellowships',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'insight-event',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'DRW — Discover DRW',
    description:
      'DRW\'s multi-day immersion event for students in tech, trading, and research. On-site in Chicago — covers the full scope of how a prop trading firm operates.',
    url: 'https://drw.com/work-at-drw/students',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'insight-event',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },

  // ── fellowship ───────────────────────────────────────────────────────────
  {
    title: 'SEO Tech Developer Program',
    description:
      'SEO\'s flagship software engineering fellowship for Black, Latino, and Native American undergraduates at top tech companies. Includes training, internship placement, and a 2-year career network.',
    url: 'https://www.seo-usa.org/tech/',
    category: 'programs',
    resourceType: 'community-network',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'SEO Career Program',
    description:
      'SEO\'s broader career track covering finance, consulting, and tech roles. Separate from SEO Tech — pairs underrepresented students with full-time mentors and employer partners.',
    url: 'https://www.seo-usa.org/career/',
    category: 'programs',
    resourceType: 'community-network',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'MLT Career Prep',
    description:
      'Management Leadership for Tomorrow\'s career development fellowship covering resume, interview, and offer negotiation coaching for underrepresented students across all industries.',
    url: 'https://mlt.org/career-prep/',
    category: 'programs',
    resourceType: 'community-network',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'MLT — Tech Trek',
    description:
      'MLT\'s STEM-specific track connecting underrepresented students with top technology employers through coaching, networking, and placement support.',
    url: 'https://mlt.org/tech-trek/',
    category: 'programs',
    resourceType: 'community-network',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'AI4ALL — Ignite Fellows Program',
    description:
      'AI4ALL\'s fellowship for underrepresented undergraduates breaking into AI/ML. Provides mentorship, community, and a pathway to AI research and industry roles.',
    url: 'https://ai-4-all.org/programs/ignite/',
    category: 'programs',
    resourceType: 'community-network',
    programType: 'fellowship',
    applicationStatus: 'closed-this-cycle',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'BASTA Fellowship',
    description:
      'Fellowship for first-generation and underrepresented students in the NYC metro area targeting finance and tech roles. Includes coaching, networking events, and employer connections.',
    url: 'https://www.bastainc.org/',
    category: 'programs',
    resourceType: 'community-network',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'HSF — Scholar Program',
    description:
      'Hispanic Scholarship Fund\'s career program connecting Hispanic/Latino undergraduates with internships and full-time roles at Fortune 500 companies in tech, finance, and consulting.',
    url: 'https://www.hsf.net/scholarship',
    category: 'programs',
    resourceType: 'scholarship-funding',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Hack.Diversity',
    description:
      'Boston-based fellowship for underrepresented tech talent. Connects Northeastern-area students with local tech companies through cohort-based job prep and employer partnerships.',
    url: 'https://www.hackdiversity.com/',
    category: 'programs',
    resourceType: 'community-network',
    programType: 'fellowship',
    applicationStatus: 'uncertain-2026',
    audienceSpecific: true,
    bostonLocal: true,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Headstart Fellowship',
    description:
      'Fellowship for first-generation college students pursuing careers in finance and tech. Provides coaching, resume reviews, and direct connections to top firms.',
    url: 'https://www.headstartfellowship.com/',
    category: 'programs',
    resourceType: 'community-network',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'BASE Fellowship',
    description:
      'New fellowship (Fall 2026) designed to close opportunity gaps for Black students in software engineering. Cohort-based coaching and employer partnership program.',
    url: 'https://www.basefellowship.org/',
    category: 'programs',
    resourceType: 'community-network',
    programType: 'fellowship',
    applicationStatus: 'apply-now',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Goldman Sachs — Scholarship for Excellence',
    description:
      'Goldman Sachs\' merit and diversity scholarship for students in their sophomore or junior year. Includes a summer internship offer for recipients.',
    url: 'https://www.goldmansachs.com/careers/students/programs/',
    category: 'programs',
    resourceType: 'scholarship-funding',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Anthropic — Fellows Program',
    description:
      'Anthropic\'s research fellowship for advanced students focused on AI safety and alignment. Highly selective; designed for students with strong ML/research backgrounds.',
    url: 'https://www.anthropic.com/careers',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Adobe — GEM Fellowship',
    description:
      'Adobe\'s partnership with the National GEM Consortium to fund MS/PhD fellowships for underrepresented students in STEM, with a summer internship at Adobe.',
    url: 'https://www.adobe.com/corporate-responsibility/education.html',
    category: 'programs',
    resourceType: 'scholarship-funding',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'BlackRock — Founders Scholarship',
    description:
      'BlackRock\'s scholarship and mentorship program for Black, Latino, and Native American students pursuing careers in finance and technology.',
    url: 'https://careers.blackrock.com/early-careers/',
    category: 'programs',
    resourceType: 'scholarship-funding',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Deloitte — HBCU Emerging Leaders Program',
    description:
      'Deloitte\'s fellowship for HBCU students pursuing consulting and technology careers. Includes mentorship, training, and a pathway to Deloitte\'s summer internship.',
    url: 'https://www2.deloitte.com/us/en/pages/careers/articles/join-deloitte-emerging-leaders.html',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },

  // ── pre-internship ───────────────────────────────────────────────────────
  {
    title: 'CodePath — TIP (Technical Interview Prep)',
    description:
      'CodePath\'s free 10-week technical interview prep course covering data structures, algorithms, and system design. Open to college students at all levels.',
    url: 'https://www.codepath.org/courses/technical-interview-prep',
    category: 'programs',
    resourceType: 'learning-platform',
    programType: 'pre-internship',
    applicationStatus: 'rolling',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'DRW — Apprenticeship Program',
    description:
      'DRW\'s structured apprenticeship for students transitioning into quantitative trading technology. Combines mentored project work with exposure to live trading infrastructure.',
    url: 'https://drw.com/work-at-drw/students',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'pre-internship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Deloitte — Discovery Internship',
    description:
      'Deloitte\'s Summer 2026 early-career internship for students in business and technology tracks. Gateway to full Deloitte internship offers.',
    url: 'https://www2.deloitte.com/us/en/pages/careers/articles/join-deloitte-students.html',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'pre-internship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },

  // ── conference ───────────────────────────────────────────────────────────
  {
    title: 'AfroTech 2026 Conference',
    description:
      'America\'s largest Black tech conference. Nov 2–6, 2026 in Houston. Thousands of recruiters, hundreds of sessions, and the highest density of Black tech professionals in one place.',
    url: 'https://afrotech.com/conference',
    category: 'programs',
    resourceType: 'events-conference',
    programType: 'conference',
    applicationStatus: 'apply-now',
    applicationDeadline: '2026-10-01',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'NSBE Annual Convention 2026',
    description:
      'National Society of Black Engineers annual convention. March 18–22, 2027 cycle TBD. The largest gathering of Black engineering students in the world — major recruiting event.',
    url: 'https://convention.nsbe.org',
    category: 'programs',
    resourceType: 'events-conference',
    programType: 'conference',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },

  // ── extra Tier-A radar gems ──────────────────────────────────────────────
  {
    title: 'Akuna Capital — Akunacademy Internship',
    description:
      'Akuna Capital\'s structured summer internship for students in quantitative finance and software engineering. Chicago-based, highly competitive.',
    url: 'https://akunacapital.com/careers',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Adobe — Digital Academy',
    description:
      'Adobe\'s apprenticeship program for career-changers and non-traditional tech candidates. Includes training and a pathway to full-time Adobe engineering roles.',
    url: 'https://www.adobe.com/corporate-responsibility/education/digital-academy.html',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'pre-internship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Capital One — Launchpad: Legacy & Leadership Program',
    description:
      'Capital One\'s diversity-focused cohort program combining professional development with an internship pathway. Targets underrepresented students in tech and finance.',
    url: 'https://www.capitalonecareers.com/students',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Asana — AsanaUP Internship',
    description:
      'Asana\'s paid software engineering internship open to first- and second-year students. Known for strong mentorship and a collaborative engineering culture.',
    url: 'https://asana.com/jobs/university',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Block — Builder Fellowship',
    description:
      'Block\'s (formerly Square) fellowship for underrepresented students in software engineering and product management. Cohort-based, includes mentorship and internship pathways.',
    url: 'https://block.xyz/careers',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'fellowship',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: true,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Confluent — Sophomore SWE Internship',
    description:
      'Confluent\'s early-career software engineering internship for sophomore students. Focused on real-time data streaming and distributed systems.',
    url: 'https://www.confluent.io/careers/',
    category: 'programs',
    resourceType: 'career-tool',
    programType: 'early-career-program',
    applicationStatus: 'opens-fall-2026',
    audienceSpecific: false,
    bostonLocal: false,
    lastVerified: LAST_VERIFIED,
  },
  {
    title: 'Khoury Tech for the Culture',
    description:
      'Northeastern\'s Khoury College program connecting underrepresented students with tech resources, mentorship, and community within the Northeastern CS ecosystem.',
    url: 'https://www.khoury.northeastern.edu/',
    category: 'community',
    resourceType: 'community-network',
    bostonLocal: true,
    audienceSpecific: true,
    lastVerified: LAST_VERIFIED,
  },
];

// ---------------------------------------------------------------------------
// Helpers — schema uses directoryTier + seasonalNote (no application* fields)
// ---------------------------------------------------------------------------

function buildSeasonalNote(applicationStatus, applicationDeadline) {
  const deadlineHint = applicationDeadline
    ? ` Previously noted in CMS: deadline ${applicationDeadline}. Verify on the official program page.`
    : '';
  const byStatus = {
    'opens-fall-2026': `Typically opens applications in fall.${deadlineHint}`,
    'apply-now': `Application timing varies by cycle.${deadlineHint}`,
    'uncertain-2026': 'Program offering may change year to year — confirm on the official site.',
    'closed-this-cycle': 'Runs annually — watch for the next cycle on the program page.',
    rolling: 'Often rolling — check the site for current availability.',
    'closing-soon': `Seasonal program.${deadlineHint}`,
    'year-round': 'Runs year-round — confirm details on the official page.',
  };
  if (applicationStatus && byStatus[applicationStatus]) {
    return byStatus[applicationStatus].trim();
  }
  if (deadlineHint) return deadlineHint.trim();
  return undefined;
}

/**
 * Maps legacy seed objects (with applicationStatus) to current Strapi shape.
 */
function toStrapiPayload(raw) {
  const { applicationStatus, applicationDeadline, ...rest } = raw;
  const directoryTier =
    raw.category === 'programs' ? 'recurring-program' : 'tools-and-communities';
  const seasonalNote =
    raw.category === 'programs'
      ? buildSeasonalNote(applicationStatus, applicationDeadline)
      : undefined;
  return {
    ...rest,
    directoryTier,
    ...(seasonalNote ? { seasonalNote } : {}),
  };
}

async function fetchExistingTitles() {
  const res = await fetch(
    `${STRAPI_URL}/api/external-resources?fields[0]=title&pagination[pageSize]=200`,
    { headers: { Authorization: `Bearer ${API_KEY}` } },
  );
  if (!res.ok) throw new Error(`GET failed: ${res.status}`);
  const json = await res.json();
  return new Set(json.data.map((r) => r.title.trim().toLowerCase()));
}

async function postEntry(entry) {
  const payload = toStrapiPayload(entry);
  const res = await fetch(`${STRAPI_URL}/api/external-resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ data: payload }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST failed for "${entry.title}": ${res.status} — ${text}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Fetching existing titles …');
  const existing = await fetchExistingTitles();
  console.log(`Found ${existing.size} existing entries.\n`);

  let added = 0;
  let skipped = 0;

  for (const entry of programs) {
    const key = entry.title.trim().toLowerCase();
    if (existing.has(key)) {
      console.log(`  SKIP  ${entry.title}`);
      skipped++;
      continue;
    }
    try {
      await postEntry(entry);
      console.log(`  ADD   ${entry.title}`);
      added++;
    } catch (err) {
      console.error(`  ERR   ${err.message}`);
    }
  }

  console.log(`\nDone. Added: ${added}, Skipped: ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
