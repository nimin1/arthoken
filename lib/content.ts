/**
 * Arthoken — site content.
 *
 * All prose lives here so copy can be edited without touching layout.
 * House rule: short sentences, plain words, no jargon a business reader
 * would have to decode. Nothing here is fabricated — no invented clients,
 * no logos we do not own, no metrics.
 */

export const site = {
  name: "Arthoken",
  tagline: "Built with meaning.",
  descriptor: "AI-native software engineering and consulting",
  description:
    "Arthoken builds software for companies with hard problems. New products, modern platforms, and AI that survives contact with production.",
  email: "hello@arthoken.com",
  url: "https://arthoken.com",
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "How we work", href: "/#how" },
  { label: "Insights", href: "/insights" },
  { label: "Company", href: "/company" },
] as const;

export const hero = {
  label: "AI-augmented software engineering",
  headline: ["Engineering", "what comes next."],
  lede: "Tell us the problem in the first meeting. By the second, you'll be clicking on something we built. Nothing gets invoiced until you've seen it work and decided you want it for real.",
  primary: { label: "Bring us a problem", href: "/contact" },
  secondary: { label: "How this works", href: "/#how" },
  strip: [
    "A working version in days",
    "Nothing to pay until it lands",
    "Senior engineers, small teams",
    "Built to survive production",
  ],
} as const;

/** The three-line positioning band that replaces the old essay. */
export const order = {
  label: "How we think",
  headline: "We start with the problem, not the technology.",
  steps: [
    {
      n: "01",
      term: "Problem first",
      gloss: "We work out what actually needs to change, and for whom.",
    },
    {
      n: "02",
      term: "Then architecture",
      gloss: "We choose a structure that keeps the change affordable to build and to live with.",
    },
    {
      n: "03",
      term: "Then technology",
      gloss: "The smallest set of tools that will hold. AI where it helps, not because it is fashionable.",
    },
  ],
} as const;

export type Capability = {
  n: string;
  title: string;
  lede: string;
  engagedWhen: string;
  items: string[];
};

export const capabilities: {
  label: string;
  headline: string;
  lede: string;
  items: Capability[];
} = {
  label: "What we do",
  headline: "Five kinds of work.",
  lede: "Most projects look like one of these.",
  items: [
    {
      n: "01",
      title: "Build",
      lede: "New products, platforms and applications, from first idea to production.",
      engagedWhen: "Something has to exist that does not exist yet.",
      items: [
        "Product engineering",
        "Enterprise platforms",
        "AI-native applications",
        "Rapid product development",
        "Internal business systems",
      ],
    },
    {
      n: "02",
      title: "Modernize",
      lede: "Systems that have become slow, fragile or risky to change.",
      engagedWhen: "The system that got you here cannot get you further.",
      items: [
        "Application modernization",
        "Fixing difficult architecture",
        "Cloud platforms",
        "Data platforms",
        "Connecting systems together",
      ],
    },
    {
      n: "03",
      title: "Add AI",
      lede: "Assistants, agents and automation that keep working after the demo.",
      engagedWhen: "A promising demo has to become something you can depend on.",
      items: [
        "AI assistants and copilots",
        "Agents that do real work",
        "Search over your own content",
        "Decision and case handling",
        "Testing and monitoring AI",
      ],
    },
    {
      n: "04",
      title: "Scale",
      lede: "Performance, reliability, security and cost, when the system has to hold up.",
      engagedWhen: "The problem is genuinely difficult and the usual answers have failed.",
      items: [
        "Distributed systems",
        "Platform engineering",
        "Reliability and performance",
        "Security architecture",
        "Cost and efficiency",
      ],
    },
    {
      n: "05",
      title: "Improve delivery",
      lede: "Helping your engineering team ship faster, with modern tools and clearer ways of working.",
      engagedWhen: "The constraint is how the team works, not the code.",
      items: [
        "AI-assisted development",
        "Developer productivity",
        "Ways of working",
        "Enterprise AI enablement",
        "Handover and training",
      ],
    },
  ],
};

