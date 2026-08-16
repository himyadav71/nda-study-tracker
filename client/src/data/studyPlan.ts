/**
 * Field Manual Progress Deck content model.
 * The plan preserves the user's 28-day NDA II 2026 school-friendly study schedule.
 */
export type Subject = "Mathematics" | "English" | "GK" | "Current Affairs" | "Mock";

export type StudyTask = {
  id: string;
  subject: Subject;
  title: string;
  duration: string;
};

export type StudyDay = {
  day: number;
  date: string;
  shortDate: string;
  week: number;
  title: string;
  focus: string;
  target: string;
  checkpoint?: string;
  tasks: StudyTask[];
};

const tasks = (day: number, entries: Array<[Subject, string, string]>): StudyTask[] =>
  entries.map(([subject, title, duration], index) => ({
    id: `d${day}-${index + 1}`,
    subject,
    title,
    duration,
  }));

export const studyPlan: StudyDay[] = [
  {
    day: 1, date: "2026-08-16", shortDate: "Sun · 16 Aug", week: 1,
    title: "Baseline briefing", focus: "Diagnose first. Study second.", target: "Find your three weak Mathematics areas.",
    checkpoint: "60Q Maths diagnostic · 25Q English · 50Q GK",
    tasks: tasks(1, [
      ["Mathematics", "60-question mixed Mathematics diagnostic — no theory before the test", "90 min"],
      ["English", "Mixed vocabulary, grammar and idiom warm-up", "25 Q"],
      ["GK", "Mixed Physics, Geography, History and Science diagnostic", "50 Q"],
      ["Current Affairs", "Set up a current-affairs and error-log notebook", "20 min"],
    ]),
  },
  {
    day: 2, date: "2026-08-17", shortDate: "Mon · 17 Aug", week: 1,
    title: "Algebra starts", focus: "Sets, relations and functions.", target: "Master the core language of Algebra.",
    tasks: tasks(2, [
      ["Mathematics", "Sets, relations and functions: De Morgan, domain/range, one-one/onto, composition and inverse", "75 min"],
      ["English", "Articles, determiners and subject–verb agreement", "20 Q"],
      ["GK", "Physics: units, dimensions, motion graphs and equations of motion", "25 Q"],
      ["Current Affairs", "Recall yesterday's notes; add five high-value updates", "15 min"],
    ]),
  },
  {
    day: 3, date: "2026-08-18", shortDate: "Tue · 18 Aug", week: 1,
    title: "Progressions", focus: "AP, GP and HP without hesitation.", target: "Solve nth-term and sum models cleanly.",
    tasks: tasks(3, [
      ["Mathematics", "AP, GP and HP: nth term, sums, means and mixed progression statements", "30 Q"],
      ["English", "PYQ synonyms and antonyms in context", "20 Q"],
      ["GK", "Physics: Newton's laws, friction, work-energy-power and momentum", "25 Q"],
      ["Current Affairs", "Add today’s defence, awards or science update", "15 min"],
    ]),
  },
  {
    day: 4, date: "2026-08-19", shortDate: "Wed · 19 Aug", week: 1,
    title: "Complex control", focus: "Complex numbers and quadratics.", target: "Know conjugates, modulus and root relations.",
    tasks: tasks(4, [
      ["Mathematics", "Complex numbers, powers of i, cube roots of unity, quadratics and nature of roots", "30 Q"],
      ["English", "High-frequency idioms and phrases in example sentences", "20 Q"],
      ["GK", "Physics: gravitation, escape velocity, density, pressure and equilibrium", "25 Q"],
      ["Current Affairs", "Review the Day 2 current-affairs notes", "15 min"],
    ]),
  },
  {
    day: 5, date: "2026-08-20", shortDate: "Thu · 20 Aug", week: 1,
    title: "Counting patterns", focus: "P&C and binomial theorem.", target: "Choose the right counting method before calculating.",
    tasks: tasks(5, [
      ["Mathematics", "Permutation/combination, restricted arrangements, nPr/nCr and binomial coefficients", "30 Q"],
      ["English", "Tenses and sentence completion", "20 Q"],
      ["GK", "Physics: current, resistance, Ohm's law, circuits and electrical power", "25 Q"],
      ["Current Affairs", "Add five current affairs from today", "15 min"],
    ]),
  },
  {
    day: 6, date: "2026-08-21", shortDate: "Fri · 21 Aug", week: 1,
    title: "Algebra consolidation", focus: "Inequalities, logs and binary.", target: "End the week with a mixed Algebra set.",
    tasks: tasks(6, [
      ["Mathematics", "Inequalities, logarithms, binary questions and mixed Algebra revision", "35 Q"],
      ["English", "Prepositions and conjunctions in sentence correction", "20 Q"],
      ["GK", "Physics: magnetism, induction and basic instruments", "25 Q"],
      ["Current Affairs", "Compile the week’s defence and science notes", "15 min"],
    ]),
  },
  {
    day: 7, date: "2026-08-22", shortDate: "Sat · 22 Aug", week: 1,
    title: "First field check", focus: "Test, capture errors, recover.", target: "60%+ accuracy — not maximum attempts.",
    checkpoint: "60Q Maths set · 50Q English mini-test · 40Q Physics revision",
    tasks: tasks(7, [
      ["Mathematics", "Algebra formula sheet and 60-question timed set", "90 min"],
      ["English", "English mini-test: grammar, vocabulary and idioms", "50 Q"],
      ["GK", "Physics mixed revision from the week", "40 Q"],
      ["Current Affairs", "Error-log review and weekly current-affairs recap", "40 min"],
    ]),
  },
  {
    day: 8, date: "2026-08-23", shortDate: "Sun · 23 Aug", week: 2,
    title: "Maths Mock 01", focus: "Simulate. Analyse. Adjust.", target: "Record score, attempts, wrongs and guesses.",
    checkpoint: "Full Mathematics Mock 01 · 120Q in 150 min",
    tasks: tasks(8, [
      ["Mock", "Full Mathematics Mock 01 — simulate the real 150-minute paper", "120 Q"],
      ["Mathematics", "Analyse every wrong and guessed answer by error type", "90 min"],
      ["GK", "Modern India: 1857, major Acts, Congress and Gandhi chronology", "40 Q"],
      ["Current Affairs", "Weekly current-affairs revision", "20 min"],
    ]),
  },
  {
    day: 9, date: "2026-08-24", shortDate: "Mon · 24 Aug", week: 2,
    title: "Matrix moves", focus: "Properties make marks.", target: "Use determinant changes instantly.",
    tasks: tasks(9, [
      ["Mathematics", "Matrices and determinants: properties, transpose, adjoint, inverse and singularity", "25 Q"],
      ["English", "Active/passive voice and direct/indirect speech", "20 Q"],
      ["GK", "Chemistry: atomic structure, electronic configuration and periodic trends", "25 Q"],
      ["Current Affairs", "Revise Mock 01 error log", "15 min"],
    ]),
  },
  {
    day: 10, date: "2026-08-25", shortDate: "Tue · 25 Aug", week: 2,
    title: "Trig toolkit", focus: "Identity first; speed second.", target: "Make standard values automatic.",
    tasks: tasks(10, [
      ["Mathematics", "Trigonometric identities, compound angles and standard values", "30 Q"],
      ["English", "Synonyms and antonyms; revisit previous error words", "20 Q"],
      ["GK", "Chemistry: acids, bases, salts, pH, indicators and neutralisation", "25 Q"],
      ["Current Affairs", "Add five current affairs with static background", "15 min"],
    ]),
  },
  {
    day: 11, date: "2026-08-26", shortDate: "Wed · 26 Aug", week: 2,
    title: "Trig applications", focus: "Inverse trig and triangle logic.", target: "Own max/min and height-distance questions.",
    tasks: tasks(11, [
      ["Mathematics", "Inverse trigonometry, triangle identities, height-distance and max a sin x + b cos x", "30 Q"],
      ["English", "Sentence ordering: opening, links, contrast and conclusion", "20 Q"],
      ["GK", "Chemistry: redox, common compounds, water, gases and detergents", "25 Q"],
      ["Current Affairs", "Review Day 8 current affairs", "15 min"],
    ]),
  },
  {
    day: 12, date: "2026-08-27", shortDate: "Thu · 27 Aug", week: 2,
    title: "Calculus begins", focus: "Limits and continuity.", target: "Recognise standard limits under time pressure.",
    tasks: tasks(12, [
      ["Mathematics", "Standard limits, rationalisation, one-sided limits and piecewise continuity", "25 Q"],
      ["English", "Reading comprehension: main idea, evidence and inference", "1 passage"],
      ["GK", "Biology: cell structure, cell division, DNA, RNA and genetics", "25 Q"],
      ["Current Affairs", "Add today’s current-affairs update", "15 min"],
    ]),
  },
  {
    day: 13, date: "2026-08-28", shortDate: "Fri · 28 Aug", week: 2,
    title: "Derivative decisions", focus: "Differentiate with purpose.", target: "Link derivatives to change and extrema.",
    tasks: tasks(13, [
      ["Mathematics", "Derivatives, chain/product/quotient rules, implicit differentiation and maxima/minima", "30 Q"],
      ["English", "Mixed grammar correction: articles, prepositions, agreement, voice and narration", "20 Q"],
      ["GK", "Biology: blood, digestion, respiration, immunity, diseases and vitamins", "25 Q"],
      ["Current Affairs", "Revisit current-affairs notebook", "15 min"],
    ]),
  },
  {
    day: 14, date: "2026-08-29", shortDate: "Sat · 29 Aug", week: 2,
    title: "GAT Mock 01", focus: "Accuracy beats broad guessing.", target: "Separate English and GK accuracy.",
    checkpoint: "Full GAT Mock 01 · 150Q in 150 min",
    tasks: tasks(14, [
      ["Mathematics", "Light repair: 30 questions from your two weakest areas", "30 Q"],
      ["Mock", "Full GAT Mock 01 — English plus GK under exam timing", "150 Q"],
      ["English", "Review English errors: rule, word or selection mistake", "45 min"],
      ["GK", "Review GK errors: missing fact versus poor elimination", "45 min"],
    ]),
  },
  {
    day: 15, date: "2026-08-30", shortDate: "Sun · 30 Aug", week: 3,
    title: "Integral systems", focus: "Integrate, interpret, apply.", target: "Turn standard forms into quick marks.",
    tasks: tasks(15, [
      ["Mathematics", "Integration, substitution, parts, partial fractions, definite integrals, area and first-order DE", "50 Q"],
      ["English", "Vocabulary and idiom revision from your error log", "30 Q"],
      ["GK", "History & culture: Indus, Buddhism/Jainism, Maurya/Gupta, architecture and temples", "40 Q"],
      ["Current Affairs", "Weekly recap", "20 min"],
    ]),
  },
  {
    day: 16, date: "2026-08-31", shortDate: "Mon · 31 Aug", week: 3,
    title: "Line of sight", focus: "Straight lines and conditions.", target: "Use slope and distance formulas reliably.",
    tasks: tasks(16, [
      ["Mathematics", "Straight lines: slope, angle, distance, parallel/perpendicular and collinearity", "25 Q"],
      ["English", "Prepositions, conjunctions and sentence completion", "20 Q"],
      ["GK", "Geography: Earth's interior, rocks, earthquakes, volcanoes, soils and geomorphology", "25 Q"],
      ["Current Affairs", "Add five updates", "15 min"],
    ]),
  },
  {
    day: 17, date: "2026-09-01", shortDate: "Tue · 1 Sep", week: 3,
    title: "Circle conditions", focus: "Coordinate geometry that scores.", target: "Find the condition before calculation.",
    tasks: tasks(17, [
      ["Mathematics", "Circles and selected conics: centre/radius, chord/diameter, circle through points, eccentricity", "30 Q"],
      ["English", "Idioms, phrases and a grammar-correction sprint", "20 Q"],
      ["GK", "Geography: atmosphere, winds, rainfall, cyclones and climate", "30 Q"],
      ["Current Affairs", "Review Day 15 notes", "15 min"],
    ]),
  },
  {
    day: 18, date: "2026-09-02", shortDate: "Wed · 2 Sep", week: 3,
    title: "Vector direction", focus: "Dot, cross, angle and projection.", target: "Know which product the question needs.",
    tasks: tasks(18, [
      ["Mathematics", "Vectors: dot/cross products, angle, projection, scalar triple product and area/volume", "30 Q"],
      ["English", "Reading comprehension and sentence ordering", "25 Q"],
      ["GK", "Indian Geography: rivers, resources, industries, ports and map locations", "25 Q"],
      ["Current Affairs", "Add today’s update", "15 min"],
    ]),
  },
  {
    day: 19, date: "2026-09-03", shortDate: "Thu · 3 Sep", week: 3,
    title: "3-D position", focus: "Lines, planes and spheres.", target: "Use direction ratios before memorising more formulas.",
    tasks: tasks(19, [
      ["Mathematics", "3-D: direction ratios/cosines, line-plane relation, distance and sphere centre/radius", "30 Q"],
      ["English", "Mixed English PYQ set", "30 Q"],
      ["GK", "Polity: Constitution, rights, Parliament, Supreme Court, EC, CAG and Finance Commission", "30 Q"],
      ["Current Affairs", "Revise the Polity body-function list", "15 min"],
    ]),
  },
  {
    day: 20, date: "2026-09-04", shortDate: "Fri · 4 Sep", week: 3,
    title: "Probability calls", focus: "Conditions, Bayes and distribution.", target: "Translate words into events precisely.",
    tasks: tasks(20, [
      ["Mathematics", "Conditional probability, Bayes, independent events, dice, coins, urns and binomial probability", "30 Q"],
      ["English", "Cloze, word classes and grammar repair", "20 Q"],
      ["GK", "Economy: inflation, banking, money, budget, tax, poverty and unemployment", "25 Q"],
      ["Current Affairs", "Weekly current affairs and defence revision", "25 min"],
    ]),
  },
  {
    day: 21, date: "2026-09-05", shortDate: "Sat · 5 Sep", week: 3,
    title: "Maths Mock 02", focus: "Repeat less. Learn more.", target: "Identify the errors that survived Mock 01.",
    checkpoint: "Full Mathematics Mock 02 · 120Q in 150 min",
    tasks: tasks(21, [
      ["Mock", "Full Mathematics Mock 02 under strict timing", "120 Q"],
      ["Mathematics", "Mock analysis: mark repeated, careless and knowledge-gap errors", "90 min"],
      ["Current Affairs", "Current affairs and defence set", "40 Q"],
      ["English", "Short English error-log review", "20 min"],
    ]),
  },
  {
    day: 22, date: "2026-09-06", shortDate: "Sun · 6 Sep", week: 4,
    title: "GAT Mock 02", focus: "Calm breadth. Clean selection.", target: "Make English and two GK areas reliable.",
    checkpoint: "Full GAT Mock 02 · 150Q in 150 min",
    tasks: tasks(22, [
      ["Mathematics", "Statistics, DI and Probability revision: mean, variance, deviation and tables", "35 Q"],
      ["English", "English sectional test", "50 Q"],
      ["Mock", "Full GAT Mock 02 — analyse English and GK separately", "150 Q"],
      ["Current Affairs", "Record the top current-affairs gaps from the mock", "20 min"],
    ]),
  },
  {
    day: 23, date: "2026-09-07", shortDate: "Mon · 7 Sep", week: 4,
    title: "Revision A", focus: "Algebra is your scoring base.", target: "Turn formula recall into speed.",
    tasks: tasks(23, [
      ["Mathematics", "Mixed Algebra: sets/functions, AP/GP/HP, complex, P&C/binomial and matrices", "40 Q"],
      ["English", "Timed grammar and sentence completion", "25 Q"],
      ["GK", "Physics and Chemistry mixed priority revision", "50 Q"],
      ["Current Affairs", "Error-log review", "15 min"],
    ]),
  },
  {
    day: 24, date: "2026-09-08", shortDate: "Tue · 8 Sep", week: 4,
    title: "Revision B", focus: "Calculus and space geometry.", target: "Practise transitions between topics.",
    tasks: tasks(24, [
      ["Mathematics", "Mixed Calculus, trigonometry, integration, DE, vectors and 3-D geometry", "40 Q"],
      ["English", "Sentence ordering, comprehension and cloze", "25 Q"],
      ["GK", "Geography and Biology priority revision", "50 Q"],
      ["Current Affairs", "Add final weekly updates", "15 min"],
    ]),
  },
  {
    day: 25, date: "2026-09-09", shortDate: "Wed · 9 Sep", week: 4,
    title: "Repair the evidence", focus: "Your errors choose the work.", target: "Fix the three highest-wrong topics.",
    tasks: tasks(25, [
      ["Mathematics", "Weak-topic repair from Mocks 01 and 02 — choose by wrong count, not fear", "60 Q"],
      ["English", "Vocabulary and grammar sprint", "25 Q"],
      ["GK", "History, Polity, Economy and Current Affairs set", "50 Q"],
      ["Current Affairs", "Revise all marked facts", "20 min"],
    ]),
  },
  {
    day: 26, date: "2026-09-10", shortDate: "Thu · 10 Sep", week: 4,
    title: "Model rehearsal", focus: "One model from every high-yield family.", target: "Stop new theory after today.",
    tasks: tasks(26, [
      ["Mathematics", "Formula/model circuit: progression, complex, determinant, trig, limit, vector, probability and stats", "30 Q"],
      ["English", "Full vocabulary and idiom error-list revision", "30 min"],
      ["GK", "Current affairs, defence and constitutional bodies revision", "50 Q"],
      ["Current Affairs", "Final notebook compression: one-page sheet", "20 min"],
    ]),
  },
  {
    day: 27, date: "2026-09-11", shortDate: "Fri · 11 Sep", week: 4,
    title: "Conditioning run", focus: "Short, sharp and measured.", target: "No repeated careless error pattern.",
    checkpoint: "60Q Maths + 25Q English + 50Q GK simulation",
    tasks: tasks(27, [
      ["Mock", "Half-length Mathematics simulation", "60 Q · 75 min"],
      ["English", "Timed English mixed set", "25 Q"],
      ["GK", "Timed GK mixed set", "50 Q · 60 min"],
      ["Current Affairs", "Analyse immediately; revise mistakes only", "45 min"],
    ]),
  },
  {
    day: 28, date: "2026-09-12", shortDate: "Sat · 12 Sep", week: 4,
    title: "Pre-exam reset", focus: "Arrive rested and accurate.", target: "Maximum 2.5–3 hours. Sleep early.",
    checkpoint: "Light revision only · no new theory",
    tasks: tasks(28, [
      ["Mathematics", "Formula sheet, standard results, common traps and 15 confidence questions", "45 min"],
      ["English", "Vocabulary, idioms and grammar rules only", "35 min"],
      ["GK", "Current affairs, defence, Polity and science fact sheet", "45 min"],
      ["Current Affairs", "Pack documents and permitted stationery; sleep early", "20 min"],
    ]),
  },
];

export const subjectDetails: Record<Subject, { color: string; short: string }> = {
  Mathematics: { color: "orange", short: "MATH" },
  English: { color: "blue", short: "ENG" },
  GK: { color: "sage", short: "GK" },
  "Current Affairs": { color: "sand", short: "CA" },
  Mock: { color: "ink", short: "MOCK" },
};
