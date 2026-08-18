import type { PracticeQuestion, TestSubject } from "@/data/testBank";

type Answer = "A" | "B" | "C" | "D";

export type PredictedPaper = {
  id: string;
  label: string;
  subject: TestSubject;
  minutes: number;
  marks: number;
  evidenceNote: string;
  questions: PracticeQuestion[];
};

const letters: Answer[] = ["A", "B", "C", "D"];

function optionSet(correct: string, distractors: string[], seed: number) {
  const values = Array.from(new Set([correct, ...distractors]));
  const numericCorrect = Number(correct);
  const fallbackValues = Number.isFinite(numericCorrect)
    ? [`${numericCorrect + seed + 1}`, `${numericCorrect - seed - 2}`, `${numericCorrect + 2 * seed + 3}`]
    : ["Cannot be determined from the given data", "Both statements are correct", "None of these"];
  fallbackValues.forEach((value) => {
    if (values.length < 4 && !values.includes(value)) values.push(value);
  });
  const options = values.slice(0, 4);
  const answerIndex = seed % 4;
  [options[0], options[answerIndex]] = [options[answerIndex], options[0]];
  return { options: options as [string, string, string, string], answer: letters[answerIndex] };
}

function question(id: string, subject: TestSubject, topic: string, priority: "P1" | "P2", prompt: string, correct: string, distractors: string[], explanation: string, seed: number): PracticeQuestion {
  const choice = optionSet(correct, distractors, seed);
  return { id, subject, topic, priority, prompt, ...choice, explanation };
}

const maths: PracticeQuestion[] = [];

// Algebra and number systems: 35 questions (the largest stable Mathematics block).
for (let i = 0; i < 8; i += 1) {
  const a = 2 + i;
  const d = 2 + (i % 4);
  const n = 8 + i;
  const correct = a + (n - 1) * d;
  maths.push(question(`pm-ap-${i + 1}`, "Mathematics", "Algebra: AP", "P1", `In the AP ${a}, ${a + d}, ${a + 2 * d}, …, the ${n}th term is`, `${correct}`, [`${correct - d}`, `${correct + d}`, `${a + n * d}`], `Use aₙ = a + (n − 1)d = ${a} + ${n - 1}×${d} = ${correct}.`, i));
}
for (let i = 0; i < 6; i += 1) {
  const a = 1 + (i % 3);
  const r = 2;
  const n = 4 + i;
  const correct = a * (2 ** n - 1);
  maths.push(question(`pm-gp-${i + 1}`, "Mathematics", "Algebra: GP", "P1", `The sum of the first ${n} terms of the GP ${a}, ${a * r}, ${a * r ** 2}, … is`, `${correct}`, [`${correct - a}`, `${correct + a}`, `${a * (2 ** (n - 1) - 1)}`], `Sₙ = a(rⁿ − 1)/(r − 1) = ${a}(2^${n} − 1) = ${correct}.`, i + 8));
}
const triples: Array<[number, number, number]> = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37],[28,45,53]];
triples.forEach(([a, b, c], i) => maths.push(question(`pm-complex-${i + 1}`, "Mathematics", "Algebra: Complex Numbers", "P1", `If z = ${a} + ${b}i, then |z| is`, `${c}`, [`${a + b}`, `${c - 2}`, `${c + 2}`], `|z| = √(${a}² + ${b}²) = ${c}.`, i + 14)));
for (let i = 0; i < 7; i += 1) {
  const sum = 5 + 2 * i;
  const product = 4 + 3 * i;
  maths.push(question(`pm-quad-${i + 1}`, "Mathematics", "Algebra: Quadratic Equations", "P1", `If α and β are roots of x² − ${sum}x + ${product} = 0, then α + β equals`, `${sum}`, [`${product}`, `${-sum}`, `${sum - product}`], `For x² − Sx + P = 0, the sum of roots is S.`, i + 22));
}
for (let i = 0; i < 6; i += 1) {
  const n = 6 + i;
  const correct = (n * (n - 1)) / 2;
  maths.push(question(`pm-pc-${i + 1}`, "Mathematics", "Algebra: Permutation & Combination", "P1", `The number of ways to select 2 cadets from ${n} cadets is`, `${correct}`, [`${correct - n + 2}`, `${correct + n - 1}`, `${n * (n - 1)}`], `${n}C₂ = ${n}×${n - 1}/2 = ${correct}.`, i + 29));
}

// Matrices and determinants: 8 questions.
for (let i = 0; i < 8; i += 1) {
  const a = 2 + i;
  const b = 1 + (i % 3);
  const c = 1 + ((i + 1) % 4);
  const d = 5 + i;
  const correct = a * d - b * c;
  maths.push(question(`pm-matrix-${i + 1}`, "Mathematics", "Matrices & Determinants", "P2", `The determinant of the matrix [[${a}, ${b}], [${c}, ${d}]] is`, `${correct}`, [`${a * d + b * c}`, `${a + d - b - c}`, `${correct + 2}`], `For a 2×2 matrix [[a,b],[c,d]], det = ad − bc = ${a}×${d} − ${b}×${c} = ${correct}.`, i + 35));
}

// Trigonometry and height-distance: 15 questions.
const trigValues: Array<[string, string, string]> = [
  ["sin 30°", "1/2", "√3/2"], ["cos 60°", "1/2", "√3/2"], ["sin 45°", "1/√2", "1/2"], ["cos 45°", "1/√2", "√3/2"], ["tan 45°", "1", "√3"],
  ["tan 30°", "1/√3", "√3"], ["sin 60°", "√3/2", "1/2"], ["cos 30°", "√3/2", "1/2"], ["sin 90°", "1", "0"], ["cos 0°", "1", "0"],
];
for (let i = 0; i < 10; i += 1) {
  const [expression, correct, close] = trigValues[i];
  maths.push(question(`pm-trig-${i + 1}`, "Mathematics", "Trigonometry", "P1", `The value of ${expression} is`, correct, [close, "0", "−1"], `Use the standard trigonometric value for ${expression}.`, i + 43));
}
for (let i = 0; i < 5; i += 1) {
  const angle = 30 + 5 * i;
  const height = 10 + 2 * i;
  const distance = Math.round(height / Math.tan((angle * Math.PI) / 180));
  maths.push(question(`pm-height-${i + 1}`, "Mathematics", "Height & Distance", "P2", `From a point on level ground, the angle of elevation of a tower is 45°. If the point is ${height} m from the tower, the tower’s height is`, `${height} m`, [`${height / 2} m`, `${height * 2} m`, `${height + 5} m`], `At 45°, tan 45° = height/base = 1, so height equals the base distance (${height} m).`, i + 53));
  void distance;
}

