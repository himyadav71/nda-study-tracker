/**
 * Practice and Test Centre data.
 * Field Manual Progress Deck: priority-led daily drills plus source-linked, full-paper PYQ attempts.
 */
export type TestSubject = "Mathematics" | "English" | "GAT";

export type PracticeQuestion = {
  id: string;
  subject: TestSubject;
  topic: string;
  priority: "P1" | "P2";
  prompt: string;
  options: [string, string, string, string];
  answer: "A" | "B" | "C" | "D";
  explanation: string;
};

export const practiceQuestions: PracticeQuestion[] = [
  { id: "m1", subject: "Mathematics", topic: "Sequence & Series", priority: "P1", prompt: "The sum of the first 20 terms of the AP 3, 7, 11, ... is", options: ["760", "800", "820", "840"], answer: "C", explanation: "a = 3, d = 4. S20 = 20/2[2(3) + 19(4)] = 10(82) = 820." },
  { id: "m2", subject: "Mathematics", topic: "Complex Numbers", priority: "P1", prompt: "If z = 3 + 4i, then |z| equals", options: ["3", "4", "5", "7"], answer: "C", explanation: "|z| = √(3² + 4²) = 5." },
  { id: "m3", subject: "Mathematics", topic: "Permutation & Combination", priority: "P1", prompt: "The number of ways to choose 3 cadets from 8 cadets is", options: ["24", "48", "56", "336"], answer: "C", explanation: "8C3 = 8×7×6 / 3×2×1 = 56." },
  { id: "m4", subject: "Mathematics", topic: "Probability", priority: "P1", prompt: "A fair die is thrown once. The probability of getting a prime number is", options: ["1/6", "1/3", "1/2", "2/3"], answer: "C", explanation: "Prime faces are 2, 3 and 5: 3 favourable outcomes out of 6." },
  { id: "m5", subject: "Mathematics", topic: "Limits", priority: "P1", prompt: "The value of lim x→0 (sin 3x)/x is", options: ["0", "1", "3", "∞"], answer: "C", explanation: "Use lim t→0 sin t/t = 1. Here sin(3x)/x = 3·sin(3x)/(3x)." },
  { id: "m6", subject: "Mathematics", topic: "Differentiation", priority: "P1", prompt: "The derivative of x²eˣ is", options: ["x²eˣ", "2xeˣ", "eˣ(x² + 2x)", "eˣ(x² − 2x)"], answer: "C", explanation: "Apply the product rule: 2x·eˣ + x²·eˣ." },
  { id: "m7", subject: "Mathematics", topic: "Integration", priority: "P1", prompt: "∫₀¹ 2x dx equals", options: ["0", "1/2", "1", "2"], answer: "C", explanation: "The antiderivative is x²; [x²]₀¹ = 1." },
  { id: "m8", subject: "Mathematics", topic: "Vector Algebra", priority: "P1", prompt: "If a = i + 2j and b = 2i − j, then a·b equals", options: ["−3", "0", "1", "4"], answer: "B", explanation: "a·b = 1×2 + 2×(−1) = 0." },
  { id: "m9", subject: "Mathematics", topic: "Matrices", priority: "P2", prompt: "The determinant of [[2, 3], [1, 4]] is", options: ["5", "8", "11", "14"], answer: "A", explanation: "det = 2×4 − 3×1 = 5." },
  { id: "m10", subject: "Mathematics", topic: "Coordinate Geometry", priority: "P1", prompt: "The slope of the line through (1, 2) and (3, 6) is", options: ["1", "2", "3", "4"], answer: "B", explanation: "m = (6−2)/(3−1) = 4/2 = 2." },
  { id: "m11", subject: "Mathematics", topic: "Trigonometry", priority: "P2", prompt: "The value of sin 30° + cos 60° is", options: ["0", "1/2", "1", "√3"], answer: "C", explanation: "sin 30° = 1/2 and cos 60° = 1/2." },
  { id: "m12", subject: "Mathematics", topic: "Differential Equations", priority: "P1", prompt: "The general solution of dy/dx = 2x is", options: ["y = x² + C", "y = 2x + C", "y = x³ + C", "y = 2x² + C"], answer: "A", explanation: "Integrate both sides: y = ∫2x dx = x² + C." },
  { id: "m13", subject: "Mathematics", topic: "Statistics", priority: "P1", prompt: "The mean of 4, 6, 8, 10, 12 is", options: ["6", "7", "8", "9"], answer: "C", explanation: "The sum is 40; divide by 5 to obtain 8." },
  { id: "m14", subject: "Mathematics", topic: "Circle", priority: "P1", prompt: "The centre of x² + y² − 4x + 6y − 3 = 0 is", options: ["(2, −3)", "(−2, 3)", "(2, 3)", "(−2, −3)"], answer: "A", explanation: "Complete squares: (x−2)² + (y+3)² = 16." },
  { id: "e1", subject: "English", topic: "Vocabulary", priority: "P1", prompt: "Choose the word nearest in meaning to ‘meticulous’.", options: ["careless", "precise", "noisy", "temporary"], answer: "B", explanation: "Meticulous means very careful and precise about details." },
  { id: "e2", subject: "English", topic: "Idioms", priority: "P1", prompt: "‘To hit the nail on the head’ means", options: ["to miss the point", "to say exactly the right thing", "to start a fight", "to work very slowly"], answer: "B", explanation: "The idiom means to identify or express the exact central point." },
  { id: "e3", subject: "English", topic: "Subject–Verb Agreement", priority: "P1", prompt: "Choose the grammatically correct sentence.", options: ["Neither of the candidates are late.", "Neither of the candidates is late.", "Neither candidates is late.", "Neither candidate are late."], answer: "B", explanation: "‘Neither’ takes a singular verb in this construction." },
  { id: "e4", subject: "English", topic: "Prepositions", priority: "P1", prompt: "She has been preparing ___ the examination since June.", options: ["at", "for", "on", "with"], answer: "B", explanation: "The standard collocation is ‘prepare for an examination’." },
  { id: "e5", subject: "English", topic: "Voice", priority: "P1", prompt: "Choose the correct passive form of ‘The cadets completed the drill.’", options: ["The drill completed by the cadets.", "The drill was completed by the cadets.", "The drill has completed by the cadets.", "The cadets were completed the drill."], answer: "B", explanation: "Simple past passive: was/were + past participle." },
  { id: "e6", subject: "English", topic: "Error Spotting", priority: "P1", prompt: "Identify the incorrect part: ‘Each of the players / have brought / their identity card / today.’", options: ["Each of the players", "have brought", "their identity card", "today"], answer: "B", explanation: "The subject ‘Each’ is singular; the verb should be ‘has brought’." },
  { id: "e7", subject: "English", topic: "Sentence Ordering", priority: "P2", prompt: "Choose the best opening for a coherent paragraph about discipline.", options: ["Therefore, results improve steadily.", "Discipline gives effort a reliable direction.", "For example, a schedule becomes easier to follow.", "It also reduces last-minute anxiety."], answer: "B", explanation: "The general assertion introduces the later supporting and result statements." },
  { id: "e8", subject: "English", topic: "Antonyms", priority: "P1", prompt: "Choose the antonym of ‘scarce’.", options: ["rare", "limited", "abundant", "small"], answer: "C", explanation: "Scarce means in short supply; abundant is its opposite." },
  { id: "g1", subject: "GAT", topic: "Physics: Mechanics", priority: "P1", prompt: "Which quantity remains conserved in an isolated system during a collision?", options: ["Force", "Momentum", "Velocity", "Acceleration"], answer: "B", explanation: "Total linear momentum is conserved when the external force is zero." },
  { id: "g2", subject: "GAT", topic: "Physics: Electricity", priority: "P1", prompt: "The SI unit of electrical resistance is", options: ["volt", "ampere", "ohm", "watt"], answer: "C", explanation: "Resistance is measured in ohms (Ω)." },
  { id: "g3", subject: "GAT", topic: "Physics: Optics", priority: "P1", prompt: "A convex lens can form a real image when the object is placed", options: ["at its optical centre", "between lens and focus only", "beyond its focal length", "at the focus only"], answer: "C", explanation: "For an object beyond the focal point, a convex lens forms a real inverted image." },
  { id: "g4", subject: "GAT", topic: "Geography: Climate", priority: "P1", prompt: "The southwest monsoon in India is primarily associated with", options: ["land heating and seasonal wind reversal", "daily sea breeze only", "polar easterlies", "ocean tides"], answer: "A", explanation: "Differential heating and pressure reversal drive the monsoon circulation." },
  { id: "g5", subject: "GAT", topic: "Geography: Physical", priority: "P1", prompt: "Which rock is formed by cooling and solidification of magma?", options: ["Sedimentary", "Metamorphic", "Igneous", "Organic"], answer: "C", explanation: "Igneous rocks form from cooled molten material." },
  { id: "g6", subject: "GAT", topic: "Chemistry: Acid–Base", priority: "P1", prompt: "A solution with pH 3 is", options: ["strongly basic", "weakly basic", "neutral", "acidic"], answer: "D", explanation: "Values below 7 are acidic." },
  { id: "g7", subject: "GAT", topic: "Chemistry: Periodicity", priority: "P1", prompt: "Elements in the same group of the periodic table have similar", options: ["mass numbers", "valence-electron patterns", "number of shells", "neutron counts"], answer: "B", explanation: "Similar valence configuration causes similar chemical properties." },
  { id: "g8", subject: "GAT", topic: "Biology: Genetics", priority: "P2", prompt: "The basic unit of heredity is the", options: ["cell", "tissue", "gene", "organ"], answer: "C", explanation: "Genes carry hereditary information." },
  { id: "g9", subject: "GAT", topic: "Biology: Human Systems", priority: "P2", prompt: "Which blood cells are chiefly responsible for defence against infection?", options: ["Red blood cells", "White blood cells", "Platelets", "Plasma proteins"], answer: "B", explanation: "White blood cells are central to immune defence." },
  { id: "g10", subject: "GAT", topic: "History: Modern India", priority: "P2", prompt: "The Quit India Movement was launched in", options: ["1919", "1930", "1942", "1947"], answer: "C", explanation: "The Quit India Movement began in August 1942." },
  { id: "g11", subject: "GAT", topic: "Polity", priority: "P2", prompt: "The Constitution of India provides Fundamental Rights in", options: ["Part I", "Part II", "Part III", "Part IV"], answer: "C", explanation: "Fundamental Rights are contained in Part III." },
  { id: "g12", subject: "GAT", topic: "Defence Awareness", priority: "P1", prompt: "The Indian Armed Forces are commanded constitutionally by the", options: ["Prime Minister", "Defence Minister", "President of India", "Chief of Defence Staff"], answer: "C", explanation: "The President is the Supreme Commander of the Armed Forces." },
];

