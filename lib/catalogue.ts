/**
 * Single source of truth for the Rheo service catalogue.
 * The home Work grid, the /work index, and every /work/[slug]
 * detail page all read from here.
 */

export type Product = {
  slug: string;
  number: string;
  name: string;
  cluster: ClusterKey;
  tagline: string;            // one-line summary for cards
  problem: string;            // long paragraph: what we are solving
  what: string[];             // bullet list: what we do exactly
  youGet: string[];           // bullet list: deliverables
  roi: { metric: string; before: string; after: string }[];
  who: string;                // paragraph: who this is for
  accent: 'gold' | 'crest' | 'ocean' | 'foam';
  image: string;              // /images/products/NN-slug.jpg
};

export type ClusterKey = 'lead' | 'booking' | 'retention' | 'ops' | 'bundle';

export const CLUSTERS: { key: ClusterKey; title: string; blurb: string }[] = [
  { key: 'lead',      title: 'Lead & Conversion',        blurb: 'Capture every enquiry. Qualify it. Convert it before your competitor replies.' },
  { key: 'booking',   title: 'Booking & Slots',          blurb: 'Calendar, reminders, advance payments, and the slots you would have lost.' },
  { key: 'retention', title: 'Retention & Reputation',   blurb: 'Past customers come back. Reviews flow. Reputation compounds.' },
  { key: 'ops',       title: 'Operations & Visibility',  blurb: 'Daily clarity for the owner. Structured days for the staff. Money that arrives.' },
  { key: 'bundle',    title: 'Audit & Bundle',           blurb: 'The way in, and the way to buy everything.' },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'speed-to-lead',
    number: '01',
    name: 'Speed-to-Lead Engine',
    cluster: 'lead',
    accent: 'gold',
    tagline: 'Every enquiry answered, qualified, and routed in under sixty seconds. Day or night.',
    problem:
      'You receive enquiries on Instagram, WhatsApp, Google, and JustDial at every hour of the day. When someone messages at nine in the evening or during a busy shift, nobody replies for hours. By the time you respond, they have already booked with your competitor. Studies show seventy-eight percent of customers go with whoever responds first. You are losing deals not because your service is worse, but because you were slower. This is the single highest-ROI problem in any customer-facing business.',
    what: [
      'Detect every new inbound enquiry the moment it arrives, day or night.',
      'Send an instant, intelligent reply that sounds like a real person from your business.',
      'Ask qualifying questions to understand service type, date, budget, urgency.',
      'Share relevant pricing, availability, or next steps based on the response.',
      'Capture contact details and intent automatically.',
      'Notify you with a structured summary so you can close the deal personally, or let the bot handle the full booking.',
      'Flag hot leads (responded twice, asked for pricing) versus cold ones, so you know where to focus.',
    ],
    youGet: [
      'A fully configured WhatsApp Business API integration.',
      'An AI agent powered by Claude, trained on your business knowledge base.',
      'A lead qualification flow customised to your service offerings.',
      'A lead scoring system: Hot, Warm, Cold, with owner alert for Hot leads.',
      'A Google Sheet or Notion CRM that logs every enquiry automatically.',
      'A Hinglish or English tone, your choice, per your customer base.',
      'A one-week testing period with live refinements.',
      'Monthly performance report showing response rate, lead volume, conversion estimates.',
    ],
    roi: [
      { metric: 'Average response time',          before: '4 to 12 hours',  after: 'Under 60 seconds' },
      { metric: 'Enquiries replied to',           before: '60 to 70%',      after: '100%' },
      { metric: 'Leads lost to slow response',    before: 'High',           after: 'Near zero' },
      { metric: 'Owner time on first replies',    before: '30 to 60 min/day', after: 'Zero' },
      { metric: 'Lead data captured',             before: 'Rarely',         after: 'Always, structured' },
    ],
    who: 'Any business that receives inbound enquiries via WhatsApp, Instagram, or phone and does not have a dedicated person responding around the clock. Highest impact: gyms, turfs, salons, clinics, coaching centres, home services, event studios, cafés, boutique hotels, and any service business where response speed determines who gets the booking.',
    image: '/images/products/01-speed-to-lead.jpg',
  },
  {
    slug: 'booking-scheduling',
    number: '02',
    name: 'Booking & Scheduling Automation',
    cluster: 'booking',
    accent: 'crest',
    tagline: 'A booking conversation that runs against your live calendar. No app, no back-and-forth.',
    problem:
      'Your booking process is broken in ways you have normalised. Customers message asking for a slot. You check your calendar manually. You reply. They say that time does not work. You go back and forth three more times. They do not show up. Meanwhile you turned away another customer for that slot. And none of this is written down anywhere.',
    what: [
      'Customers select service type, preferred date, and time through a guided WhatsApp conversation.',
      'Real-time availability checked against your Google Calendar or booking sheet.',
      'Booking confirmed, ID generated, calendar updated automatically.',
      'Automatic reminders at 24 hours and 2 hours before the appointment.',
      'Rescheduling and cancellations through the same WhatsApp flow.',
      'Post-service feedback and rebooking nudge.',
      'Optional Razorpay advance payment collection to reduce no-shows.',
    ],
    youGet: [
      'A WhatsApp booking bot customised to your service menu and operating hours.',
      'Google Calendar integration. Every booking appears automatically.',
      'A Google Sheets booking log: Booking ID, Date, Time, Service, Name, Phone, Status, Payment.',
      'Automated reminder sequences.',
      'Cancellation and rescheduling handling.',
      'Optional Razorpay advance link generation inside the WhatsApp flow.',
      'Owner dashboard view with a daily booking summary delivered every morning.',
    ],
    roi: [
      { metric: 'Time spent per booking',  before: '10 to 20 min', after: 'Under 2 min' },
      { metric: 'No-show rate',            before: '20 to 35%',    after: '8 to 12% with advance payment' },
      { metric: 'Double-bookings',         before: 'Occasional',   after: 'Zero' },
      { metric: 'Customer data captured',  before: 'Inconsistent', after: '100%, structured' },
    ],
    who: 'Any appointment-based business. Ideal for salons, skin clinics, aesthetician studios, sports turfs, coaching institutes, yoga studios, physiotherapy clinics, car detailing studios, tattoo studios.',
    image: '/images/products/02-booking-scheduling.jpg',
  },
  {
    slug: 'daily-ops-dashboard',
    number: '03',
    name: 'Daily Ops Dashboard',
    cluster: 'ops',
    accent: 'foam',
    tagline: 'A morning brief at eight. An evening close at seven. The business runs in plain sight.',
    problem:
      'You run your business without visibility. You find out how yesterday went at eleven at night when you sit down to reconcile WhatsApp messages and count cash. You make decisions on gut feel because the data is not in front of you at the right time. This is the owner blind spot, and it gets more expensive as the business grows.',
    what: [
      'Morning summary delivered at 8 a.m.: today\'s bookings, yesterday\'s revenue, pending payments, staff attendance, flagged issues.',
      'Evening close at 7 p.m.: jobs completed, revenue collected, no-shows, tomorrow\'s preview, follow-ups flagged.',
      'Weekly summary every Monday: previous week revenue, bookings, no-shows, trends.',
      'Monthly performance summary with month-on-month comparison.',
      'Custom metrics by vertical: chair utilisation for salons, court hours for turfs, job card completion for detailing.',
    ],
    youGet: [
      'Two automated WhatsApp messages daily.',
      'A Google Sheets master operations log that feeds the dashboard.',
      'Weekly and monthly performance summaries.',
      'Setup of the underlying data structure if you do not have one.',
    ],
    roi: [
      { metric: 'Time to know yesterday', before: '20 to 45 min', after: 'Zero (delivered to you)' },
      { metric: 'Decisions on data',      before: 'Rare',         after: 'Daily' },
      { metric: 'Pending payment view',   before: 'Manual chase', after: 'Flagged automatically' },
      { metric: 'Physical presence',      before: 'Required',     after: 'Optional' },
    ],
    who: 'Any owner managing 3+ staff or 10+ transactions per day. Particularly valuable for multi-service businesses or owners not on-site full-time.',
    image: '/images/products/03-daily-ops-dashboard.jpg',
  },
  {
    slug: 're-engagement-engine',
    number: '04',
    name: 'Customer Re-Engagement Engine',
    cluster: 'retention',
    accent: 'gold',
    tagline: 'Lapsed customers brought back automatically. Your database, finally working for you.',
    problem:
      'Your database is your biggest underutilised asset. Hundreds of past customers enjoyed your service, paid you, then vanished. Not because they were unhappy. Because you never reached out. The cost to re-engage a past customer is five to seven times lower than acquiring a new one.',
    what: [
      'Pull customer visit history from your booking log or CRM.',
      'Segment customers into 30, 60, and 90-day lapsed buckets.',
      'Send a personalised WhatsApp message at each threshold, each one slightly more direct.',
      'AI writes messages in your brand voice, never promotional.',
      'Track opens, replies, rebookings. Stop messaging the moment they rebook.',
      'Configurable cool-down period. No spam, no repeats.',
    ],
    youGet: [
      'Full segmentation engine (30 / 60 / 90 day lapsed buckets).',
      'AI-written, brand-voice-tuned WhatsApp sequences per segment.',
      'Automated trigger system that runs every night.',
      'Rebooking tracking. System marks customer as re-engaged.',
      'Monthly performance report: messages sent, replies received, bookings recovered.',
      'Optional birthday message automation.',
    ],
    roi: [
      { metric: 'Lapsed customers re-contacted',  before: '~0%',          after: '100% automated' },
      { metric: 'Revenue from re-engaged',        before: 'Zero',         after: 'Measurable monthly' },
      { metric: 'Owner time on follow-up',        before: 'High',         after: 'Zero' },
      { metric: 'Customer lifetime value',        before: 'Single visit', after: 'Multi-visit' },
    ],
    who: 'Any repeat-service business with 50+ past customers. Ideal for salons, skin clinics, gyms, detailing studios, dental clinics, optical stores, boutique fitness.',
    image: '/images/products/04-re-engagement-engine.jpg',
  },
  {
    slug: 'reviews-reputation',
    number: '05',
    name: 'Review & Reputation Automation',
    cluster: 'retention',
    accent: 'gold',
    tagline: 'Happy customers asked at the right moment. Negative feedback caught before it goes public.',
    problem:
      'You have three hundred happy customers and fourteen Google reviews. Your competitor has two hundred customers and one hundred and eighty reviews. They rank higher. They get the calls. You are losing business you deserve because nobody asked your satisfied customers to leave a review, and even when they did, they forgot by the time they got home.',
    what: [
      'Triggers automatically after every completed service.',
      'WhatsApp message 2 to 4 hours after the visit, when the experience is fresh.',
      'Direct, one-tap link to your Google review page.',
      'Friendly, brand-appropriate message that does not feel like spam.',
      'Optional 1-question feedback form internally. Unhappy customers routed to a private channel, not Google.',
      'Tracks who was messaged, never duplicates.',
      'Monthly report: reviews generated, average rating, trends.',
    ],
    youGet: [
      'Automated post-visit WhatsApp trigger system.',
      'Branded review request in your tone and language.',
      'Direct Google Maps review link (one tap).',
      'Internal feedback form with sentiment filter.',
      'Negative feedback alert to owner with response template.',
      'Monthly report: review volume, rating trajectory.',
    ],
    roi: [
      { metric: 'Google review volume',       before: '14',          after: '60 to 100+ in 90 days' },
      { metric: 'Maps ranking position',      before: 'Low',         after: 'Improved significantly' },
      { metric: 'Inbound calls from Maps',    before: 'Baseline',    after: '20 to 40% increase' },
      { metric: 'Negative reviews public',    before: 'Occasional',  after: 'Near zero (sentiment filter)' },
    ],
    who: 'Any local business with a physical location serving customers in person. Restaurants, salons, clinics, gyms, detailing, retail, coaching institutes.',
    image: '/images/products/05-reviews-reputation.jpg',
  },
  {
    slug: 'staff-ops-bot',
    number: '06',
    name: 'Staff Communication & Ops Bot',
    cluster: 'ops',
    accent: 'crest',
    tagline: 'Attendance, briefings, shift reminders, internal broadcasts. All on WhatsApp.',
    problem:
      'Your internal communication is broken. Shift reminders live in group chats full of memes. Task assignments are verbal and forgotten by lunch. Attendance is tracked by you calling each staff member. Daily briefings happen inconsistently. This is not a people problem, it is a systems problem.',
    what: [
      'Staff send a simple WhatsApp message when they arrive ("IN") and leave ("OUT").',
      'System logs the timestamp, calculates hours, compiles weekly attendance.',
      'If a staff member has not checked in 15 minutes past shift start, owner gets an automatic alert.',
      'Every morning at a set time, personalised task brief sent to each staff member.',
      'Staff mark tasks done by replying. System updates the log.',
      'Shift reminders 12 hours and 2 hours before each shift.',
      'Owner broadcasts to all staff via a single message. No group chaos.',
      'End-of-shift prompt to staff. Responses compiled into a close-of-day report.',
    ],
    youGet: [
      'WhatsApp-based check-in / check-out logging.',
      'Automated shift reminders for all staff.',
      'Daily task briefing system personalised per role.',
      'Late-arrival alert to owner.',
      'Weekly attendance report delivered automatically.',
      'End-of-day staff close report compiled and sent to owner.',
      'Broadcast system for internal announcements.',
      'Google Sheets attendance log, auto-updated.',
    ],
    roi: [
      { metric: 'Late arrivals per week',        before: '3 to 5',           after: 'Near zero' },
      { metric: 'Owner time on coordination',    before: '1 to 2 hrs/day',   after: '15 minutes' },
      { metric: 'Task accountability',           before: 'Low',              after: 'Logged and tracked' },
      { metric: 'Briefing consistency',          before: 'Ad hoc',           after: '100% every day' },
    ],
    who: 'Any business with 3+ staff members. Salons, gyms, restaurants, retail, detailing studios, clinics, hospitality, events.',
    image: '/images/products/06-staff-ops-bot.jpg',
  },
  {
    slug: 'quote-estimator',
    number: '07',
    name: 'Quote Estimator Agent',
    cluster: 'lead',
    accent: 'gold',
    tagline: 'A guided conversation that delivers a clean, accurate quote in under two minutes.',
    problem:
      'Every time someone asks "how much does it cost?", you give a vague answer, take two to three days to send a proper quote, or give inconsistent numbers depending on who picks up the phone. Slow quotes lose deals. Inconsistent quotes confuse customers. Vague answers send them to your competitor.',
    what: [
      'Guided WhatsApp conversation collects the variables that drive your pricing.',
      'Applies your exact pricing rules and tiers (mapped during discovery).',
      'Generates a clean, formatted quote with breakdown.',
      'Logs every quote to a CRM sheet.',
      'Flags high-value quotes to the owner for personal follow-up.',
      'Automatic follow-up if the quote has not received a response in 48 hours.',
      'Optional: PDF quote sent to customer email. Razorpay advance link on acceptance.',
    ],
    youGet: [
      'AI quote bot trained on your exact pricing structure.',
      'WhatsApp-based guided conversation flow.',
      'Automatic quote logging to CRM sheet.',
      'High-value quote alert to owner.',
      '48-hour automatic follow-up message.',
      'Optional PDF generation and Razorpay link.',
    ],
    roi: [
      { metric: 'Time to deliver a quote',     before: '1 to 3 days',     after: 'Under 2 minutes' },
      { metric: 'Quote consistency',           before: 'Variable',         after: '100% consistent' },
      { metric: 'Quotes lost to slow response',before: 'High',             after: 'Near zero' },
      { metric: 'Quote-to-conversion tracking',before: 'None',             after: 'Automatic' },
    ],
    who: 'Any business with variable pricing. Car detailing studios, interior designers, event planners, manufacturing, construction, pest control, home services, printing, B2B services.',
    image: '/images/products/07-quote-estimator.jpg',
  },
  {
    slug: 'post-service-follow-up',
    number: '08',
    name: 'Post-Service Follow-Up',
    cluster: 'retention',
    accent: 'crest',
    tagline: 'Aftercare, education, rebooking, all timed correctly. Without you thinking about it.',
    problem:
      'The moment a customer walks out, you lose them. No check-in. No "how was everything?" No mention of what they should do next. The relationship ends at the door. This is a retention failure, entirely preventable.',
    what: [
      'Two to four hours after service: check-in with aftercare tips for the service they had.',
      'Day three: educational message relevant to their service.',
      'Day twenty-five to forty-five (service-dependent): rebooking nudge.',
      'Day forty (product businesses): product replenishment reminder.',
      'Personalised by name, service, and brand voice.',
    ],
    youGet: [
      'Personalised post-service WhatsApp sequence (3 to 4 touchpoints).',
      'Service-specific aftercare templates trained on your services.',
      'Rebooking nudge at the right interval.',
      'Product replenishment reminder if applicable.',
      'Sequence tracking. No duplicate messages.',
      'Monthly report: messages sent, reply rate, rebookings attributed.',
    ],
    roi: [
      { metric: 'Post-service communication',  before: 'Zero',                  after: 'Structured, automatic' },
      { metric: 'Customer feel',               before: 'Generic',                after: 'Personal' },
      { metric: 'Rebooking rate, month 1',     before: 'Low',                    after: '15 to 25% lift' },
      { metric: 'Customer lifetime value',     before: 'Single visit',           after: 'Multi-visit' },
    ],
    who: 'Any business with aftercare, maintenance, or a logical return window. Skin clinics, salons, car detailing, dental, gyms, coaches, pet grooming, opticians.',
    image: '/images/products/08-post-service-follow-up.jpg',
  },
  {
    slug: 'waitlist-slot-recovery',
    number: '09',
    name: 'Waitlist & Slot Recovery',
    cluster: 'booking',
    accent: 'foam',
    tagline: 'A cancellation re-offered to the next person in thirty minutes. Without you lifting a finger.',
    problem:
      'A customer cancels four hours before their appointment. The slot is now empty. You find out when you check WhatsApp. You message manually. They already booked elsewhere. You lose the revenue. This happens multiple times a month.',
    what: [
      'Maintain a live waitlist of customers who requested a slot that was full.',
      'The moment a cancellation comes in, identify the next match on the waitlist.',
      'Send an instant offer: "A slot just opened up. Reply YES to confirm."',
      'If confirmed within 30 minutes, slot is rebooked automatically.',
      'If not, system moves to the next person.',
      'Owner alert if the slot cannot be filled.',
      'Broadcast feature for short-notice openings to your warm leads.',
    ],
    youGet: [
      'Live waitlist management system on WhatsApp.',
      'Instant cancellation detection and waitlist trigger.',
      'Automatic slot-offer with time-limited response window.',
      'Calendar auto-update on confirmation.',
      'Slot-fill broadcast feature.',
      'Owner alert if slot goes unfilled.',
      'Monthly report: cancellations, recovery rate, revenue recovered.',
    ],
    roi: [
      { metric: 'Revenue lost per cancellation', before: 'Full amount',  after: 'Recovered in most cases' },
      { metric: 'Owner time on recovery',         before: '20 to 30 min', after: 'Zero' },
      { metric: 'Waitlist managed systematically',before: 'No',           after: 'Yes, automated' },
      { metric: 'Slot recovery rate',             before: '~10% manual',  after: '40 to 70% automated' },
    ],
    who: 'Any slot-based business with meaningful cancellation rates. Salons, clinics, turfs, studios, coaching centres, gyms, event venues.',
    image: '/images/products/09-waitlist-slot-recovery.jpg',
  },
  {
    slug: 'payment-follow-up',
    number: '10',
    name: 'Payment Follow-Up Automation',
    cluster: 'ops',
    accent: 'gold',
    tagline: 'Invoices that collect themselves. Without the awkward conversations.',
    problem:
      'You did the work. You sent the invoice. The customer said they would pay by end of week. It is now day fourteen. You have chased them twice and it feels awkward. You are not a collections agency. But you have bills to pay.',
    what: [
      'Track all pending invoices and due dates from your Google Sheets or billing system.',
      'Polite reminder on the due date.',
      'Follow-ups at Day 3, Day 7, Day 14, each slightly firmer in tone.',
      'Owner alert at Day 7 for personal intervention.',
      'Stops the moment payment is confirmed.',
      'Optional: invoice PDF re-sent with each reminder.',
    ],
    youGet: [
      'Due-date tracking from your sheet or billing system.',
      'Automated WhatsApp reminder sequence.',
      'Escalating tone per reminder, always professional.',
      'Owner alert at Day 7.',
      'Payment confirmation detection.',
      'Monthly outstanding payments report.',
    ],
    roi: [
      { metric: 'Average days to collect',         before: '20 to 45 days',  after: '7 to 14 days' },
      { metric: 'Owner time chasing payments',     before: '2 to 4 hrs/week', after: 'Zero' },
      { metric: 'Awkward personal conversations',  before: 'Frequent',        after: 'Rare' },
      { metric: 'Collection rate',                 before: '75 to 80%',       after: '90%+' },
    ],
    who: 'Any business that invoices clients. Manufacturing, B2B services, event companies, interior designers, freelance studios, consultants, logistics.',
    image: '/images/products/10-payment-follow-up.jpg',
  },
  {
    slug: 'staff-onboarding-bot',
    number: '11',
    name: 'New Staff Onboarding Bot',
    cluster: 'ops',
    accent: 'crest',
    tagline: 'Two weeks of structured onboarding on WhatsApp. Build once. Use for every future hire.',
    problem:
      'Every time a new staff member joins, you spend the first two weeks repeating yourself. SOPs live in your head. Training is informal. New staff make the same mistakes the last new staff made. And when good staff leave, all their knowledge walks out with them.',
    what: [
      'Welcome the new staff member and walk them through company overview and values.',
      'Deliver SOPs in digestible chunks, one topic per session, over two weeks.',
      'Comprehension questions after each module.',
      'On-demand answers to common staff questions, 24/7.',
      'Owner notified when staff completes each module.',
      'Update the knowledge base once, all future staff get the new version.',
    ],
    youGet: [
      'WhatsApp onboarding bot with your specific SOPs and policies.',
      '2-week structured onboarding flow customised to your roles.',
      'Comprehension quiz after each module.',
      'On-demand FAQ answering for staff, 24/7.',
      'Completion tracking in Google Sheets.',
      'One-time knowledge base setup, reusable indefinitely.',
      'Updates included for the first 3 months.',
    ],
    roi: [
      { metric: 'Owner time per new hire',          before: '6 to 10 hrs',         after: '1 to 2 hrs' },
      { metric: 'Consistency of service',            before: 'Variable',             after: 'Standardised' },
      { metric: 'Knowledge retention',               before: 'Low (verbal)',         after: 'High (written, interactive)' },
      { metric: 'Time to productive',                before: '3 to 4 weeks',         after: '1 to 2 weeks' },
    ],
    who: 'Any business with 4+ staff or moderate-to-high turnover. Salons, gyms, restaurants, retail, clinics, hospitality, events.',
    image: '/images/products/11-staff-onboarding.jpg',
  },
  {
    slug: 'enquiry-pipeline',
    number: '12',
    name: 'Enquiry Pipeline & CRM',
    cluster: 'lead',
    accent: 'ocean',
    tagline: 'Every lead tracked. Hot ones surfaced. Cold ones nurtured. The pipeline you can actually see.',
    problem:
      'You have no idea which stage each lead is at. Someone enquired two weeks ago. You sent a follow-up once. Did they reply? Did they go cold? You have thirty open conversations in WhatsApp and no structure to track any of them.',
    what: [
      'Capture every new WhatsApp enquiry. Create a lead record automatically.',
      'Assign a pipeline stage: New, Contacted, Quoted, Following Up, Converted, Lost.',
      'Score each lead by behaviour: replied twice = warm, asked for pricing = hot, silent for 5 days = cold.',
      'Daily lead summary to owner: top 3 hot leads to follow up today.',
      'Automated follow-ups if a lead goes quiet.',
      'Escalate unresponsive hot leads to the owner.',
      'Mark Converted on confirmed booking. Mark Lost after 21 days of silence.',
    ],
    youGet: [
      'Automatic lead capture and CRM record creation.',
      '5-stage pipeline tracking.',
      'Lead scoring system (Hot, Warm, Cold, Dead).',
      'Daily WhatsApp lead summary with priority follow-ups.',
      'Automated follow-up sequences per lead stage.',
      'Escalation alerts for hot leads going cold.',
      'Weekly pipeline summary with conversion metrics.',
      'Google Sheets CRM dashboard, always up to date.',
    ],
    roi: [
      { metric: 'Leads falling through cracks',  before: 'Frequent',     after: 'Near zero' },
      { metric: 'Pipeline awareness',            before: 'Zero',         after: 'Daily update' },
      { metric: 'Follow-up consistency',         before: 'Ad hoc',       after: 'Systematic' },
      { metric: 'Conversion rate',               before: 'Baseline',     after: '10 to 25% lift' },
    ],
    who: 'Any business handling 10+ enquiries per month. B2B services, interior design, event companies, premium clinics, education institutes, manufacturing.',
    image: '/images/products/12-enquiry-pipeline.jpg',
  },
  {
    slug: 'full-ops-stack',
    number: '13',
    name: 'Full Ops Stack',
    cluster: 'bundle',
    accent: 'gold',
    tagline: 'Every product above, integrated. A single nervous system for your business.',
    problem:
      'You want every layer automated at once. Not piece by piece. Not next quarter. You want the full agentic infrastructure scoped, built, and running in four to six weeks.',
    what: [
      'Full infrastructure design session before any build.',
      'All products you select, built and integrated.',
      'Customer data flows from booking to CRM to re-engagement to reviews.',
      'Single unified WhatsApp number for customer and internal communication.',
      'Single Notion or Google Sheets hub where all data lives.',
      'Owner training session.',
      '30-day hypercare period at no extra charge.',
      'Monthly performance review.',
    ],
    youGet: [
      'Every selected product, fully integrated.',
      'Unified data hub.',
      'Unified WhatsApp number.',
      'Owner training and 30-day hypercare.',
      'Monthly performance review.',
    ],
    roi: [
      { metric: 'Manual admin time',         before: 'Full',     after: '80 to 95% reduction' },
      { metric: 'Lead conversion',           before: 'Baseline', after: '15 to 30% lift' },
      { metric: 'No-shows',                  before: '20 to 35%', after: '20 to 40% reduction' },
      { metric: 'Customer retention',        before: 'Baseline', after: '10 to 20% lift' },
      { metric: 'Operational visibility',    before: 'Required physical presence', after: 'Complete, remote' },
    ],
    who: 'Operators ready to stop running the business and start growing it. Multi-channel businesses, multi-service practices, and any company whose stack has outgrown sheets and group chats.',
    image: '/images/products/13-full-ops-stack.jpg',
  },
  {
    slug: 'ops-audit',
    number: '14',
    name: 'Ops Audit',
    cluster: 'bundle',
    accent: 'gold',
    tagline: 'A forty-five minute call. A written scorecard in five days. The way every Rheo engagement begins.',
    problem:
      'You know something is broken. You do not know what to fix first. You do not want to commit to a build before you understand the priorities. You want a second opinion before you sign anything.',
    what: [
      '45 to 60 minute structured discovery call across five operational domains.',
      'Follow-up walkthrough of your current tools, workflows, and systems.',
      'Analysis of lead volume, booking data, staff structure, customer data.',
      'Top 3 to 5 highest-ROI automation opportunities identified.',
      'Written Ops Audit Report delivered within 5 business days.',
    ],
    youGet: [
      'Business Snapshot: vertical, size, current tools, operational context.',
      '5-Domain Scorecard: Red, Yellow, Green across Lead, Booking, Staff, Retention, Reporting.',
      'Top 3 Problems Found with estimated monthly cost.',
      'Automation Recommendations: what to build, in what order, with indicative investment.',
      'Quick Wins: changes you can make this week without any technology.',
    ],
    roi: [
      { metric: 'Visibility into what is broken', before: 'Gut feel',    after: 'Documented, ranked' },
      { metric: 'Time to clarity',                 before: 'Months',      after: '5 business days' },
      { metric: 'Commitment required',             before: 'Full build',  after: 'One audit, no obligation' },
    ],
    who: 'Any owner who knows something is broken but is not sure where to start. Also clients who want a second opinion before committing to a larger automation build.',
    image: '/images/products/14-ops-audit.jpg',
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find(p => p.slug === slug);
}

export function productsByCluster(key: ClusterKey) {
  return PRODUCTS.filter(p => p.cluster === key);
}
