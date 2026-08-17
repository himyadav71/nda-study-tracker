/**
 * Field Manual Progress Deck page.
 * Editorial utilitarianism: ink navy, parchment, signal orange, readable operational hierarchy.
 */
import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Atom,
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Compass,
  Filter,
  Flag,
  Flame,
  FolderOpen,
  Gauge,
  GraduationCap,
  Landmark,
  Languages,
  LayoutDashboard,
  ListChecks,
  MapPinned,
  Menu,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  School,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { studyPlan, subjectDetails, type StudyDay, type StudyTask, type Subject } from "@/data/studyPlan";

const ASSETS = {
  hero: "/manus-storage/nda-field-manual-hero_1249639c.jpg",
  topo: "/manus-storage/nda-topographic-detail_be1ad402.jpg",
  stillLife: "/manus-storage/nda-progress-still-life_79a33b7d.jpg",
  logo: "/manus-storage/nda-compass-check-logo_ef2dc0c7.png",
};

type FilterName = "All" | Subject | "Mocks";

const subjectIcons: Record<Subject, LucideIcon> = {
  Mathematics: Brain,
  English: Languages,
  GK: Atom,
  "Current Affairs": MapPinned,
  Mock: Trophy,
  CBSE: School,
};

const filterOptions: Array<{ label: FilterName; icon: LucideIcon }> = [
  { label: "All", icon: LayoutDashboard },
  { label: "Mathematics", icon: Brain },
  { label: "English", icon: Languages },
  { label: "GK", icon: Atom },
  { label: "Current Affairs", icon: MapPinned },
  { label: "CBSE", icon: School },
  { label: "Mocks", icon: Trophy },
];

const navItems = [
  { id: "overview", label: "Command deck", icon: LayoutDashboard },
  { id: "schedule", label: "Daily schedule", icon: CalendarDays },
  { id: "progress", label: "Progress report", icon: Gauge },
  { id: "focus", label: "Priority focus", icon: Target },
  { id: "priority-syllabus", label: "Priority syllabus", icon: BookOpen, href: "/priority-syllabus" },
  { id: "practice", label: "Practice & tests", icon: Trophy, href: "/practice" },
  { id: "materials", label: "Study library", icon: FolderOpen, href: "/materials" },
];

function getPlannedToday() {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return studyPlan.find((day) => day.date === date)?.day ?? 1;
}

function taskCompletedCount(day: StudyDay, completed: Record<string, boolean>) {
  return day.tasks.filter((task) => completed[task.id]).length;
}

function TaskLine({ task, done, onToggle }: { task: StudyTask; done: boolean; onToggle: () => void }) {
  const Icon = subjectIcons[task.subject];
  return (
    <button className={`task-line ${done ? "is-complete" : ""}`} onClick={onToggle} aria-pressed={done}>
      <span className={`task-check ${done ? "is-done" : ""}`} aria-hidden="true">{done ? <Check size={13} strokeWidth={3} /> : <Circle size={17} />}</span>
      <span className="task-icon"><Icon size={14} /></span>
      <span className="task-copy">
        <span className="task-subject">{subjectDetails[task.subject].short}</span>
        <span className="task-title">{task.title}</span>
      </span>
      <span className="task-duration">{task.duration}</span>
    </button>
  );
}

