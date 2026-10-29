/* All words on /forecast live here so the copy gate reads one file.
 * Promise rules (Ahaan, 29 Oct 2026, and the copy gate): 10 companies, a public dated reason,
 * never "willing to buy"; no prices; no guarantees; UAE and GCC buyers first. */

export const MARKETS = ['UAE', 'Saudi Arabia', 'Qatar', 'Rest of GCC', 'India', 'Other'] as const
export const DEALS = ['Under AED 10,000', 'AED 10,000 to 50,000', 'AED 50,000 to 200,000', 'Over AED 200,000'] as const
export const SOURCES = ['Referrals', 'Partners or vendors', 'Events', 'Ads', 'Our own outbound', 'Other'] as const
export const OWNERS = ['I do', 'A sales team', 'Nobody full time'] as const

export const FALLBACK_EMAIL = 'ahaan@rheoai.co.in'

export const forecast = {
  meta: {
    title: 'Your Pipeline Forecast | Rheo AI',
    description:
      'Ten companies in your market with a dated, public reason to need what you sell, the person who would sign at each, and how to reach them. Free, from Rheo AI.',
  },
  hero: {
    eyebrow: 'Pipeline Forecast · Free',
    heading: 'Ten companies with a dated, public reason to need what you sell.',
    sub: 'Tell us what you sell and who buys it. Within two working days you get 10 companies in your market. Each comes with a dated, public reason to need what you sell, the person who would sign and why it is them, and a public way to reach them. It is free, and yours to keep.',
    points: [
      'Every reason dated and linked to its public source',
      'The person who would sign at each company, and why it is them',
      'Your market counted from public sources, with the method shown',
      'Your email domain read from its public records: what passes, what to fix',
    ],
  },
  inside: {
    eyebrow: 'What each company comes with',
    heading: 'Every company comes with a source you can open.',
    items: [
      {
        title: 'Why now',
        body: 'The public signal, its date and a link to where it was published. For example: a job ad that names the system they run, a hire they are making, or an announcement about their next phase.',
      },
      {
        title: 'Who signs',
        body: 'The person we judge would sign for what you sell, their role, the public page that names them, and our reason for choosing them.',
      },
      {
        title: 'How to reach them',
        body: 'Public routes only: the email address and phone number the company publishes, and the person’s public LinkedIn profile where there is one. We do not guess addresses.',
      },
    ],
    whole:
      'The forecast also counts your market from public sources and shows the method. It removes any customer of yours that we can find in public. It reads the public records of your email domain (SPF, DKIM and DMARC) and tells you what passes and what to fix.',
  },
  how: {
    eyebrow: 'How it works',
    steps: [
      { title: 'A few minutes from you', body: 'Three short steps: your business, your market, where we send it.' },
      { title: 'We confirm within 2 hours', body: 'Monday to Friday, 8:00 to 18:00 UAE time, we reply to confirm your request and the date your forecast arrives.' },
      { title: 'We research your market', body: 'Our agents gather the evidence. A person checks every company and every source before it goes in.' },
      { title: 'The walkthrough', body: 'Within two working days you get the forecast, and we take you through it on a 45-minute call.' },
    ],
  },
  fit: {
    eyebrow: 'Who it is for',
    forTitle: 'Built for',
    forBody:
      'B2B firms selling to businesses in the UAE and the wider GCC, where a first-year deal is worth AED 50,000 or more. That includes ERP and software partners, IT and cyber security firms, distributors and B2B services.',
    notTitle: 'Not built for',
    notBody:
      'Businesses that sell to individuals, firms that win most of their work through tenders, and regulated professions whose rules do not allow approaching clients directly.',
  },
  faq: {
    eyebrow: 'Questions',
    items: [
      {
        q: 'Is it really free?',
        a: 'Yes. No card and no contract. The forecast is yours to keep whether or not we work together afterwards.',
      },
      {
        q: 'What if my market is small?',
        a: 'Some markets cannot give 10 companies with a real reason this month. If yours is one of them, you get the number we can stand behind, and we tell you why. We never pad the list.',
      },
      {
        q: 'What happens after the walkthrough?',
        a: 'If you want us to run outreach to those companies, we cover that on the walkthrough. If not, the forecast is yours to use as you like.',
      },
      {
        q: 'What does forecast mean here?',
        a: 'It is a researched view of where your next deals can come from: named companies, named buyers and dated reasons. It does not predict how many deals you will win.',
      },
      {
        q: 'What do you do with my details?',
        a: 'We use these details to decide whether we can build your forecast, to build it, and to contact you about it. We do not sell them and there is no mailing list.',
      },
    ],
  },
  form: {
    eyebrow: 'Get your forecast',
    heading: 'Three short steps.',
    steps: ['Your business', 'Your market', 'Where we send it'],
    fields: {
      website: 'Company website',
      websitePh: 'yourcompany.com',
      sells: 'What do you sell?',
      sellsPh: 'For example: Odoo implementation and support for manufacturers',
      buyers: 'Who buys it?',
      buyersPh: 'The kind of company, and the role that signs. For example: finance directors at distributors with 50 to 500 staff',
      markets: 'Where are the buyers you want?',
      deal: 'What is a typical first-year deal worth?',
      sources: 'Where do new clients come from today?',
      owner: 'Who finds new clients today?',
      name: 'Full name',
      role: 'Your role (optional)',
      email: 'Work email',
      phone: 'Phone, with country code',
      phonePh: '+971 50 123 4567',
      pickAny: 'Choose all that apply',
      pickOne: 'Choose one',
    },
    next: 'Next',
    back: 'Back',
    submit: 'Request my forecast',
    sending: 'Sending',
    missing: 'Please fill in the highlighted fields.',
    privacy: 'We use these details to decide whether we can build your forecast, to build it, and to contact you about it. We do not sell them and there is no mailing list.',
    error: `That did not go through. Please try again, or email ${FALLBACK_EMAIL} and we will pick it up from there.`,
    thanksTitle: 'We have your details.',
    thanksBody: 'We will reply within 2 working hours (Monday to Friday, 8:00 to 18:00 UAE time). Anything sent outside those hours is answered by 10:00 UAE time on the next working day.',
    thanksNext: 'Your forecast follows within two working days, and we will set a time to walk you through it.',
  },
} as const

