/**
 * Practice & Test Centre page.
 * Field Manual Progress Deck: a focused exam operations room for drills, mock debriefs and full-paper PYQ attempts.
 */
import { useEffect, useMemo, useState } from "react";
import { Archive, ArrowLeft, ArrowUpRight, Atom, BookOpen, Brain, Check, CheckCircle2, ChevronLeft, Circle, ClipboardCheck, Clock3, Compass, FileText, Flag, Gauge, Languages, ListChecks, Menu, Play, RotateCcw, ShieldCheck, Target, TimerReset, Trophy, X } from "lucide-react";
import { Link } from "wouter";
import { buildPracticeSet, practiceQuestions, pyqPapers, type PracticeQuestion, type PyqPaper, type TestSubject } from "@/data/testBank";

const ASSETS = {
  topo: "/manus-storage/nda-topographic-detail_be1ad402.jpg",
  logo: "/manus-storage/nda-compass-check-logo_ef2dc0c7.png",
};

type TestMode = "briefing" | "practice" | "pyq" | "result";
type PracticeSession = { title: string; questions: PracticeQuestion[]; minutes: number; type: "Daily drill" | "Priority mock" };
type Answer = "A" | "B" | "C" | "D";
type TestHistory = { id: string; title: string; timestamp: string; correct: number; attempted: number; total: number; score: number; maxScore: number };

const optionLetters: Answer[] = ["A", "B", "C", "D"];
const subjectIcon: Record<TestSubject, typeof Brain> = { Mathematics: Brain, English: Languages, GAT: Atom };

