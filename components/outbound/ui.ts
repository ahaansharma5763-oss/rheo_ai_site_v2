/* Interface labels the content schema does not carry: control names,
 * screen-reader labels and two section labels. Taken verbatim from the page
 * plan or the build brief. Copy owns wording: if content.ts gains any of
 * these, read it from there and delete the line here. */

export const UI = {
  // Section 12 has no heading in the schema; "Questions" is the plan's own name for it.
  faqEyebrow: 'Questions',
  // Step chips (build brief wording)
  watchInFilm: 'Watch this in the film',
  // Fit columns, from the fit heading's own words
  fitFor: 'Who it suits',
  fitNot: 'Who it doesn’t',
  // Theatre controls
  chapters: 'Chapters',
  closeFilm: 'Close the film',
  nowPlaying: 'Now playing',
  // Hero loop control
  pauseLoop: 'Pause the loop',
  playLoop: 'Play the loop',
  // Calendar mock (product UI chrome)
  weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  hours: ['9:00', '10:00', '11:00', '12:00', '13:00'],
} as const;