// Calculus: 24 questions.
for (let i = 0; i < 8; i += 1) {
  const k = 2 + i;
  maths.push(question(`pm-limit-${i + 1}`, "Mathematics", "Calculus: Limits", "P1", `The value of lim x→0 [sin(${k}x)/x] is`, `${k}`, [`${k - 1}`, "1", "0"], `sin(${k}x)/x = ${k}·sin(${k}x)/(${k}x), and lim sin t/t = 1.`, i + 58));
}
for (let i = 0; i < 8; i += 1) {
  const n = 2 + i;
  maths.push(question(`pm-diff-${i + 1}`, "Mathematics", "Calculus: Differentiation", "P1", `The derivative of x^${n} is`, `${n}x^${n - 1}`, [`x^${n - 1}`, `${n - 1}x^${n}`, `${n + 1}x^${n - 1}`], `By the power rule, d(xⁿ)/dx = nxⁿ⁻¹.`, i + 66));
}
for (let i = 0; i < 5; i += 1) {
  const limit = 2 + i;
  const correct = limit ** 2;
  maths.push(question(`pm-int-${i + 1}`, "Mathematics", "Calculus: Integration", "P1", `The value of ∫₀^${limit} 2x dx is`, `${correct}`, [`${correct / 2}`, `${2 * correct}`, `${limit}`], `An antiderivative of 2x is x², so [x²]₀^${limit} = ${correct}.`, i + 74));
}
for (let i = 0; i < 3; i += 1) {
  const k = 2 + 2 * i;
  maths.push(question(`pm-de-${i + 1}`, "Mathematics", "Calculus: Differential Equations", "P1", `A general solution of dy/dx = ${k}x is`, `y = ${k / 2}x² + C`, [`y = ${k}x + C`, `y = ${k}x² + C`, `y = x^${k} + C`], `Integrate both sides: y = ∫${k}x dx = ${k / 2}x² + C.`, i + 79));
}

// Coordinate, vector and 3-D geometry: 22 questions.
for (let i = 0; i < 8; i += 1) {
  const x1 = i;
  const y1 = 2 * i + 1;
  const x2 = i + 2;
  const slope = 1 + (i % 4);
  const y2 = y1 + 2 * slope;
  maths.push(question(`pm-line-${i + 1}`, "Mathematics", "Coordinate Geometry: Straight Lines", "P1", `The slope of the line through (${x1}, ${y1}) and (${x2}, ${y2}) is`, `${slope}`, [`${slope + 1}`, `${slope - 1}`, `${2 * slope}`], `Slope = (y₂ − y₁)/(x₂ − x₁) = ${2 * slope}/2 = ${slope}.`, i + 82));
}
for (let i = 0; i < 7; i += 1) {
  const a = 1 + i;
  const b = 2 + i;
  const c = 2 + i;
  const d = 1 + i;
  const correct = a * c + b * d;
  maths.push(question(`pm-vector-${i + 1}`, "Mathematics", "Vector Algebra", "P1", `If a = ${a}i + ${b}j and b = ${c}i + ${d}j, then a·b is`, `${correct}`, [`${a * c - b * d}`, `${a + b + c + d}`, `${correct + 2}`], `a·b = ${a}×${c} + ${b}×${d} = ${correct}.`, i + 90));
}
for (let i = 0; i < 7; i += 1) {
  const h = 2 + i;
  const k = 1 + i;
  maths.push(question(`pm-circle-${i + 1}`, "Mathematics", "Coordinate Geometry: Circle", "P1", `The centre of x² + y² − ${2 * h}x + ${2 * k}y = 0 is`, `(${h}, −${k})`, [`(−${h}, ${k})`, `(${h}, ${k})`, `(−${h}, −${k})`], `Completing squares gives (x − ${h})² + (y + ${k})² = constant, so the centre is (${h}, −${k}).`, i + 97));
}

// Statistics and probability: 16 questions.
for (let i = 0; i < 8; i += 1) {
  const start = 2 + i;
  const correct = start + 2;
  maths.push(question(`pm-stat-${i + 1}`, "Mathematics", "Statistics", "P1", `The mean of ${start}, ${start + 1}, ${start + 2}, ${start + 3}, ${start + 4} is`, `${correct}`, [`${correct - 1}`, `${correct + 1}`, `${start + 4}`], `For five consecutive values, the mean is the middle value: ${correct}.`, i + 104));
}
for (let i = 0; i < 8; i += 1) {
  const faces = ["prime number", "even number", "number greater than 4", "multiple of 3"][i % 4];
  const correct = faces === "prime number" ? "1/2" : faces === "even number" ? "1/2" : faces === "number greater than 4" ? "1/3" : "1/3";
  maths.push(question(`pm-prob-${i + 1}`, "Mathematics", "Probability", "P1", `A fair die is thrown once. The probability of obtaining a ${faces} is`, correct, [correct === "1/2" ? "1/3" : "1/2", "1/6", "2/3"], `Count favourable outcomes out of the six equally likely faces.`, i + 112));
}

