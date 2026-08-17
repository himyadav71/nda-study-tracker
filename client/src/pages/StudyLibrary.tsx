/**
 * Private study-material library for the NDA II 2026 Field Manual.
 * Files are owned by the authenticated student and stored through the server-side S3 workflow.
 */
import { useRef, useState } from "react";
import {
  Archive,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronLeft,
  FileArchive,
  FileImage,
  FileText,
  FolderOpen,
  Gauge,
  GraduationCap,
  ImagePlus,
  Loader2,
  LogIn,
  Menu,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const ASSETS = {
  topo: "/manus-storage/nda-topographic-detail_be1ad402.jpg",
  logo: "/manus-storage/nda-compass-check-logo_ef2dc0c7.png",
};

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const acceptedTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const categories = [
  { value: "cbse", label: "CBSE" },
  { value: "nda", label: "NDA" },
  { value: "pyq", label: "PYQ" },
  { value: "notes", label: "Notes" },
  { value: "formula", label: "Formula sheet" },
  { value: "other", label: "Other" },
] as const;

type Category = (typeof categories)[number]["value"];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function materialIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) return FileImage;
  if (mimeType.includes("pdf")) return FileText;
  return FileArchive;
}

export default function StudyLibrary() {
  const [railOpen, setRailOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<Category>("notes");
  const [subject, setSubject] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { loading, isAuthenticated, user } = useAuth();
  const utils = trpc.useUtils();
  const materialsQuery = trpc.materials.list.useQuery(undefined, {
    enabled: isAuthenticated,
    retry: false,
  });

  const uploadMutation = trpc.materials.upload.useMutation({
    onSuccess: async () => {
      await utils.materials.list.invalidate();
      setSelectedFile(null);
      setSubject("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("Study material filed in your private library.");
    },
    onError: (error) => toast.error(error.message || "The file could not be uploaded."),
  });

  const deleteMutation = trpc.materials.delete.useMutation({
    onSuccess: async () => {
      await utils.materials.list.invalidate();
      toast.success("Material removed from the library.");
    },
    onError: (error) => toast.error(error.message || "The file could not be removed."),
  });

  const chooseFile = (file: File | null) => {
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      toast.error("Choose a file smaller than 5 MB.");
      return;
    }
    if (!acceptedTypes.includes(file.type)) {
      toast.error("Use a PDF, image, TXT, DOC or DOCX study file.");
      return;
    }
    setSelectedFile(file);
  };

  const uploadMaterial = async () => {
    if (!selectedFile) {
      toast.error("Choose one study file first.");
      return;
    }
    const buffer = await selectedFile.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    const base64 = window.btoa(binary);
    uploadMutation.mutate({
      fileName: selectedFile.name,
      mimeType: selectedFile.type,
      sizeBytes: selectedFile.size,
      base64,
      category,
      subject: subject.trim() || undefined,
    });
  };

  const materials = materialsQuery.data ?? [];
  const materialCount = materials.length;

  return (
    <div className="field-app library-app">
      <aside className={`briefing-rail ${railOpen ? "is-open" : ""}`} aria-label="Study library navigation">
        <div className="brand-lockup"><img src={ASSETS.logo} className="brand-mark" alt="NDA study tracker compass mark" /><div><p className="brand-name">NDA / 2026</p><p className="brand-subtitle">STUDY MATERIALS LIBRARY</p></div></div>
        <div className="rail-dossier-tab" aria-hidden="true"><img src={ASSETS.logo} alt="" /><span>FIELD / 26</span><i /></div>
        <section className="rail-command-card" aria-label="Library status"><div className="rail-command-top"><span>PRIVATE ARCHIVE</span><span className="status-light" /></div><div className="rail-command-main"><strong>{materialCount}</strong><span>FILES</span></div><div className="rail-command-progress"><i style={{ width: `${Math.min(100, materialCount * 12.5)}%` }} /></div><div className="rail-command-bottom"><span>{isAuthenticated ? "SECURELY LINKED" : "SIGN-IN REQUIRED"}</span><span>5 MB / FILE</span></div></section>
        <div className="rail-divider" />
        <p className="rail-caption">FIELD NAVIGATION</p>
        <nav className="rail-nav">
          <Link href="/" className="rail-link"><Gauge size={17} /><span>Command deck</span><ChevronLeft size={15} /></Link>
          <Link href="/priority-syllabus" className="rail-link"><BookOpen size={17} /><span>Priority syllabus</span><ChevronLeft size={15} /></Link>
          <Link href="/practice" className="rail-link"><Archive size={17} /><span>Practice & tests</span><ChevronLeft size={15} /></Link>
          <button className="rail-link is-current" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><FolderOpen size={17} /><span>Study library</span><Check size={15} /></button>
        </nav>
        <div className="rail-mission"><span className="mission-stamp">RETRIEVAL RULE</span><strong>File it. Use it.</strong><p>Tag each document so it appears with the paper, topic or revision loop that needs it.</p><div className="mission-rule" /><span>Personal material only.</span></div>
      </aside>

      <div className="mobile-topbar"><div className="mobile-brand"><img src={ASSETS.logo} alt="" /><span>STUDY LIBRARY</span></div><button className="menu-button" onClick={() => setRailOpen((open) => !open)} aria-label="Toggle navigation">{railOpen ? <X size={20} /> : <Menu size={20} />}</button></div>

      <main className="main-deck library-deck">
        <section className="library-hero" style={{ backgroundImage: `linear-gradient(100deg, rgba(11, 26, 44, .98) 0%, rgba(11, 26, 44, .84) 52%, rgba(11, 26, 44, .45) 100%), url(${ASSETS.topo})` }}>
          <div className="hero-topline"><span className="pulse-dot" /> PERSONAL STUDY MATERIALS <span className="topline-rule" /> CBSE + NDA / 2026</div>
          <div className="library-hero-copy"><div className="hero-compass-lockup"><img src={ASSETS.logo} alt="" /><span><b>NDA / 2026</b><small>PRIVATE ARCHIVE</small></span></div><p className="eyebrow">KEEP THE RIGHT NOTES WITH THE RIGHT REVISION</p><h1>Your revision.<br /><em>In one secure place.</em></h1><p>Store your CBSE notes, NDA formula sheets, PYQ annotations and short revision cards. The library is linked to your signed-in account, not to a browser-only checklist.</p></div>
          <div className="library-hero-footer"><div><ShieldCheck size={18} /><span>ACCOUNT-OWNED FILES</span></div><div><Upload size={18} /><span>PDF, IMAGE, TEXT OR DOC</span></div><div><FileText size={18} /><span>MAXIMUM 5 MB EACH</span></div></div>
        </section>

        {loading ? <section className="library-state"><Loader2 className="animate-spin" size={28} /><p>Checking your library access…</p></section> : !isAuthenticated ? (
          <section className="library-state library-login"><GraduationCap size={34} /><p className="eyebrow ink">PRIVATE LIBRARY</p><h2>Sign in to file your study material.</h2><p>Your notes will be organised under your account and remain separate from other students’ materials.</p><button className="signal-button" onClick={() => startLogin()}>Sign in to open library <LogIn size={17} /></button></section>
        ) : (
          <>
            <section className="section-block upload-section">
              <div className="section-heading split-heading"><div><p className="eyebrow ink">NEW MATERIAL</p><h2>File a revision resource</h2></div><p className="heading-note">Signed in as {user?.name || "student"}. Files stay private to your account.</p></div>
              <div className="library-upload-grid">
                <button className={`file-dropzone ${selectedFile ? "has-file" : ""}`} onClick={() => fileInputRef.current?.click()} type="button"><input ref={fileInputRef} className="sr-only" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx" onChange={(event) => chooseFile(event.target.files?.[0] ?? null)} /><span className="file-drop-icon">{selectedFile ? <FileText size={27} /> : <ImagePlus size={27} />}</span><strong>{selectedFile ? selectedFile.name : "Choose a study file"}</strong><span>{selectedFile ? formatBytes(selectedFile.size) : "PDF, image, TXT, DOC or DOCX · maximum 5 MB"}</span></button>
                <div className="upload-fields"><label><span>Library section</span><select value={category} onChange={(event) => setCategory(event.target.value as Category)}>{categories.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label><label><span>Subject or topic <em>(optional)</em></span><input value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={80} placeholder="e.g. Ray Optics / Maths calculus" /></label><button className="signal-button upload-button" type="button" onClick={uploadMaterial} disabled={!selectedFile || uploadMutation.isPending}>{uploadMutation.isPending ? <Loader2 className="animate-spin" size={17} /> : <Upload size={17} />}{uploadMutation.isPending ? "Filing material…" : "File material"}</button></div>
              </div>
            </section>

            <section className="section-block materials-section">
              <div className="section-heading split-heading"><div><p className="eyebrow ink">YOUR ARCHIVE</p><h2>Retrieve what you need</h2></div><div className="library-count"><FolderOpen size={16} /><span>{materialCount} {materialCount === 1 ? "file" : "files"} filed</span></div></div>
              {materialsQuery.isLoading ? <div className="library-state compact"><Loader2 className="animate-spin" size={24} /><p>Opening your archive…</p></div> : materialsQuery.isError ? <div className="library-state compact"><FileText size={24} /><p>Your archive could not be opened. Please refresh and try again.</p></div> : materials.length === 0 ? <div className="library-empty"><FolderOpen size={31} /><h3>The archive is ready.</h3><p>File your first notes, formula sheet or marked PYQ above so it is ready for the next revision block.</p></div> : <div className="materials-grid">{materials.map((material) => { const Icon = materialIcon(material.mimeType); return <article className="material-card" key={material.id}><div className="material-card-top"><span className={`material-icon ${material.mimeType.startsWith("image/") ? "image" : ""}`}><Icon size={21} /></span><span className={`material-category ${material.category}`}>{material.category}</span></div><h3 title={material.fileName}>{material.fileName}</h3><p>{material.subject || "Unlabelled revision resource"}</p><div className="material-meta"><span>{formatBytes(material.sizeBytes)}</span><span>{new Date(material.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span></div><div className="material-actions"><a href={material.url} target="_blank" rel="noreferrer" className="material-open">Open <ArrowUpRight size={15} /></a><button type="button" className="material-delete" onClick={() => { if (window.confirm(`Remove “${material.fileName}” from your library?`)) deleteMutation.mutate({ id: material.id }); }} disabled={deleteMutation.isPending} aria-label={`Delete ${material.fileName}`}><Trash2 size={16} /></button></div></article>; })}</div>}
            </section>
          </>
        )}
        <footer className="site-footer"><div><img src={ASSETS.logo} alt="" /><span>NDA II 2026 — Study Materials Library</span></div><span>Private account-linked revision archive.</span></footer>
      </main>
    </div>
  );
}
