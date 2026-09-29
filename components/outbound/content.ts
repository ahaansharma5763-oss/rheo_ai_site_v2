/**
 * Every word on rheoai.co.in/outbound. Copy workstream owns this file; Page imports it and never edits it.
 *
 * Sources: the explainer film script (v5, critic-passed 28 Sept), offer.html, Sales Book §2 and Part 9,
 * Offer Bible §10, and the claims cleared in the page plan's "Words and claims" table (29 Sept 2026).
 *
 * To retime the film after the web cut, edit only the `t` values in `chapters` below.
 * Each chapter's `seconds` and each step's `filmChapter` are worked out from them.
 */

export type Chapter = { t: string; seconds: number; title: string; section: string /* element id on the page */ };

export type Outbound = {
  meta: { title: string; description: string };
  hero: { headline: string; sub: string; ctaFilm: string; filmLength: string; ctaCall: string; loopLabel: string };
  problem: { eyebrow: string; heading: string; breaks: { label: string; line: string }[]; spam: { sent: string; theirInbox: string; note: string } };
  turn: { heading: string; verbs: string[]; calendarEntry: string };
  stepsIntro: { eyebrow: string; heading: string; body: string };
  steps: { id: string; n: number; title: string; filmChapter: string; body: string; touchLabel: string; srDescription: string; proof?: string }[];
  report: { eyebrow: string; heading: string; body: string; tiles: string[]; qualified: string; opens: { label: string; why: string }; tag: string };
  proof: {
    eyebrow: string;
    heading: string;
    funnel: { value: string; label: string; rate: string }[];
    sumline: string;
    scaleLine: string;
    chartLabel: string;
    thread: { label: string; time: string; state: string }[];
    threadNote: string;
  };
  promises: { eyebrow: string; heading: string; body: string; guardrails: { label: string; value: string }[]; refuse: string[] };
  yourPart: { eyebrow: string; heading: string; items: string[]; close: string };
  timeline: { eyebrow: string; heading: string; points: { when: string; what: string }[] };
  fit: { eyebrow: string; heading: string; forList: string[]; notFor: string[]; sectors: string[] };
  faq: { q: string; a: string }[];
  book: {
    eyebrow: string;
    heading: string;
    sub: string;
    fields: { name: string; email: string; website: string; sells: string; capacity: string };
    submit: string;
    sending: string;
    error: string;
    after: string;
    privacy: string;
  };
  bridge: { line: string; link: string };
  film: { chapters: Chapter[]; transcriptHeading: string; captionsLabel: string };
};

const toSeconds = (t: string): number => {
  const [m, s] = t.split(":").map(Number);
  return m * 60 + s;
};

const chapter = (t: string, title: string, section: string, exact?: number): Chapter => ({ t, seconds: exact ?? toSeconds(t), title, section });

/* The film's progress-rail titles. Used for the step sections and their film chapters. */
const stepTitles = [
  "Who you want as customers",
  "Your own sending setup",
  "AI checks every company first",
  "A reason to write",
  "Every address checked",
  "Three short emails",
  "Sorted in under a minute",
  "Email, LinkedIn, call, WhatsApp",
  "Booked, confirmed, reminded",
];

const stepChapterTitle = (n: number): string => `Step ${n} · ${stepTitles[n - 1]}`;

/* Start times from the web cut (explainer/web/chapters.json, 29 Sept). The last argument is the exact start in seconds, used for seeking. */
const chapters: Chapter[] = [
  chapter("0:00", "The problem", "hero", 0),
  chapter("0:06", "Where it goes wrong", "problem", 6.1),
  chapter("0:35", "What we do", "turn", 35.633),
  chapter("0:52", stepChapterTitle(1), "step-1", 52.5),
  chapter("1:05", stepChapterTitle(2), "step-2", 65.633),
  chapter("1:33", stepChapterTitle(3), "step-3", 93.267),
  chapter("1:43", stepChapterTitle(4), "step-4", 103.6),
  chapter("1:55", stepChapterTitle(5), "step-5", 115.767),
  chapter("2:06", stepChapterTitle(6), "step-6", 126.567),
  chapter("2:24", stepChapterTitle(7), "step-7", 144.833),
  chapter("2:54", stepChapterTitle(8), "step-8", 174.833),
  chapter("3:17", stepChapterTitle(9), "step-9", 197.333),
  chapter("3:33", "The monthly report", "report", 213.767),
  chapter("4:00", "Our own numbers", "proof", 240),
  chapter("4:31", "What we won't promise, and your part", "promises", 271.867),
  chapter("4:57", "How it starts", "book", 297.667),
];