const english: PracticeQuestion[] = [];
const vocab = [
  ["meticulous", "very careful about details", "careless", "temporary", "noisy"], ["abundant", "more than sufficient", "scarce", "uncertain", "silent"], ["prudent", "wise and careful", "rash", "hostile", "unclear"], ["alleviate", "make less severe", "increase", "predict", "divide"], ["candid", "frank and truthful", "secretive", "angry", "lazy"],
  ["obsolete", "no longer in use", "modern", "useful", "visible"], ["vigilant", "watchful and alert", "careless", "sleepy", "ordinary"], ["resilient", "able to recover quickly", "fragile", "confused", "rigid"], ["concise", "brief but complete", "lengthy", "ambiguous", "dramatic"], ["diligent", "hard-working and careful", "idle", "reckless", "weak"],
  ["ambiguous", "having more than one possible meaning", "certain", "simple", "formal"], ["mitigate", "reduce the harmful effect", "worsen", "record", "copy"], ["coherent", "logical and well connected", "random", "weak", "unrelated"], ["inevitable", "certain to happen", "avoidable", "hidden", "temporary"], ["commend", "praise formally", "criticise", "ignore", "question"],
] as const;
vocab.forEach(([word, correct, a, b, c], i) => english.push(question(`pg-vocab-${i + 1}`, "English", "Vocabulary", "P1", `Choose the word nearest in meaning to “${word}”.`, correct, [a, b, c], `“${word}” means ${correct}.`, i)));
const grammar = [
  ["Each of the cadets ___ a field notebook.", "has", "have", "are", "were", "Each is singular, so it takes “has”."], ["Neither the teacher nor the students ___ late.", "are", "is", "was", "has", "With neither/nor, the verb agrees with the nearer plural subject “students”."], ["She is senior ___ me.", "to", "than", "from", "with", "The standard expression is “senior to”."], ["He insisted ___ completing the task himself.", "on", "for", "at", "with", "The collocation is “insist on”."], ["No sooner had the bell rung ___ the class began.", "than", "when", "then", "that", "The fixed structure is “No sooner … than …”."],
  ["The news ___ encouraging.", "is", "are", "were", "have", "“News” is singular in standard usage."], ["One of my friends ___ selected.", "was", "were", "have", "are", "The subject is “One”, so use the singular verb."], ["I prefer tea ___ coffee in the evening.", "to", "than", "over", "with", "The standard comparison is “prefer X to Y”."], ["The officer asked us ___ silent.", "to remain", "remain", "remaining", "remained", "Ask + object + infinitive: “asked us to remain”."], ["By next month, she ___ the course.", "will have completed", "will complete", "completed", "has completed", "Future perfect is appropriate for completion before a future point."],
  ["The committee ___ its decision yesterday.", "announced", "announce", "have announced", "are announcing", "A singular collective noun takes “announced” here."], ["Hardly had we started ___ it began to rain.", "when", "than", "then", "that", "The paired conjunction is “hardly … when”."], ["The book is divided ___ five chapters.", "into", "in", "by", "with", "Use “divided into”."], ["He is good ___ Mathematics.", "at", "in", "on", "for", "The correct collocation is “good at”."], ["If I ___ you, I would revise the formulae first.", "were", "am", "was", "be", "The unreal conditional uses “were”."],
] as const;
grammar.forEach(([prompt, correct, a, b, c, explanation], i) => english.push(question(`pg-grammar-${i + 1}`, "English", "Grammar & Usage", "P1", prompt, correct, [a, b, c], explanation, i + 15)));
const idioms = [
  ["hit the nail on the head", "say exactly the right thing", "miss the point", "begin work", "become angry"], ["burn the midnight oil", "work late into the night", "waste electricity", "sleep early", "start a fire"], ["once in a blue moon", "very rarely", "every month", "at sunrise", "without warning"], ["a blessing in disguise", "an apparent misfortune with a benefit", "a clear danger", "a public reward", "a false promise"], ["spill the beans", "reveal a secret", "prepare food", "make a mistake", "leave quickly"],
  ["break the ice", "begin a friendly conversation", "end a meeting", "damage trust", "refuse help"], ["in hot water", "in trouble", "very warm", "well prepared", "in a hurry"], ["take it with a pinch of salt", "treat it with doubt", "accept it fully", "memorise it", "ignore food"], ["a piece of cake", "something very easy", "a difficult task", "a celebration", "an uncertain idea"], ["call it a day", "stop working for now", "work harder", "begin a journey", "make a call"],
] as const;
idioms.forEach(([phrase, correct, a, b, c], i) => english.push(question(`pg-idiom-${i + 1}`, "English", "Idioms & Phrases", "P1", `The idiom “${phrase}” means`, correct, [a, b, c], `In standard usage, “${phrase}” means “${correct}”.`, i + 30)));
const cloze = [
  ["The cadets arrived ___ time for the briefing.", "on", "at", "in", "by"], ["The instructor was pleased ___ the improvement.", "with", "by", "at", "from"], ["We should act ___ the advice is useful.", "because", "although", "unless", "whereas"], ["The map was ___ clear that everyone understood the route.", "so", "such", "too", "very"], ["She studied hard ___ she could improve her accuracy.", "so that", "despite", "unless", "although"],
  ["The answer depends ___ careful calculation.", "on", "for", "with", "at"], ["He has been preparing ___ the examination since June.", "for", "at", "on", "with"], ["The result was better ___ we had expected.", "than", "then", "that", "as"], ["We will leave ___ the weather improves.", "when", "until", "because", "despite"], ["The team worked ___ to finish the task.", "together", "togetherness", "collective", "joining"],
] as const;
cloze.forEach(([prompt, correct, a, b, c], i) => english.push(question(`pg-cloze-${i + 1}`, "English", "Cloze & Connectors", "P2", prompt, correct, [a, b, c], `Choose the word that gives the sentence its correct grammar and meaning.`, i + 40)));

type Fact = readonly [string, string];
function factQuestions(prefix: string, topic: string, facts: readonly Fact[], seed: number) {
  return facts.map(([term, meaning], index) => {
    const distractors = facts.filter((_, other) => other !== index).slice(0, 3).map(([, otherMeaning]) => otherMeaning);
    return question(`${prefix}-${index + 1}`, "GAT", topic, "P1", `Which statement correctly describes ${term}?`, meaning, distractors, `${term}: ${meaning}.`, seed + index);
  });
}

