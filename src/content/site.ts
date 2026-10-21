// All copy sourced from monacare.co.uk (Oct 2026) and the MonaCare Visual Identity Guidelines v1.0
// (mission, vision, values, proposition), set in sentence case per the guidelines.
// Imagery is Unsplash placeholder photography, chosen against the guidelines' photography direction
// (authentic, documentary, no staged smiles, no frailty). Swap for client photography in `images` below.

const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: u("photo-1690192522216-f71f9648653f", 1600),
  about: u("photo-1554902748-feaf536fc594", 1600),
  // Sharon Gitau's portrait, supplied by the client (decorative ring removed, cropped to 4:5)
  founder: "/team/sharon-gitau.webp",
  culture: u("photo-1765307639918-a99f7f3d9f75", 2400),
  team: u("photo-1769740333462-9a63bfa914bc", 1600),
  children: u("photo-1522881193457-37ae97c905bf", 1600),
};

// Hero background video, supplied by the client with their hero spec (a city skyline over a park, no
// people). Hosted on the client's CDN; the still in /public is its first frame, shown while it loads.
export const heroVideo = {
  sources: [
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4",
    },
  ],
  poster: "/hero-poster.jpg",
};

export const site = {
  name: "MonaCare",
  // Registered company (client form, Oct 2026). The brand stays MonaCare.
  legalName: "SWTD Care and Consultancy",
  tagline:
    "Empowering excellence in social care through cultural competence and trauma-informed approaches.",
  proposition: "Expertise with heart.",
  cta: { label: "Book a consultation", href: "#book" },
  email: "info@monacare.co.uk",
  phone: "07730 480358",
  phoneTel: "+447730480358", // for tel: links
  whatsapp: "https://wa.me/447730480358", // same number on WhatsApp
  hours: "8am-7pm",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
  ],
};

export const hero = {
  label: "Social care consultancy",
  title: "Excellence in care, expertise in compliance.",
  sub: "Empowering excellence in social care through cultural competence and trauma-informed approaches.",
  secondary: { label: "Our services", href: "/services" },
  // Heading over the four ways in (Home, pinned columns)
  indexLabel: "Ways in",
  indexTitle: "Four ways to start working with MonaCare",
  imageAlt: "Three women in conversation around a laptop in a bright sitting room",
  index: [
    {
      title: "Book a consultation",
      body: "Sixty minutes with a specialist, and a clear view of where you stand and what to do next.",
      href: "#book",
    },
    {
      title: "Ofsted and CQC",
      body: "Registration, documentation and best practice that help you exceed the standard, not just meet it.",
      href: "/services#ofsted-cqc-consultancy",
    },
    {
      title: "Trauma-informed care",
      body: "Evidence-based approaches that build safe, healing environments for children and families.",
      href: "/services#trauma-recovery",
    },
    {
      title: "Cultural competence",
      body: "Inclusive practice that bridges the gap between mainstream services and diverse communities.",
      href: "/services#cultural-competence",
    },
  ],
};

// Key facts, from the original monacare.co.uk ("20+ years", "5 specialist programmes", "6 sectors served")
export const facts = [
  { value: 20, suffix: "+", label: "Years in the care sector" },
  { value: 5, suffix: "", label: "Specialist programmes" },
  { value: 6, suffix: "", label: "Sectors served" },
];

export const welcome =
  "Welcome to MonaCare. We guide care organisations through Ofsted and CQC compliance, with trauma-informed practice and cultural competence at the heart of every service.";

export const about = {
  label: "About MonaCare",
  title: "Two decades of service in social care",
  lede: "MonaCare guides organisations through Ofsted and CQC compliance while embedding trauma-informed approaches and cultural competence into care delivery.",
  body: "With over 20 years of industry experience, we've helped numerous care agencies and local authorities establish exceptional standards. We're committed to increasing representation of Black businesses in social care and ensuring truly inclusive practices that bridge gaps between mainstream services and diverse communities.",
  imageAlt: "A small team meeting around a table in a light-filled office",
  purpose:
    "To put the human heart at the centre of therapeutic care, and give care organisations the expertise and leadership to keep it there.",
  mission:
    "To support care providers with clear, practical expertise, so their teams feel confident, their services stay compliant and the people they support live well.",
  vision:
    "A UK care sector in which every service is safe, well led, compliant and unmistakably human.",
  values: [
    { title: "Compassion", body: "We lead with kindness and see the person behind every process.", practice: "We listen first and never lose sight of who care is for." },
    { title: "Integrity", body: "We are honest, transparent and accountable in every service we provide.", practice: "We say what we see, keep our promises and keep reflecting and improving." },
    { title: "Expertise", body: "We bring deep, current knowledge of UK care regulations and practice.", practice: "Our advice is evidence-based, practical and ready to use." },
    { title: "Inclusion", body: "We include every provider, every person who uses services and every culture.", practice: "We design services, training and documents that work for all." },
    { title: "Partnership", body: "We work alongside providers, never above them.", practice: "We build capability and confidence that last after we leave." },
  ],
};