/* A step's filmChapter is the start time (m:ss) of its chapter in the film. */
const startOf = (section: string): string => chapters.find((c) => c.section === section)?.t ?? "0:00";

export const outbound: Outbound = {
  meta: {
    title: "Managed Outbound Channel · Rheo AI",
    description:
      "We find the right companies, write to them, follow up, answer the replies and book the meetings into your calendar. Watch the film, then book a call.",
  },

  hero: {
    headline: "Not enough leads coming in.",
    sub: "We find the right companies, write to them, follow up, answer the replies, and book the meetings into your calendar.",
    ctaFilm: "Watch the film",
    filmLength: "5:23",
    ctaCall: "Book a 30-minute call",
    loopLabel: "The opening of the film, playing silently. An inbox refreshes, and nothing new arrives.",
  },

  problem: {
    eyebrow: "Where it goes wrong",
    heading: "So you try emailing new companies. It usually goes wrong in four places.",
    breaks: [
      {
        label: "Nobody has the time",
        line: "Client work comes first, so emailing new companies moves to next week, and then the week after.",
      },
      {
        label: "Emails land in spam",
        line: "Your Sent folder shows a tick while their inbox files your email under Spam. There's no bounce and no error, so nobody tells you.",
      },
      {
        label: "The list is old",
        line: "Emails bounce back, or reach someone who has left the company or works in another department.",
      },
      {
        label: "Replies wait for days",
        line: "A reply on Friday evening gets read on Monday, and the people who said not now are forgotten.",
      },
    ],
    spam: {
      sent: "Your Sent folder · Sent",
      theirInbox: "Their inbox · Spam",
      note: "No bounce. No error.",
    },
  },

  turn: {
    heading: "So we take the whole job off your hands. It's called the Managed Outbound Channel.",
    verbs: ["Find", "Write", "Follow up", "Answer", "Book"],
    calendarEntry: "Intro call, Thu 11:00",
  },

  stepsIntro: {
    eyebrow: "How it works",
    heading: "Nine steps, from who you want to a meeting in your calendar",
    body: "Steps one to six reach the right people. Steps seven to nine are what happens when they reply. Each step has its own chapter in the film.",
  },

  steps: [
    {
      id: "step-1",
      n: 1,
      title: stepTitles[0],
      filmChapter: startOf("step-1"),
      body: "We agree who you want as customers, by industry, city, company size and who makes the decision. Each campaign then gets one goal, like reaching new companies, reviving old leads, or finding more like your best customers.",
      touchLabel: "Five campaign types, each with one goal",
      srDescription:
        "Still from the film. A card titled Your ideal customer lists an industry, three cities, a company size and who decides. Beside it, five campaign cards each carry one goal: companies that have never heard of you, companies where something just changed, old leads gone quiet, not-nows and no-shows, and companies like your best customers. Illustrative.",
    },
    {
      id: "step-2",
      n: 2,
      title: stepTitles[1],
      filmChapter: startOf("step-2"),
      body: "We set up separate inboxes on web addresses like yours, so your main email stays safe. Each one is set up so Gmail knows it's you and warmed up for three weeks, starting with a few emails a day, on an account used only for you. Then we send from 18,000 up to 80,000+ emails a month, depending on what you need.",
      touchLabel: "Separate inboxes on web addresses like yours, with your main email kept out of it",
      srDescription:
        "Still from the film. At the top, yourcompany.com, your main email, sits inside a gold line labelled Never used for outreach. Below it, five web addresses built on the same name, such as getyourcompany.com and meetyourcompany.com, each with four inboxes on first names. Illustrative.",
    },
    {
      id: "step-3",
      n: 3,
      title: stepTitles[2],
      filmChapter: startOf("step-3"),
      body: "We search wide, across maps, business directories, web search and professional networks. Then an AI agent reads each company's website to check it's the kind you want. We only look people up at the companies that pass.",
      touchLabel: "Two sample companies checked, one passing and one skipped (Illustrative)",
      srDescription:
        "Still from the film. A browser shows the homepage of a sample company, Altair Executive Search, with two lines highlighted and a panel stamped Fits your customer profile. A second sample company, Kestrel Talent Partners, mentions staffing once in a blog post and is marked Not a fit, skipped. Under the company that passed, a person card reads Founder, email found. Both companies are illustrative.",
    },
    {
      id: "step-4",
      n: 4,
      title: stepTitles[3],
      filmChapter: startOf("step-4"),
      body: "We watch for a reason to write, like a new hire, funding, a tender or a new office. So each first email opens with a line meant only for that company. Where there's no fresh reason, the line is about something specific in their business.",
      touchLabel: "A reason to write, turned into the email's first line",
      srDescription:
        "Still from the film. A watchlist shows four recent reasons to write, each with how recent it is: a Head of Sales hire, a seed round, a published tender and a new office. The hiring reason has become the first line of an email, which reads: Saw you're hiring a Head of Sales for the Hyderabad team. Illustrative.",
    },
    {
      id: "step-5",
      n: 5,
      title: stepTitles[4],
      filmChapter: startOf("step-5"),
      body: "We check that every address is real, that it belongs to the company, and that the person still works there. If more than two in a hundred on a list would bounce, that list isn't sent.",
      touchLabel: "Each contact checked, down to whether they still work there",
      srDescription:
        "Still from the film. Five contacts pass through three checks: the address is real, it belongs to the company, and the person still works there. Four pass all three. One fails the last check, marked Left in June, and moves into a Removed tray. Illustrative.",
      proof: "Our own sending: 13 bounces in 2,996 emails (0.43%), and nobody unsubscribed.",
    },
    {
      id: "step-6",
      n: 6,
      title: stepTitles[5],
      filmChapter: startOf("step-6"),
      body: "Three short emails go out in one week, on day 0, day 3 and day 7, and the third comes with a new angle. Then we stop, or move to LinkedIn for the people worth it. We test the wording one change at a time.",
      touchLabel: "Day 0, day 3 and day 7, then a stop or a move to LinkedIn",
      srDescription:
        "Still from the film. A timeline shows three emails on day 0, day 3 and day 7. The third is highlighted and labelled New angle. After it, a stop mark reads No fourth email, and a branch leads to a LinkedIn connection note.",
    },
    {
      id: "step-7",
      n: 7,
      title: stepTitles[6],
      filmChapter: startOf("step-7"),
      body: "Within a minute of a reply, an AI agent reads it and sorts it: interested, a question, not now, or an out-of-office. It's answered your way, by booking them straight in, asking your questions first, or handing them to your team. At first, a person approves every reply, and quotes and contracts always go to your team.",
      touchLabel: "A reply read and sorted into its lane within a minute",
      srDescription:
        "Still from the film. A reply card sits in the Interested lane of a board with seven lanes: interested, unsure, question, referral, not now, unsubscribe and automatic. A stopwatch in the corner has stopped under a minute. An out-of-office reply sits in the automatic lane, marked Not counted as a reply. Illustrative.",
    },
    {
      id: "step-8",
      n: 8,
      title: stepTitles[7],
      filmChapter: startOf("step-8"),
      body: "The conversation carries on by email, LinkedIn, a call, or WhatsApp once they've agreed. Our research goes with them, so a brief is ready before the meeting: who they are, why we wrote, and what to ask. Your CRM, where you keep track of customers, fills itself in.",
      touchLabel: "One conversation carried across four channels",
      srDescription:
        "Still from the film. One conversation runs down a single thread across four channels of equal size: an email, a LinkedIn message, a 14-minute call and a WhatsApp message tagged They chose to continue here. Illustrative.",
    },
    {
      id: "step-9",
      n: 9,
      title: stepTitles[8],
      filmChapter: startOf("step-9"),
      body: "Meetings are booked close in, within about three days where we can, then confirmed and reminded. No-shows get followed up. If someone says not now, we note why and set a date, and the follow-up goes out by itself.",
      touchLabel: "A meeting booked, confirmed and reminded, and a no-show followed up",
      srDescription:
        "Still from the film. A week calendar shows an intro call booked on Thursday, confirmed, with a reminder set. A Tuesday meeting is marked No-show, and a follow-up email is queued beneath it. Illustrative.",
    },
  ],

  report: {
    eyebrow: "The monthly report",
    heading: "Every month, one report",
    body: "It shows meetings held, qualified conversations, how many replied, and what each meeting cost. Every rate is shown with how many emails it's based on, so a small sample is never passed off as a result.",
    tiles: ["Meetings held", "Qualified conversations", "Reply rate", "Cost per meeting"],
    qualified: "Qualified means they fit, they're interested, and they've confirmed a meeting.",
    opens: {
      label: "Open rate",
      why: "We don't track opens. Tracking needs a hidden tracker in every email, and spam filters count it against you. Apple's mail privacy feature also fakes about half of all opens, so the number would mislead you anyway.",
    },
    tag: "Layout illustrative",
  },

  proof: {
    eyebrow: "Our own numbers",
    heading: "We do our own outreach too. This is what it has done since August.",
    funnel: [
      { value: "1,210", label: "people contacted", rate: "2,996 emails" },
      { value: "17", label: "wrote back, auto-replies not counted", rate: "1.4% of them" },
      { value: "9", label: "qualified conversations held", rate: "53% of those" },
      { value: "7", label: "demos booked", rate: "78% of those" },
    ],
    sumline: "One in 134 people we emailed ended up in a qualified conversation.",
    scaleLine:
      "Sending more reaches more of the right people, so we size the sending to how many conversations your team can take in a week.",
    chartLabel: "Emails we sent each day, 3 Aug to 25 Sept 2026",
    /* An empty time shows no time. */
    thread: [
      { label: "Email 1", time: "9 Sept", state: "No reply" },
      { label: "Email 2", time: "16 Sept", state: "No reply" },
      { label: "Email 3", time: "12:18 pm, 25 Sept", state: "Sent" },
      { label: "Reply", time: "1:13 pm", state: "55 minutes later" },
      { label: "Call", time: "27 Sept", state: "Held" },
      { label: "Demo", time: "", state: "Booked" },
    ],
    threadNote: "A real lead. Name withheld.",
  },

  promises: {
    eyebrow: "What we won't promise",
    heading: "We never promise a number of leads, replies or meetings.",
    body: "Judge us on whether the work is done properly, and whether anybody got lost. Every week we hold ourselves to four checks, and there are three things we won't do for anyone.",
    guardrails: [
      { label: "Bounces", value: "Under 2 in 100" },
      { label: "Spam complaints", value: "Under 0.10%, or 1 in 1,000" },
      { label: "Emails landing in the inbox", value: "Above 70%" },
      { label: "Web addresses verified as you", value: "Every one" },
    ],
    refuse: [
      "Tracking opens, because the hidden tracker counts against you with spam filters",
      "Sending WhatsApp blasts, because cold WhatsApp messages break Meta's rules and get numbers banned",
      "Automating LinkedIn, because it breaks LinkedIn's rules and puts your account at risk",
    ],
  },

  yourPart: {
    eyebrow: "Your part",
    heading: "Your part is small.",
    items: ["Tell us who to reach", "Give us one hour on how you sell", "Name who takes the meetings", "Approve once a month"],
    close: "Then you take the conversations.",
  },

  timeline: {
    eyebrow: "How it starts",
    heading: "What happens, and when",
    points: [
      { when: "The call", what: "A 30-minute call. If it isn't a fit, we tell you on the call." },
      {
        when: "Within 5 working days",
        what: "A written plan with the first ten companies we'd contact and the reason for each. Free, and yours to keep.",
      },
      { when: "Within 48 hours of signing", what: "Kickoff, where we agree who you want to reach." },
      { when: "By day 7", what: "Your sending setup is live, and the three-week warm-up begins." },
      { when: "By day 14", what: "Your first 50 companies, each with the reason we'd write to them." },
      { when: "Week 4", what: "The first emails go out." },
      { when: "Week 6", what: "Sending reaches full volume." },
      { when: "Day 60 of sending", what: "A written verdict on whether it's working, and what to change if it isn't." },
    ],
  },

  fit: {
    eyebrow: "Who it's for",
    heading: "Who it suits, and who it doesn't",
    forList: [
      "Indian B2B service firms with 10 to 200 people",
      "The founder or one sales head still does the selling",
      "Your buyer is a named person who can decide",
      "What you sell already works, and you have customers who'll vouch for it",
    ],
    notFor: [
      "Firms with fewer than 10 people",
      "Firms that already have a team whose whole job is booking first meetings",
      "Anyone who wants a promised number of meetings",
      "CAs, company secretaries, lawyers, architects and SEBI-registered advisers, whose rules don't allow them to seek work this way",
    ],
    sectors: [
      "Staffing and executive search",
      "IT services and software development",
      "Cybersecurity services",
      "Corporate events and offsites",
      "Exhibition stand builders",
      "Marketing and growth agencies",
      "Cross-border and export payments",
    ],
  },

  faq: [
    {
      q: "Will this hurt our company's email?",
      a: "We never send cold emails from your main address. We set up separate web addresses like yours, each with its own inboxes, and warm each one up for three weeks. We check them every week, and if a number slips, that address is paused and rested for two to four weeks.",
    },
    {
      q: "Isn't this just AI spam?",
      a: "Every company is checked before anyone is contacted, and every first email opens with a line written for that one company. We send three emails at most, then stop or move to LinkedIn. An AI agent does two jobs. It reads each company's website before we look anyone up, and it sorts the replies. At first, a person approves every reply before it goes out.",
    },
    {
      q: "Will it be templated emails with our name on them?",
      a: "Each first line is written for that company, from something they published or something specific about their business. You approve the wording once a month. The emails go from web addresses set up for outreach, and your main email is never used.",
    },
    {
      q: "We already have someone doing sales. Why would we need this?",
      a: "The question is what else they're doing when a reply comes in at 9 pm. We take the finding, the writing, the follow-ups and the first replies, and they keep the relationships and the meetings. If someone already does this full time, we'll tell you it isn't a fit.",
    },
    {
      q: "We tried cold email before and it didn't work. Why would this?",
      a: "Most of the time the list was the problem. The addresses were old, the companies didn't fit, and there was no reason to write that week. So we fix the list first and write each first line for that one company. Your written plan shows the first ten companies we'd contact and the reason for each, so you can judge it before you decide anything.",
    },
    {
      q: "How soon will we see anything?",
      a: "The first three weeks are warm-up, which can't be rushed, so the first emails go out in week 4. You get a first honest read around day 45, and a written verdict at day 60 of sending.",
    },
    {
      q: "What do you need from us?",
      a: "A decision on who you want to reach, one hour recorded on how you describe what you do, two or three results of yours we can mention, how you price if quotes come up, and a named person to take the meetings. After that, an approval once a month. Nothing else.",
    },
    {
      q: "What if it doesn't work?",
      a: "At day 60 of sending, we give you a written verdict. If the problem is the offer or the market, we say so plainly and tell you what to change, or recommend that you pause.",
    },
    {
      q: "So what do you promise?",
      a: "We never promise a number of leads, replies or meetings. What we commit to in writing is how the work is done. Your sending setup is live within 7 days of kickoff, bounces stay under 2 in 100, every reply is sorted within a minute, the report arrives by the 5th working day of each month, and you get a written verdict at day 60 of sending.",
    },
    {
      q: "What if we end up on calls with the wrong people?",
      a: "A meeting only counts as qualified when they fit, they're interested and they've confirmed. You get 48 hours after each meeting to strike it as not a fit, with a reason. That reason becomes a rule in how we check companies, so the next list is checked against it.",
    },
    {
      q: "How do you get people's details?",
      a: "Mostly from what companies publish themselves: their websites, business directories, map listings, job posts and news, plus business contact databases where a market needs them. We keep a record of where every contact came from. If we can't say where we found someone, we don't use them.",
    },
    {
      q: "How do you handle India's data protection law?",
      a: "Where we find the data, we handle it on your behalf under a written data processing agreement. We keep a record of where every contact came from, every email has a working way to opt out, and anyone can have their details deleted. All of this is in place before any data is loaded.",
    },
    {
      q: "Can you send WhatsApp blasts or automate our LinkedIn?",
      a: "No to both. Cold WhatsApp messages break Meta's rules and get numbers banned, so we use WhatsApp only once someone has replied and agreed, and it can run on your existing number. Automating LinkedIn breaks its user agreement and puts your account at risk, so we prepare the list and the messages, and your person sends them.",
    },
    {
      q: "Our market is small. Can this still work?",
      a: "Then we size it down, with fewer inboxes and the same standard. We won't widen who we write to just to fill the volume.",
    },
    {
      q: "What happens if we stop?",
      a: "The web addresses and inboxes that carry your name come back to you, along with every record of every lead and reply, readable without us. The system that runs it stays with us.",
    },
  ],

  book: {
    eyebrow: "Book the call",
    heading: "It starts with a 30-minute call.",
    sub: "If it's a fit, you get a written plan within five working days, with the first ten companies we'd contact. Free, and yours to keep.",
    fields: {
      name: "Your name",
      email: "Work email",
      website: "Company website",
      sells: "What you sell",
      capacity: "Conversations your team can take a week",
    },
    submit: "Continue and pick a time",
    sending: "Sending",
    error: "That didn't go through. You can book the call directly at calendly.com/ahaan-rheoai-xnxc/30min.",
    after: "Thanks. Pick a time below and it goes straight into our calendar. If it's a fit, your written plan follows within five working days of the call.",
    privacy: "We only use this to reply to you.",
  },

  bridge: {
    line: "Not enough enquiries in the first place. We also find the right companies, write to them and book the meetings for you.",
    link: "See how it works",
  },

  film: {
    chapters,
    transcriptHeading: "Transcript",
    captionsLabel: "English captions",
  },
};