const gat: PracticeQuestion[] = [];
gat.push(...english);
gat.push(...factQuestions("pg-physics", "Physics", [
  ["linear momentum", "mass multiplied by velocity"], ["Newton’s second law", "rate of change of momentum is proportional to force"], ["work", "force times displacement in the force direction"], ["kinetic energy", "energy possessed due to motion"], ["escape velocity", "minimum speed needed to leave a body’s gravitational field"], ["pressure", "force per unit area"], ["density", "mass per unit volume"], ["Ohm’s law", "current is proportional to voltage at constant temperature"], ["electrical resistance", "opposition offered to electric current"], ["magnetic field of a current", "field produced around a current-carrying conductor"], ["convex lens", "lens that converges parallel light rays"], ["plane mirror", "mirror forming a virtual upright image of equal size"], ["refraction", "bending of light on entering a different medium"], ["heat capacity", "heat needed to raise the temperature of a body by one degree"], ["conduction", "heat transfer through direct particle interaction"], ["sound", "a mechanical wave requiring a medium"], ["frequency", "number of oscillations per second"], ["radioactivity", "spontaneous emission from unstable nuclei"], ["half-life", "time for half the radioactive nuclei to decay"], ["SI unit of power", "watt"], ["acceleration", "rate of change of velocity"], ["friction", "force opposing relative motion between surfaces"], ["specific heat", "heat required to raise unit mass by one degree"], ["electric power", "rate at which electrical energy is used"], ["electromagnetic induction", "production of emf due to changing magnetic flux"], ["atmospheric pressure", "pressure exerted by the weight of air"],
] as const, 90));
gat.push(...factQuestions("pg-geo", "Geography", [
  ["latitude", "angular distance north or south of the Equator"], ["longitude", "angular distance east or west of the Prime Meridian"], ["monsoon", "seasonal reversal of winds associated with rainfall changes"], ["weather", "short-term atmospheric condition"], ["climate", "long-term average weather pattern"], ["tropic of Cancer", "parallel at about 23½° north latitude"], ["earthquake focus", "point inside Earth where seismic energy is released"], ["delta", "depositional landform at a river mouth"], ["meander", "a winding bend in a river course"], ["igneous rock", "rock formed by cooling of molten material"], ["metamorphic rock", "rock altered by heat and pressure"], ["soil erosion", "removal of topsoil by agents such as water or wind"], ["ocean current", "large-scale movement of ocean water"], ["cyclone", "low-pressure system with inward-spiralling winds"], ["ozone layer", "atmospheric layer that absorbs much ultraviolet radiation"], ["humidity", "amount of water vapour in air"],
] as const, 116));
gat.push(...factQuestions("pg-chem", "Chemistry", [
  ["pH", "measure of acidity or alkalinity of a solution"], ["oxidation", "loss of electrons or increase in oxidation number"], ["reduction", "gain of electrons or decrease in oxidation number"], ["acid", "substance that produces hydrogen ions in aqueous solution"], ["base", "substance that produces hydroxide ions or accepts protons"], ["neutralization", "reaction between acid and base producing salt and water"], ["periodic table group", "vertical column of elements with similar valence patterns"], ["covalent bond", "bond formed by sharing electrons"], ["ionic bond", "electrostatic attraction between oppositely charged ions"], ["catalyst", "substance that changes reaction rate without being consumed"], ["galvanization", "coating iron or steel with zinc to prevent corrosion"], ["allotropy", "existence of an element in more than one structural form"], ["stainless steel", "iron alloy containing chromium for corrosion resistance"],
] as const, 132));
gat.push(...factQuestions("pg-bio", "Biology & General Science", [
  ["cell", "basic structural and functional unit of life"], ["gene", "unit of heredity carried on DNA"], ["mitochondrion", "organelle associated with aerobic energy release"], ["chloroplast", "plant organelle where photosynthesis occurs"], ["red blood cell", "cell specialised for oxygen transport"], ["white blood cell", "cell involved in defence against infection"], ["platelet", "blood component important in clotting"], ["photosynthesis", "process by which green plants make food using light"], ["vaccination", "stimulation of immune protection using antigenic material"], ["vitamin D", "vitamin important for calcium absorption and bone health"], ["DNA", "molecule that carries hereditary information"], ["ecosystem", "interaction of organisms with each other and their environment"], ["natural selection", "differential survival and reproduction of heritable traits"],
] as const, 145));
gat.push(...factQuestions("pg-history", "History & Culture", [
  ["Indus Valley Civilization", "Bronze Age urban civilization known for planned settlements"], ["Buddhism", "religious tradition founded on teachings of Gautama Buddha"], ["Mauryan Empire", "empire associated with Ashoka and ancient Indian political unification"], ["Gupta period", "period noted for developments in classical Indian culture and science"], ["Bhakti movement", "devotional movement emphasising personal devotion"], ["Revolt of 1857", "major uprising against East India Company rule"], ["Indian National Congress", "political organisation founded in 1885"], ["Non-Cooperation Movement", "mass movement launched under Gandhi in 1920"], ["Civil Disobedience Movement", "movement associated with the 1930 Salt March"], ["Quit India Movement", "mass movement launched in 1942"], ["Constituent Assembly", "body that framed the Constitution of India"], ["Sanchi Stupa", "Buddhist monument associated with early Indian art and architecture"],
] as const, 158));
gat.push(...factQuestions("pg-static", "Current Affairs, Defence & Static GK", [
  ["Supreme Commander of the Indian Armed Forces", "the President of India"], ["Indian Navy motto", "Sham No Varunah"], ["Indian Air Force motto", "Nabhah Sparsham Diptam"], ["National Defence Academy", "tri-service pre-commission training academy at Khadakwasla"], ["United Nations", "international organisation founded in 1945"], ["International Court of Justice", "principal judicial organ of the United Nations"], ["ISRO", "India’s national space agency"], ["RBI", "India’s central bank and monetary authority"], ["Election Commission of India", "constitutional body that conducts elections"], ["CAG", "constitutional authority that audits government accounts"], ["National flag ratio", "3:2"], ["Param Vir Chakra", "India’s highest wartime gallantry award"], ["Ashoka Chakra", "India’s highest peacetime gallantry award"], ["Indian Parliament", "consists of the President, Lok Sabha and Rajya Sabha"], ["BRICS", "group originally comprising Brazil, Russia, India, China and South Africa"], ["G20", "forum of major economies for international economic cooperation"],
] as const, 170));
gat.push(...factQuestions("pg-polity", "Polity", [
  ["Fundamental Rights", "rights contained in Part III of the Constitution"], ["Directive Principles", "guiding principles of state policy in Part IV"], ["Lok Sabha", "House of the People"], ["Rajya Sabha", "Council of States"],
] as const, 186));

