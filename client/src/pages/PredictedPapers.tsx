import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, CheckCircle2, ChevronLeft, Clock3, FileText, Flag, Gauge, Menu, Play, RotateCcw, Target, Trophy, X } from "lucide-react";
import { Link } from "wouter";
import { predictedPapers, type PredictedPaper } from "@/data/predictedPapers";

type Answer = "A" | "B" | "C" | "D";
const letters: Answer[] = ["A", "B", "C", "D"];

function timer(value: number) {
  return `${Math.floor(value / 60).toString().padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`;
}

export default function PredictedPapers() {
  const [railOpen, setRailOpen] = useState(false);
  const [paper, setPaper] = useState<PredictedPaper | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [seconds, setSeconds] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!paper || submitted || seconds <= 0) return;
    const id = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(id);
  }, [paper, seconds, submitted]);

  const score = useMemo(() => {
    if (!paper) return { attempted: 0, correct: 0, marks: 0 };
    const attempted = Object.keys(answers).length;
    const correct = paper.questions.filter((item, index) => answers[index] === item.answer).length;
    const perQuestion = paper.marks / paper.questions.length;
    const wrong = attempted - correct;
    return { attempted, correct, marks: Math.max(0, Number((correct * perQuestion - wrong * perQuestion / 3).toFixed(2))) };
  }, [answers, paper]);

  const launch = (next: PredictedPaper) => {
    setPaper(next);
    setQuestionIndex(0);
    setAnswers({});
    setSeconds(next.minutes * 60);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (paper) {
    const active = paper.questions[questionIndex];
    if (submitted) {
      return <main className="test-session-shell result-shell"><header className="session-topbar"><button className="session-back" onClick={() => setPaper(null)}><ArrowLeft size={17} /> Back to prediction desk</button><div className="session-title"><span>PREDICTED PAPER REVIEW</span><strong>{paper.subject}</strong></div></header><section className="result-main"><div className="result-hero"><span className="result-stamp">SIMULATION COMPLETE</span><h1>{score.correct} <em>/ {paper.questions.length}</em></h1><p>correct answers · {score.attempted} attempted</p><div className="result-score"><strong>{score.marks}</strong><span>out of {paper.marks} marks<br />negative marking applied</span></div><button className="session-primary" onClick={() => setPaper(null)}><CheckCircle2 size={16} /> Return to paper desk</button></div><div className="review-list"><div className="review-heading"><div><p className="eyebrow ink">ANSWER REVIEW</p><h2>Study the model behind every error</h2></div><span>{Math.round((score.correct / paper.questions.length) * 100)}% accuracy</span></div>{paper.questions.map((item, index) => { const selected = answers[index]; const correct = selected === item.answer; return <article className={`review-card ${correct ? "is-correct" : "is-wrong"}`} key={item.id}><div className="review-state">{correct ? <Check size={16} /> : <X size={16} />}</div><div><span>{item.subject} · {item.topic}</span><h3>{index + 1}. {item.prompt}</h3><p><b>Your answer:</b> {selected ?? "Not attempted"} &nbsp; <b>Correct:</b> {item.answer}</p><p className="review-explanation">{item.explanation}</p></div></article>; })}</div></section></main>;
    }
    return <main className="test-session-shell"><header className="session-topbar"><button className="session-back" onClick={() => setPaper(null)}><ArrowLeft size={17} /> Exit paper</button><div className="session-title"><span>FULL PREDICTED PAPER</span><strong>{paper.subject} · NDA II 2026</strong></div><div className="session-timer"><Clock3 size={16} /> {timer(seconds)}</div></header><section className="test-session-main"><div className="test-progress"><div><span>QUESTION {questionIndex + 1} / {paper.questions.length}</span><div className="test-progress-bar"><i style={{ width: `${((questionIndex + 1) / paper.questions.length) * 100}%` }} /></div></div><span>{Object.keys(answers).length} answered</span></div><article className="question-card"><div className="question-meta"><span><Target size={15} /> {active.subject}</span><span>{active.priority} · {active.topic}</span></div><h1>{active.prompt}</h1><div className="option-grid">{active.options.map((option, index) => { const letter = letters[index]; return <button key={letter} className={`answer-option ${answers[questionIndex] === letter ? "is-selected" : ""}`} onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: letter }))}><span>{letter}</span>{option}</button>; })}</div></article><div className="session-actions"><button className="session-secondary" onClick={() => setQuestionIndex((value) => Math.max(0, value - 1))} disabled={questionIndex === 0}>Previous</button>{questionIndex < paper.questions.length - 1 ? <button className="session-primary" onClick={() => setQuestionIndex((value) => value + 1)}>Next question</button> : <button className="session-primary" onClick={() => setSubmitted(true)}><CheckCircle2 size={16} /> Submit & debrief</button>}</div><div className="question-nav">{paper.questions.map((item, index) => <button key={item.id} className={`${questionIndex === index ? "is-active" : ""} ${answers[index] ? "is-answered" : ""}`} onClick={() => setQuestionIndex(index)}>{index + 1}</button>)}</div></section></main>;
  }

  return <div className="field-app practice-app"><aside className={`briefing-rail ${railOpen ? "is-open" : ""}`} aria-label="Prediction navigation"><div className="brand-lockup"><div className="brand-mark text-brand-mark"><Flag size={24} /></div><div><p className="brand-name">NDA / 2026</p><p className="brand-subtitle">PREDICTION DESK</p></div></div><section className="rail-command-card"><div className="rail-command-top"><span>FIVE-YEAR MODEL</span><span className="status-light" /></div><div className="rail-command-main"><strong>270</strong><span>SIMULATION ITEMS</span></div><div className="rail-command-progress"><i style={{ width: "82%" }} /></div><div className="rail-command-bottom"><span>2 FULL PAPERS</span><span>300 + 600 MARKS</span></div></section><div className="rail-divider" /><p className="rail-caption">FIELD NAVIGATION</p><nav className="rail-nav"><Link href="/" className="rail-link"><Gauge size={17} /><span>Command deck</span><ChevronLeft size={15} /></Link><Link href="/priority-syllabus" className="rail-link"><Target size={17} /><span>Priority syllabus</span><ChevronLeft size={15} /></Link><Link href="/practice" className="rail-link"><Trophy size={17} /><span>Practice & tests</span><ChevronLeft size={15} /></Link><button className="rail-link is-current" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><FileText size={17} /><span>Predicted papers</span><Check size={15} /></button></nav><div className="rail-mission"><span className="mission-stamp">PREDICTION RULE</span><strong>Train patterns, not guesses.</strong><p>These original questions model repeated families; they do not claim access to the official paper.</p><div className="mission-rule" /><span>Review before reattempt.</span></div></aside><div className="mobile-topbar"><div className="mobile-brand"><Flag size={18} /><span>PREDICTION DESK</span></div><button className="menu-button" onClick={() => setRailOpen((open) => !open)} aria-label="Toggle navigation">{railOpen ? <X size={20} /> : <Menu size={20} />}</button></div><main className="main-deck practice-deck"><section className="practice-hero prediction-hero"><div className="hero-topline"><span className="pulse-dot" /> FIVE-YEAR PYQ MODEL <span className="topline-rule" /> NDA II / 2026</div><div className="practice-command-strip"><span>ROUTE / FULL SIMULATION</span><span>EXAM / 13 SEP 2026</span><span>RULE / ORIGINAL PRACTICE</span></div><div className="practice-hero-copy"><p className="eyebrow">PREDICTED-PAPER DESK</p><h1>Attempt the<br /><em>probable patterns.</em></h1><p>Two full-length simulations are weighted to recurring topic families, not presented as leaked or guaranteed questions.</p></div><div className="practice-hero-footer"><div><strong>120</strong><span>MATHS QUESTIONS</span></div><div><strong>150</strong><span>GAT QUESTIONS</span></div><div><strong>300/600</strong><span>MARKS</span></div></div></section><section className="section-block launch-section"><div className="section-heading"><div><p className="eyebrow ink">FULL-LENGTH SIMULATIONS</p><h2>Run one paper under UPSC timing</h2></div><p className="heading-note">Original revision paper · negative marking · solution review after submission.</p></div><div className="launch-grid">{predictedPapers.map((item) => <article className="daily-launch" key={item.id}><div><span className="launch-stamp">{item.subject === "Mathematics" ? "MATHEMATICS · 300 MARKS" : "GAT · 600 MARKS"}</span><h3>{item.questions.length} questions<br /><em>{item.minutes} minutes</em></h3><p>{item.evidenceNote}</p></div><button className="signal-button" onClick={() => launch(item)}><Play size={16} /> Start full paper</button></article>)}</div></section><section className="section-block practice-bank-section"><div className="section-heading"><div><p className="eyebrow ink">HOW TO USE THE PREDICTION</p><h2>Use it as an assessment, not a promise</h2></div></div><div className="subject-drills"><article><Target size={21} /><span><b>Before the paper</b><small>Revise P1 topics only; do not read the explanations.</small></span></article><article><Clock3 size={21} /><span><b>During the paper</b><small>Use the full 150 minutes; mark uncertain questions and avoid blind attempts.</small></span></article><article><RotateCcw size={21} /><span><b>After the paper</b><small>Classify every error by topic, model and cause before a second attempt.</small></span></article></div></section></main></div>;
}
