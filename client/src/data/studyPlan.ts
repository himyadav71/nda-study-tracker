/**
 * Field Manual Progress Deck content model.
 * This edition pairs the user's Class 12 CBSE half-yearly examination window with the NDA II 2026 runway.
 */
export type Subject = "Mathematics" | "English" | "GK" | "Current Affairs" | "Mock" | "CBSE";

export type StudyTask = { id: string; subject: Subject; title: string; duration: string; };

export type StudyDay = {
  day: number;
  date: string;
  shortDate: string;
  week: number;
  title: string;
  focus: string;
  target: string;
  mode: "CBSE FIRST" | "DUAL TRACK" | "NDA FIRST";
  schoolPaper?: string;
  checkpoint?: string;
  tasks: StudyTask[];
};

const tasks = (day: number, entries: Array<[Subject, string, string]>): StudyTask[] =>
  entries.map(([subject, title, duration], index) => ({ id: `d${day}-${index + 1}`, subject, title, duration }));

export const studyPlan: StudyDay[] = [
  { day: 1, date: "2026-08-16", shortDate: "Sun · 16 Aug", week: 1, title: "English command prep", focus: "School paper first; NDA stays alive.", target: "Walk into English with texts, writing formats and time control ready.", mode: "CBSE FIRST", schoolPaper: "English half-yearly tomorrow", checkpoint: "CBSE English final revision · only 20 min NDA continuity", tasks: tasks(1, [
    ["CBSE", "Flamingo revision: Poets and Pancakes, The Interview, Going Places and Jennifer’s Tigers — themes, character, quotations", "2 hr"],
    ["CBSE", "English writing: Article Writing format + one unseen passage under time", "90 min"],
    ["English", "NDA vocabulary: 15 error-log words and 10 idioms only", "20 min"],
    ["CBSE", "Pack material, review answer structure and sleep early", "20 min"],
  ]) },
  { day: 2, date: "2026-08-17", shortDate: "Mon · 17 Aug", week: 1, title: "English exam → Maths/Bio bridge", focus: "Write cleanly, then pivot early.", target: "Start integral and Biology recall on the same day without burnout.", mode: "CBSE FIRST", schoolPaper: "CBSE English examination", tasks: tasks(2, [
    ["CBSE", "English exam: 10-minute question scan, reserve final 8 minutes for grammar and presentation check", "Exam"],
    ["CBSE", "Mathematics: indefinite-integral standard forms and substitution/parts formula recall", "90 min"],
    ["CBSE", "Biology: Organisms & Populations — definitions, graphs, interactions and NCERT keywords", "75 min"],
    ["Current Affairs", "NDA continuity: revise 5 short static-linked current-affairs cards", "15 min"],
  ]) },
  { day: 3, date: "2026-08-18", shortDate: "Tue · 18 Aug", week: 1, title: "Maths/Bio preparation 01", focus: "Prepare deeply on the first holiday.", target: "Finish the first complete pass of calculus and Botany.", mode: "CBSE FIRST", schoolPaper: "Preparatory holiday", tasks: tasks(3, [
    ["CBSE", "Maths: indefinite integration — substitution, by-parts, partial fractions and standard results; solve 25 mixed questions", "3 hr"],
    ["CBSE", "Biology: Organisms & Populations + Microbes in Human Welfare — NCERT diagrams, examples and one-page recall sheets", "2 hr"],
    ["Mathematics", "NDA overlap: 10 standard integration models; tag errors only", "25 min"],
    ["CBSE", "Active recall without notes: write 10 formulas and 15 Biology keywords", "25 min"],
  ]) },
  { day: 4, date: "2026-08-19", shortDate: "Wed · 19 Aug", week: 1, title: "Maths/Bio preparation 02", focus: "Practise the paper you will write.", target: "Complete one timed Mathematics set and one Biology recall loop.", mode: "CBSE FIRST", schoolPaper: "Preparatory holiday", checkpoint: "CBSE Maths mini-paper + Biology NCERT recall", tasks: tasks(4, [
    ["CBSE", "Maths: definite integrals and complete UT 1–3 revision; 90-minute timed mixed set", "3 hr"],
    ["CBSE", "Biology: Biotechnology Principles & Processes till cloning vector — flowcharts, enzymes, vectors and terms", "2 hr"],
    ["CBSE", "Make a final two-page Maths formula sheet and a Biology chapter-mistake sheet", "45 min"],
    ["English", "NDA maintenance: 15 vocabulary/idiom recalls only", "15 min"],
  ]) },
  { day: 5, date: "2026-08-20", shortDate: "Thu · 20 Aug", week: 1, title: "Maths/Bio exam day", focus: "Execute, then recover.", target: "Use remaining energy only for the next school paper.", mode: "CBSE FIRST", schoolPaper: "CBSE Mathematics & Biology examinations", tasks: tasks(5, [
    ["CBSE", "Maths/Bio exams: attempt known questions first; label and return to longer calculations", "Exam"],
    ["CBSE", "Music / C.S. contingency: organise syllabus notes for the next confirmed school slot", "45 min"],
    ["CBSE", "Physics: Ray Optics formula preview — mirror/lens sign conventions only", "35 min"],
    ["Current Affairs", "NDA continuity: 5-minute error-log glance; then sleep", "10 min"],
  ]) },
  { day: 6, date: "2026-08-21", shortDate: "Fri · 21 Aug", week: 1, title: "Music paper & Physics bridge", focus: "Use the formal half-yearly notice; keep C.S. flexible.", target: "Start Physics preparation immediately after the school slot.", mode: "CBSE FIRST", schoolPaper: "Music half-yearly per detailed syllabus notice · C.S. calendar contingency", tasks: tasks(6, [
    ["CBSE", "Music: full-syllabus final recall — rag notes, taal-rupak, composers and written-answer structure", "Exam / 2 hr"],
    ["CBSE", "If C.S. is confirmed instead, use this block for your teacher’s prescribed practical/theory revision", "School buffer"],
    ["CBSE", "Physics: Ray Optics — mirrors, lenses, sign convention and image formula revision", "2 hr"],
    ["GK", "NDA Physics overlap: 15 optics concept questions, no new notes", "20 min"],
  ]) },
  { day: 7, date: "2026-08-22", shortDate: "Sat · 22 Aug", week: 1, title: "Physics preparation 01", focus: "Optics concepts before numericals.", target: "Finish Ray Optics and practical procedure recall.", mode: "CBSE FIRST", schoolPaper: "Preparatory holiday", tasks: tasks(7, [
    ["CBSE", "Physics: Ray Optics and Optical Instruments — formula sheet, ray diagrams, microscope/telescope and 20 numericals", "3 hr"],
    ["CBSE", "Physics practicals: concave mirror, convex lens, concave lens and prism minimum deviation procedures", "90 min"],
    ["CBSE", "Wave Optics: YDSE, diffraction, interference and key derivations", "90 min"],
    ["English", "NDA maintenance: 20 grammar questions from the error log", "20 min"],
  ]) },
  { day: 8, date: "2026-08-23", shortDate: "Sun · 23 Aug", week: 2, title: "Physics rehearsal", focus: "Write, check, correct.", target: "Complete a realistic Physics rehearsal and revise all practical viva points.", mode: "CBSE FIRST", schoolPaper: "Sunday rehearsal day", checkpoint: "Physics 90-minute paper simulation + optics practical viva", tasks: tasks(8, [
    ["CBSE", "Physics: 90-minute mixed paper from UT 1–3, Ray Optics and Wave Optics; mark every derivation gap", "2 hr"],
    ["CBSE", "Optics practical viva: apparatus, graph, formula, precautions and error sources", "90 min"],
    ["CBSE", "Final ray-diagram and formula recall without notes", "45 min"],
    ["GK", "NDA Physics: 20 quick optics/electricity PYQs only if school revision is complete", "20 min"],
  ]) },
  { day: 9, date: "2026-08-24", shortDate: "Mon · 24 Aug", week: 2, title: "Physics exam → Chemistry launch", focus: "Finish cleanly; begin organic recall.", target: "Move from optics to carbonyl chemistry with a low-stress bridge.", mode: "CBSE FIRST", schoolPaper: "CBSE Physics examination", tasks: tasks(9, [
    ["CBSE", "Physics exam: diagram labels, units and final numerical checks before submission", "Exam"],
    ["CBSE", "Chemistry: Aldehydes, Ketones & Carboxylic Acids — functional groups, nomenclature and core reactions", "2 hr"],
    ["CBSE", "Chemistry practical: identify functional groups and write positive observations", "45 min"],
    ["Current Affairs", "NDA continuity: 10-minute news-note review", "10 min"],
  ]) },
  { day: 10, date: "2026-08-25", shortDate: "Tue · 25 Aug", week: 2, title: "Chemistry preparation 01", focus: "Reactions must become a map.", target: "Cover named reactions, mechanisms and UT revision systematically.", mode: "CBSE FIRST", schoolPaper: "Preparatory holiday", tasks: tasks(10, [
    ["CBSE", "Chemistry: Aldehydes/Ketones — nucleophilic addition, named reactions, tests and conversions", "3 hr"],
    ["CBSE", "Chemistry: Carboxylic acids, acidity order, derivatives and complete UT 1–3 formula/reaction recap", "2 hr"],
    ["CBSE", "Practical work: functional-group tests, reagent, observation and inference table", "75 min"],
    ["GK", "NDA Chemistry overlap: 15 acid-base/redox/material facts", "15 min"],
  ]) },
  { day: 11, date: "2026-08-26", shortDate: "Wed · 26 Aug", week: 2, title: "Chemistry preparation 02", focus: "Convert reaction knowledge into answers.", target: "Write one organic practice set and repair every missed conversion.", mode: "CBSE FIRST", schoolPaper: "Preparatory holiday", checkpoint: "Organic conversion test + functional-group practical recall", tasks: tasks(11, [
    ["CBSE", "Chemistry: 90-minute organic mock — aldehydes, ketones, acids, conversions and reasoning", "2 hr"],
    ["CBSE", "Review every wrong reaction: reagent, condition, product and reason; rebuild reaction map", "90 min"],
    ["CBSE", "Practical final pass: functional-group tests and precautions", "45 min"],
    ["English", "NDA maintenance: 15 timed sentence-correction questions", "15 min"],
  ]) },
  { day: 12, date: "2026-08-27", shortDate: "Thu · 27 Aug", week: 2, title: "Chemistry exam → NDA reset", focus: "Close the school window calmly.", target: "Recover well and make an easy re-entry plan for NDA.", mode: "DUAL TRACK", schoolPaper: "CBSE Chemistry examination", tasks: tasks(12, [
    ["CBSE", "Chemistry exam: begin with familiar conversions and keep equations balanced", "Exam"],
    ["Mathematics", "NDA reset: formula scan for Algebra, Calculus and Probability; no timed test", "35 min"],
    ["English", "NDA reset: 20 words/idioms from the error book", "15 min"],
    ["Current Affairs", "Update the current-affairs notebook with the school-exam-week gaps", "15 min"],
  ]) },
  { day: 13, date: "2026-08-28", shortDate: "Fri · 28 Aug", week: 2, title: "NDA re-entry", focus: "Restart with the scoring core.", target: "Restore test rhythm without exhausting yourself after exams.", mode: "NDA FIRST", schoolPaper: "Preparatory holiday / recovery day", checkpoint: "60Q Mathematics diagnostic refresh", tasks: tasks(13, [
    ["Mathematics", "60-question mixed Algebra & Calculus diagnostic; classify errors by formula, concept or speed", "90 min"],
    ["English", "Grammar: articles, agreement, tenses and prepositions", "30 Q"],
    ["GK", "Physics and Chemistry priority recap from your school revision", "40 Q"],
    ["Current Affairs", "Make a two-week current-affairs catch-up list", "25 min"],
  ]) },
  { day: 14, date: "2026-08-29", shortDate: "Sat · 29 Aug", week: 2, title: "School buffer + GAT base", focus: "Use the calendar slot intelligently.", target: "Protect Music/C.S. if confirmed; otherwise build GAT breadth.", mode: "DUAL TRACK", schoolPaper: "Music shown on school calendar — confirm final room/time", tasks: tasks(14, [
    ["CBSE", "If Music exam is confirmed: final recall and paper attempt. If not: use this slot for C.S. / school backlog", "School buffer"],
    ["GK", "Geography: climate, winds, monsoon, landforms and India map associations", "40 Q"],
    ["English", "Vocabulary and idioms: spaced review from the full school-exam fortnight", "30 Q"],
    ["Mathematics", "Matrices and determinants: property-only speed set", "20 Q"],
  ]) },
  { day: 15, date: "2026-08-30", shortDate: "Sun · 30 Aug", week: 3, title: "GAT Mock 01", focus: "Return to real NDA timing.", target: "Separate English errors from GK knowledge gaps.", mode: "NDA FIRST", checkpoint: "Full GAT Mock 01 · 150Q in 150 min", tasks: tasks(15, [
    ["Mock", "Full GAT Mock 01 under strict 150-minute timing", "150 Q"],
    ["English", "Debrief English: grammar rule, vocabulary gap or option-selection error", "45 min"],
    ["GK", "Debrief GK: fact gap, concept gap or poor elimination", "45 min"],
    ["Mathematics", "Light recovery: 15 Probability/Statistics questions", "20 min"],
  ]) },
  { day: 16, date: "2026-08-31", shortDate: "Mon · 31 Aug", week: 3, title: "Major Test-2 buffer", focus: "School commitment first; preserve a short NDA loop.", target: "Keep momentum even if Major Test-2 consumes the day.", mode: "DUAL TRACK", schoolPaper: "Major Test-2 shown on school calendar", tasks: tasks(16, [
    ["CBSE", "Major Test-2 / school work: follow the confirmed school instructions and capture post-test mistakes", "School slot"],
    ["Mathematics", "NDA Algebra repair: AP/GP, complex numbers, P&C and binomial from the 28 Aug diagnostic", "30 Q"],
    ["English", "10-minute vocabulary recall + 10 grammar corrections", "20 Q"],
    ["Current Affairs", "Review two static-linked current events", "15 min"],
  ]) },
  { day: 17, date: "2026-09-01", shortDate: "Tue · 1 Sep", week: 3, title: "Algebra speed", focus: "Make the biggest Maths block reliable.", target: "Solve the high-frequency Algebra models at controlled speed.", mode: "NDA FIRST", schoolPaper: "Regular classes resume", tasks: tasks(17, [
    ["Mathematics", "Sets/functions, AP/GP/HP, complex numbers, P&C/binomial and quadratic roots — mixed timed set", "45 Q"],
    ["English", "Sentence completion and error spotting", "25 Q"],
    ["GK", "Physics: mechanics, electricity, magnetism and optics priority concepts", "35 Q"],
    ["Current Affairs", "15-minute rolling revision", "15 min"],
  ]) },
  { day: 18, date: "2026-09-02", shortDate: "Wed · 2 Sep", week: 3, title: "Calculus scoring block", focus: "Limits to integration without hesitation.", target: "Secure standard forms and one-step applications.", mode: "NDA FIRST", schoolPaper: "Regular classes", tasks: tasks(18, [
    ["Mathematics", "Limits, continuity, derivatives, extrema, standard integration and differential equations", "45 Q"],
    ["English", "Idioms, synonyms and antonyms in context", "30 Q"],
    ["GK", "Chemistry: acid-base-redox, periodicity, compounds and everyday chemistry", "35 Q"],
    ["Current Affairs", "Add five updated facts with a static link", "15 min"],
  ]) },
  { day: 19, date: "2026-09-03", shortDate: "Thu · 3 Sep", week: 3, title: "Space & coordinate", focus: "Diagram first, calculate second.", target: "Build confidence in coordinate, vector and 3-D questions.", mode: "NDA FIRST", schoolPaper: "Regular classes", tasks: tasks(19, [
    ["Mathematics", "Straight lines, circles, vectors, lines/planes and spheres — relation and condition models", "40 Q"],
    ["English", "Ordering and one reading-comprehension set", "25 Q"],
    ["GK", "Geography: climate, physical geography and map-linked India", "35 Q"],
    ["Current Affairs", "Review the last 20 current-affairs cards", "15 min"],
  ]) },
  { day: 20, date: "2026-09-04", shortDate: "Fri · 4 Sep", week: 3, title: "Probability + Biology", focus: "Translate the condition, then choose.", target: "Make probability and Biology a stable scoring pair.", mode: "NDA FIRST", schoolPaper: "Regular classes", tasks: tasks(20, [
    ["Mathematics", "Conditional probability, Bayes, dice/cards/urns, binomial probability, mean and deviation", "40 Q"],
    ["English", "Cloze and grammar repair", "25 Q"],
    ["GK", "Biology: cell/genetics, physiology, immunity, diseases, ecology and biotechnology", "40 Q"],
    ["Current Affairs", "Defence, awards and space recap", "20 min"],
  ]) },
  { day: 21, date: "2026-09-05", shortDate: "Sat · 5 Sep", week: 3, title: "Maths Mock 01", focus: "Simulate, classify, repair.", target: "Record score, attempts, wrongs and guesses honestly.", mode: "NDA FIRST", checkpoint: "Full Mathematics Mock · 120Q in 150 min", tasks: tasks(21, [
    ["Mock", "Full Mathematics Mock 01 under real timing", "120 Q"],
    ["Mathematics", "Debrief every wrong/guess: concept, formula, calculation or time-management", "90 min"],
    ["GK", "History & Polity priority recap", "30 Q"],
    ["English", "Short error-log repair", "15 min"],
  ]) },
  { day: 22, date: "2026-09-06", shortDate: "Sun · 6 Sep", week: 4, title: "GAT Mock 02", focus: "Breadth with calm selection.", target: "Make English plus two GK subjects dependable.", mode: "NDA FIRST", checkpoint: "Full GAT Mock · 150Q in 150 min", tasks: tasks(22, [
    ["Mock", "Full GAT Mock 02 — complete under the 150-minute limit", "150 Q"],
    ["English", "Review all language errors by type", "45 min"],
    ["GK", "Review all GK errors by source and subject", "45 min"],
    ["Mathematics", "Statistics/Probability confidence set", "20 Q"],
  ]) },
  { day: 23, date: "2026-09-07", shortDate: "Mon · 7 Sep", week: 4, title: "PYQ repair loop", focus: "Let the wrong answers choose the work.", target: "Finish two attemptable PYQ blocks inside the Practice Centre.", mode: "NDA FIRST", schoolPaper: "Regular classes", tasks: tasks(23, [
    ["Mathematics", "PYQ attempt: Algebra/Calculus priority block; redo only wrong models after review", "50 Q"],
    ["English", "PYQ practice: grammar and vocabulary block", "35 Q"],
    ["GK", "PYQ practice: Physics/Geography/Chemistry core", "45 Q"],
    ["Current Affairs", "Write the top 10 remaining factual gaps", "20 min"],
  ]) },
  { day: 24, date: "2026-09-08", shortDate: "Tue · 8 Sep", week: 4, title: "Priority syllabus circuit", focus: "P1 first. P2 second. Nothing random.", target: "Touch one standard model from every top-frequency family.", mode: "NDA FIRST", schoolPaper: "Regular classes", tasks: tasks(24, [
    ["Mathematics", "P1 circuit: Algebra, Calculus, Vector/3-D and Probability/Statistics formula-model loop", "45 Q"],
    ["English", "P1 circuit: grammar, idioms, synonyms/antonyms", "35 Q"],
    ["GK", "P1 circuit: Physics, Geography, Chemistry and Current Affairs/Defence", "50 Q"],
    ["Current Affairs", "One-page rolling revision", "20 min"],
  ]) },
  { day: 25, date: "2026-09-09", shortDate: "Wed · 9 Sep", week: 4, title: "Practice Centre day", focus: "Timed practice, not passive revision.", target: "Complete your daily drill and one focused mock with a clean debrief.", mode: "NDA FIRST", schoolPaper: "Regular classes", checkpoint: "Daily drill + one priority mini-mock", tasks: tasks(25, [
    ["Mock", "Practice Centre daily drill — submit under time and read every explanation", "25 Q"],
    ["Mathematics", "Priority Maths mini-mock: choose your weakest P1/P2 chapter", "40 Q"],
    ["English", "Timed English mixed set", "30 Q"],
    ["GK", "Timed GAT core set", "40 Q"],
  ]) },
  { day: 26, date: "2026-09-10", shortDate: "Thu · 10 Sep", week: 4, title: "Model rehearsal", focus: "One model from every major family.", target: "Stop adding new theory after today.", mode: "NDA FIRST", schoolPaper: "Regular classes", tasks: tasks(26, [
    ["Mathematics", "Formula/model circuit: progression, complex, determinant, trig, limit, vector, probability and stats", "35 Q"],
    ["English", "Vocabulary and idiom error-list revision", "30 min"],
    ["GK", "Current Affairs, Defence, Polity and science fact-sheet revision", "50 Q"],
    ["Current Affairs", "Final notebook compression into one page", "20 min"],
  ]) },
  { day: 27, date: "2026-09-11", shortDate: "Fri · 11 Sep", week: 4, title: "Conditioning run", focus: "Short, sharp and measured.", target: "No repeated careless-error pattern.", mode: "NDA FIRST", schoolPaper: "Regular classes", checkpoint: "60Q Maths + 25Q English + 50Q GK simulation", tasks: tasks(27, [
    ["Mock", "Half-length Mathematics simulation", "60 Q · 75 min"],
    ["English", "Timed English mixed set", "25 Q"],
    ["GK", "Timed GK mixed set", "50 Q · 60 min"],
    ["Current Affairs", "Analyse immediately; revise mistakes only", "45 min"],
  ]) },
  { day: 28, date: "2026-09-12", shortDate: "Sat · 12 Sep", week: 4, title: "Pre-exam reset", focus: "Arrive rested and accurate.", target: "Maximum three hours. Sleep early.", mode: "NDA FIRST", checkpoint: "Light revision only · no new theory", tasks: tasks(28, [
    ["Mathematics", "Formula sheet, standard results, common traps and 15 confidence questions", "45 min"],
    ["English", "Vocabulary, idioms and grammar rules only", "35 min"],
    ["GK", "Current affairs, defence, Polity and science fact sheet", "45 min"],
    ["Current Affairs", "Pack documents and permitted stationery; sleep early", "20 min"],
  ]) },
];

export const subjectDetails: Record<Subject, { color: string; short: string }> = {
  Mathematics: { color: "orange", short: "MATH" },
  English: { color: "blue", short: "ENG" },
  GK: { color: "sage", short: "GK" },
  "Current Affairs": { color: "sand", short: "CA" },
  Mock: { color: "ink", short: "MOCK" },
  CBSE: { color: "school", short: "CBSE" },
};