function formatTimer(value: number) {
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const seconds = (value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function markFor(question: PracticeQuestion) {
  return question.subject === "Mathematics" ? 2.5 : 4;
}

function getDateOffset() {
  const start = new Date("2026-08-16T00:00:00").getTime();
  const today = new Date();
  return Math.max(0, Math.floor((today.getTime() - start) / 86_400_000));
}

export default function PracticeCenter() {
  const [mode, setMode] = useState<TestMode>("briefing");
  const [railOpen, setRailOpen] = useState(false);
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [result, setResult] = useState<TestHistory | null>(null);
  const [history, setHistory] = useState<TestHistory[]>([]);
  const [pyqPaper, setPyqPaper] = useState<PyqPaper | null>(null);
  const [pyqAnswers, setPyqAnswers] = useState<Record<number, Answer>>({});
  const [pyqNumber, setPyqNumber] = useState(1);
  const [pyqSeconds, setPyqSeconds] = useState(0);
  const [pyqSaved, setPyqSaved] = useState(false);
  const [paperFilter, setPaperFilter] = useState<"All" | TestSubject>("All");

  useEffect(() => {
    const saved = window.localStorage.getItem("nda-test-history-v1");
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch { window.localStorage.removeItem("nda-test-history-v1"); }
    }
  }, []);

  useEffect(() => { window.localStorage.setItem("nda-test-history-v1", JSON.stringify(history)); }, [history]);

  useEffect(() => {
    if (mode !== "practice" || secondsLeft <= 0) return;
    const interval = window.setInterval(() => setSecondsLeft((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [mode, secondsLeft]);

  useEffect(() => {
    if (mode !== "pyq" || pyqSeconds <= 0) return;
    const interval = window.setInterval(() => setPyqSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [mode, pyqSeconds]);

  const historySummary = useMemo(() => {
    const totalAttempted = history.reduce((sum, entry) => sum + entry.attempted, 0);
    const totalCorrect = history.reduce((sum, entry) => sum + entry.correct, 0);
    return { drills: history.length, totalAttempted, accuracy: totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0 };
  }, [history]);

  const filteredPapers = pyqPapers.filter((paper) => paperFilter === "All" || paper.subject === paperFilter);

  const startPractice = (title: string, subject: TestSubject | "All", count: number, minutes: number, type: PracticeSession["type"], offset = 0) => {
    const questions = buildPracticeSet(subject, count, offset);
    setSession({ title, questions, minutes, type });
    setAnswers({});
    setActiveQuestion(0);
    setSecondsLeft(minutes * 60);
    setResult(null);
    setMode("practice");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const submitPractice = () => {
    if (!session) return;
    const attempted = Object.keys(answers).length;
    const correct = session.questions.filter((question, index) => answers[index] === question.answer).length;
    const wrong = attempted - correct;
    const maxScore = session.questions.reduce((sum, question) => sum + markFor(question), 0);
    const positive = session.questions.filter((question, index) => answers[index] === question.answer).reduce((sum, question) => sum + markFor(question), 0);
    const negative = session.questions.filter((question, index) => answers[index] && answers[index] !== question.answer).reduce((sum, question) => sum + markFor(question) / 3, 0);
    const nextResult: TestHistory = { id: `${Date.now()}`, title: session.title, timestamp: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), correct, attempted, total: session.questions.length, score: Math.max(0, Number((positive - negative).toFixed(2))), maxScore };
    setResult(nextResult);
    setHistory((current) => [nextResult, ...current].slice(0, 8));
    setMode("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const launchPyq = (paper: PyqPaper) => {
    setPyqPaper(paper);
    setPyqAnswers({});
    setPyqNumber(1);
    setPyqSeconds(paper.minutes * 60);
    setPyqSaved(false);
    setMode("pyq");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const savePyqAttempt = () => {
    if (!pyqPaper) return;
    const attempted = Object.keys(pyqAnswers).length;
    window.localStorage.setItem(`nda-pyq-${pyqPaper.id}-v1`, JSON.stringify({ answers: pyqAnswers, secondsLeft: pyqSeconds, updatedAt: new Date().toISOString() }));
    setHistory((current) => [{ id: `${Date.now()}`, title: `${pyqPaper.label} · OMR saved`, timestamp: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), correct: 0, attempted, total: pyqPaper.questions, score: 0, maxScore: pyqPaper.subject === "Mathematics" ? 300 : 600 }, ...current].slice(0, 8));
    setPyqSaved(true);
  };

  if (mode === "practice" && session) {
    const question = session.questions[activeQuestion];
    const Icon = subjectIcon[question.subject];
    return <main className="test-session-shell"><header className="session-topbar"><Link href="/practice" className="session-back" onClick={() => setMode("briefing")}><ArrowLeft size={17} /> Exit test</Link><div className="session-title"><span>{session.type}</span><strong>{session.title}</strong></div><div className="session-timer"><Clock3 size={16} /> {formatTimer(secondsLeft)}</div></header><section className="test-session-main"><div className="test-progress"><div><span>QUESTION {activeQuestion + 1} / {session.questions.length}</span><div className="test-progress-bar"><i style={{ width: `${((activeQuestion + 1) / session.questions.length) * 100}%` }} /></div></div><span>{Object.keys(answers).length} answered</span></div><article className="question-card"><div className="question-meta"><span><Icon size={15} /> {question.subject}</span><span>{question.priority} · {question.topic}</span></div><h1>{question.prompt}</h1><div className="option-grid">{question.options.map((option, index) => { const letter = optionLetters[index]; return <button key={letter} className={`answer-option ${answers[activeQuestion] === letter ? "is-selected" : ""}`} onClick={() => setAnswers((current) => ({ ...current, [activeQuestion]: letter }))}><span>{letter}</span>{option}</button>; })}</div></article><div className="session-actions"><button className="session-secondary" onClick={() => setActiveQuestion((current) => Math.max(0, current - 1))} disabled={activeQuestion === 0}>Previous</button>{activeQuestion < session.questions.length - 1 ? <button className="session-primary" onClick={() => setActiveQuestion((current) => current + 1)}>Next question</button> : <button className="session-primary" onClick={submitPractice}><ClipboardCheck size={16} /> Submit & debrief</button>}</div><div className="question-nav">{session.questions.map((item, index) => <button key={item.id} className={`${activeQuestion === index ? "is-active" : ""} ${answers[index] ? "is-answered" : ""}`} onClick={() => setActiveQuestion(index)}>{index + 1}</button>)}</div></section></main>;
  }

  if (mode === "result" && session && result) {
    return <main className="test-session-shell result-shell"><header className="session-topbar"><button className="session-back" onClick={() => setMode("briefing")}><ArrowLeft size={17} /> Back to test centre</button><div className="session-title"><span>DEBRIEF COMPLETE</span><strong>{session.title}</strong></div></header><section className="result-main"><div className="result-hero"><span className="result-stamp">MISSION REVIEW</span><h1>{result.correct} <em>/ {result.total}</em></h1><p>correct answers · {result.attempted} attempted</p><div className="result-score"><strong>{result.score}</strong><span>out of {result.maxScore} marks<br />negative marking applied</span></div><button className="session-primary" onClick={() => setMode("briefing")}><CheckCircle2 size={16} /> Log complete</button></div><div className="review-list"><div className="review-heading"><div><p className="eyebrow ink">ANSWER REVIEW</p><h2>Fix the error, not just the score</h2></div><span>{Math.round((result.correct / result.total) * 100)}% accuracy</span></div>{session.questions.map((question, index) => { const selected = answers[index]; const right = selected === question.answer; return <article className={`review-card ${right ? "is-correct" : "is-wrong"}`} key={question.id}><div className="review-state">{right ? <Check size={16} /> : <X size={16} />}</div><div><span>{question.subject} · {question.topic}</span><h3>{question.prompt}</h3><p><b>Your answer:</b> {selected ?? "Not attempted"} &nbsp; <b>Correct:</b> {question.answer}</p><p className="review-explanation">{question.explanation}</p></div></article>; })}</div></section></main>;
  }

  if (mode === "pyq" && pyqPaper) {
    const answeredCount = Object.keys(pyqAnswers).length;
    return <main className="test-session-shell pyq-session"><header className="session-topbar"><button className="session-back" onClick={() => setMode("briefing")}><ArrowLeft size={17} /> Exit paper</button><div className="session-title"><span>FULL PAPER PYQ</span><strong>{pyqPaper.label}</strong></div><div className="session-timer"><Clock3 size={16} /> {formatTimer(pyqSeconds)}</div></header><section className="pyq-main"><div className="pyq-status"><div><span>OFFICIAL PAPER VIEWER · {pyqPaper.questions} QUESTIONS</span><div className="test-progress-bar"><i style={{ width: `${(answeredCount / pyqPaper.questions) * 100}%` }} /></div></div><strong>{answeredCount}/{pyqPaper.questions}</strong></div><div className="pyq-workspace"><div className="paper-viewer"><div className="paper-viewer-head"><div><FileText size={16} /><span>QUESTION PAPER</span></div><a href={pyqPaper.paperUrl} target="_blank" rel="noreferrer">Open in new tab <ArrowUpRight size={14} /></a></div><iframe src={pyqPaper.paperUrl} title={`${pyqPaper.label} question paper`} /><p>Use the question paper viewer for the complete paper. If it does not load in your browser, use “Open in new tab”.</p></div><aside className="omr-panel"><div className="omr-head"><div><p>OMR RESPONSE SHEET</p><span>Q. {pyqNumber} of {pyqPaper.questions}</span></div><span className="omr-subject">{pyqPaper.subject}</span></div><div className="omr-options">{optionLetters.map((letter) => <button key={letter} className={pyqAnswers[pyqNumber] === letter ? "is-selected" : ""} onClick={() => { setPyqAnswers((current) => ({ ...current, [pyqNumber]: letter })); setPyqSaved(false); }}>{letter}</button>)}</div><div className="omr-grid">{Array.from({ length: pyqPaper.questions }, (_, index) => index + 1).map((number) => <button key={number} className={`${pyqNumber === number ? "is-active" : ""} ${pyqAnswers[number] ? "is-answered" : ""}`} onClick={() => setPyqNumber(number)}>{number}</button>)}</div><div className="omr-actions"><button className="session-primary" onClick={savePyqAttempt}><ShieldCheck size={16} /> Save OMR attempt</button>{pyqPaper.keyUrl && <a className="session-secondary" href={pyqPaper.keyUrl} target="_blank" rel="noreferrer">Open key PDF <ArrowUpRight size={15} /></a>}</div>{pyqSaved && <p className="omr-saved"><CheckCircle2 size={15} /> Attempt saved on this device.</p>}<p className="omr-note">{pyqPaper.keyNote}</p></aside></div></section></main>;
  }

  return <div className="field-app practice-app"><aside className={`briefing-rail ${railOpen ? "is-open" : ""}`} aria-label="Practice navigation"><div className="brand-lockup"><img src={ASSETS.logo} className="brand-mark" alt="NDA study tracker compass mark" /><div><p className="brand-name">NDA / 2026</p><p className="brand-subtitle">TEST OPERATIONS CENTRE</p></div></div><section className="rail-command-card"><div className="rail-command-top"><span>READINESS LOG</span><span className="status-light" /></div><div className="rail-command-main"><strong>{historySummary.accuracy}%</strong><span>ACCURACY</span></div><div className="rail-command-progress"><i style={{ width: `${historySummary.accuracy}%` }} /></div><div className="rail-command-bottom"><span>{historySummary.drills} DRILLS LOGGED</span><span>{historySummary.totalAttempted} ANSWERS</span></div></section><div className="rail-divider" /><p className="rail-caption">FIELD NAVIGATION</p><nav className="rail-nav"><Link href="/" className="rail-link"><Gauge size={17} /><span>Command deck</span><ChevronLeft size={15} /></Link><Link href="/priority-syllabus" className="rail-link"><BookOpen size={17} /><span>Priority syllabus</span><ChevronLeft size={15} /></Link><button className="rail-link is-current" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><Trophy size={17} /><span>Practice & tests</span><Check size={15} /></button><button className="rail-link" onClick={() => document.getElementById("pyq-archive")?.scrollIntoView({ behavior: "smooth" })}><Archive size={17} /><span>PYQ archive</span><Target size={15} /></button></nav><div className="rail-mission"><span className="mission-stamp">TEST DISCIPLINE</span><strong>Attempt → review</strong><p>Tag the reason for every wrong answer before the next drill.</p><div className="mission-rule" /><span>Accuracy before speed.</span></div></aside><div className="mobile-topbar"><div className="mobile-brand"><img src={ASSETS.logo} alt="" /><span>TEST CENTRE</span></div><button className="menu-button" onClick={() => setRailOpen((open) => !open)} aria-label="Toggle navigation">{railOpen ? <X size={20} /> : <Menu size={20} />}</button></div><main className="main-deck practice-deck"><section className="practice-hero" style={{ backgroundImage: `linear-gradient(100deg, rgba(11, 26, 44, .98) 0%, rgba(11, 26, 44, .82) 55%, rgba(11, 26, 44, .4) 100%), url(${ASSETS.topo})` }}><div className="hero-topline"><span className="pulse-dot" /> PRACTICE & TEST CENTRE <span className="topline-rule" /> NDA II / 2026</div><div className="practice-command-strip"><span><img src={ASSETS.logo} alt="" /> ROUTE / TEST CENTRE</span><span>EXAM / 13 SEP 2026</span><span>ORDER / P1 → P2 → PYQ</span></div><div className="practice-hero-copy"><div className="hero-compass-lockup"><img src={ASSETS.logo} alt="" /><span><b>DAILY PRACTICE</b><small>FULL-PAPER PYQs</small></span></div><p className="eyebrow">DAILY TEST ORDER</p><h1>Run today’s<br /><em>exam routine.</em></h1><p>Choose a P1 drill, complete a timed mock, then record the error before you move on.</p></div><div className="practice-hero-footer"><div><strong>10</strong><span>DAILY QUESTIONS</span></div><div><strong>3</strong><span>TEST MODES</span></div><div><strong>8</strong><span>PYQ PAPERS</span></div></div></section><section className="section-block launch-section"><div className="section-heading"><div><p className="eyebrow ink">TODAY’S TEST ORDER</p><h2>Take the highest-return block first</h2></div><p className="heading-note">P1 and P2 PYQ patterns. One drill. One review.</p></div><div className="launch-grid"><article className="daily-launch"><div><span className="launch-stamp">MISSION 01 · 20 MIN</span><h3>Today’s<br /><em>priority drill</em></h3><p>Answer 10 core questions. Log the rule behind every error.</p></div><button className="signal-button" onClick={() => startPractice("Daily priority drill", "All", 10, 20, "Daily drill", getDateOffset())}><Play size={16} /> Run daily drill</button></article><article className="mock-launch"><span className="launch-stamp blue">MISSION 02 · 40 MIN</span><Brain size={25} /><h3>Mathematics<br />priority mock</h3><p>Calculus, Algebra and Geometry — 12 timed questions.</p><button onClick={() => startPractice("Mathematics priority mock", "Mathematics", 12, 40, "Priority mock")}>Run mock <ArrowUpRight size={15} /></button></article><article className="mock-launch"><span className="launch-stamp sage">MISSION 03 · 35 MIN</span><Atom size={25} /><h3>GAT core<br />priority mock</h3><p>English and GK scoring patterns — 12 timed questions.</p><button onClick={() => startPractice("GAT priority mock", "GAT", 12, 35, "Priority mock", 2)}>Run mock <ArrowUpRight size={15} /></button></article></div></section><section className="section-block practice-bank-section"><div className="section-heading"><div><p className="eyebrow ink">QUICK PRACTICE BANK</p><h2>Select a scoring block</h2></div><p className="heading-note">Pick one subject. Answer under time. Review the error pattern.</p></div><div className="subject-drills"><button onClick={() => startPractice("Mathematics P1 drill", "Mathematics", 10, 25, "Daily drill", 3)}><Brain size={21} /><span><b>Mathematics</b><small>Calculus · Algebra · Vector · Probability</small></span><ArrowUpRight size={16} /></button><button onClick={() => startPractice("English P1 drill", "English", 8, 18, "Daily drill", 1)}><Languages size={21} /><span><b>English</b><small>Grammar · Vocabulary · Idioms · Usage</small></span><ArrowUpRight size={16} /></button><button onClick={() => startPractice("GAT science + static drill", "GAT", 10, 25, "Daily drill", 4)}><Atom size={21} /><span><b>GAT core</b><small>Physics · Geography · Chemistry · Defence</small></span><ArrowUpRight size={16} /></button></div></section><section className="section-block pyq-archive-section" id="pyq-archive"><div className="section-heading"><div><p className="eyebrow ink">FULL PAPER ARCHIVE</p><h2>Run an actual PYQ</h2></div><p className="heading-note">Open the paper, fill the OMR, save the attempt, then self-check with the linked key.</p></div><div className="paper-filters">{(["All", "Mathematics", "GAT"] as const).map((filter) => <button key={filter} className={paperFilter === filter ? "is-selected" : ""} onClick={() => setPaperFilter(filter)}>{filter === "All" ? "All papers" : filter}</button>)}</div><div className="paper-grid">{filteredPapers.map((paper) => <article key={paper.id} className="paper-card"><div className="paper-card-top"><span>{paper.subject}</span><span>{paper.year}</span></div><div className="paper-card-main"><FileText size={25} /><h3>{paper.label}</h3><p>{paper.questions} questions · {paper.minutes} minutes · full paper</p></div><div className="paper-card-meta"><span><Clock3 size={13} /> TIMED OMR</span><span>{paper.keyUrl ? "KEY LINKED" : "SAVE ATTEMPT"}</span></div><button onClick={() => launchPyq(paper)}>Open paper <ArrowUpRight size={16} /></button></article>)}</div></section><section className="section-block test-log-section"><div className="section-heading"><div><p className="eyebrow ink">YOUR DEBRIEF LOG</p><h2>Review the error. Improve the next attempt.</h2></div><button className="reset-log" onClick={() => { setHistory([]); window.localStorage.removeItem("nda-test-history-v1"); }}><RotateCcw size={15} /> Clear log</button></div>{history.length ? <div className="history-table">{history.map((entry) => <article key={entry.id}><span className="history-date">{entry.timestamp}</span><strong>{entry.title}</strong><span>{entry.attempted}/{entry.total} attempted</span><span>{entry.correct ? `${entry.correct} correct` : "OMR saved"}</span><span className="history-score">{entry.maxScore ? `${entry.score}/${entry.maxScore}` : "—"}</span></article>)}</div> : <div className="empty-log"><ClipboardCheck size={25} /><p>Your first submitted drill or saved PYQ attempt will appear here.</p></div>}</section><footer className="site-footer"><div><img src={ASSETS.logo} alt="" /><span>NDA II 2026 — Practice & Test Centre</span></div><span>PYQ papers link to cited question-paper sources.</span></footer></main></div>;
}
