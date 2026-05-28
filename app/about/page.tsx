import type { Metadata } from 'next';
import Nav from '@/components/shared/Nav';
import Footer from '@/components/shared/Footer';
import PageGradient from '@/components/shared/PageGradient';
import AboutHero from '@/components/about/AboutHero';
import TheName from '@/components/about/TheName';
import TheWave from '@/components/about/TheWave';
import WhatWeBelieve from '@/components/about/WhatWeBelieve';
import HowWeGotHere from '@/components/about/HowWeGotHere';
import WhatWeBuildToward from '@/components/about/WhatWeBuildToward';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About · Rheo AI',
  description:
    'Rheo means to flow. We build the systems that quietly run your business. Brand philosophy, origin story, and what we are building toward.',
  openGraph: {
    title: 'About · Rheo AI',
    description: 'We build the systems that quietly run your business.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <AboutHero />
        <TheName />
        <TheWave />
        <WhatWeBelieve />
        <HowWeGotHere />
        <WhatWeBuildToward />
        <AboutCTA />
        <Footer />
      </div>
    </main>
  );
}