export default function Home() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [filter, setFilter] = useState<FilterName>("All");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [railOpen, setRailOpen] = useState(false);

  useEffect(() => {
    setSelectedDay(getPlannedToday());
    const saved = window.localStorage.getItem("nda-field-manual-progress-v1");
    if (saved) {
      try { setCompleted(JSON.parse(saved)); } catch { window.localStorage.removeItem("nda-field-manual-progress-v1"); }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("nda-field-manual-progress-v1", JSON.stringify(completed));
  }, [completed]);

  const totalTasks = studyPlan.reduce((sum, day) => sum + day.tasks.length, 0);
  const completedTasks = Object.values(completed).filter(Boolean).length;
  const progress = Math.min(100, Math.round((completedTasks / totalTasks) * 100));
  const activeDay = studyPlan.find((day) => day.day === selectedDay) ?? studyPlan[0];
  const activeDone = taskCompletedCount(activeDay, completed);
  const currentWeek = Math.min(4, Math.max(1, Math.ceil(activeDay.day / 7)));

  const visibleDays = useMemo(() => studyPlan.filter((day) => {
    if (filter === "All") return true;
    if (filter === "Mocks") return Boolean(day.checkpoint);
    return day.tasks.some((task) => task.subject === filter);
  }), [filter]);

  const subjectProgress = (subject: Subject) => {
    const subjectTasks = studyPlan.flatMap((day) => day.tasks).filter((task) => task.subject === subject);
    const done = subjectTasks.filter((task) => completed[task.id]).length;
    return { total: subjectTasks.length, done, value: subjectTasks.length ? Math.round((done / subjectTasks.length) * 100) : 0 };
  };

  const toggleTask = (id: string) => setCompleted((previous) => ({ ...previous, [id]: !previous[id] }));

  const resetProgress = () => {
    if (window.confirm("Reset all completed tasks? This cannot be undone.")) {
      setCompleted({});
      toast.success("Progress log reset. Begin again with Day 01.");
    }
  };

  const chooseDay = (day: number) => {
    setSelectedDay(day);
    setRailOpen(false);
    document.getElementById("today-brief")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setRailOpen(false);
  };

  return (
    <div className="field-app">
      <aside className={`briefing-rail ${railOpen ? "is-open" : ""}`} aria-label="Tracker navigation">
        <div className="brand-lockup">
          <img src={ASSETS.logo} className="brand-mark" alt="NDA study tracker compass mark" />
          <div>
            <p className="brand-name">NDA / 2026</p>
            <p className="brand-subtitle">STUDY FIELD MANUAL</p>
          </div>
        </div>
        <div className="rail-dossier-tab" aria-hidden="true"><img src={ASSETS.logo} alt="" /><span>FIELD / 26</span><i /></div>

        <section className="rail-command-card" aria-label="Campaign status">
          <div className="rail-command-top"><span>CAMPAIGN STATUS</span><span className="status-light" /></div>
          <div className="rail-command-main"><strong>DAY {String(activeDay.day).padStart(2, "0")}</strong><span>OF 28</span></div>
          <div className="rail-command-progress"><i style={{ width: `${progress}%` }} /></div>
          <div className="rail-command-bottom"><span>{progress}% LOGGED</span><span>13 SEP</span></div>
        </section>

        <div className="rail-divider" />
        <p className="rail-caption">NAVIGATION</p>
        <nav className="rail-nav">
          {navItems.map(({ id, label, icon: Icon, href }) => href ? (
            <a key={id} className="rail-link" href={href}><Icon size={17} /> <span>{label}</span><ChevronRight size={15} /></a>
          ) : (
            <button key={id} className="rail-link" onClick={() => jumpTo(id)}>
              <Icon size={17} /> <span>{label}</span><ChevronRight size={15} />
            </button>
          ))}
        </nav>

        <div className="rail-mission">
          <span className="mission-stamp">MISSION CLOCK</span>
          <strong>13 SEP</strong>
          <p>NDA II written examination</p>
          <div className="mission-rule" />
          <span>28-day field plan</span>
        </div>

        <button className="rail-reset" onClick={resetProgress}><RotateCcw size={15} /> Reset progress</button>
      </aside>

      <div className="mobile-topbar">
        <div className="mobile-brand"><img src={ASSETS.logo} alt="" /><span>NDA / 2026</span></div>
        <button className="menu-button" onClick={() => setRailOpen((open) => !open)} aria-label="Toggle navigation">{railOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>

      <main className="main-deck">
        <section id="overview" className="hero-brief" style={{ backgroundImage: `linear-gradient(90deg, rgba(11, 26, 44, 0.98) 0%, rgba(11, 26, 44, 0.90) 42%, rgba(11, 26, 44, 0.22) 100%), url(${ASSETS.hero})` }}>
          <div className="hero-topline"><span className="pulse-dot" /> CBSE HALF-YEARLY + NDA RUNWAY <span className="topline-rule" /> 16 AUG — 12 SEP 2026</div>
          <div className="hero-compass-lockup"><img src={ASSETS.logo} alt="" /><span><b>NDA / 2026</b><small>EXAM READINESS DECK</small></span></div>
          <div className="hero-copy">
            <p className="eyebrow">DAY {String(activeDay.day).padStart(2, "0")} / 28</p>
            <h1>One plan.<br /><em>Clearer progress.</em></h1>
            <p className="hero-lead">A dual-track preparation deck: secure your Class 12 half-yearly papers first, then convert the final runway into NDA score.</p>
            <div className="hero-actions">
              <button className="signal-button" onClick={() => jumpTo("today-brief")}>Issue today’s brief <ArrowUpRight size={17} /></button>
              <button className="quiet-button" onClick={() => jumpTo("schedule")}>View full schedule</button>
            </div>
          </div>
          <div className="hero-footer">
            <span>EXAMINATION</span><strong>13 SEPTEMBER</strong><span className="footer-dot" /> <span>FIELD DECK V1.0</span>
          </div>
        </section>

        <section id="today-brief" className="section-block today-section">
          <div className="section-heading split-heading">
            <div><p className="eyebrow ink">ACTIVE DAY</p><h2>Today’s briefing</h2></div>
            <div className="week-badge"><span>WEEK</span><strong>{currentWeek}</strong><span>/ 4</span></div>
          </div>

          <div className="today-grid">
            <article className="active-brief-card" style={{ backgroundImage: `linear-gradient(135deg, rgba(11, 26, 44, 0.96), rgba(11, 26, 44, 0.68)), url(${ASSETS.topo})` }}>
              <div className="active-card-top"><span className="day-stamp">DAY {String(activeDay.day).padStart(2, "0")}</span><span>{activeDay.shortDate}</span></div>
              <div className={`day-mode ${activeDay.mode.toLowerCase().replace(" ", "-")}`}>{activeDay.mode}<span>· {activeDay.timeBudget}</span>{activeDay.schoolPaper ? <span>· {activeDay.schoolPaper}</span> : null}</div>
              <h3>{activeDay.title}</h3>
              <p>{activeDay.focus}</p>
              <div className="active-progress"><span>{activeDone} / {activeDay.tasks.length} logged</span><div><i style={{ width: `${(activeDone / activeDay.tasks.length) * 100}%` }} /></div></div>
              {activeDay.checkpoint && <div className="checkpoint-inline"><Flag size={14} /> {activeDay.checkpoint}</div>}
            </article>

            <div className="active-task-list">
              {activeDay.tasks.map((task) => <TaskLine key={task.id} task={task} done={Boolean(completed[task.id])} onToggle={() => toggleTask(task.id)} />)}
              <button className="next-day-button" onClick={() => chooseDay(activeDay.day === 28 ? 1 : activeDay.day + 1)}>Issue next-day brief <ChevronRight size={16} /></button>
            </div>
          </div>
        </section>

        <section id="progress" className="section-block progress-section">
          <div className="section-heading"><div><p className="eyebrow ink">PROGRESS REPORT</p><h2>Measured momentum</h2></div><p className="heading-note">Your progress is stored privately in this browser.</p></div>
          <div className="progress-grid">
            <article className="overall-progress-card">
              <div className="progress-orb" style={{ background: `conic-gradient(#f06b3a ${progress}%, #e6dfd2 ${progress}% 100%)` }}><div><strong>{progress}%</strong><span>COMPLETE</span></div></div>
              <div><div className="progress-heading"><img src={ASSETS.logo} alt="" /><p className="eyebrow ink">OPERATIONAL STATUS</p></div><h3>{completedTasks} of {totalTasks} tasks logged</h3><p>Finish the set. Capture the error. Move forward.</p></div>
            </article>
            <article className="stat-card"><div className="stat-icon orange"><Brain size={20} /></div><span>MATHEMATICS</span><strong>{subjectProgress("Mathematics").value}%</strong><small>{subjectProgress("Mathematics").done}/{subjectProgress("Mathematics").total} missions</small></article>
            <article className="stat-card"><div className="stat-icon blue"><Languages size={20} /></div><span>ENGLISH</span><strong>{subjectProgress("English").value}%</strong><small>{subjectProgress("English").done}/{subjectProgress("English").total} missions</small></article>
            <article className="stat-card"><div className="stat-icon sage"><Atom size={20} /></div><span>GAT / GK</span><strong>{subjectProgress("GK").value}%</strong><small>{subjectProgress("GK").done}/{subjectProgress("GK").total} missions</small></article>
            <article className="stat-card"><div className="stat-icon school"><School size={20} /></div><span>CBSE HALF-YEARLY</span><strong>{subjectProgress("CBSE").value}%</strong><small>{subjectProgress("CBSE").done}/{subjectProgress("CBSE").total} missions</small></article>
          </div>
        </section>

        <section id="schedule" className="section-block schedule-section">
          <div className="section-heading split-heading">
            <div><p className="eyebrow ink">28-DAY RUNWAY</p><h2>Daily schedule</h2></div>
            <div className="filter-label"><Filter size={15} /> Filter your field view</div>
          </div>
          <div className="filter-strip" role="toolbar" aria-label="Schedule filters">
            {filterOptions.map(({ label, icon: Icon }) => <button key={label} className={`filter-button ${filter === label ? "is-selected" : ""}`} onClick={() => setFilter(label)} aria-pressed={filter === label}><Icon size={15} /> {label}</button>)}
          </div>
          <div className="schedule-list">
            {visibleDays.map((day) => {
              const done = taskCompletedCount(day, completed);
              const isActive = day.day === activeDay.day;
              const phase = day.day === 1 ? ["PHASE 01", "Half-yearly command window", "DAY 01–12 · CBSE papers first, NDA continuity second"] : day.day === 13 ? ["PHASE 02", "Re-enter the NDA field", "DAY 13–16 · recover, diagnose and restore timing"] : day.day === 17 ? ["PHASE 03", "Accelerate the scoring core", "DAY 17–21 · P1 Maths, English, GAT and full mock"] : day.day === 22 ? ["PHASE 04", "Mimic, repair and taper", "DAY 22–28 · final mock, PYQ repair and pre-exam reset"] : null;
              return (
                <div key={day.day} className="schedule-unit">
                  {phase && <div className="phase-marker"><span>{phase[0]}</span><strong>{phase[1]}</strong><em>{phase[2]}</em><div /></div>}
                <article className={`day-card ${isActive ? "is-active" : ""}`}>
                  <button className="day-card-head" onClick={() => chooseDay(day.day)} aria-label={`Open Day ${day.day}`}>
                    <span className="day-number">{String(day.day).padStart(2, "0")}</span>
                    <span className="day-date">{day.shortDate}</span>
                    <span className="day-title"><strong>{day.title}</strong><em>{day.focus} · {day.timeBudget}</em></span>
                    {day.checkpoint ? <span className="mock-tag"><Trophy size={13} /> TEST</span> : <span className="day-count">{done}/{day.tasks.length}</span>}
                    <ChevronRight size={17} />
                  </button>
                  <div className="day-card-tasks">
                    {day.tasks.map((task) => <TaskLine key={task.id} task={task} done={Boolean(completed[task.id])} onToggle={() => toggleTask(task.id)} />)}
                    <div className="day-target"><Target size={15} /><span>{day.target}</span></div>
                  </div>
                </article>
                </div>
              );
            })}
          </div>
        </section>

        <section id="focus" className="section-block focus-section">
          <div className="section-heading"><div><p className="eyebrow ink">PYQ-LED FOCUS</p><h2>What earns your time</h2></div></div>
          <div className="focus-layout">
            <div className="focus-list">
              <article><span className="priority-label">PRIORITY 01</span><Brain size={21} /><h3>Mathematics core</h3><p>Algebra, Calculus, Coordinate/Vector/3-D Geometry, Probability, Trigonometry and Matrices.</p><span className="must-do">Must do: AP/GP, complex roots, limits, vectors, Bayes, determinant properties.</span></article>
              <article><span className="priority-label">PRIORITY 02</span><Languages size={21} /><h3>English scoring set</h3><p>Grammar/usage, idioms, synonyms, antonyms, sentence ordering and reading comprehension.</p><span className="must-do">Must do: articles, prepositions, agreement, voice, narration and common phrases.</span></article>
              <article><span className="priority-label">PRIORITY 03</span><Atom size={21} /><h3>GK high-frequency base</h3><p>Physics, Geography, Chemistry, Biology, History, Polity and current affairs with defence.</p><span className="must-do">Mechanics, electricity, climate, redox, cells, modern India and constitutional bodies.</span></article>
            </div>
            <aside className="field-kit" style={{ backgroundImage: `linear-gradient(180deg, rgba(239, 233, 221, 0.10), rgba(11, 26, 44, 0.94)), url(${ASSETS.stillLife})` }}>
              <span className="mission-stamp">FIELD KIT</span>
              <h3>Use the error log as your map.</h3>
              <p>Every wrong answer must be marked as a concept gap, a method gap, a calculation slip or a risky attempt.</p>
              <div className="kit-rule" />
              <div className="kit-stat"><Zap size={17} /><span>0–1–3–7</span><small>revision rhythm</small></div>
              <div className="kit-stat"><ListChecks size={17} /><span>90 mins</span><small>first Maths pass</small></div>
            </aside>
          </div>
        </section>

        <footer className="site-footer"><div><img src={ASSETS.logo} alt="" /><span>NDA II 2026 — Study Field Manual</span></div><span>Built around your PYQ-led 28-day plan.</span></footer>
      </main>
    </div>
  );
}
