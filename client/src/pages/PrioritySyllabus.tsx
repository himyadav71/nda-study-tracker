/**
 * Priority Syllabus page.
 * Field Manual Progress Deck: an ink-navy dossier spine and PYQ-led priority cards make the whole syllabus actionable.
 */
import { useEffect, useMemo, useState } from "react";
import { Atom, BookOpen, Brain, Check, CheckCircle2, ChevronLeft, Circle, Compass, Filter, FolderOpen, Gauge, GraduationCap, Languages, ListChecks, MapPinned, Menu, Target, Trophy, X } from "lucide-react";
import { Link } from "wouter";
import { priorityMeta, syllabusModules, type PriorityLevel, type SyllabusArea } from "@/data/prioritySyllabus";

const ASSETS = {
  topo: "/manus-storage/nda-topographic-detail_be1ad402.jpg",
  logo: "/manus-storage/nda-compass-check-logo_ef2dc0c7.png",
};

type AreaFilter = "All" | SyllabusArea;
type PriorityFilter = "All" | PriorityLevel;

const areaOptions: { label: AreaFilter; icon: typeof Brain }[] = [
  { label: "All", icon: ListChecks },
  { label: "Mathematics", icon: Brain },
  { label: "English", icon: Languages },
  { label: "GAT", icon: Atom },
];