export const predictedMathPaper: PredictedPaper = {
  id: "predicted-nda2-2026-maths",
  label: "NDA II 2026 · Predicted Mathematics Paper",
  subject: "Mathematics",
  minutes: 150,
  marks: 300,
  evidenceNote: "120 original practice questions weighted to the stable five-year Mathematics topic clusters; this is a revision simulation, not a claim about the official paper.",
  questions: maths,
};

export const predictedGatPaper: PredictedPaper = {
  id: "predicted-nda2-2026-gat",
  label: "NDA II 2026 · Predicted GAT Paper",
  subject: "GAT",
  minutes: 150,
  marks: 600,
  evidenceNote: "50 English and 100 GK practice questions weighted to recurring five-year GAT models and subjects; current-affairs material must be refreshed independently before the exam.",
  questions: gat,
};

export const predictedPapers = [predictedMathPaper, predictedGatPaper];

// Set 2 changes the question families and item stems so it can be used after Set 1
// as a spaced retrieval simulation rather than as a reattempt of the same paper.
const mathsSet2: PracticeQuestion[] = [];

// Number systems: 8 questions.
const hcfPairs: Array<[number, number, number]> = [[36, 48, 12], [42, 56, 14], [45, 60, 15], [54, 72, 18], [63, 84, 21], [70, 98, 14], [72, 96, 24], [75, 100, 25]];
hcfPairs.forEach(([a, b, correct], index) => mathsSet2.push(question(`p2m-hcf-${index + 1}`, "Mathematics", "Number Systems", "P2", `The HCF of ${a} and ${b} is`, `${correct}`, [`${correct / 2}`, `${correct + 2}`, `${a + b}`], `The greatest common factor shared by ${a} and ${b} is ${correct}.`, index)));

// Algebra: 24 questions, deliberately using binomial, logarithmic, discriminant and function models.
for (let i = 0; i < 6; i += 1) {
  const n = 5 + i;
  const r = 2 + (i % 3);
  const coefficients = [[10, 10, 5], [15, 20, 15], [21, 35, 35], [28, 56, 70], [36, 84, 126], [45, 120, 210]];
  const correct = coefficients[i][r - 2];
  mathsSet2.push(question(`p2m-binomial-${i + 1}`, "Mathematics", "Algebra: Binomial Theorem", "P1", `The coefficient of x^${r} in (1 + x)^${n} is`, `${correct}`, [`${correct - 1}`, `${correct + n}`, `${n * r}`], `The coefficient is ${n}C${r} = ${correct}.`, i + 8));
}
for (let i = 0; i < 6; i += 1) {
  const base = 2 + (i % 2);
  const power = 3 + i;
  mathsSet2.push(question(`p2m-log-${i + 1}`, "Mathematics", "Algebra: Logarithms", "P1", `The value of log_${base}(${base}^${power}) is`, `${power}`, [`${power - 1}`, `${base}`, `${power + 1}`], `log_b(b^n) = n, so the value is ${power}.`, i + 14));
}
for (let i = 0; i < 6; i += 1) {
  const b = 3 + i;
  const c = 1 + i;
  const correct = b * b - 4 * c;
  mathsSet2.push(question(`p2m-discriminant-${i + 1}`, "Mathematics", "Algebra: Quadratic Equations", "P1", `For x² + ${b}x + ${c} = 0, the discriminant is`, `${correct}`, [`${b * b + 4 * c}`, `${b + c}`, `${correct + 4}`], `For ax² + bx + c, Δ = b² − 4ac = ${b}² − 4×${c} = ${correct}.`, i + 20));
}
for (let i = 0; i < 6; i += 1) {
  const add = 2 + i;
  const multiplier = 2 + (i % 3);
  const x = 1 + i;
  const correct = multiplier * (x + add);
  mathsSet2.push(question(`p2m-function-${i + 1}`, "Mathematics", "Algebra: Functions", "P2", `If f(x) = x + ${add} and g(x) = ${multiplier}x, then g(f(${x})) equals`, `${correct}`, [`${x + add}`, `${multiplier * x + add}`, `${correct + multiplier}`], `First f(${x}) = ${x + add}; then g(${x + add}) = ${multiplier}×${x + add} = ${correct}.`, i + 26));
}

// Matrix product entries: 8 questions.
for (let i = 0; i < 8; i += 1) {
  const a = 1 + i;
  const b = 2 + (i % 4);
  const c = 3 + (i % 3);
  const d = 1 + (i % 5);
  const correct = a * c + b * d;
  mathsSet2.push(question(`p2m-matrix-product-${i + 1}`, "Mathematics", "Matrices & Determinants", "P2", `For A = [[${a}, ${b}]] and B = [[${c}], [${d}]], the single entry of AB is`, `${correct}`, [`${a * c}`, `${b * d}`, `${a + b + c + d}`], `Multiply the row by the column: ${a}×${c} + ${b}×${d} = ${correct}.`, i + 32));
}

// Trigonometry and height-distance: 16 questions.
for (let i = 0; i < 8; i += 1) {
  const angle = [15, 30, 45, 60, 75, 90, 0, 45][i];
  const correct = angle === 0 || angle === 90 ? "1" : "1";
  mathsSet2.push(question(`p2m-trig-id-${i + 1}`, "Mathematics", "Trigonometry: Identities", "P1", `The value of sin²${angle}° + cos²${angle}° is`, correct, ["0", "1/2", "2"], `For every angle θ, sin²θ + cos²θ = 1.`, i + 40));
}
for (let i = 0; i < 8; i += 1) {
  const base = 6 + 3 * i;
  mathsSet2.push(question(`p2m-elevation-${i + 1}`, "Mathematics", "Height & Distance", "P2", `The angle of elevation of a tower is 45°. If the horizontal distance from its base is ${base} m, the height of the tower is`, `${base} m`, [`${base / 2} m`, `${base * 2} m`, `${base + 3} m`], `tan 45° = height/base = 1, so height equals ${base} m.`, i + 48));
}

