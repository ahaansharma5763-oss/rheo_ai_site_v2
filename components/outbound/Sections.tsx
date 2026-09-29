/* eslint-disable @next/next/no-img-element -- pre-sized portrait stills, served as-is */
/* /outbound sections, server-rendered. Every string comes from content.ts
 * (or ui.ts for interface labels). Client pieces are imported where needed:
 * FilmButton, HeroLoop, Steps, SendsChart, BookForm. */

import type { CSSProperties, ReactNode } from 'react';
import FilmButton from './FilmButton';
import HeroLoop from './HeroLoop';
import Steps from './Steps';
import SendsChart from './SendsChart';
import BookForm from './BookForm';
import Backdrop from './Backdrop';
import { MEDIA, pad2, secondsToClock, type Chapter, type OutboundContent, type TranscriptLine } from './types';
import { UI } from './ui';

type O = OutboundContent;
const vars = (v: Record<string, string | number>) => v as CSSProperties;

function chapterFor(chapters: Chapter[], section: string): number {
  const i = chapters.findIndex(c => c.section === section);
  return i >= 0 ? i : 0;
}

/* A still from the film that opens the theatre at its chapter */
function FilmCard({
  still,
  section,
  chapters,
}: {
  still: 'problem' | 'report' | 'proof' | 'part';
  section: string;
  chapters: Chapter[];
}) {
  const i = chapterFor(chapters, section);
  const c = chapters[i];
  return (
    <FilmButton chapter={i} source={`card_${still}`} className="ob-filmcard">
      <span className="ob-filmcard-img" aria-hidden>
        <img src={MEDIA.still(still)} alt="" width={720} height={1280} loading="lazy" decoding="async" />
      </span>
      <span className="ob-filmcard-text">
        <span>{UI.watchInFilm}</span>
        <span className="ob-mono">
          {c?.t} · {c?.title}
        </span>
      </span>
    </FilmButton>
  );
}

/* ─────────────── 1 · Hero ─────────────── */
export function Hero({ c }: { c: O['hero'] }) {
  return (
    <section id="hero" className="ob-hero" aria-labelledby="hero-h">
      <Backdrop place="hero" />
      <div className="ob-wrap ob-hero-grid">
        <div>
          {/* The headline is the LCP: rendered as text, never hidden for a reveal */}
          <h1 id="hero-h" className="ob-display">
            {c.headline}
          </h1>
          <p className="ob-hero-sub">{c.sub}</p>
          <div className="ob-cta-row">
            <FilmButton source="hero" className="ob-btn ob-btn--primary">
              {c.ctaFilm}
              <span className="ob-btn-meta">{c.filmLength}</span>
            </FilmButton>
            <a href="#book" className="ob-btn">
              {c.ctaCall}
            </a>
          </div>
        </div>
        <HeroLoop label={c.loopLabel} />
      </div>
    </section>
  );
}

