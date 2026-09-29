/* Emails sent per sending day, across our own six outbound campaigns.
 * Aggregated counts only: a date and a number, nothing else. Built from
 * sends.json (Instantly campaign totals, snapshot 27 Sept 2026), which is
 * itself a sum of daily sent. The raw Instantly snapshot holds prospects'
 * addresses and reply text and must never be imported into the site.
 * 37 sending days, 3 Aug to 25 Sept 2026, 2,996 emails. */

export type SendDay = readonly [date: string, count: number];

export const SENDS: readonly SendDay[] = [
  ['2026-08-03', 15],
  ['2026-08-04', 21],
  ['2026-08-05', 21],
  ['2026-08-06', 21],
  ['2026-08-07', 21],
  ['2026-08-10', 21],
  ['2026-08-11', 45],
  ['2026-08-12', 45],
  ['2026-08-13', 45],
  ['2026-08-14', 45],
  ['2026-08-17', 70],
  ['2026-08-18', 105],
  ['2026-08-19', 105],
  ['2026-08-20', 80],
  ['2026-08-21', 80],
  ['2026-08-24', 80],
  ['2026-08-25', 98],
  ['2026-08-26', 98],
  ['2026-08-27', 98],
  ['2026-08-28', 98],
  ['2026-08-31', 100],
  ['2026-09-01', 100],
  ['2026-09-02', 100],
  ['2026-09-03', 100],
  ['2026-09-04', 100],
  ['2026-09-07', 100],
  ['2026-09-08', 112],
  ['2026-09-09', 112],
  ['2026-09-10', 112],
  ['2026-09-11', 112],
  ['2026-09-14', 112],
  ['2026-09-15', 112],
  ['2026-09-16', 112],
  ['2026-09-17', 112],
  ['2026-09-18', 64],
  ['2026-09-24', 112],
  ['2026-09-25', 112],
] as const;