// Calculus: 24 questions, using value-at-a-point, definite-integral and stationary-point models.
for (let i = 0; i < 8; i += 1) {
  const n = 2 + i;
  const correct = n + 3;
  mathsSet2.push(question(`p2m-derivative-value-${i + 1}`, "Mathematics", "Calculus: Differentiation", "P1", `If f(x) = x^${n} + 3x, then f′(1) is`, `${correct}`, [`${n}`, "3", `${correct + 1}`], `f′(x) = ${n}x^${n - 1} + 3, so f′(1) = ${n} + 3 = ${correct}.`, i + 56));
}
for (let i = 0; i < 8; i += 1) {
  const n = 1 + i;
  const correct = `1/${n + 1}`;
  mathsSet2.push(question(`p2m-integral-unit-${i + 1}`, "Mathematics", "Calculus: Integration", "P1", `The value of ∫₀¹ x^${n} dx is`, correct, [`1/${n}`, `${n + 1}`, "1"], `∫₀¹x^n dx = [x^${n + 1}/${n + 1}]₀¹ = 1/${n + 1}.`, i + 64));
}
for (let i = 0; i < 8; i += 1) {
  const coefficient = 4 + 2 * i;
  const correct = coefficient / 2;
  mathsSet2.push(question(`p2m-stationary-${i + 1}`, "Mathematics", "Calculus: Applications", "P2", `The stationary point of y = x² − ${coefficient}x occurs at x =`, `${correct}`, [`${coefficient}`, `${correct + 1}`, `${correct - 1}`], `dy/dx = 2x − ${coefficient}. Setting it to zero gives x = ${correct}.`, i + 72));
}

// Analytic, vector and three-dimensional geometry: 24 questions.
for (let i = 0; i < 8; i += 1) {
  const radius = 2 + i;
  mathsSet2.push(question(`p2m-circle-radius-${i + 1}`, "Mathematics", "Coordinate Geometry: Circle", "P1", `The radius of the circle x² + y² = ${radius * radius} is`, `${radius}`, [`${radius * radius}`, `${radius / 2}`, `${radius + 1}`], `A circle x² + y² = r² has radius r = ${radius}.`, i + 80));
}
for (let i = 0; i < 8; i += 1) {
  const a = 1 + i;
  const b = 2 + i;
  const correct = Math.sqrt(a * a + b * b).toFixed(3).replace(/\.000$/, "");
  mathsSet2.push(question(`p2m-vector-magnitude-${i + 1}`, "Mathematics", "Vector Algebra", "P1", `The magnitude of the vector ${a}i + ${b}j is`, `${correct}`, [`${a + b}`, `${Math.abs(a - b)}`, `${(a * a + b * b)}`], `|a| = √(${a}² + ${b}²) = ${correct}.`, i + 88));
}
for (let i = 0; i < 8; i += 1) {
  const x = 1 + i;
  const y = 2 + i;
  const z = 2 + i;
  const correct = Math.sqrt(x * x + y * y + z * z).toFixed(3).replace(/\.000$/, "");
  mathsSet2.push(question(`p2m-3d-distance-${i + 1}`, "Mathematics", "Three-Dimensional Geometry", "P1", `The distance of (${x}, ${y}, ${z}) from the origin is`, `${correct}`, [`${x + y + z}`, `${x * x + y * y + z * z}`, `${Math.abs(x - y - z)}`], `Distance from origin = √(x² + y² + z²) = ${correct}.`, i + 96));
}

// Statistics and probability: 16 questions.
for (let i = 0; i < 8; i += 1) {
  const middle = 4 + i;
  mathsSet2.push(question(`p2m-median-${i + 1}`, "Mathematics", "Statistics", "P1", `The median of ${middle - 2}, ${middle - 1}, ${middle}, ${middle + 1}, ${middle + 2} is`, `${middle}`, [`${middle - 1}`, `${middle + 1}`, `${middle + 2}`], `In an ordered list of five values, the middle (third) value is the median.`, i + 104));
}
for (let i = 0; i < 8; i += 1) {
  const total = 2 + i;
  const correct = `${total}/8`;
  mathsSet2.push(question(`p2m-prob-coins-${i + 1}`, "Mathematics", "Probability", "P1", `Two fair coins are tossed. The probability of getting exactly ${i % 2 === 0 ? "one head" : "two heads"} is`, i % 2 === 0 ? "1/2" : "1/4", ["1/4", "3/4", correct], `For two fair coins, exactly one head occurs in HT and TH (2 of 4 outcomes); two heads occurs once (1 of 4).`, i + 112));
}