export const approach = {
  label: "How we work",
  headline: "Five steps, in order.",
  lede: "We are not a supplier of developers. This is the engagement.",
  steps: [
    { n: "01", title: "Understand", body: "We learn your business, your systems and your constraints." },
    { n: "02", title: "Frame", body: "We agree what the real problem is before proposing a solution." },
    { n: "03", title: "Design", body: "We choose the structure and explain the trade-offs in plain language." },
    { n: "04", title: "Build", body: "Senior engineers build it with your team, in small releases you can see." },
    { n: "05", title: "Hand over", body: "We measure the result and leave your team able to run it." },
  ],
} as const;

export type Engagement = {
  id: string;
  sector: string;
  title: string;
  problem: string;
  engineered: string;
  outcome: string;
};

export const work: {
  label: string;
  headline: string;
  lede: string;
  ledeLong: string;
  disclosure: string;
  items: Engagement[];
} = {
  label: "How we'd approach it",
  headline: "A problem, worked through.",
  lede: "One pattern we see often, and exactly what we would do about it.",
  ledeLong:
    "Three patterns we see often, and what we would do about each. These are patterns and approaches, not accounts of past clients.",
  disclosure: "A problem pattern and how we would approach it. Not an account of a client engagement.",
  items: [
    {
      id: "workflow",
      sector: "Regulated enterprise operations",
      title: "A workflow nobody could safely change",
      problem:
        "A twenty-year-old system ran the business. Every small change needed a weekend and a freeze, because nobody could be sure what else it would break.",
      engineered:
        "We pulled the business rules out into one clear, versioned place, kept the old system running behind it, and used real production traffic to prove nothing behaved differently before switching over.",
      outcome:
        "Changes became routine, and knowledge that lived in four people’s heads became something the company owns.",
    },
    {
      id: "operations",
      sector: "Enterprise internal platforms",
      title: "An operations platform where AI had to be the boring part",
      problem:
        "Teams spent most of the day pulling information out of six systems before they could make a single decision. Auditors needed to know why every decision was made.",
      engineered:
        "We let AI do the gathering and summarising, and kept the decision itself in ordinary, inspectable code. Every AI-written line shows where it came from, and a person still approves the outcome.",
      outcome:
        "Analysts stopped gathering and started deciding, with a record of reasoning that stands up to an audit.",
    },
    {
      id: "throughput",
      sector: "Software organizations",
      title: "AI coding tools that made no difference",
      problem:
        "A large engineering group rolled out AI coding tools and delivery did not move at all.",
      engineered:
        "The bottleneck was never typing. It was slow reviews, painful environments and a test suite nobody trusted enough to release on. We pointed the tools at the work they are genuinely good at and rebuilt the process around them.",
      outcome:
        "The tools finally had something worth speeding up.",
    },
  ],
};

export const why = {
  label: "Why Arthoken",
  headline: "Senior people, close to the problem.",
  points: [
    {
      n: "01",
      title: "Small teams, senior people",
      body: "You work with the people solving your problem. Nobody is relaying messages between you and the work.",
    },
    {
      n: "02",
      title: "AI as a power tool",
      body: "It makes the first version fast. It doesn't get to decide anything that matters.",
    },
    {
      n: "03",
      title: "We finish things",
      body: "Monitoring, runbooks, handover, and a team that can run it without us. Otherwise we haven't done the job.",
    },
  ],
} as const;

export type Pain = {
  id: string;
  quote: string;
  short: string;
  really: string;
  weDo: string;
  youGet: string;
};