export type TeamMember = {
  name: string;
  role: string;
  title: string;
  image: string;
  imageAlt: string;
  summary: string;
  paragraphs: string[];
  roles: { title: string; org: string; detail?: string }[];
};

// Add new people to `members`. The first member is featured; everyone after appears in the grid.
export const team = {
  label: "Our team",
  title: "The people behind MonaCare",
  lede: "Practitioners with lived experience of the care sector, working alongside providers, never above them.",
  members: [
    {
      name: "Sharon Gitau",
      role: "Founder and lead consultant",
      title: "Transformative Social Care Trauma Practitioner",
      image: images.founder,
      imageAlt: "Sharon Gitau, founder and lead consultant of MonaCare",
      summary:
        "Over 20 years in the care sector, pioneering residential care strategies that promote healing for trauma-affected young people.",
      paragraphs: [
        "Sharon is a Transformative Social Care Trauma Practitioner with over 20 years of experience in the care sector. As Registered Manager at Brighter Beginnings children's home, she pioneers residential care strategies promoting healing for trauma-affected youth.",
        "Her expertise extends to business mentorship, particularly empowering Black entrepreneurs in social care. Sharon serves as a Panel Adviser at Swindon Foster Panel and Funding Manager at DADA, bridging gaps between ethnic communities and mainstream services.",
      ],
      roles: [
        // Details are from Sharon's bio. TODO: add dates from the client to make this a true timeline.
        {
          title: "Registered Manager",
          org: "Brighter Beginnings",
          detail: "Leading a children's home and pioneering residential care strategies that promote healing for trauma-affected young people.",
        },
        {
          title: "Panel Adviser",
          org: "Swindon Foster Panel",
        },
        {
          title: "Funding Manager",
          org: "DADA",
          detail: "Bridging gaps between ethnic communities and mainstream services.",
        },
      ],
    },
  ] satisfies TeamMember[],
};

export const culture = {
  title: "Care rooted in culture, shaped by lived experience.",
  body: "We believe exceptional care is inclusive care. Every engagement weaves regulatory rigour together with cultural sensitivity and trauma-informed practice, so the people you support are not only safe, but truly seen.",
  imageAlt: "Three women from the community laughing together outdoors",
};

export type Service = {
  slug: string;
  // From the client form (Oct 2026)
  audience: string;
  formats: string[];
  length: string;
  price: string;
  outcomes: string;
  sessions?: string;
  dates?: string;
  title: string;
  short: string;
  body: string;
  image: string;
  imageAlt: string;
  testimonial?: string;
};

export const services = {
  label: "What we offer",
  title: "Comprehensive solutions for care organisations",
  intro:
    "Five programmes for care organisations seeking regulatory excellence, trauma-informed approaches and cultural competence.",
  items: [
    {
      slug: "ofsted-cqc-consultancy",
      audience: "Care homes, local authorities, care entrepreneurs, charities and CICs setting up or improving a regulated service",
      formats: ["Group workshop", "Online", "On-site"],
      length: "1 to 4 hours",
      price: "On request",
      outcomes: "Strategies, policies and support plans for setting up and running care, with outcomes and certificates",
      title: "Ofsted and CQC consultancy setup",
      short: "Registration, documentation and best practice that help you exceed the standard.",
      body: "Expert guidance for care organisations seeking regulatory compliance. We simplify the registration process, prepare essential documentation, and implement best practices to help you exceed Ofsted and Care Quality Commission (CQC) standards.",
      image: images.about,
      imageAlt: "A small team meeting around a table in a light-filled office",
      testimonial: "James T.",
    },
    {
      slug: "trauma-recovery",
      audience: "Professionals and parents working in the social care sector",
      formats: ["One-to-one", "Online", "On-site"],
      length: "1 to 2 hours",
      price: "On request",
      outcomes: "Outcomes, certificates and CPD accreditation",
      title: "Social care and trauma recovery",
      short: "Evidence-based approaches for safe, healing environments.",
      body: "Specialised training in evidence-based approaches for trauma-affected individuals. We equip care providers with methodologies to create safe, healing environments where children and families can recover and thrive.",
      image: images.children,
      imageAlt: "A carer and a young person sharing a moment at a desk by the window",
      testimonial: "Sophia W.",
    },
    {
      slug: "cultural-competence",
      audience: "Professionals and organisations growing their work with clients from different communities",
      formats: ["Group workshop", "Online", "On-site"],
      length: "1 to 4 hours",
      price: "On request",
      outcomes: "Outcomes, certificates and CPD",
      title: "Cultural competence and inclusion training",
      short: "Inclusive practice that bridges mainstream services and diverse communities.",
      body: "Practical training to enhance cultural sensitivity in care settings. We help organisations develop inclusive practices that bridge gaps between mainstream services and diverse communities.",
      image: images.culture,
      imageAlt: "Three women from the community laughing together outdoors",
      testimonial: "Priya M.",
    },
    {
      slug: "mentorship-leadership",
      audience: "Managers, Responsible Individuals and leaders in social care, team leaders who aspire to be managers, directors new to social care and owners opening children's homes",
      formats: ["One-to-one", "Group workshop", "Online"],
      length: "10 hours in total",
      price: "On request",
      outcomes: "Outcomes and certificates",
      title: "Mentorship and leadership development",
      short: "Leadership capacity and business acumen for the social care sector.",
      body: "Tailored coaching for care professionals and entrepreneurs. We build leadership capacity and business acumen specifically for the social care sector, emphasising sustainable growth strategies.",
      image: images.team,
      imageAlt: "A leadership team in discussion around a boardroom table",
    },
    {
      slug: "mindreset",
      audience: "Young people, practitioners and leaders, teachers in schools and the social care sector, and leaders of charities",
      formats: ["One-to-one", "Group workshop", "Online"],
      length: "10 hours in total",
      price: "On request",
      outcomes: "Outcomes and certificates, working towards a CPD course",
      sessions: "10 sessions",
      dates: "To be confirmed",
      title: "MINDreSET programme",
      short: "Mindset and resilience for leaders in care.",
      body: "Our personal development programme for mindset and resilience. Participants learn practical techniques for overcoming challenges and achieving sustained success in professional contexts.",
      image: images.hero,
      imageAlt: "Three women in conversation around a laptop in a bright sitting room",
      testimonial: "David L.",
    },
  ] satisfies Service[],
};