const englishSet2: PracticeQuestion[] = [];
const set2Vocab = [
  ["lucid", "clear and easy to understand", "confusing", "noisy", "brief"], ["tenacious", "persistent and determined", "careless", "timid", "temporary"], ["pragmatic", "practical and realistic", "idealistic", "careless", "silent"], ["rectify", "put right or correct", "damage", "repeat", "delay"], ["versatile", "able to adapt to many uses", "fragile", "narrow", "uncertain"],
  ["austere", "simple and without luxury", "lavish", "noisy", "careless"], ["impartial", "fair and not biased", "prejudiced", "impatient", "unclear"], ["sporadic", "occurring irregularly", "continuous", "planned", "rapid"], ["novice", "a beginner", "an expert", "a critic", "a leader"], ["salient", "most noticeable or important", "hidden", "minor", "temporary"],
  ["validate", "confirm that something is sound", "ignore", "contradict", "postpone"], ["frugal", "careful with money or resources", "wasteful", "wealthy", "weak"], ["elated", "very happy", "angry", "tired", "uncertain"], ["coerce", "persuade by force or threat", "praise", "assist", "explain"], ["astute", "quick to understand and judge", "slow", "careless", "ordinary"],
] as const;
set2Vocab.forEach(([word, correct, a, b, c], index) => englishSet2.push(question(`p2g-vocab-${index + 1}`, "English", "Vocabulary", "P1", `Choose the word nearest in meaning to “${word}”.`, correct, [a, b, c], `“${word}” means ${correct}.`, index)));
const set2Grammar = [
  ["The principal, along with the teachers, ___ present.", "was", "were", "have", "are", "The main subject is singular: principal."], ["She has lived here ___ 2019.", "since", "for", "from", "by", "Use ‘since’ with a starting point in time."], ["If he ___ harder, he would have passed.", "had worked", "worked", "has worked", "would work", "This is the unreal past conditional."], ["The officer ordered that the gate ___ closed.", "be", "is", "was", "being", "The mandative subjunctive uses the base form ‘be’."], ["He is accustomed ___ early.", "to rising", "to rise", "for rising", "with rise", "‘Accustomed to’ is followed by a noun or gerund."],
  ["Scarcely had the match begun ___ it started raining.", "when", "than", "then", "that", "The paired form is ‘scarcely … when’."], ["The furniture ___ being shifted.", "is", "are", "were", "have", "‘Furniture’ is an uncountable singular noun."], ["I would rather you ___ now.", "left", "leave", "will leave", "had left", "‘Would rather’ commonly takes a past form for present preference."], ["This is the best book I ___.", "have read", "had read", "read", "am reading", "With a superlative, present perfect is standard here."], ["She succeeded ___ solving the problem.", "in", "at", "for", "with", "The collocation is ‘succeed in’."],
  ["The train arrived ___ time.", "on", "at", "in", "by", "Use ‘on time’ for punctual arrival."], ["He denied ___ the document.", "signing", "to sign", "sign", "signed", "Deny is followed by a gerund."], ["The report was written ___ a senior officer.", "by", "with", "from", "at", "The passive agent is introduced by ‘by’."], ["Neither of the answers ___ correct.", "is", "are", "were", "have", "Neither is treated as singular in formal English."], ["She spoke so softly that I could ___ hear her.", "hardly", "hard", "harder", "hardest", "‘Hardly’ means almost not."],
] as const;
set2Grammar.forEach(([prompt, correct, a, b, c, explanation], index) => englishSet2.push(question(`p2g-grammar-${index + 1}`, "English", "Grammar & Usage", "P1", prompt, correct, [a, b, c], explanation, index + 15)));
const set2Idioms = [
  ["keep an eye on", "watch carefully", "ignore", "celebrate", "become tired"], ["weather the storm", "survive a difficult period", "avoid rain", "cause trouble", "travel quickly"], ["the last straw", "the final problem that ends patience", "a small reward", "a lucky event", "a quick solution"], ["under the weather", "slightly unwell", "outdoors", "very energetic", "well prepared"], ["see eye to eye", "agree completely", "look closely", "argue loudly", "avoid contact"],
  ["on the same page", "sharing the same understanding", "reading together", "being late", "changing a plan"], ["throw in the towel", "give up", "start a contest", "work late", "take a break"], ["cut corners", "do something cheaply or carelessly", "take a shortcut road", "make a shape", "decorate a room"], ["a fish out of water", "uncomfortable in an unfamiliar setting", "a strong swimmer", "very successful", "quiet and calm"], ["go the extra mile", "make more effort than expected", "travel far", "delay a task", "repeat a mistake"],
] as const;
set2Idioms.forEach(([phrase, correct, a, b, c], index) => englishSet2.push(question(`p2g-idiom-${index + 1}`, "English", "Idioms & Phrases", "P1", `The idiom “${phrase}” means`, correct, [a, b, c], `In standard use, “${phrase}” means “${correct}”.`, index + 30)));
const set2Cloze = [
  ["The instructor asked the cadets to listen ___.", "carefully", "careful", "care", "carefulness"], ["We will proceed ___ the signal is received.", "once", "because", "unless", "although"], ["The notes were arranged ___ topic.", "by", "for", "at", "with"], ["He revised daily ___ his confidence improved.", "so that", "despite", "unless", "whereas"], ["The answer is ___ difficult than it appears.", "less", "least", "much", "very"],
  ["She completed the task ___ any assistance.", "without", "with", "through", "from"], ["The briefing begins ___ 0800 hours.", "at", "on", "in", "by"], ["The team was praised ___ its discipline.", "for", "from", "with", "at"], ["We should verify the result ___ submitting it.", "before", "after", "because", "unless"], ["The route was changed ___ the bridge was closed.", "because", "although", "unless", "whereas"],
] as const;
set2Cloze.forEach(([prompt, correct, a, b, c], index) => englishSet2.push(question(`p2g-cloze-${index + 1}`, "English", "Cloze & Connectors", "P2", prompt, correct, [a, b, c], "Choose the option that makes the sentence grammatically correct and meaningful.", index + 40)));

