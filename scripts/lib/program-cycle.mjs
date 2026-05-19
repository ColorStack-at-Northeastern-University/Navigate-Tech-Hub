const SEASON_BY_PROGRAM_TYPE = {
  'early-career-program': 'fall',
  'pre-internship': 'spring',
  fellowship: 'spring',
  'insight-event': 'fall',
  conference: 'fall',
};

const SEASON_LABELS = {
  spring: 'spring (roughly Feb–Apr)',
  summer: 'summer (roughly May–Jul)',
  fall: 'fall (roughly Aug–Nov)',
  winter: 'winter (roughly Dec–Jan)',
  rolling: 'rolling / multiple windows',
  varies: 'varies by company',
};

export function seasonLabel(season) {
  return SEASON_LABELS[season] ?? SEASON_LABELS.varies;
}

export function defaultSeasonForProgramType(programType) {
  if (!programType) return 'varies';
  return SEASON_BY_PROGRAM_TYPE[programType] ?? 'varies';
}

export function deriveProgramSearchHint(title) {
  const dash = title.indexOf('—');
  if (dash !== -1) {
    const hint = title.slice(dash + 1).trim();
    if (hint) return hint;
  }
  const hyphen = title.indexOf(' - ');
  if (hyphen !== -1) {
    const hint = title.slice(hyphen + 3).trim();
    if (hint) return hint;
  }
  return title.trim();
}

function safeHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'the company careers site';
  }
}

export function buildSeasonalNote({ title, typicalOpenSeason, careersHubUrl, programSearchHint }) {
  const season = typicalOpenSeason ?? 'varies';
  const hint = programSearchHint ?? deriveProgramSearchHint(title);
  const host = safeHostname(careersHubUrl);

  if (season === 'rolling') {
    return `Applications may open year-round. Check ${host} and search for “${hint}” when you are ready to apply.`;
  }
  if (season === 'varies') {
    return `The dedicated program page often rotates each cycle. Around application season, check ${host} and search for “${hint}”.`;
  }

  return `Usually opens in ${seasonLabel(season)}. The apply link changes each cycle — check ${host} and search for “${hint}” as that window approaches.`;
}