export type PyqPaper = {
  id: string;
  label: string;
  subject: TestSubject;
  year: string;
  questions: number;
  minutes: number;
  paperUrl: string;
  keyUrl?: string;
  answers?: Array<"A" | "B" | "C" | "D">;
  keyNote: string;
};

const answerList = (text: string) => text.replace(/\s/g, "").split("") as Array<"A" | "B" | "C" | "D">;

export const pyqPapers: PyqPaper[] = [
  { id: "nda1-2026-gat", label: "NDA I 2026 · GAT", subject: "GAT", year: "12 Apr 2026", questions: 150, minutes: 150, paperUrl: "https://cdn.testbook.com/1776314421344-NDA%20GAT%202026%20Question%20paper.pdf/1776314427.pdf", keyUrl: "https://cdn.testbook.com/1776334895015-nda%201%20gat%20answer%20key%202026.pdf/1776334898.pdf", keyNote: "Set A paper and provisional key are linked separately. Use the key PDF for final self-checking." },
  { id: "nda1-2026-math", label: "NDA I 2026 · Mathematics", subject: "Mathematics", year: "12 Apr 2026", questions: 120, minutes: 150, paperUrl: "https://cdn.testbook.com/1776314333041-NDA%202026%20Question%20Paper.pdf/1776314335.pdf", keyUrl: "https://cdn.testbook.com/1776334784460-nda%201%20math%20answer%20key%202026.pdf/1776334787.pdf", keyNote: "Set A paper and provisional key are linked separately. Use the key PDF for final self-checking." },
  { id: "nda1-2025-gat", label: "NDA I 2025 · GAT", subject: "GAT", year: "13 Apr 2025", questions: 150, minutes: 150, paperUrl: "https://www.upsc.gov.in/sites/default/files/QP-NDA-NA-I-25-GENERAL-ABILITY-TEST-150425.pdf", keyNote: "Official UPSC paper viewer. Save your OMR attempt locally; automatic scoring is enabled only where the key has been checked in the app." },
  { id: "nda1-2025-math", label: "NDA I 2025 · Mathematics", subject: "Mathematics", year: "13 Apr 2025", questions: 120, minutes: 150, paperUrl: "https://www.upsc.gov.in/sites/default/files/QP-NDA-NA-I-25-MATHEMATICS-150425.pdf", keyNote: "Official UPSC paper viewer. Save your OMR attempt locally; automatic scoring is enabled only where the key has been checked in the app." },
  { id: "nda2-2024-gat", label: "NDA II 2024 · GAT", subject: "GAT", year: "01 Sep 2024", questions: 150, minutes: 150, paperUrl: "https://www.upsc.gov.in/sites/default/files/QP-NDA-NA-II-24-GENERAL-ABILITY-TEST-020924.pdf", keyNote: "Official UPSC paper viewer. Save your OMR attempt locally; automatic scoring is enabled only where the key has been checked in the app." },
  { id: "nda2-2024-math", label: "NDA II 2024 · Mathematics", subject: "Mathematics", year: "01 Sep 2024", questions: 120, minutes: 150, paperUrl: "https://www.upsc.gov.in/sites/default/files/QP-NDA-NA-II-24-MATHEMATICS-020924.pdf", keyNote: "Official UPSC paper viewer. Save your OMR attempt locally; automatic scoring is enabled only where the key has been checked in the app." },
  { id: "nda1-2024-gat", label: "NDA I 2024 · GAT", subject: "GAT", year: "21 Apr 2024", questions: 150, minutes: 150, paperUrl: "https://www.upsc.gov.in/sites/default/files/QP_NDANAI2024_GENERAL-ABILITY-TEST_22042024.pdf", keyNote: "Official UPSC paper viewer. Save your OMR attempt locally; automatic scoring is enabled only where the key has been checked in the app." },
  { id: "nda1-2024-math", label: "NDA I 2024 · Mathematics", subject: "Mathematics", year: "21 Apr 2024", questions: 120, minutes: 150, paperUrl: "https://www.upsc.gov.in/sites/default/files/QP_NDANAI2024_MATHEMATICS_22042024.pdf", keyNote: "Official UPSC paper viewer. Save your OMR attempt locally; automatic scoring is enabled only where the key has been checked in the app." },
];

export function buildPracticeSet(subject: TestSubject | "All", count: number, offset = 0) {
  const pool = subject === "All" ? practiceQuestions : practiceQuestions.filter((question) => question.subject === subject);
  return Array.from({ length: count }, (_, index) => pool[(index + offset) % pool.length]);
}