export const pains: { label: string; headline: string; lede: string; items: Pain[] } = {
  label: "Start here",
  headline: "Which of these sounds like your year?",
  lede: "Most of the work we take on arrives as one of these four sentences.",
  items: [
    {
      id: "pilot",
      quote: "Our AI pilot never made it to production.",
      short: "AI that stalled",
      really:
        "The demo worked. Then it met real data, real volumes and a security review. Nobody could say why it produced a given answer, so nobody would sign it off.",
      weDo:
        "We keep the model doing the language work and move the decision into ordinary, testable code, with a record of why each outcome happened and a person accountable for it.",
      youGet:
        "A system your risk and audit people will approve, doing the part of the job that was worth automating.",
    },
    {
      id: "legacy",
      quote: "We're scared to touch our own system.",
      short: "A system nobody can change",
      really:
        "It runs the business, the people who built it have moved on, and the rules live in three places at once. Every change needs a weekend and a freeze.",
      weDo:
        "We put one front door in front of it, move capabilities out one at a time, and replay real traffic against both to prove nothing changed before anything switches.",
      youGet:
        "The ability to change your own system again, without a rewrite and without switching anything off.",
    },
    {
      id: "delivery",
      quote: "Delivery keeps slipping.",
      short: "Work that won't ship",
      really:
        "The team is busy and shipping slowly. It is rarely the coding. It is reviews waiting, environments breaking, and tests nobody trusts enough to release on.",
      weDo:
        "We find where the time actually goes, fix the two or three things holding it up, and point AI tooling at the work it is genuinely good at.",
      youGet:
        "A shorter distance between deciding something and it being live, with the same team.",
    },
    {
      id: "capacity",
      quote: "We need this built and we don't have the team.",
      short: "No capacity to build it",
      really:
        "The work matters, your own people are committed elsewhere, and hiring for it takes six months you do not have.",
      weDo:
        "A small senior team builds it alongside you, in your codebase, in short releases you can see and judge as they land.",
      youGet:
        "The thing built, and your people able to run it after we leave.",
    },
  ],
};

export const engagement = {
  label: "How this works",
  headline: "You'll see it working before you pay us anything.",
  lede: "Most firms answer a problem with a proposal. We'd rather answer it with something you can open in a browser and pull apart, because that's the fastest way either of us finds out whether we actually understood you.",
  steps: [
    {
      n: "01",
      when: "Meeting one",
      title: "You tell us what's broken",
      body: "You describe what's slow, expensive or falling over. We ask a lot of questions and present nothing. There is no deck.",
    },
    {
      n: "02",
      when: "The next few days",
      title: "We go and build it",
      body: "A running version of the thing, with your data shape, your terminology and the awkward parts left in. Not a mockup, not a clickable slide.",
    },
    {
      n: "03",
      when: "Meeting two",
      title: "You open it and break it",
      body: "Most of what we misunderstood shows up in the first ten minutes, which is the point. Tell us, and the next version comes back while you're still thinking about this one.",
    },
    {
      n: "04",
      when: "The line",
      title: "You decide",
      body: "If it's the thing you needed, we take it to production and that's when we talk money. If it isn't, we shake hands and you owe us nothing.",
    },
    {
      n: "05",
      when: "From here",
      title: "We make it real",
      body: "Tests, evaluations, a security review, monitoring, runbooks, and your people trained to run it. This part takes the time. It's also the part most AI projects never reach.",
    },
  ],
  boundary:
    "Fair boundaries, so nobody feels tricked: one problem at a time, a shape we agree before we start, and a couple of weeks of our attention. We aren't giving away production systems. We're giving away the first version, because it's the only honest way for you to judge us on something real. What the production build costs is set out further down this page.",
  cta: { label: "Bring us a problem", href: "/contact" },
} as const;

export const aiControl = {
  label: "Where AI sits",
  headline: "Anyone can reach a demo now. Getting past one is the job.",
  lede: "The models got good enough that a convincing prototype takes an afternoon, and we use them for exactly that, every day. It's also why so many AI projects stop at the demo. The demo was never the hard part.",
  columns: [
    {
      stage: "Explore",
      ai: "Three approaches instead of one",
      human: "Which one we actually take",
    },
    {
      stage: "Build",
      ai: "First-pass code, migrations, scaffolding",
      human: "The architecture it has to live in",
    },
    {
      stage: "Prove",
      ai: "Drafts of tests and evaluations",
      human: "What \u201ccorrect\u201d means for your business",
    },
    {
      stage: "Guard",
      ai: "Catches the obvious mistakes",
      human: "Security, access and data boundaries",
    },
    {
      stage: "Ship",
      ai: "Release notes, docs, changelogs",
      human: "The merge, and whose name is on it",
    },
  ],
  closing:
    "None of that is a position we hold for its own sake. It's the difference between something that impresses a room and something that still behaves on a Tuesday in November, when the volume triples and nobody senior is online.",
} as const;