/* ─────────────── 2 · The film ─────────────── */
export function FilmBand({
  hero,
  film,
  transcript,
}: {
  hero: O['hero'];
  film: O['film'];
  transcript: TranscriptLine[];
}) {
  return (
    <section id="film" className="ob-sec ob-sec--navy ob-rule-top" aria-label={hero.ctaFilm}>
      <Backdrop place="film" />
      <div className="ob-wrap ob-film-grid">
        <FilmButton source="film_band" className="ob-poster" ariaLabel={`${hero.ctaFilm}, ${hero.filmLength}`}>
          <img src={MEDIA.filmPoster} alt="" width={1080} height={1920} loading="lazy" decoding="async" />
          <span className="ob-poster-play" aria-hidden>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M5 3.2v9.6L12.6 8z" fill="none" stroke="#F4EDDF" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="ob-poster-len ob-mono">{hero.filmLength}</span>
        </FilmButton>

        <div>
          <p className="eyebrow" style={{ marginBottom: 20 }} data-reveal>
            {hero.ctaFilm}
          </p>
          <ol className="ob-chapters">
            {film.chapters.map((c, i) => (
              <li key={`${c.t}-${i}`}>
                <FilmButton chapter={i} source="film_band_chapter">
                  <span className="ob-mono">{c.t}</span>
                  <span>{c.title}</span>
                </FilmButton>
              </li>
            ))}
          </ol>
          {transcript.length > 0 && (
            <details className="ob-transcript">
              <summary>{film.transcriptHeading}</summary>
              <div className="ob-transcript-body">
                {transcript.map((l, i) => (
                  <p key={i}>
                    <span className="ob-mono">{secondsToClock(l.t)}</span>
                    <span>{l.text}</span>
                  </p>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 3 · Where it goes wrong ─────────────── */
export function Problem({ p, chapters }: { p: O['problem']; chapters: Chapter[] }) {
  return (
    <section id="problem" className="ob-sec ob-sec--navy ob-rule-top" aria-labelledby="problem-h">
      <div className="ob-wrap">
        <div className="ob-head">
          <p className="eyebrow" data-reveal>
            {p.eyebrow}
          </p>
          <h2 id="problem-h" className="ob-h2" data-reveal style={vars({ '--i': 1 })}>
            {p.heading}
          </h2>
          <div data-reveal style={vars({ '--i': 2 })}>
            <FilmCard still="problem" section="problem" chapters={chapters} />
          </div>
        </div>

        <ol className="ob-gap">
          {p.breaks.map((b, i) => (
            <li key={b.label} className="ob-gap-item" data-stage style={vars({ '--i': i })}>
              <span className="ob-gap-cut" aria-hidden />
              <span className="ob-gap-n ob-mono" aria-hidden>
                {pad2(i + 1)}
              </span>
              <h3 className="ob-gap-label">{b.label}</h3>
              <p className="ob-gap-line">{b.line}</p>
            </li>
          ))}
        </ol>

        {/* The spam break, shown: a tick on your side, the Spam folder on theirs */}
        <figure className="ob-spam" data-stage>
          <div className="ob-spam-panes">
            <div className="ob-spam-pane">
              <p className="ob-spam-head ob-mono">{p.spam.sent}</p>
              <div className="ob-spam-row ob-spam-row--sent">
                <span className="ob-spam-av" aria-hidden />
                <span aria-hidden>
                  <span className="ob-skel" style={{ width: '74%' }} />
                  <span className="ob-skel ob-skel--dim" style={{ width: '52%' }} />
                </span>
                <span className="ob-spam-ok" aria-hidden>
                  <svg viewBox="0 0 16 16" width="16" height="16">
                    <path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </div>
              <div className="ob-spam-row" aria-hidden style={{ opacity: 0.45 }}>
                <span className="ob-spam-av" />
                <span>
                  <span className="ob-skel ob-skel--dim" style={{ width: '60%' }} />
                  <span className="ob-skel ob-skel--dim" style={{ width: '38%' }} />
                </span>
                <span />
              </div>
            </div>
            <div className="ob-spam-pane">
              <p className="ob-spam-head ob-mono">{p.spam.theirInbox}</p>
              <div className="ob-spam-row ob-spam-row--spam">
                <span className="ob-spam-av" aria-hidden />
                <span aria-hidden>
                  <span className="ob-skel" style={{ width: '74%' }} />
                  <span className="ob-skel ob-skel--dim" style={{ width: '52%' }} />
                </span>
                <span className="ob-spam-flag" aria-hidden>
                  <svg viewBox="0 0 16 16" width="16" height="16">
                    <path d="M3.5 14V2.5M3.5 3h8.5l-2 3 2 3H3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </div>
              <div className="ob-spam-slot" aria-hidden />
            </div>
          </div>
          <figcaption className="ob-spam-note">{p.spam.note}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ─────────────── 4 · What we do: the line closes ─────────────── */
export function Turn({ t }: { t: O['turn'] }) {
  // Where the entry sits in the mock week (product UI chrome only)
  const dayIdx = Math.max(0, UI.weekdays.findIndex(d => t.calendarEntry.includes(d)));
  const hourIdx = Math.max(0, UI.hours.findIndex(h => t.calendarEntry.includes(h)));
  const cells: ReactNode[] = [<span key="corner" className="ob-cal-day" />];
  UI.weekdays.forEach((d, i) =>
    cells.push(
      <span key={d} className={`ob-cal-day${i === dayIdx ? ' is-thu' : ''}`}>
        {d}
      </span>
    )
  );
  UI.hours.forEach((h, r) => {
    cells.push(<span key={`h${h}`}>{h}</span>);
    UI.weekdays.forEach((d, c) =>
      cells.push(
        <span key={`${h}-${d}`}>
          {r === hourIdx && c === dayIdx && <span className="ob-cal-entry">{t.calendarEntry}</span>}
        </span>
      )
    );
  });

  return (
    <section id="turn" className="ob-sec ob-sec--navy" aria-labelledby="turn-h">
      <div className="ob-wrap">
        <h2 id="turn-h" className="ob-turn-h" data-reveal>
          {t.heading}
        </h2>
        <div className="ob-turn-grid ob-turn-fig" data-stage>
          <ol className="ob-verbs">
            {t.verbs.map((v, i) => (
              <li key={v} className="ob-verb" style={vars({ '--i': i })}>
                {v}
              </li>
            ))}
          </ol>
          <div className="ob-cal" role="img" aria-label={t.calendarEntry}>
            {cells}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 5 · The nine steps ─────────────── */
export function StepsSection({ intro, steps, chapters }: { intro: O['stepsIntro']; steps: O['steps']; chapters: Chapter[] }) {
  return (
    <section id="steps" className="ob-sec ob-sec--panel" aria-labelledby="steps-h">
      <div className="ob-wrap">
        <div className="ob-head">
          <p className="eyebrow" data-reveal>
            {intro.eyebrow}
          </p>
          <h2 id="steps-h" className="ob-h2" data-reveal style={vars({ '--i': 1 })}>
            {intro.heading}
          </h2>
          <p className="ob-lede" data-reveal style={vars({ '--i': 2 })}>
            {intro.body}
          </p>
        </div>
        <Steps steps={steps} chapters={chapters} />
      </div>
    </section>
  );
}

/* ─────────────── 6 · The monthly report ─────────────── */
const REPORT_FILL = ['64%', '48%', '36%', '56%'];

export function Report({ r, chapters }: { r: O['report']; chapters: Chapter[] }) {
  return (
    <section id="report" className="ob-sec ob-sec--navy" aria-labelledby="report-h">
      <div className="ob-wrap ob-split">
        <div className="ob-head">
          <p className="eyebrow" data-reveal>
            {r.eyebrow}
          </p>
          <h2 id="report-h" className="ob-h2" data-reveal style={vars({ '--i': 1 })}>
            {r.heading}
          </h2>
          <p className="ob-lede" data-reveal style={vars({ '--i': 2 })}>
            {r.body}
          </p>
          <p className="ob-note" data-reveal style={vars({ '--i': 3 })}>
            {r.qualified}
          </p>
          <div data-reveal style={vars({ '--i': 4 })}>
            <FilmCard still="report" section="report" chapters={chapters} />
          </div>
        </div>

        <figure className="ob-report" data-stage style={{ margin: 0 }}>
          <div className="ob-report-top">
            <span className="ob-skel" aria-hidden />
            <span className="ob-tag">{r.tag}</span>
          </div>
          <div className="ob-tiles">
            {r.tiles.map((t, i) => (
              <div key={t} className="ob-tile">
                <span className="ob-tile-label">{t}</span>
                <span className="ob-bar" aria-hidden style={vars({ '--w': REPORT_FILL[i % REPORT_FILL.length], '--i': i })}>
                  <i />
                </span>
                <span className="ob-bar-ticks" aria-hidden>
                  <span className="ob-skel ob-skel--dim" style={{ width: '38%' }} />
                  <span className="ob-skel ob-skel--dim" style={{ width: '22%' }} />
                </span>
              </div>
            ))}
          </div>
          <div className="ob-opens">
            <span className="ob-opens-label">{r.opens.label}</span>
            <span className="ob-opens-bar" aria-hidden />
            <p className="ob-opens-why">{r.opens.why}</p>
          </div>
        </figure>
      </div>
    </section>
  );
}

/* ─────────────── 7 · Our own numbers ─────────────── */
export function Proof({ p, chapters }: { p: O['proof']; chapters: Chapter[] }) {
  // The section's one gold: the qualified conversations held
  const goldIdx = Math.max(0, p.funnel.findIndex(f => /qualified/i.test(f.label)));
  const live = (i: number) => i >= p.thread.length - 2;

  return (
    <section id="proof" className="ob-sec ob-sec--ink" aria-labelledby="proof-h">
      <Backdrop place="proof" />
      <div className="ob-wrap">
        <div className="ob-head">
          <p className="eyebrow eyebrow--quiet" data-reveal>
            {p.eyebrow}
          </p>
          <h2 id="proof-h" className="ob-h2" data-reveal style={vars({ '--i': 1 })}>
            {p.heading}
          </h2>
          <div data-reveal style={vars({ '--i': 2 })}>
            <FilmCard still="proof" section="proof" chapters={chapters} />
          </div>
        </div>

        <figure className="ob-fig" data-reveal style={{ margin: 0 }}>
          <div className="ob-funnel">
            {p.funnel.map((f, i) => (
              <div key={f.label} className="ob-stage-n">
                <span className="ob-rate">{f.rate}</span>
                <b className={i === goldIdx ? 'is-gold' : undefined}>{f.value}</b>
                <span className="ob-stage-l">{f.label}</span>
              </div>
            ))}
          </div>
          <figcaption className="ob-sumline ob-kicker">{p.sumline}</figcaption>
        </figure>

        <figure className="ob-fig" data-reveal style={{ marginInline: 0, marginBottom: 0 }}>
          <figcaption className="ob-fig-head">
            <span className="ob-label">{p.chartLabel}</span>
          </figcaption>
          <SendsChart label={p.chartLabel} />
        </figure>

        <div className="ob-proof-foot">
          <p className="ob-scale" data-reveal>
            {p.scaleLine}
          </p>
          <figure className="ob-thread" data-reveal style={{ margin: 0 }}>
            <ol>
              {p.thread.map((s, i) => (
                <li key={s.label} className={live(i) ? 'is-live' : undefined}>
                  <span className="ob-thread-dot" aria-hidden />
                  <span className="ob-thread-main">
                    <span className="ob-thread-label">{s.label}</span>
                    {s.time && <span className="ob-mono">{s.time}</span>}
                  </span>
                  <span className="ob-thread-state">{s.state}</span>
                </li>
              ))}
            </ol>
            <figcaption className="ob-thread-note">{p.threadNote}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 8 · What we won't promise ─────────────── */
export function Promises({ p }: { p: O['promises'] }) {
  return (
    <section id="promises" className="ob-sec ob-sec--navy ob-rule-top" aria-labelledby="promises-h">
      <div className="ob-wrap">
        <div className="ob-head">
          <p className="eyebrow" data-reveal>
            {p.eyebrow}
          </p>
          <h2 id="promises-h" className="ob-h2" data-reveal style={vars({ '--i': 1 })}>
            {p.heading}
          </h2>
          <p className="ob-lede" data-reveal style={vars({ '--i': 2 })}>
            {p.body}
          </p>
        </div>
        <div className="ob-promise-grid">
          <dl className="ob-guard" style={{ margin: 0 }}>
            {p.guardrails.map((g, i) => (
              <div key={g.label} className="ob-guard-row" data-reveal style={vars({ '--i': i })}>
                <dt>{g.label}</dt>
                <dd>{g.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="ob-refuse">
            {p.refuse.map((r, i) => (
              <li key={r} data-reveal style={vars({ '--i': i })}>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 9 · Your part: the one Warm Foam section ─────────────── */
export function YourPart({ y, chapters }: { y: O['yourPart']; chapters: Chapter[] }) {
  return (
    <section id="your-part" data-theme="light" className="ob-sec ob-part" aria-labelledby="part-h">
      <div className="ob-wrap">
        <p className="eyebrow" style={{ marginBottom: 20 }} data-reveal>
          {y.eyebrow}
        </p>
        <h2 id="part-h" className="ob-part-h" data-reveal style={vars({ '--i': 1 })}>
          {y.heading}
        </h2>
        <ol className="ob-part-list">
          {y.items.map((it, i) => (
            <li key={it} data-reveal style={vars({ '--i': i })}>
              <span className="ob-mono" aria-hidden>
                {pad2(i + 1)}
              </span>
              <span>{it}</span>
            </li>
          ))}
        </ol>
        <p className="ob-part-close ob-kicker" data-reveal>
          {y.close}
        </p>
        <FilmCard still="part" section="promises" chapters={chapters} />
      </div>
    </section>
  );
}

/* ─────────────── 10 · From the call to the first email ─────────────── */
export function Timeline({ t }: { t: O['timeline'] }) {
  return (
    <section id="timeline" className="ob-sec ob-sec--navy" aria-labelledby="timeline-h">
      <div className="ob-wrap">
        <div className="ob-head">
          <p className="eyebrow" data-reveal>
            {t.eyebrow}
          </p>
          <h2 id="timeline-h" className="ob-h2" data-reveal style={vars({ '--i': 1 })}>
            {t.heading}
          </h2>
        </div>
        <ol className="ob-tl" data-stage>
          {t.points.map((pt, i) => (
            <li key={pt.when} style={vars({ '--i': i })} data-reveal>
              <span className="ob-tl-dot" aria-hidden />
              <span className="ob-tl-when">{pt.when}</span>
              <span className="ob-tl-what">{pt.what}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────── 11 · Who it's for ─────────────── */
export function Fit({ f }: { f: O['fit'] }) {
  return (
    <section id="fit" className="ob-sec ob-sec--panel" aria-labelledby="fit-h">
      <div className="ob-wrap">
        <div className="ob-head">
          <p className="eyebrow" data-reveal>
            {f.eyebrow}
          </p>
          <h2 id="fit-h" className="ob-h2" data-reveal style={vars({ '--i': 1 })}>
            {f.heading}
          </h2>
        </div>
        <div className="ob-fit">
          <div className="ob-fit-col ob-fit-yes" data-reveal>
            <h3 className="ob-label">{UI.fitFor}</h3>
            <ul>
              {f.forList.map(x => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <ul className="ob-sectors">
              {f.sectors.map(x => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="ob-fit-col ob-fit-no" data-reveal style={vars({ '--i': 1 })}>
            <h3 className="ob-label">{UI.fitNot}</h3>
            <ul>
              {f.notFor.map(x => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 12 · Questions (native disclosure: works with no script) ─────────────── */
export function Faq({ items }: { items: O['faq'] }) {
  return (
    <section id="faq" className="ob-sec ob-sec--navy ob-rule-top" aria-labelledby="faq-h">
      <div className="ob-wrap ob-faq-grid">
        <div>
          <h2 id="faq-h" className="eyebrow">
            {UI.faqEyebrow}
          </h2>
        </div>
        <div className="ob-faq">
          {items.map(f => (
            <details key={f.q} className="ob-faq-item">
              <summary>
                <h3 className="ob-faq-qt">{f.q}</h3>
                <span className="ob-faq-pm" aria-hidden />
              </summary>
              <p className="ob-faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 13 · Book, then the wave closes the page ─────────────── */
export function Book({ b }: { b: O['book'] }) {
  return (
    <section id="book" className="ob-sec ob-sec--ink ob-book ob-rule-top" aria-labelledby="book-h">
      <Backdrop place="book" />
      <div className="ob-wrap">
        <BookForm book={b} />
      </div>
      <Wave />
    </section>
  );
}

/* Brand wave motif: navy layers, Ocean and Crest hairlines, one gold crest
 * hairline (the unit's gold), three foam dots. Static; the crest draws once. */
function Wave() {
  return (
    <div className="ob-wave" data-stage aria-hidden>
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d={WAVE_A + ' L1440,200 L0,200 Z'} fill="#0e1e3e" />
        <path d={WAVE_B + ' L1440,200 L0,200 Z'} fill="#142a54" />
        <path d={WAVE_C + ' L1440,200 L0,200 Z'} fill="#1a3a74" />
        <path d={WAVE_D + ' L1440,200 L0,200 Z'} fill="#050E1D" />
        <path d={WAVE_A} fill="none" stroke="#2E74AC" strokeWidth="0.7" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
        <path d={WAVE_B} fill="none" stroke="#3FAEDE" strokeWidth="0.6" strokeOpacity="0.42" vectorEffect="non-scaling-stroke" />
        <path
          className="ob-wave-gold"
          d={WAVE_C}
          pathLength={1}
          fill="none"
          stroke="#C4A25A"
          strokeWidth="1"
          strokeOpacity="0.6"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="270" cy="99.7" r="1.6" fill="#C6BCA3" fillOpacity="0.7" />
        <circle cx="690" cy="130.1" r="1.6" fill="#C6BCA3" fillOpacity="0.7" />
        <circle cx="1140" cy="122.5" r="1.6" fill="#C6BCA3" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

/* Wave curves from the brand construction (the plan's hero wave) */
const WAVE_A =
  'M0.0,84.2 C5.0,84.5 20.0,85.3 30.0,85.5 C40.0,85.8 50.0,85.8 60.0,85.8 C70.0,85.7 80.0,85.5 90.0,85.2 C100.0,84.9 110.0,84.5 120.0,84.1 C130.0,83.6 140.0,83.1 150.0,82.6 C160.0,82.1 170.0,81.5 180.0,81.1 C190.0,80.6 200.0,80.1 210.0,79.8 C220.0,79.4 230.0,79.2 240.0,79.0 C250.0,78.8 260.0,78.8 270.0,78.8 C280.0,78.9 290.0,79.1 300.0,79.4 C310.0,79.7 320.0,80.1 330.0,80.5 C340.0,81.0 350.0,81.6 360.0,82.2 C370.0,82.8 380.0,83.5 390.0,84.2 C400.0,84.9 410.0,85.6 420.0,86.2 C430.0,86.8 440.0,87.4 450.0,87.9 C460.0,88.4 470.0,88.8 480.0,89.0 C490.0,89.2 500.0,89.4 510.0,89.3 C520.0,89.2 530.0,89.0 540.0,88.6 C550.0,88.1 560.0,87.5 570.0,86.7 C580.0,85.9 590.0,84.9 600.0,83.8 C610.0,82.7 620.0,81.3 630.0,79.9 C640.0,78.5 650.0,76.9 660.0,75.3 C670.0,73.7 680.0,71.9 690.0,70.2 C700.0,68.5 710.0,66.7 720.0,65.0 C730.0,63.3 740.0,61.6 750.0,60.0 C760.0,58.5 770.0,57.0 780.0,55.6 C790.0,54.3 800.0,53.1 810.0,52.1 C820.0,51.1 830.0,50.2 840.0,49.6 C850.0,49.0 860.0,48.5 870.0,48.3 C880.0,48.0 890.0,48.0 900.0,48.1 C910.0,48.2 920.0,48.5 930.0,48.9 C940.0,49.3 950.0,49.9 960.0,50.6 C970.0,51.2 980.0,52.0 990.0,52.8 C1000.0,53.6 1010.0,54.4 1020.0,55.3 C1030.0,56.1 1040.0,56.9 1050.0,57.7 C1060.0,58.4 1070.0,59.2 1080.0,59.8 C1090.0,60.4 1100.0,60.9 1110.0,61.3 C1120.0,61.7 1130.0,62.0 1140.0,62.2 C1150.0,62.4 1160.0,62.4 1170.0,62.4 C1180.0,62.3 1190.0,62.2 1200.0,61.9 C1210.0,61.7 1220.0,61.4 1230.0,61.0 C1240.0,60.7 1250.0,60.2 1260.0,59.9 C1270.0,59.5 1280.0,59.0 1290.0,58.7 C1300.0,58.4 1310.0,58.1 1320.0,57.9 C1330.0,57.8 1340.0,57.7 1350.0,57.7 C1360.0,57.8 1370.0,58.0 1380.0,58.4 C1390.0,58.7 1400.0,59.2 1410.0,59.9 C1420.0,60.6 1435.0,62.0 1440.0,62.5';
const WAVE_B =
  'M0.0,114.5 C5.0,114.8 20.0,115.6 30.0,115.8 C40.0,116.1 50.0,116.3 60.0,116.2 C70.0,116.2 80.0,116.0 90.0,115.5 C100.0,115.1 110.0,114.4 120.0,113.6 C130.0,112.8 140.0,111.8 150.0,110.7 C160.0,109.5 170.0,108.2 180.0,106.9 C190.0,105.5 200.0,104.0 210.0,102.6 C220.0,101.2 230.0,99.6 240.0,98.2 C250.0,96.9 260.0,95.5 270.0,94.2 C280.0,93.0 290.0,91.9 300.0,91.0 C310.0,90.0 320.0,89.3 330.0,88.7 C340.0,88.1 350.0,87.7 360.0,87.4 C370.0,87.2 380.0,87.2 390.0,87.2 C400.0,87.3 410.0,87.6 420.0,87.9 C430.0,88.2 440.0,88.6 450.0,89.0 C460.0,89.4 470.0,89.9 480.0,90.3 C490.0,90.7 500.0,91.1 510.0,91.3 C520.0,91.6 530.0,91.8 540.0,91.8 C550.0,91.8 560.0,91.7 570.0,91.4 C580.0,91.2 590.0,90.7 600.0,90.2 C610.0,89.6 620.0,88.9 630.0,88.1 C640.0,87.3 650.0,86.4 660.0,85.5 C670.0,84.5 680.0,83.5 690.0,82.5 C700.0,81.6 710.0,80.5 720.0,79.7 C730.0,78.9 740.0,78.0 750.0,77.4 C760.0,76.8 770.0,76.3 780.0,76.0 C790.0,75.7 800.0,75.6 810.0,75.7 C820.0,75.9 830.0,76.2 840.0,76.7 C850.0,77.2 860.0,78.0 870.0,78.8 C880.0,79.7 890.0,80.8 900.0,81.9 C910.0,83.0 920.0,84.3 930.0,85.6 C940.0,86.9 950.0,88.2 960.0,89.5 C970.0,90.8 980.0,92.1 990.0,93.2 C1000.0,94.4 1010.0,95.5 1020.0,96.4 C1030.0,97.3 1040.0,98.1 1050.0,98.7 C1060.0,99.3 1070.0,99.7 1080.0,100.0 C1090.0,100.3 1100.0,100.4 1110.0,100.4 C1120.0,100.4 1130.0,100.2 1140.0,100.0 C1150.0,99.8 1160.0,99.5 1170.0,99.1 C1180.0,98.8 1190.0,98.4 1200.0,98.2 C1210.0,97.9 1220.0,97.6 1230.0,97.5 C1240.0,97.3 1250.0,97.3 1260.0,97.4 C1270.0,97.5 1280.0,97.7 1290.0,98.2 C1300.0,98.6 1310.0,99.2 1320.0,99.9 C1330.0,100.6 1340.0,101.5 1350.0,102.5 C1360.0,103.5 1370.0,104.7 1380.0,105.9 C1390.0,107.1 1400.0,108.4 1410.0,109.6 C1420.0,110.9 1435.0,112.7 1440.0,113.3';
const WAVE_C =
  'M0.0,116.5 C5.0,116.0 20.0,114.6 30.0,113.7 C40.0,112.8 50.0,111.9 60.0,111.1 C70.0,110.3 80.0,109.5 90.0,108.7 C100.0,108.0 110.0,107.3 120.0,106.8 C130.0,106.2 140.0,105.7 150.0,105.4 C160.0,105.0 170.0,104.7 180.0,104.6 C190.0,104.5 200.0,104.5 210.0,104.6 C220.0,104.7 230.0,104.9 240.0,105.3 C250.0,105.6 260.0,106.1 270.0,106.7 C280.0,107.3 290.0,108.0 300.0,108.8 C310.0,109.6 320.0,110.5 330.0,111.5 C340.0,112.5 350.0,113.5 360.0,114.6 C370.0,115.7 380.0,116.9 390.0,118.0 C400.0,119.2 410.0,120.4 420.0,121.6 C430.0,122.7 440.0,123.9 450.0,125.0 C460.0,126.1 470.0,127.2 480.0,128.2 C490.0,129.2 500.0,130.2 510.0,131.1 C520.0,132.0 530.0,132.8 540.0,133.5 C550.0,134.2 560.0,134.8 570.0,135.3 C580.0,135.8 590.0,136.3 600.0,136.6 C610.0,136.9 620.0,137.1 630.0,137.2 C640.0,137.4 650.0,137.4 660.0,137.4 C670.0,137.4 680.0,137.2 690.0,137.1 C700.0,136.9 710.0,136.7 720.0,136.4 C730.0,136.1 740.0,135.8 750.0,135.5 C760.0,135.1 770.0,134.8 780.0,134.4 C790.0,134.1 800.0,133.7 810.0,133.4 C820.0,133.1 830.0,132.7 840.0,132.4 C850.0,132.2 860.0,131.9 870.0,131.7 C880.0,131.4 890.0,131.2 900.0,131.1 C910.0,130.9 920.0,130.8 930.0,130.7 C940.0,130.7 950.0,130.6 960.0,130.6 C970.0,130.6 980.0,130.6 990.0,130.6 C1000.0,130.6 1010.0,130.6 1020.0,130.6 C1030.0,130.6 1040.0,130.7 1050.0,130.6 C1060.0,130.6 1070.0,130.6 1080.0,130.5 C1090.0,130.4 1100.0,130.3 1110.0,130.2 C1120.0,130.0 1130.0,129.8 1140.0,129.5 C1150.0,129.2 1160.0,128.9 1170.0,128.4 C1180.0,128.0 1190.0,127.5 1200.0,127.0 C1210.0,126.4 1220.0,125.7 1230.0,125.1 C1240.0,124.4 1250.0,123.6 1260.0,122.8 C1270.0,122.0 1280.0,121.1 1290.0,120.2 C1300.0,119.3 1310.0,118.3 1320.0,117.4 C1330.0,116.4 1340.0,115.5 1350.0,114.5 C1360.0,113.6 1370.0,112.6 1380.0,111.8 C1390.0,110.9 1400.0,110.0 1410.0,109.2 C1420.0,108.5 1435.0,107.5 1440.0,107.1';
const WAVE_D =
  'M0.0,143.9 C5.0,144.1 20.0,144.8 30.0,145.1 C40.0,145.4 50.0,145.7 60.0,145.8 C70.0,146.0 80.0,146.1 90.0,146.1 C100.0,146.1 110.0,146.0 120.0,145.9 C130.0,145.8 140.0,145.6 150.0,145.5 C160.0,145.3 170.0,145.1 180.0,144.9 C190.0,144.8 200.0,144.6 210.0,144.6 C220.0,144.5 230.0,144.5 240.0,144.5 C250.0,144.6 260.0,144.7 270.0,145.0 C280.0,145.2 290.0,145.6 300.0,146.0 C310.0,146.5 320.0,147.1 330.0,147.7 C340.0,148.4 350.0,149.2 360.0,150.0 C370.0,150.8 380.0,151.7 390.0,152.7 C400.0,153.6 410.0,154.6 420.0,155.6 C430.0,156.6 440.0,157.6 450.0,158.5 C460.0,159.5 470.0,160.4 480.0,161.2 C490.0,162.1 500.0,162.8 510.0,163.5 C520.0,164.1 530.0,164.7 540.0,165.1 C550.0,165.5 560.0,165.7 570.0,165.9 C580.0,166.0 590.0,166.0 600.0,165.9 C610.0,165.8 620.0,165.6 630.0,165.2 C640.0,164.9 650.0,164.4 660.0,163.9 C670.0,163.4 680.0,162.8 690.0,162.2 C700.0,161.6 710.0,160.9 720.0,160.3 C730.0,159.7 740.0,159.0 750.0,158.4 C760.0,157.9 770.0,157.3 780.0,156.8 C790.0,156.3 800.0,155.9 810.0,155.6 C820.0,155.3 830.0,155.0 840.0,154.8 C850.0,154.7 860.0,154.6 870.0,154.6 C880.0,154.6 890.0,154.7 900.0,154.8 C910.0,154.9 920.0,155.1 930.0,155.2 C940.0,155.4 950.0,155.6 960.0,155.8 C970.0,156.0 980.0,156.2 990.0,156.3 C1000.0,156.4 1010.0,156.5 1020.0,156.4 C1030.0,156.4 1040.0,156.3 1050.0,156.1 C1060.0,155.9 1070.0,155.6 1080.0,155.1 C1090.0,154.7 1100.0,154.2 1110.0,153.6 C1120.0,152.9 1130.0,152.2 1140.0,151.4 C1150.0,150.6 1160.0,149.6 1170.0,148.7 C1180.0,147.8 1190.0,146.8 1200.0,145.8 C1210.0,144.8 1220.0,143.7 1230.0,142.7 C1240.0,141.8 1250.0,140.8 1260.0,139.9 C1270.0,139.0 1280.0,138.2 1290.0,137.5 C1300.0,136.8 1310.0,136.2 1320.0,135.7 C1330.0,135.2 1340.0,134.9 1350.0,134.7 C1360.0,134.4 1370.0,134.3 1380.0,134.4 C1390.0,134.4 1400.0,134.6 1410.0,134.8 C1420.0,135.1 1435.0,135.7 1440.0,135.9';
