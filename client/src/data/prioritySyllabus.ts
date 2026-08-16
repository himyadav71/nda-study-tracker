/**
 * Priority Syllabus data.
 * Field Manual Progress Deck: every module states its PYQ-led priority, frequency evidence and must-do subtopics.
 */
export type SyllabusArea = "Mathematics" | "English" | "GAT";
export type PriorityLevel = "P1" | "P2" | "P3";

export type SyllabusModule = {
  id: string;
  area: SyllabusArea;
  priority: PriorityLevel;
  title: string;
  frequency: string;
  evidence: string;
  mustDo: string[];
  questionModels: string[];
  studyCue: string;
};

export const priorityMeta: Record<PriorityLevel, { label: string; title: string; description: string }> = {
  P1: { label: "P1", title: "Secure first", description: "High-frequency, high-return blocks. Complete these before spending time on low-yield detail." },
  P2: { label: "P2", title: "Build next", description: "Reliable scoring coverage after the core. Keep these in the weekly revision loop." },
  P3: { label: "P3", title: "Cover smartly", description: "Full-syllabus insurance. Revise concise notes and practise the most common models." },
};

export const syllabusModules: SyllabusModule[] = [
  {
    id: "math-algebra", area: "Mathematics", priority: "P1", title: "Algebra & Number Systems", frequency: "35.2 Q average · 29.4% of paper", evidence: "Largest parent block across the four analysed Maths papers.", mustDo: ["AP/GP/HP: nth term, sum and relations", "Complex numbers, cube roots and roots of unity", "Quadratic roots, P&C, binomial theorem, sets and functions"], questionModels: ["identity / property", "arrangement or coefficient", "statement elimination"], studyCue: "Practise a mixed Algebra set daily until the common forms are automatic."
  },
  {
    id: "math-calculus", area: "Mathematics", priority: "P1", title: "Calculus", frequency: "23.2 Q average · 19.4% of paper", evidence: "Second-largest parent block; repeated strongly in the latest papers.", mustDo: ["Standard limits, continuity and differentiability", "Derivative applications: increase/decrease and extrema", "Definite integration, area under curves and first-order DE"], questionModels: ["standard form", "piecewise condition", "one-step application"], studyCue: "Keep a one-page formula sheet and redo every wrong model after 24 hours."
  },
  {
    id: "math-geometry", area: "Mathematics", priority: "P1", title: "Coordinate, Vector & 3-D Geometry", frequency: "21.8 Q average · 18.1% of paper", evidence: "A stable high block in all four papers, especially vector and 3-D models.", mustDo: ["Straight lines, circles and conic conditions", "Dot/cross product and direction ratios/cosines", "Lines, planes and spheres: relation, centre and radius"], questionModels: ["condition check", "direction relation", "coordinate substitution"], studyCue: "Draw a small diagram before calculating; it saves time on relation questions."
  },
  {
    id: "math-probability", area: "Mathematics", priority: "P1", title: "Probability & Statistics", frequency: "18.5 Q average · 15.4% of paper", evidence: "Appeared as a substantial block in every analysed Maths paper.", mustDo: ["Conditional probability and Bayes", "Dice, cards, urns and binomial distribution", "Mean, deviation and table/data interpretation"], questionModels: ["conditional event", "counting plus probability", "data table"], studyCue: "Write the sample space or event relation before choosing an option."
  },
  {
    id: "math-trig", area: "Mathematics", priority: "P2", title: "Trigonometry & Height–Distance", frequency: "13.2 Q average · 11.0% of paper", evidence: "Volatile but never safe to skip; it rose to 18 questions in NDA I 2026.", mustDo: ["Standard identities and inverse-trig principal values", "Triangle identities and height–distance", "Maximum/minimum of a sin x + b cos x"], questionModels: ["identity reduction", "principal value", "triangle statement"], studyCue: "Memorise identities through 20-minute recall sessions, not passive reading."
  },
  {
    id: "math-matrices", area: "Mathematics", priority: "P2", title: "Matrices & Determinants", frequency: "8.0 Q average · 6.7% of paper", evidence: "A compact, formulaic scoring group that appeared in all four papers.", mustDo: ["Determinant operations and transpose effects", "Adjoint, inverse and singular matrices", "Symmetric/skew-symmetric and 2×2 / 3×3 properties"], questionModels: ["property statement", "row/column operation", "inverse condition"], studyCue: "Do not skip this small block; it converts formula recall into quick marks."
  },
  {
    id: "english-grammar", area: "English", priority: "P1", title: "Grammar, Usage & Sentence Completion", frequency: "52 Q total · 4/4 papers", evidence: "The largest English family and the strongest daily scoring opportunity.", mustDo: ["Tense, agreement, articles and prepositions", "Conjunctions, comparison and sentence correction", "Voice, narration and context-based completion"], questionModels: ["spot the error", "best completion", "correct usage"], studyCue: "Complete 25–40 timed questions daily and record the rule behind each error."
  },
  {
    id: "english-vocabulary", area: "English", priority: "P1", title: "Idioms, Synonyms & Antonyms", frequency: "74 Q combined · idioms/synonyms in 4/4", evidence: "Vocabulary and fixed-expression questions recur in every paper window.", mustDo: ["High-frequency editorial words with context", "Idioms and phrases in full sentences", "Root words and close-meaning distinctions"], questionModels: ["meaning in context", "nearest opposite", "fixed expression"], studyCue: "Revise 20–30 words or idioms daily, then test them without looking."
  },
  {
    id: "english-ordering", area: "English", priority: "P2", title: "Ordering & Reading Comprehension", frequency: "36 Q combined · 3/4 papers", evidence: "A rotation group: low in the latest paper but frequent in the earlier window.", mustDo: ["Opening sentence and pronoun links", "Connectors, contrast and cause–effect", "Main idea, inference and vocabulary in passage"], questionModels: ["sentence sequence", "passage inference", "logical connector"], studyCue: "Do one short ordering or comprehension set every week, even when it feels easy."
  },
  {
    id: "english-coverage", area: "English", priority: "P3", title: "Word Classes & Cloze", frequency: "23 Q combined · rotation coverage", evidence: "Smaller but syllabus-relevant: cloze was prominent in NDA I 2024.", mustDo: ["Parts of speech in actual sentences", "Articles, prepositions and collocation", "Paragraph flow and tense consistency"], questionModels: ["word class", "cloze blank", "collocation"], studyCue: "Use concise weekly revision; do not let this replace core grammar practice."
  },
  {
    id: "gat-physics-core", area: "GAT", priority: "P1", title: "Physics: Mechanics, Electricity & Optics", frequency: "69 Q across the repeated core groups · 4/4 papers", evidence: "Physics is the largest recurring GK subject: 108 questions across the four papers.", mustDo: ["Newton’s laws, work-energy, momentum, gravitation and pressure", "Current, resistance, circuits, magnetism and induction", "Mirrors, lenses, instruments and light phenomena"], questionModels: ["law/property", "one-step numerical", "statement concept"], studyCue: "Build a formula-and-units sheet, then practise direct and statement questions together."
  },
  {
    id: "gat-geography", area: "GAT", priority: "P1", title: "Geography: Climate & Physical Geography", frequency: "39 Q across the two core groups · 4/4 papers", evidence: "Geography was the second-most stable GK subject after Physics.", mustDo: ["Atmosphere, winds, monsoon and climate factors", "Landforms, rocks, earthquakes and volcanism", "Rivers, soils, resources and India map locations"], questionModels: ["phenomenon explanation", "location relation", "map / statement"], studyCue: "Use an atlas or map sketch; location relations are faster to retain visually."
  },
  {
    id: "gat-chemistry", area: "GAT", priority: "P1", title: "Chemistry: Acid–Base–Redox & Periodicity", frequency: "29 Q across repeated core groups · 4/4 papers", evidence: "A factual and conceptually compact science block present across the sample.", mustDo: ["pH, salts, oxidation and reduction", "Atomic structure and periodic trends", "Common compounds, gases, water and everyday materials"], questionModels: ["formula/property", "oxidation state", "trend / common name"], studyCue: "Make flashcards for reactions, formulas, trends and common names."
  },
  {
    id: "gat-current", area: "GAT", priority: "P1", title: "Current Affairs, Defence & Static Links", frequency: "27 event/static Q + 9 defence Q · 4/4 papers", evidence: "A large, volatile block; recent papers included strong current/static representation.", mustDo: ["Rolling 8–12 month events and appointments", "Defence exercises, ranks, commands and missions", "Awards, sports, space, schemes, institutions and locations"], questionModels: ["direct fact", "institution purpose", "match event to context"], studyCue: "For every current item, revise its static background: place, ministry, partner and purpose."
  },
  {
    id: "gat-biology", area: "GAT", priority: "P2", title: "Biology & General Science", frequency: "42 Q across core biology groups · 4/4 papers", evidence: "Cell/genetics, general science and physiology return consistently.", mustDo: ["Cell, DNA, proteins and genetics", "Blood, digestion, immunity, disease and vitamins", "Plants, ecology, photosynthesis and biotechnology basics"], questionModels: ["function match", "process identification", "disease / vitamin association"], studyCue: "Use labelled diagrams and one-line function cards instead of long notes."
  },
  {
    id: "gat-history", area: "GAT", priority: "P2", title: "History & Culture", frequency: "33 Q across modern and early/cultural groups · 4/4 papers", evidence: "Modern India and ancient/medieval culture both recur, often through matching or chronology.", mustDo: ["Acts, movements, leaders and freedom chronology", "Indus Valley, Buddhism/Jainism, Mauryan/Gupta/Vijayanagara", "Art, architecture, literature, dance and temple traditions"], questionModels: ["chronology", "leader–movement", "art/culture identification"], studyCue: "Create one chronology strip and one culture matching sheet."
  },
  {
    id: "gat-polity", area: "GAT", priority: "P2", title: "Polity & Constitutional Bodies", frequency: "13 Q · 4/4 papers", evidence: "Smaller by count but stable: constitutional questions returned in every paper.", mustDo: ["Fundamental Rights, Duties and Directive Principles", "President, Parliament, Supreme Court and amendments", "Election Commission, CAG, Finance Commission and local government"], questionModels: ["body–function", "article / appointment", "statement check"], studyCue: "Learn the body, appointment, tenure and core function as one set."
  },
  {
    id: "gat-science-coverage", area: "GAT", priority: "P3", title: "Science Coverage: Heat, Waves & Materials", frequency: "Smaller but recurring groups", evidence: "Heat/gases appeared in 4/4 papers; waves and materials rotate in frequency.", mustDo: ["Heat transfer, gas laws and thermodynamics", "Waves, oscillations and modern/nuclear basics", "Organic carbon, soaps/detergents and material science"], questionModels: ["relation / unit", "phenomenon", "common material"], studyCue: "Revise a compact formula and facts sheet after the P1 science blocks."
  },
  {
    id: "gat-social-coverage", area: "GAT", priority: "P3", title: "Economy, Environment & Map Coverage", frequency: "Economy: 8 Q · 3/4 papers", evidence: "Lower and more volatile, but easy marks when the fundamentals are secured.", mustDo: ["Inflation, banking, budget, taxation and national income", "Environment, national parks, wetlands and conventions", "Latitude/longitude, oceans, vegetation and resource maps"], questionModels: ["term definition", "scheme / institution", "place association"], studyCue: "Use concise current-linked notes rather than deep theory in the final revision cycle."
  },
];