export const pricing: {
  label: string;
  headline: string;
  lede: string;
  /** Optional. Set this once you have a range you are happy to publish. */
  range?: string;
  notes: string[];
  schedule: Array<{ weight: number; amount: string; when: string; body: string; free?: boolean }>;
  terms: Array<{ title: string; body: string }>;
  footnote: string;
} = {
  label: "What it costs",
  headline: "You'll know the number before we start.",
  lede: "We quote a fixed price for each phase, and we quote it after you have seen the prototype. Estimating from something that runs is a great deal more accurate than estimating from a document, which is why we can commit to a number instead of billing you by the hour.",
  notes: ["No day rates", "No hourly billing", "No surprise line items", "No lock-in"],
  schedule: [
    {
      weight: 22,
      amount: "0",
      when: "The prototype",
      body: "Everything up to your decision. No invoice, no deposit, no retainer.",
      free: true,
    },
    {
      weight: 31,
      amount: "40%",
      when: "When the build starts",
      body: "Scope, price and dates are written down and agreed before anyone opens an editor.",
    },
    {
      weight: 31,
      amount: "40%",
      when: "When it runs where you work",
      body: "Not when we say it is finished. When it is deployed in your environment and doing the job.",
    },
    {
      weight: 16,
      amount: "20%",
      when: "Thirty days after go-live",
      body: "The last slice waits until it has survived a month of real use.",
    },
  ],
  terms: [
    {
      title: "Fixed price, never a day rate",
      body: "One number per phase, agreed before anyone starts. If it takes us longer than we thought, that is ours to absorb. It does not arrive as a change request.",
    },
    {
      title: "Founding client rates",
      body: "Our first few clients pay less than we will charge later. You are carrying the risk of hiring a firm with no track record, and the discount is what we think that risk is worth. In return we would like to describe the work once it is live, anonymised if you prefer. If your legal team says no, we will still do the work.",
    },
    {
      title: "You own all of it",
      body: "Code, infrastructure, documentation and the prompts, yours from the first commit. No licence, no per-seat fee on your own system, and nothing stopping you taking it to somebody else.",
    },
    {
      title: "Support is optional",
      body: "A monthly rate if you want us on call. The handover is done properly so that you should not have to, and we would rather you did not need us.",
    },
  ],
  footnote:
    "If the scope changes, we tell you what it costs before you agree to it. Nothing appears on an invoice you have not already seen.",
};

export const hardening = {
  label: "What a demo is missing",
  headline: "A demo proves it can work once.",
  lede: "Here is the same system twice. On the left, what you'll be clicking in week one. On the right, what we hand over. The difference isn't features.",
  demo: ["Interface", "Logic", "Model"],
  production: [
    "Automated tests",
    "Evaluations that run in CI",
    "Tracing you can read",
    "Alerting that wakes someone",
    "Access control",
    "Data boundaries",
    "Rollback that works",
    "Cost limits",
    "Runbooks",
    "Your team, trained",
  ],
  closing:
    "That right-hand side is where the money and the months go. It is also the reason we can afford to give the left-hand side away.",
} as const;

export const honesty = {
  label: "Straight about where we are",
  headline: "We're new. That's exactly why the first version is free.",
  body: [
    "Arthoken hasn't been around long enough to have a wall of client logos, and we aren't going to borrow anybody else's. Asking you to trust a case study you can't verify felt like the wrong way to start, so we do the other thing. We build you something and let you judge it.",
    "The people who talk to you are the people who do the work. No account manager in between, no team you never meet. That stays true for as long as we can make it stay true.",
  ],
} as const;

export const architecture = {
  label: "How we build AI",
  headline: "AI inside a system you can reason about.",
  lede: "A model on its own is a demo. This is the shape of what we actually put into production.",
  notes: [
    {
      n: "01",
      title: "The model does the language work",
      body: "Reading, drafting, summarising, extracting. It is not the one making the final call.",
    },
    {
      n: "02",
      title: "Decisions stay in ordinary code",
      body: "Rules you can read, test and explain to an auditor months later.",
    },
    {
      n: "03",
      title: "A person approves what matters",
      body: "And every approval becomes a test case the system is measured against.",
    },
    {
      n: "04",
      title: "Everything is watched",
      body: "Tracing, evaluation and alerts, exactly like any other production system.",
    },
  ],
} as const;