export const serve = {
  label: "Who we serve",
  title: "Partners in excellence",
  body: "We partner with care providers, regulatory bodies and community organisations committed to excellence in social care. Our consultancy is tailored to the needs of each organisation, with cultural competence and trauma-informed practice throughout.",
  items: [
    { label: "Local authorities", icon: "bank" },
    { label: "Care homes", icon: "house" },
    { label: "Care entrepreneurs", icon: "compass" },
    { label: "Cultural organisations", icon: "community" },
    { label: "National healthcare services", icon: "buildings" },
    { label: "Charities and CICs", icon: "hands" },
  ] as const,
};

export const testimonials = {
  label: "Testimonials",
  title: "Hear it from the people",
  intro: "What care providers, commissioners and leaders say about working with MonaCare.",
  items: [
    {
      quote:
        "Sharon's regulatory expertise and cultural training transformed our children's home. Her practical guidance was exactly what we needed!",
      name: "Sophia W.",
      role: "Care home manager",
    },
    {
      quote:
        "The cultural competence training has dramatically improved how our team engages with diverse communities.",
      name: "Priya M.",
      role: "Local authority commissioner",
    },
    {
      quote:
        "Sharon's MINDreSET program gave our leadership team the tools we needed to overcome challenges and drive meaningful change.",
      name: "David L.",
      role: "Charity CEO",
    },
    {
      quote:
        "The CQC compliance support we received was outstanding. Sharon's attention to detail and understanding of regulations saved us weeks of preparation.",
      name: "James T.",
      role: "Healthcare director",
    },
  ],
};

// Company details for the footer and legal pages. Empty values were not provided in the client form;
// they still show, with their label, so they can be filled in later.
// Social links. Empty ones show as placeholders until the client sends the address.
export const social = [
  { label: "WhatsApp", href: site.whatsapp, icon: "whatsapp" },
  { label: "Call", href: `tel:${site.phoneTel}`, icon: "phone" },
  { label: "Facebook", href: "", icon: "facebook" },
  { label: "X (Twitter)", href: "", icon: "x" },
] as const;

export const company = {
  number: "",
  registeredOffice: "",
  icoNumber: "",
  privacyContact: "Sharon",
  privacyEmail: "",
};

export const consultation = {
  label: "Start working with us",
  title: "The 60\u2011minute expert consultation",
  intro: "A focused hour with a specialist, and a clear view of where you stand and what to do next.",
  price: "\u00a335",
  delivery: "Online or in person",
  includes: [
    "Custom strategies for cultural competence implementation",
    "Personalised regulatory compliance guidance",
    "Expert assessment of your current practices",
    "Actionable next steps for improvement",
  ],
};

export const donate = {
  label: "Donate",
  imageAlt: "Three women from the community laughing together outdoors",
  title: "Support us for a better tomorrow",
  body: "Your donation supports our mission to enhance care services for diverse communities, so every child and family receives care that is safe, inclusive and healing.",
  cta: "Donate",
  // TODO: point at the real donation provider (e.g. a Stripe or JustGiving link)
  href: "#",
};