export default function PrioritySyllabus() {
  const [area, setArea] = useState<AreaFilter>("All");
  const [priority, setPriority] = useState<PriorityFilter>("All");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [railOpen, setRailOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("nda-priority-syllabus-v1");
    if (saved) {
      try { setCompleted(JSON.parse(saved)); } catch { window.localStorage.removeItem("nda-priority-syllabus-v1"); }
    }
  }, []);

  useEffect(() => { window.localStorage.setItem("nda-priority-syllabus-v1", JSON.stringify(completed)); }, [completed]);

  const visibleModules = useMemo(() => syllabusModules.filter((module) => (area === "All" || module.area === area) && (priority === "All" || module.priority === priority)), [area, priority]);
  const completeCount = Object.values(completed).filter(Boolean).length;
  const completePercent = Math.round((completeCount / syllabusModules.length) * 100);

  const toggleModule = (id: string) => setCompleted((previous) => ({ ...previous, [id]: !previous[id] }));
  const selectArea = (next: AreaFilter) => { setArea(next); setRailOpen(false); };

  return (
    <div className="field-app syllabus-app">
      <aside className={`briefing-rail ${railOpen ? "is-open" : ""}`} aria-label="Syllabus navigation">
        <div className="brand-lockup"><img src={ASSETS.logo} className="brand-mark" alt="NDA study tracker compass mark" /><div><p className="brand-name">NDA / 2026</p><p className="brand-subtitle">PRIORITY SYLLABUS INDEX</p></div></div>
        <div className="rail-dossier-tab" aria-hidden="true"><img src={ASSETS.logo} alt="" /><span>FIELD / 26</span><i /></div>
        <section className="rail-command-card" aria-label="Syllabus coverage"><div className="rail-command-top"><span>SYLLABUS COVERAGE</span><span className="status-light" /></div><div className="rail-command-main"><strong>{completePercent}%</strong><span>LOGGED</span></div><div className="rail-command-progress"><i style={{ width: `${completePercent}%` }} /></div><div className="rail-command-bottom"><span>{completeCount}/{syllabusModules.length} BLOCKS</span><span>PYQ-LED</span></div></section>
        <div className="rail-divider" />
        <p className="rail-caption">FIELD NAVIGATION</p>
        <nav className="rail-nav">
          <Link href="/" className="rail-link"><Gauge size={17} /><span>Command deck</span><ChevronLeft size={15} /></Link>
          <button className="rail-link is-current" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><BookOpen size={17} /><span>Priority syllabus</span><Check size={15} /></button>
          <Link href="/materials" className="rail-link"><FolderOpen size={17} /><span>Study library</span><ChevronLeft size={15} /></Link>
          <button className="rail-link" onClick={() => selectArea("Mathematics")}><Brain size={17} /><span>Mathematics core</span><Target size={15} /></button>
          <button className="rail-link" onClick={() => selectArea("English")}><Languages size={17} /><span>English scoring</span><Target size={15} /></button>
          <button className="rail-link" onClick={() => selectArea("GAT")}><Atom size={17} /><span>GAT priority base</span><Target size={15} /></button>
        </nav>
        <div className="rail-mission"><span className="mission-stamp">ORDER OF ATTACK</span><strong>P1 → P2</strong><p>Secure the repeated core. Then protect the rest of the syllabus.</p><div className="mission-rule" /><span>Frequency guides order — not deletion.</span></div>
      </aside>

      <div className="mobile-topbar"><div className="mobile-brand"><img src={ASSETS.logo} alt="" /><span>PRIORITY INDEX</span></div><button className="menu-button" onClick={() => setRailOpen((open) => !open)} aria-label="Toggle navigation">{railOpen ? <X size={20} /> : <Menu size={20} />}</button></div>

      <main className="main-deck syllabus-deck">
        <section className="syllabus-hero" style={{ backgroundImage: `linear-gradient(100deg, rgba(11, 26, 44, 0.98) 0%, rgba(11, 26, 44, 0.86) 48%, rgba(11, 26, 44, 0.48) 100%), url(${ASSETS.topo})` }}>
          <div className="hero-topline"><span className="pulse-dot" /> PYQ-LED SYLLABUS INDEX <span className="topline-rule" /> FOUR-PAPER FREQUENCY</div>
          <div className="syllabus-hero-copy"><div className="hero-compass-lockup"><img src={ASSETS.logo} alt="" /><span><b>NDA / 2026</b><small>PRIORITY SYLLABUS</small></span></div><p className="eyebrow">STUDY THE ORDER, NOT JUST THE TOPICS</p><h1>Whole syllabus.<br /><em>Clearer order.</em></h1><p>Every block is arranged from the Mathematics and GAT PYQ frequency analysis: what to secure first, what to build next and what to cover smartly.</p></div>
          <div className="syllabus-hero-footer"><div><strong>{syllabusModules.filter((module) => module.priority === "P1").length}</strong><span>P1 CORE BLOCKS</span></div><div><strong>{syllabusModules.filter((module) => module.priority === "P2").length}</strong><span>P2 HIGH-RETURN BLOCKS</span></div><div><strong>{syllabusModules.filter((module) => module.priority === "P3").length}</strong><span>P3 COVERAGE BLOCKS</span></div></div>
        </section>

        <section className="section-block syllabus-intro">
          <div className="section-heading"><div><p className="eyebrow ink">YOUR REVISION MAP</p><h2>Frequency becomes priority</h2></div><p className="heading-note">P1 first. P2 in the weekly loop. P3 through concise coverage.</p></div>
          <div className="priority-rule-grid">{(["P1", "P2", "P3"] as PriorityLevel[]).map((level) => <article key={level} className={`priority-rule-card ${level.toLowerCase()}`}><span>{priorityMeta[level].label}</span><h3>{priorityMeta[level].title}</h3><p>{priorityMeta[level].description}</p></article>)}</div>
        </section>

        <section className="section-block syllabus-board-section">
          <div className="section-heading split-heading"><div><p className="eyebrow ink">COMPLETE PRIORITY VIEW</p><h2>Priority syllabus</h2></div><div className="syllabus-log"><CheckCircle2 size={16} /><span>{completeCount} of {syllabusModules.length} blocks logged</span></div></div>
          <div className="syllabus-filters"><div className="filter-label"><Filter size={15} /> Choose your subject</div><div className="filter-strip">{areaOptions.map(({ label, icon: Icon }) => <button key={label} className={`filter-button ${area === label ? "is-selected" : ""}`} onClick={() => setArea(label)}><Icon size={15} /> {label}</button>)}</div><div className="filter-label"><Compass size={15} /> Study order</div><div className="filter-strip">{(["All", "P1", "P2", "P3"] as PriorityFilter[]).map((level) => <button key={level} className={`priority-filter ${priority === level ? "is-selected" : ""} ${level !== "All" ? level.toLowerCase() : ""}`} onClick={() => setPriority(level)}>{level === "All" ? "All priorities" : `${level} · ${priorityMeta[level].title}`}</button>)}</div></div>
          <div className="syllabus-board">{visibleModules.map((module) => <article key={module.id} className={`syllabus-card ${module.priority.toLowerCase()} ${completed[module.id] ? "is-complete" : ""}`}><button className="syllabus-card-check" onClick={() => toggleModule(module.id)} aria-label={`Mark ${module.title} as ${completed[module.id] ? "not studied" : "studied"}`}>{completed[module.id] ? <Check size={15} /> : <Circle size={17} />}</button><div className="syllabus-card-head"><span className="module-area">{module.area}</span><span className="module-priority">{module.priority}</span></div><h3>{module.title}</h3><p className="module-frequency">{module.frequency}</p><p className="module-evidence">{module.evidence}</p><div className="module-divider" /><div className="module-list"><strong>Must secure</strong>{module.mustDo.map((item) => <span key={item}>{item}</span>)}</div><div className="module-patterns"><span>Question forms</span><p>{module.questionModels.join(" · ")}</p></div><p className="module-cue"><Target size={14} /> {module.studyCue}</p></article>)}</div>
          {visibleModules.length === 0 && <div className="syllabus-empty"><GraduationCap size={28} /><p>No syllabus blocks match this filter.</p></div>}
        </section>

        <section className="section-block syllabus-note"><div><p className="eyebrow ink">IMPORTANT RULE</p><h2>Frequency sets the order.<br /><em>It does not erase the syllabus.</em></h2></div><div><MapPinned size={23} /><p>The PYQ analysis identifies the strongest return on your revision time. Secure P1 first, keep P2 active, and use P3 for deliberate coverage rather than ignoring it.</p><Link href="/" className="signal-link">Return to the daily command deck <ChevronLeft size={16} /></Link></div></section>
        <footer className="site-footer"><div><img src={ASSETS.logo} alt="" /><span>NDA II 2026 — Priority Syllabus Index</span></div><span>Built from your four-paper PYQ analysis.</span></footer>
      </main>
    </div>
  );
}