export const modernization = {
  label: "Modernization",
  headline: "Replace the engine without stopping the car.",
  lede: "Nobody can afford a two-year rewrite with a big-bang cutover. We move one capability at a time, and prove nothing changed before any traffic shifts.",
  steps: [
    { n: "01", title: "Wrap", body: "A façade goes in front of the old system. Nothing behind it changes yet." },
    { n: "02", title: "Extract", body: "One capability at a time moves out into a service you can actually change." },
    { n: "03", title: "Prove", body: "Real production traffic runs against both, and we compare every result." },
    { n: "04", title: "Switch", body: "Traffic moves across when the evidence says it is safe. And it can move back." },
  ],
} as const;

/* ---------- Content that now lives on the inner pages ---------- */

export const philosophy = {
  label: "What we believe",
  headline: "What doesn’t change.",
  lede: "Technology moves quickly. These do not.",
  principles: [
    { n: "01", statement: "Problem before technology.", gloss: "A request is not a problem statement. We go and find the real one." },
    { n: "02", statement: "Architecture before speed.", gloss: "Going fast in the wrong structure just makes more of the wrong thing." },
    { n: "03", statement: "AI where it matters.", gloss: "For judgment, language and scale. Not for sums a line of code already does." },
    { n: "04", statement: "Simple before clever.", gloss: "Clever code is a bill paid by whoever maintains it next." },
    { n: "05", statement: "People stay accountable.", gloss: "Every automated step needs a person who can answer for it." },
    { n: "06", statement: "Systems outlive their builders.", gloss: "If it only works while we are in the room, we have not finished." },
    { n: "07", statement: "Engineering is a business capability.", gloss: "It belongs beside strategy, not downstream of it." },
  ],
} as const;

export const ai = {
  label: "How we build AI",
  headline: ["AI changes the tools.", "Good engineering still matters."],
  lede: "A model in a demo is a demo. A model in production is part of a real system, and it has to be built like one.",
  columns: [
    {
      heading: "What we build with",
      items: [
        "Foundation models",
        "Agents that use tools",
        "Search over your own content",
        "Structured workflows",
        "Task-specific tuning, where it earns its place",
      ],
    },
    {
      heading: "What keeps it dependable",
      items: [
        "Ordinary software architecture",
        "Clear limits on what AI decides",
        "Testing that catches regressions",
        "Monitoring you can read",
        "Security and data boundaries",
        "A person accountable for the outcome",
      ],
    },
  ],
  closing:
    "We don’t replace engineering with prompting. We put AI inside a system you can reason about.",
} as const;

export const talent = {
  label: "People",
  headline: "Small teams. Senior people. Nobody in the middle.",
  body: [
    "You should not have to pay for the coordination between you and the people solving your problem. Arthoken puts experienced engineers and product thinkers directly on the work, in teams small enough to hold the whole problem in their heads.",
    "Fewer people who have done this before, and nobody in between.",
  ],
  commitments: [
    "The people who lead the work are the people doing it.",
    "Teams are sized to the problem, not to the contract.",
    "We say no to work we are not right for.",
  ],
} as const;

export const insights = {
  label: "Writing",
  headline: "Notes from the practice.",
  lede: "We publish when we have something worth saying. There is no content calendar.",
  items: [
    {
      category: "AI engineering",
      title: "The demo is done in an afternoon. Then what?",
      dek: "A list of everything that stands between a convincing prototype and something you can put your name on.",
      status: "Forthcoming",
    },
    {
      category: "Architecture",
      title: "Replacing a system nobody is allowed to switch off",
      dek: "Running old and new side by side buys you time. What you do with the time is the actual strategy.",
      status: "Forthcoming",
    },
    {
      category: "Engineering practice",
      title: "Code review when half the code was drafted by a model",
      dek: "Volume moved first. Ownership, review and trust have to move with it or the whole thing gets worse.",
      status: "Forthcoming",
    },
  ],
} as const;

export const cta = {
  headline: ["Something been stuck for a while?", "Let’s see it."],
  body: "Bring us the problem. A couple of weeks later you’ll either have something you want, or you’ll have spent two meetings and learned something. We think that’s a fair trade.",
  primary: { label: "Bring us a problem", href: "/contact" },
  secondary: { label: "How this works", href: "/#how" },
} as const;