const gatSet2: PracticeQuestion[] = [...englishSet2];
gatSet2.push(...factQuestions("p2g-physics", "Physics", [
  ["velocity", "displacement per unit time"], ["inertia", "tendency of a body to resist change in its state"], ["impulse", "force multiplied by time interval"], ["potential energy", "energy due to position or configuration"], ["Archimedes’ principle", "an immersed body experiences an upthrust equal to displaced fluid weight"], ["terminal velocity", "constant maximum speed reached through a fluid"], ["amplitude", "maximum displacement from the mean position"], ["wavelength", "distance between successive points in the same phase"], ["transformer", "device that changes alternating voltage"], ["fuse", "safety device that melts when current is excessive"], ["electrolysis", "chemical change caused by electric current"], ["diode", "component allowing current mainly in one direction"], ["concave mirror", "mirror that converges parallel rays to a focus"], ["dispersion", "splitting of white light into component colours"], ["total internal reflection", "complete reflection from a denser medium at a critical condition"], ["latent heat", "heat absorbed or released without temperature change"], ["absolute zero", "lowest possible thermodynamic temperature"], ["nuclear fission", "splitting of a heavy nucleus"], ["nuclear fusion", "combining light nuclei with energy release"], ["semiconductor", "material with conductivity between conductor and insulator"], ["torque", "turning effect of a force"], ["angular momentum", "rotational analogue of linear momentum"], ["projectile", "body moving under gravity after projection"], ["refractive index", "ratio related to speed of light in media"], ["photoelectric effect", "emission of electrons from a material due to light"],
] as const, 90));
gatSet2.push(...factQuestions("p2g-chem", "Chemistry", [
  ["molarity", "moles of solute per litre of solution"], ["mole", "amount containing Avogadro number of entities"], ["electrolyte", "substance producing ions in solution or melt"], ["exothermic reaction", "reaction that releases heat"], ["endothermic reaction", "reaction that absorbs heat"], ["distillation", "separation based on differences in boiling point"], ["filtration", "separation of insoluble solid from a fluid"], ["polymer", "large molecule built from repeating units"], ["isotope", "atoms of an element with different neutron numbers"], ["noble gases", "group of elements with filled outer electron shells"], ["amphoteric oxide", "oxide reacting with both acids and bases"], ["electroplating", "depositing a metal coating using electricity"], ["rusting", "corrosion of iron in presence of oxygen and water"], ["hard water", "water containing dissolved calcium or magnesium salts"], ["indicator", "substance showing acidity or alkalinity by colour change"],
] as const, 115));
gatSet2.push(...factQuestions("p2g-bio", "Biology & General Science", [
  ["ribosome", "cell structure associated with protein synthesis"], ["nucleus", "cell organelle containing genetic material"], ["xylem", "plant tissue that carries water and minerals"], ["phloem", "plant tissue that transports prepared food"], ["stomata", "pores involved in gas exchange in leaves"], ["respiration", "controlled release of energy from food"], ["enzyme", "biological catalyst"], ["hormone", "chemical messenger produced in small amounts"], ["neuron", "cell specialised for nerve impulse transmission"], ["reflex action", "rapid involuntary response to a stimulus"], ["antibody", "protein involved in specific immune defence"], ["antibiotic", "substance used against certain bacterial infections"], ["malaria", "disease transmitted by female Anopheles mosquitoes"], ["food chain", "sequence showing transfer of energy through organisms"], ["biodiversity", "variety of living organisms in an area"],
] as const, 130));
gatSet2.push(...factQuestions("p2g-history", "History & Culture", [
  ["Harappan seals", "artefacts often bearing animal motifs and script signs"], ["Vedic literature", "early Indian texts including the Vedas"], ["Jainism", "tradition associated with Mahavira and non-violence"], ["Kalinga War", "conflict after which Ashoka embraced dhamma"], ["Nalanda", "ancient centre of learning in present-day Bihar"], ["Chola administration", "South Indian imperial system noted for local institutions"], ["Delhi Sultanate", "series of Turkic and Afghan dynasties ruling from Delhi"], ["Mughal Empire", "empire founded in India by Babur in 1526"], ["Permanent Settlement", "revenue arrangement introduced by the East India Company in Bengal"], ["Swadeshi Movement", "movement promoting indigenous goods after the 1905 Bengal partition"], ["Home Rule Movement", "movement demanding self-government within the British Empire"], ["Champaran Satyagraha", "Gandhi-led movement linked with indigo cultivators"], ["Dandi March", "1930 march associated with the Salt Law protest"], ["Cabinet Mission", "1946 mission proposing a framework for Indian constitutional transfer"], ["Indian Independence Act", "1947 Act creating India and Pakistan as dominions"], ["Bharatanatyam", "classical dance form associated with Tamil Nadu"], ["Ajanta caves", "rock-cut Buddhist cave complex known for paintings"], ["Konark Sun Temple", "Odisha temple renowned for its chariot form"], ["Sangam literature", "early Tamil literary corpus"], ["Panchayati Raj", "system of local self-government in rural India"],
] as const, 145));
gatSet2.push(...factQuestions("p2g-geo", "Geography", [
  ["rotation of Earth", "spinning of Earth on its axis causing day and night"], ["revolution of Earth", "Earth’s orbit around the Sun"], ["equinox", "time when day and night are approximately equal"], ["solstice", "time when the Sun’s apparent path reaches an extreme"], ["continental shelf", "gently sloping submerged edge of a continent"], ["tsunami", "series of sea waves often caused by undersea disturbance"], ["rain shadow", "dry area on the leeward side of a mountain range"], ["jet stream", "fast high-altitude air current"], ["western disturbances", "extratropical weather systems affecting northwestern India"], ["alluvial soil", "soil deposited by rivers"], ["black soil", "soil associated with basaltic regions and cotton cultivation"], ["red soil", "iron-rich soil with a reddish colour"], ["estuary", "tidal mouth where a river meets the sea"], ["watershed", "high land dividing drainage basins"], ["plateau", "elevated area with a relatively level surface"],
] as const, 165));
gatSet2.push(...factQuestions("p2g-polity", "Polity, Defence & Static GK", [
  ["Preamble", "introductory statement of the Constitution’s ideals"], ["President’s Rule", "constitutional arrangement under Article 356"], ["Prime Minister", "head of the Union Council of Ministers"], ["Supreme Court", "highest court of India"], ["Finance Commission", "constitutional body recommending fiscal distribution"], ["NITI Aayog", "policy think tank of the Government of India"], ["National Emergency", "emergency proclaimed under Article 352"], ["Chief Election Commissioner", "head of the Election Commission of India"], ["Indian Coast Guard", "maritime law-enforcement and search-and-rescue force"], ["Siachen Glacier", "high-altitude glacier in the eastern Karakoram range"],
] as const, 180));

export const predictedMathPaperSet2: PredictedPaper = {
  id: "predicted-nda2-2026-maths-set-2",
  label: "NDA II 2026 · Predicted Mathematics Paper · Set 2",
  subject: "Mathematics",
  minutes: 150,
  marks: 300,
  evidenceNote: "Spaced-practice Set 2: 120 original Mathematics questions using different item stems and models from Set 1, while retaining the five-year priority weighting.",
  questions: mathsSet2,
};

export const predictedGatPaperSet2: PredictedPaper = {
  id: "predicted-nda2-2026-gat-set-2",
  label: "NDA II 2026 · Predicted GAT Paper · Set 2",
  subject: "GAT",
  minutes: 150,
  marks: 600,
  evidenceNote: "Spaced-practice Set 2: 50 English and 100 GK original questions using fresh recall and application prompts; refresh current affairs separately before the exam.",
  questions: gatSet2,
};

export const predictedPapersSet2 = [predictedMathPaperSet2, predictedGatPaperSet2];
export const allPredictedPapers = [...predictedPapers, ...predictedPapersSet2];