/* The band that sends visitors to /forecast from every other page. One gold per band: the button hairline. */
export const FORECAST_CTA = {
  eyebrow: 'Pipeline Forecast · Free',
  button: 'Get your free forecast',
  sub: 'Free. Researched in two working days. Yours to keep.',
  headings: {
    'home-mid': 'If you sell to other businesses, see ten with a dated, public reason to need what you sell: a job ad, a hire or an announcement.',
    'home-close': 'Start with the ten companies we would write to first.',
    'outbound-top': 'See who we would write to for you, before you book a call.',
    'outbound-book': 'See what we find in your market before you book. Get your Pipeline Forecast.',
    default: 'See the first ten companies we would write to for you.',
  } as Record<string, string>,
} as const

/* /forecast: the anatomy of one entry. Three entries from a forecast built in October 2026, names removed. */
export const SHOWCASE = {
  eyebrow: 'One entry, taken apart',
  heading: 'What a forecast entry looks like.',
  note: 'Three entries from a forecast we built in October 2026, with names removed.',
  parts: [
    { key: 'why', label: 'Why now', body: 'The public signal, its date and where it was published.' },
    { key: 'who', label: 'Who signs', body: 'The person we judge would sign, and why it is them.' },
    { key: 'route', label: 'How to reach them', body: 'Public routes only. Nothing guessed.' },
  ],
  entries: [
    {
      company: 'Printing and packaging house, UAE',
      size: 'About 200 staff',
      date: '22 Oct 2026',
      source: 'Job ad, NaukriGulf',
      why: 'Hiring an Odoo developer to migrate their system between versions and connect it to outside applications.',
      who: 'Our judgement: the general manager of its parent group. The group site says the role oversees day-to-day operations across the group’s companies.',
      route: 'The group’s published email and main line, and the general manager’s public profile.',
    },
    {
      company: 'Quick-service restaurant operator, UAE',
      size: '501 to 1,000 staff',
      date: '5 Oct 2026',
      source: 'Job ad, NaukriGulf',
      why: 'Hiring an IT coordinator to support ERP users in inventory, purchasing and recipes across the restaurants.',
      who: 'Our judgement: the chairman. The company’s own team page lists the chairman as its leader, and a change of system across every outlet is an owner-level decision.',
      route: 'The company’s published email and phone number.',
    },
    {
      company: 'Family entertainment and early learning group, UAE',
      size: '201 to 500 staff',
      date: '20 Oct 2026',
      source: 'Job ad, LinkedIn',
      why: 'Hiring a senior accountant for revenue, VAT and corporate tax across the group, with ERP and POS experience.',
      who: 'Our judgement: the founder and CEO. The company site names the role as head of the group, and the ad covers VAT and tax across the whole group.',
      route: 'The group’s published email and the founder’s public profile.',
    },
  ],
  prev: 'Previous entry',
  next: 'Next entry',
  pause: 'Pause',
  play: 'Play',
} as const

/* Reactions inside the form */
export const FORM_LIVE = {
  smallDeal: 'The forecast is built for first-year deals of AED 50,000 or more. You can still send it, and we will tell you plainly whether it fits.',
  indiaOnly: 'We research the UAE and the wider GCC first. You can still send it, and we will tell you plainly whether we can cover India.',
  summaryTitle: 'Your forecast will look for',
  summaryRows: { sells: 'What you sell', buyers: 'Who buys it', markets: 'Where' },
  stickyCta: 'Request my forecast',
} as const
