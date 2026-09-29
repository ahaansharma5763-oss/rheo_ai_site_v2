/* The nine step figures, by step number. Each takes its step from content.ts.
 *
 * These are imported statically on purpose. Splitting them into lazy chunks
 * was tried (29 Sept): React then streams each figure behind a Suspense
 * fallback, so a visitor without script sees empty frames, and every chunk
 * repeats the shared hooks and copy. Static imports cost about 19KB gzipped
 * and keep the server HTML complete. */

import type { ComponentType } from 'react';
import type { Step } from '../types';
import Step1Campaigns from './Step1Campaigns';
import Step2Setup from './Step2Setup';
import Step3Check from './Step3Check';
import Step4Signals from './Step4Signals';
import Step5Verify from './Step5Verify';
import Step6Sequence from './Step6Sequence';
import Step7Triage from './Step7Triage';
import Step8Channels from './Step8Channels';
import Step9Lifecycle from './Step9Lifecycle';

export const FIGURES: Record<number, ComponentType<{ step: Step }>> = {
  1: Step1Campaigns,
  2: Step2Setup,
  3: Step3Check,
  4: Step4Signals,
  5: Step5Verify,
  6: Step6Sequence,
  7: Step7Triage,
  8: Step8Channels,
  9: Step9Lifecycle,
};
