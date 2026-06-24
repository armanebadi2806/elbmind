"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Compass,
  Eye,
  Fingerprint,
  HeartHandshake,
  Languages,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircleMore,
  Network,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const navItems = [
  ["Angebot", "#angebote"],
  ["Themen", "#schwerpunkte"],
  ["Kosten", "#kosten"],
  ["Über mich", "#ueber-mich"],
  ["Ablauf", "#ablauf"],
  ["Termin", "#termine"],
  ["FAQ", "#faq"],
];

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const principles = [
  { icon: Clock3, number: "01", title: "Zeitnah", text: "Wenn Belastung spürbar wird, sollte Unterstützung nicht erst in Monaten beginnen." },
  { icon: LockKeyhole, number: "02", title: "Diskret", text: "Private psychologische Beratung ohne Kassenverfahren, vertraulich und klar." },
  { icon: Languages, number: "03", title: "Sprachsensibel", text: "Deutsch, Englisch oder Dari/Farsi, damit wichtige Nuancen nicht verloren gehen." },
  { icon: Fingerprint, number: "04", title: "Kultursensibel", text: "Herkunft, Familie, Migration und Loyalitätskonflikte werden mitgedacht." },
];

const comparisonRows = [
  {
    label: "Einstieg",
    elbmind: "Kostenloses Erstgespräch direkt online buchen",
    standard: "Erst Sprechstunde und Platzsuche; ein Behandlungsplatz ist damit noch nicht gesichert",
  },
  {
    label: "Tempo",
    elbmind: "Verbindliche Rückmeldung spätestens innerhalb von 24 Stunden",
    standard: "Häufig monatelange Wartezeit bis zum Beginn einer regulären Behandlung",
  },
  {
    label: "Formalitäten",
    elbmind: "Ohne Überweisung, Kassenantrag oder Genehmigungsverfahren",
    standard: "Verpflichtende Sprechstunde, probatorische Sitzungen und gegebenenfalls Kassenantrag",
  },
  {
    label: "Sprache",
    elbmind: "Deutsch, Englisch und Dari/Farsi fest im Angebot",
    standard: "Verfügbare Sprachen hängen vom jeweiligen Angebot ab",
  },
  {
    label: "Flexibilität",
    elbmind: "Online von einem privaten Ort; persönlich in Hamburg nach Absprache",
    standard: "Ort, Format und Zeiten richten sich nach verfügbaren Praxisangeboten",
  },
  {
    label: "Kassenweg",
    elbmind: "Keine Abrechnungsdiagnose an die gesetzliche Krankenkasse",
    standard: "Kassenleistungen werden im vorgesehenen Abrechnungs- und Dokumentationsrahmen erbracht",
  },
];

const systemTerms = [
  { title: "Klarheit", text: "Was gehört wohin? Was ist akut, was ist Muster, was ist Erwartung?" },
  { title: "Stabilität", text: "Was hilft kurzfristig, damit das innere System nicht weiter überlastet?" },
  { title: "Verstehen", text: "Welche Zusammenhänge erklären, warum sich etwas wiederholt?" },
  { title: "Handlungsspielraum", text: "Welche nächsten Schritte sind realistisch, konkret und alltagstauglich?" },
  { title: "Entlastung", text: "Was darf leichter werden, ohne alles sofort lösen zu müssen?" },
  { title: "Orientierung", text: "Was ist jetzt wichtig und was kann später kommen?" },
];

const serviceCards = [
  { icon: CircleDot, index: "01", title: "Einzelberatung", text: "Für Situationen, in denen innerlich zu viel gleichzeitig passiert: Grübeln, Angst, Erschöpfung, Selbstzweifel oder das Gefühl, nur noch zu funktionieren.", fit: "Sie wieder Orientierung im eigenen Erleben brauchen.", featured: true },
  { icon: HeartHandshake, index: "02", title: "Paarberatung", text: "Für Beziehungen, in denen Gespräche kippen, Nähe schwerfällt oder dieselben Konflikte immer wieder auftauchen.", fit: "Sie Muster verstehen möchten, statt nur weiter zu streiten." },
  { icon: UsersRound, index: "03", title: "Familienberatung", text: "Für Familien, in denen Rollen, Erwartungen, unausgesprochene Spannungen oder alte Muster das Miteinander belasten.", fit: "Sie wieder mehr Verständlichkeit ins Familiensystem bringen möchten." },
  { icon: ShieldCheck, index: "04", title: "Angehörigenberatung", text: "Für Menschen, die nah an belasteten Personen stehen und selbst Orientierung, Grenzen oder Entlastung brauchen.", fit: "Sie helfen möchten, ohne sich selbst zu verlieren." },
  { icon: Compass, index: "05", title: "Kultursensible Beratung", text: "Für Belastungen, in denen Herkunft, Migration, Familie, Sprache, Loyalität oder kulturelle Erwartungen eine Rolle spielen.", fit: "Ihre Lebensrealität nicht in einfache Schubladen passt." },
];

const focusAreas = [
  { icon: BrainCircuit, title: "Ängste, Grübeln und innere Anspannung", text: "Wenn Gedanken kreisen, Unsicherheit zunimmt und Erholung schwerfällt.", links: [1, 2] },
  { icon: Sparkles, title: "Depressives Erleben und Erschöpfung", text: "Wenn Energie, Antrieb und emotionale Stabilität spürbar nachlassen.", links: [0, 2] },
  { icon: CircleDot, title: "Stress, Überforderung und Funktionieren", text: "Wenn äußerer Druck und innere Ansprüche dauerhaft zu hoch werden.", links: [0, 1] },
  { icon: HeartHandshake, title: "Beziehungsmuster und Konflikte", text: "Wenn Kommunikation kippt, Distanz wächst oder Konflikte sich wiederholen.", links: [4, 5] },
  { icon: Languages, title: "Migration, Flucht und kulturelle Spannungsfelder", text: "Wenn Herkunft, Loyalität, Erwartungen und Lebensrealitäten aneinander geraten.", links: [3, 5] },
  { icon: Fingerprint, title: "Selbstwert, Identität und Abgrenzung", text: "Wenn eigene Bedürfnisse undeutlich bleiben oder Grenzen schwerfallen.", links: [3, 4] },
];

const pricingTabs = ["Erstgespräch", "Einzel", "Paar & Familie", "Angehörige"];
const pricingData: Record<string, { title: string; meta: string; online: string[]; personal?: string[] }> = {
  Erstgespräch: { title: "Kostenloses Erstgespräch", meta: "15 Minuten · kostenlos", online: ["Anliegen kurz einordnen", "Sprache und Format klären", "Passung gemeinsam einschätzen"] },
  Einzel: { title: "Einzelberatung", meta: "50 Minuten", online: ["1 Sitzung · 119 €", "3 Sitzungen · 299 €", "6 Sitzungen · 529 €", "10 Sitzungen · 849 €"], personal: ["1 Sitzung · 149 €", "3 Sitzungen · 374 €", "6 Sitzungen · 661 €"] },
  "Paar & Familie": { title: "Paar- und Familienberatung", meta: "75 Minuten", online: ["1 Sitzung · 149 €", "3 Sitzungen · 399 €", "6 Sitzungen · 749 €", "10 Sitzungen · 999 €"], personal: ["1 Sitzung · 186 €", "3 Sitzungen · 499 €", "6 Sitzungen · 936 €"] },
  Angehörige: { title: "Angehörigenberatung", meta: "Analog zur Einzelberatung", online: ["1 Sitzung · 119 €", "3 Sitzungen · 299 €", "6 Sitzungen · 529 €", "10 Sitzungen · 849 €"], personal: ["1 Sitzung · 149 €", "3 Sitzungen · 374 €", "6 Sitzungen · 661 €"] },
};

const processSteps = [
  ["Termin wählen", "Sie wählen einen freien Termin für das kostenlose Erstgespräch."],
  ["Anliegen einordnen", "Wir klären, worum es geht, welche Sprache passt und welcher Beratungsrahmen sinnvoll ist."],
  ["Format festlegen", "Online per Video oder persönlich nach individueller Absprache in Hamburg."],
  ["Beratung starten", "Strukturiert, vertraulich und mit Fokus auf Klarheit, Stabilisierung und konkrete Schritte."],
  ["Nächste Schritte prüfen", "Bei Bedarf besprechen wir, welche weitere Unterstützung sinnvoll sein kann."],
];

const faqs = [
  ["Ist das Psychotherapie?", "Nein. Mein Angebot ist psychologische Beratung und keine heilkundliche Psychotherapie. Es ersetzt keine ärztliche, psychotherapeutische oder psychiatrische Behandlung."],
  ["Wann ist Beratung sinnvoll?", "Wenn Sie merken, dass Gedanken kreisen, Belastungen zunehmen, Konflikte sich wiederholen oder Sie wieder Orientierung und Stabilität im Alltag brauchen."],
  ["Warum gibt es ein kostenloses Erstgespräch?", "Weil vor einer Beratung geklärt werden sollte, ob mein Angebot, die Sprache, das Format und Ihr Anliegen zusammenpassen."],
  ["Wie schnell bekomme ich einen Termin?", "In der Regel erhalten Sie zeitnah eine Rückmeldung. Freie Termine können direkt über das Terminformular gebucht werden."],
  ["In welchen Sprachen ist Beratung möglich?", "Beratung ist auf Deutsch, Englisch und Dari/Farsi möglich."],
  ["Wird die Beratung von der Krankenkasse bezahlt?", "Nein. Es handelt sich um eine private psychologische Beratung ohne Abrechnung über die gesetzliche Krankenkasse."],
  ["Sind persönliche Termine möglich?", "Persönliche Termine in Hamburg sind nach individueller Absprache möglich, sofern ein passender vertraulicher Rahmen gegeben ist."],
  ["Was passiert bei akuten Krisen?", "Bei akuten Krisen, Selbst- oder Fremdgefährdung wenden Sie sich bitte an den Rettungsdienst, die nächstgelegene psychiatrische Notaufnahme oder den ärztlichen Bereitschaftsdienst."],
];

const slots = [
  { day: "Montag", date: "23. Juni", times: ["09:30", "11:00", "17:30"] },
  { day: "Dienstag", date: "24. Juni", times: ["10:00", "16:00", "18:30"] },
];

const heroConcerns = [
  { label: "Grübeln", style: { left: "12%", top: "26%" } },
  { label: "Familie", style: { right: "10%", top: "18%" } },
  { label: "Angst", style: { right: "8%", top: "43%" } },
  { label: "Druck", style: { left: "10%", top: "47%" } },
  { label: "Erschöpfung", style: { left: "18%", bottom: "19%" } },
  { label: "Beziehung", style: { right: "10%", bottom: "22%" } },
  { label: "Schlaf", style: { left: "39%", bottom: "11%" } },
  { label: "Erwartungen", style: { left: "33%", top: "17%" } },
];

const reveal = {
  initial: { opacity: 0, y: 30, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function ArrowButton({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <a href={href} className={`button-arrow ${light ? "button-light" : "button-dark"}`}><span>{children}</span><ArrowRight size={17} /></a>;
}

function SectionTitle({ index, eyebrow, title, text, light = false }: { index: string; eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <motion.header {...reveal} className={`section-title ${light ? "section-title-light" : ""}`}>
      <div className="section-kicker"><span>{index}</span><span>{eyebrow}</span></div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.header>
  );
}

function MindField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sources = [
      { x: 0.18, y: 0.3, weight: 1, phase: 0.1 },
      { x: 0.79, y: 0.18, weight: 0.8, phase: 0.7 },
      { x: 0.84, y: 0.44, weight: 1, phase: 1.6 },
      { x: 0.72, y: 0.7, weight: 0.85, phase: 2.1 },
      { x: 0.45, y: 0.76, weight: 1, phase: 2.8 },
      { x: 0.24, y: 0.69, weight: 0.8, phase: 3.2 },
      { x: 0.15, y: 0.53, weight: 0.7, phase: 3.7 },
      { x: 0.36, y: 0.2, weight: 0.9, phase: 4.3 },
    ];
    const center = { x: 0.56, y: 0.52 };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let raf = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      frame += reduce ? 0 : 0.008;
      ctx.clearRect(0, 0, width, height);
      const cx = center.x * width;
      const cy = center.y * height;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.44);
      gradient.addColorStop(0, "rgba(196,221,212,.24)");
      gradient.addColorStop(0.42, "rgba(136,171,183,.08)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(208,229,220,.08)";
      ctx.lineWidth = 1;
      [0.24, 0.38, 0.52].forEach((ring) => {
        ctx.beginPath();
        ctx.arc(cx, cy, Math.min(width, height) * ring, 0, Math.PI * 2);
        ctx.stroke();
      });

      sources.forEach((source, index) => {
        const sx = source.x * width;
        const sy = source.y * height;
        const driftX = Math.sin(frame * 1.3 + source.phase) * 8;
        const driftY = Math.cos(frame * 1.1 + source.phase) * 7;
        const px = sx + driftX;
        const py = sy + driftY;
        const pull = Math.min(scrollRef.current * 0.12, 1);
        const c1x = px + (cx - px) * 0.28;
        const c1y = py + (cy - py) * (0.08 + index * 0.015);
        const c2x = px + (cx - px) * 0.76;
        const c2y = cy + Math.sin(frame + index) * 14;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.bezierCurveTo(c1x, c1y, c2x, c2y, cx, cy);
        ctx.strokeStyle = `rgba(168,198,187,${0.14 + pull * 0.1})`;
        ctx.lineWidth = index % 3 === 0 ? 1.15 : 0.75;
        ctx.stroke();

        for (let particleIndex = 0; particleIndex < 2; particleIndex++) {
          const progress = (frame * (0.28 + particleIndex * 0.06) + source.phase + particleIndex * 0.22 + pull * 0.4) % 1;
          const t = Math.min(progress, 1);
          const omt = 1 - t;
          const qx =
            omt * omt * omt * px +
            3 * omt * omt * t * c1x +
            3 * omt * t * t * c2x +
            t * t * t * cx;
          const qy =
            omt * omt * omt * py +
            3 * omt * omt * t * c1y +
            3 * omt * t * t * c2y +
            t * t * t * cy;
          const glow = 1 - t * 0.55;
          ctx.beginPath();
          ctx.arc(qx, qy, 1.8 + glow, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230,241,235,${0.4 + glow * 0.42})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, 3.2 + source.weight, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(171,196,188,.72)";
        ctx.fill();
      });

      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(227,241,234,.28)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245,250,247,.92)";
      ctx.fill();

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const onScroll = () => { scrollRef.current = window.scrollY / Math.max(window.innerHeight, 1); };
    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={hostRef} className="mind-field" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="mind-rings">
        <div className="mind-orbit orbit-one" />
        <div className="mind-orbit orbit-two" />
      </div>
      {heroConcerns.map((item) => (
        <span
          key={item.label}
          className="mind-chip"
          style={{
            position: "absolute",
            zIndex: 2,
            padding: "10px 13px",
            borderRadius: 999,
            background: "rgba(11,21,18,.62)",
            border: "1px solid rgba(197,226,216,.18)",
            color: "rgba(241,247,244,.86)",
            fontSize: 12,
            fontWeight: 560,
            letterSpacing: ".02em",
            backdropFilter: "blur(12px)",
            boxShadow: "0 14px 34px rgba(0,0,0,.16)",
            ...item.style,
          }}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 45 });
  const sy = useSpring(y, { stiffness: 500, damping: 45 });
  const [active, setActive] = useState(false);
  useEffect(() => {
    const move = (event: MouseEvent) => { x.set(event.clientX - 18); y.set(event.clientY - 18); };
    const over = (event: MouseEvent) => setActive(Boolean((event.target as HTMLElement).closest("a,button,input,select")));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [x, y]);
  return <motion.div className={`custom-cursor ${active ? "is-active" : ""}`} style={{ x: sx, y: sy }} />;
}

function Header() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => setCompact(value > 70));
  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`}>
      <a href="#start" className="brand" aria-label="Elbmind Startseite"><img src={asset("/images/elbmind-logo-clean-transparent.png")} alt="Elbmind" /></a>
      <nav className="desktop-nav" aria-label="Hauptnavigation">
        {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <ArrowButton href="#termine">Erstgespräch buchen</ArrowButton>
      <button className="menu-button" type="button" aria-label={open ? "Menü schließen" : "Menü öffnen"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowRight size={17} /></a>)}<ArrowButton href="#termine">Erstgespräch buchen</ArrowButton></motion.nav>}</AnimatePresence>
    </header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const visualY = useTransform(scrollYProgress, [0, 0.2], [0, 80]);
  return (
    <section id="start" className="hero">
      <div className="hero-noise" />
      <div className="hero-grid">
        <motion.div className="hero-copy" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="hero-eyebrow"><span className="status-dot" />Arman Ebadi · Psychologe M.Sc.</div>
          <h1>
            <span>Wenn emotionale</span>
            <span className="hero-serif">Belastung den</span>
            <span className="hero-serif">Alltag</span>
            <span className="hero-final-line">
              unübersichtlich
              <br />
              macht.
            </span>
          </h1>
          <p className="hero-lead">Psychologische Beratung, die Belastungen einordnet, Muster sichtbar macht und aus diffusem Druck konkrete nächste Schritte entstehen lässt.</p>
          <div className="hero-actions"><ArrowButton href="#termine">Kostenloses Erstgespräch</ArrowButton><a href="#angebote" className="text-link">Beratung entdecken <ArrowRight size={17} /></a></div>
        </motion.div>
        <motion.div className="hero-visual-wrap" style={{ y: visualY }}><MindField /></motion.div>
      </div>
      <div className="hero-trust"><span><Clock3 />15 Minuten kostenlos</span><span><MessageCircleMore />Online per Video</span><span><MapPin />Hamburg nach Absprache</span><span><Languages />DE · EN · Dari/Farsi</span></div>
    </section>
  );
}

function StatusRail() {
  return <section className="status-rail" aria-label="Vorteile">{principles.map(({ icon: Icon, title, text }) => <div className="status-item" key={title}><Icon /><div><strong>{title === "Zeitnah" ? "Antwort meist in 24h" : title}</strong><span>{text}</span></div></div>)}</section>;
}

function Comparison() {
  return (
    <section className="section-shell comparison-section">
      <SectionTitle index="01" eyebrow="Der Unterschied im Rahmen" title="Direkter beginnen. Ohne monatelangen Vorlauf." text="Wenn Belastung heute spürbar ist, sollte der erste Schritt nicht an langen Such- und Wartephasen scheitern. Elbmind bietet einen privaten, zeitnahen Beratungsrahmen." />
      <motion.div {...reveal} className="comparison-frame">
        <div className="comparison-head">
          <span>Im Überblick</span>
          <div className="comparison-brand"><span className="status-dot" />Elbmind Beratung<small>direkt · privat · flexibel</small></div>
          <div className="comparison-care">Klassischer Kassenweg<small>kapazitäts- und verfahrensgebunden</small></div>
        </div>
        <div className="comparison-rows">
          {comparisonRows.map((row, index) => (
            <div className="comparison-row" key={row.label}>
              <div className="comparison-label"><span>0{index + 1}</span><strong>{row.label}</strong></div>
              <div className="comparison-elbmind"><Check />{row.elbmind}</div>
              <div className="comparison-standard"><X />{row.standard}</div>
            </div>
          ))}
        </div>
        <div className="comparison-source"><span>Einordnung Wartezeit</span><p>Die Bundespsychotherapeutenkammer berichtet für den Beginn ambulanter Psychotherapie von häufig monatelangen Wartezeiten.</p><a href="https://www.bptk.de/pressemitteilungen/rund-20-wochen-wartezeit-auf-psychotherapeutische-behandlung" target="_blank" rel="noreferrer">Quelle ansehen <ArrowRight /></a></div>
        <div className="comparison-footer"><ShieldCheck /><p>Kein Entweder-oder: Psychologische Beratung ersetzt keine notwendige ärztliche, psychiatrische oder heilkundliche psychotherapeutische Versorgung.</p><ArrowButton href="#termine">Erstgespräch wählen</ArrowButton></div>
      </motion.div>
    </section>
  );
}

function TopicConstellation() {
  const [active, setActive] = useState(0);
  return (
    <section className="system-section">
      <div className="section-shell system-layout">
        <SectionTitle index="02" eyebrow="Psychologische Einordnung" title="Nicht alles ist ein Problem. Manchmal ist es ein inneres System." text="Gedanken, Gefühle, Erwartungen, Beziehungsmuster und familiäre Dynamiken greifen ineinander. Beratung macht diese Zusammenhänge sichtbar, ohne vorschnelle Bewertung." light />
        <div className="system-console">
          <div className="system-map">{systemTerms.map((term, index) => <button key={term.title} type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} className={active === index ? "active" : ""}><span>{String(index + 1).padStart(2, "0")}</span>{term.title}</button>)}</div>
          <AnimatePresence mode="wait"><motion.div key={active} className="system-detail" initial={{ opacity: 0, y: 12, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -8 }}><Eye /><div><span>Aktiver Fokus</span><h3>{systemTerms[active].title}</h3><p>{systemTerms[active].text}</p></div></motion.div></AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Support() {
  return (
    <section className="section-shell support-section">
      <div className="support-copy"><SectionTitle index="03" eyebrow="Frühe Orientierung" title="Früher sortieren. Bevor alles blockiert." text="Beratung kann ansetzen, wenn Gedanken kreisen, Konflikte sich wiederholen, Erschöpfung zunimmt oder Erwartungen zu viel Raum einnehmen." /><ArrowButton href="#termine">Ersten Schritt wählen</ArrowButton></div>
      <motion.div {...reveal} className="order-visual"><div className="order-label"><span>Diffuser Druck</span><ArrowRight /><strong>Orientierung</strong></div>{["Wahrnehmen", "Einordnen", "Stabilisieren", "Handeln"].map((item, index) => <div key={item} className="order-block" style={{ width: `${58 + index * 11}%` }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i /></div>)}</motion.div>
    </section>
  );
}

function Services() {
  return (
    <section id="angebote" className="section-shell services-section">
      <SectionTitle index="04" eyebrow="Beratungsformate" title="Nicht jedes Anliegen braucht denselben Rahmen." text="Was belastet gerade, wer ist beteiligt und welches Format passt wirklich? Das kostenlose Erstgespräch schafft Klarheit." />
      <div className="services-grid">{serviceCards.map(({ icon: Icon, index, title, text, fit, featured }) => <motion.article key={title} {...reveal} className={`service-card ${featured ? "featured" : ""}`}><div className="service-icon"><Icon /></div><span className="service-index">{index}</span><h3>{title}</h3><p>{text}</p><div className="fit-line"><Check /><span><strong>Passt, wenn:</strong> {fit}</span></div></motion.article>)}</div>
      <div className="section-cta"><ArrowButton href="#termine">Kostenloses Erstgespräch buchen</ArrowButton></div>
    </section>
  );
}

function FocusAreas() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="schwerpunkte" className="focus-section">
      <div className="section-shell">
        <SectionTitle index="05" eyebrow="Themen im Zusammenhang" title="Wobei es selten nur um ein Thema geht." text="Viele Belastungen überlagern sich. Deshalb werden sie nicht verkürzt betrachtet, sondern ordnend und zusammenhängend." />
        <div className="focus-cluster">{focusAreas.map(({ icon: Icon, title, text, links }, index) => { const related = active !== null && (active === index || focusAreas[active].links.includes(index)); return <motion.article key={title} {...reveal} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)} className={`focus-card ${related ? "related" : ""}`}><div><Icon /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></motion.article>; })}<div className="cluster-core"><Network /><span>Zusammenhänge</span></div></div>
      </div>
    </section>
  );
}

function Pricing() {
  const [tab, setTab] = useState("Erstgespräch");
  const data = pricingData[tab];
  const showComparison = tab === "Einzel" || tab === "Angehörige";
  return (
    <section id="kosten" className="pricing-section">
      <div className="section-shell">
        <SectionTitle index="06" eyebrow="Honorare" title="Klare Kosten. Keine Unklarheit." text="Private psychologische Beratung mit transparenten Formaten und Kosten, die vorab feststehen." light />
        <div className="pricing-tabs" role="tablist" aria-label="Beratungsformat">{pricingTabs.map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={tab === item ? "active" : ""}>{item}</button>)}</div>
        <AnimatePresence mode="wait"><motion.div key={tab} className="pricing-cockpit" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><div className="pricing-intro"><span>Ausgewähltes Format</span><h3>{data.title}</h3><p>{data.meta}</p><div className="pricing-note"><ShieldCheck />Privatleistung · keine Kassenabrechnung</div>{showComparison && <div className="pricing-contrast"><div><span>Im empfohlenen 6er-Paket</span><strong>88,17 €</strong><small>pro Sitzung online</small></div><div><span>Orientierungswert Privatpraxen</span><strong>ca. 150-170 €</strong><small>Selbstzahler · 50 Minuten</small></div></div>}<p className="pricing-contrast-note">{showComparison ? "Das 6er-Paket reduziert den Preis pro Online-Sitzung auf 88,17 €." : "Transparente Privatleistung ohne Kassenverfahren."}</p></div><PriceColumn title={tab === "Erstgespräch" ? "Das klären wir" : "Online per Video"} items={data.online} recommendedIndex={tab === "Erstgespräch" ? undefined : tab === "Angehörige" ? 1 : 2} />{data.personal ? <PriceColumn title="Persönlich in Hamburg" items={data.personal} recommendedIndex={tab === "Angehörige" ? 1 : 2} /> : <div className="pricing-book"><p>Ein ruhiger Einstieg ohne Verpflichtung.</p><ArrowButton href="#termine" light>Termin buchen</ArrowButton></div>}<div className="pricing-mobile-cta"><span>Der erste Schritt bleibt kostenlos.</span><ArrowButton href="#termine" light>Erstgespräch buchen</ArrowButton></div></motion.div></AnimatePresence>
        <p className="pricing-legal">Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Die Honorare beziehen sich auf psychologische Beratung. Es handelt sich nicht um heilkundliche Psychotherapie und nicht um eine Leistung der gesetzlichen Krankenversicherung.</p>
      </div>
    </section>
  );
}

function PriceColumn({ title, items, recommendedIndex }: { title: string; items: string[]; recommendedIndex?: number }) {
  const recommendation = recommendedIndex === 1 ? "3 Sitzungen empfohlen" : recommendedIndex === 2 ? "6 Sitzungen empfohlen" : null;
  return <div className="price-column"><div className="price-column-title"><span>{title}</span>{recommendation && <i>{recommendation}</i>}</div>{items.map((item, index) => { const [label, price] = item.split(" · "); return <div className={recommendedIndex === index ? "recommended" : ""} key={item}><span className="price-item-label">{label}</span>{price ? <strong>{price}</strong> : <Check size={15} />}{recommendedIndex === index && <Sparkles className="price-sparkle" size={15} />}</div>; })}</div>;
}

function About() {
  const qualifications = ["Psychologe M.Sc.", "Schwerpunkt Klinische Psychologie und Psychotherapie", "Ambulante und stationäre klinische Erfahrung", "Psychologische Befunderhebung und Fallkonzeption", "Forschungsbezug: KI-gestützte Diagnostik", "Deutsch · Englisch · Dari/Farsi"];
  return (
    <section id="ueber-mich" className="about-section">
      <div className="section-shell about-grid">
        <div className="about-visual-stack">
          <motion.div {...reveal} className="clarity-frame"><div className="portrait-glow" /><img src={asset("/images/arman-ebadi.png")} alt="Arman Ebadi, Psychologe M.Sc." /><div className="portrait-label"><span>Arman Ebadi</span><small>Psychologe M.Sc. · Hamburg</small></div></motion.div>
          <motion.aside {...reveal} className="about-method-card">
            <div className="about-method-head"><span>Arbeitsweise</span><Network /></div>
            <p>Ruhig, strukturiert und ohne vorschnelle Etiketten.</p>
            <div className="about-method-steps">
              <div><Eye /><span><small>01</small>Verstehen</span></div>
              <div><ShieldCheck /><span><small>02</small>Stabilisieren</span></div>
              <div><Compass /><span><small>03</small>Handeln</span></div>
            </div>
            <div className="about-method-meta"><span>Hamburg</span><span>DE · EN · Dari/Farsi</span></div>
          </motion.aside>
        </div>
        <div><SectionTitle index="07" eyebrow="Über mich" title="Klinisch klar. Menschlich nah. Kultursensibel im Blick." /><div className="about-copy"><p>Ich arbeite mit Menschen, deren Belastungen nicht in einfache Schubladen passen. Oft geht es nicht nur um einzelne Beschwerden, sondern um Zusammenhänge: Familie, Beziehung, Herkunft, Erwartungen und aktuelle Überforderung.</p><p>Mein Ansatz verbindet klinisch-psychologisches Wissen mit einer ruhigen, strukturierten Gesprächsführung. Es geht nicht um schnelle Etiketten, sondern darum, verständlich zu machen, was gerade wirkt.</p><p>Als in Hamburg aufgewachsener Mensch aus einer Migrantenfamilie kenne ich kulturelle Spannungsfelder fachlich und aus persönlicher Perspektive. Diese Erfahrung fließt sensibel ein, ohne zu pauschalisieren.</p></div><div className="qualification-grid">{qualifications.map((item, index) => <motion.div key={item} {...reveal}><span key="icon"><Check /></span><p key="text">{item}</p><small key="index">0{index + 1}</small></motion.div>)}</div></div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="ablauf" className="section-shell process-section">
      <SectionTitle index="08" eyebrow="Ablauf" title="Ein klarer Ablauf. Damit der Einstieg leicht bleibt." />
      <div className="timeline"><motion.div className="timeline-progress" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.6 }} />{processSteps.map(([title, text], index) => <motion.article key={title} {...reveal}><div key="number" className="timeline-number">{String(index + 1).padStart(2, "0")}</div><div key="content"><h3>{title}</h3><p>{text}</p></div><ArrowRight key="arrow" /></motion.article>)}</div>
    </section>
  );
}

function Booking() {
  const [format, setFormat] = useState("Online per Video");
  const [slot, setSlot] = useState(`${slots[0].date}, ${slots[0].times[0]}`);
  const [language, setLanguage] = useState("Deutsch");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  return (
    <section id="termine" className="booking-section">
      <div className="section-shell booking-grid">
        <div><SectionTitle index="09" eyebrow="Kostenloses Erstgespräch" title="Der erste Schritt soll leicht sein." text="15 Minuten zur gemeinsamen Einschätzung: Was ist Ihr Anliegen, welche Sprache passt und welcher Beratungsrahmen ist sinnvoll?" light /><div className="booking-benefits">{["Keine Verpflichtung", "Keine Kassenabrechnung", "Online per Video", "Persönlich nach Absprache"].map((item) => <span key={item}><Check />{item}</span>)}</div></div>
        <motion.form {...reveal} onSubmit={(event) => { event.preventDefault(); setConfirmed(true); }} className="booking-card">
          <div className="booking-step"><span>01</span><label>Format auswählen</label><div className="segmented">{["Online per Video", "Persönlich nach Absprache"].map((item) => <button type="button" key={item} onClick={() => { setFormat(item); setConfirmed(false); }} className={format === item ? "active" : ""}>{item}</button>)}</div></div>
          <div className="booking-step"><span>02</span><label>Freien Termin wählen</label><div className="slot-grid">{slots.map((day) => <div key={day.date}><strong>{day.day}</strong><small>{day.date}</small><div>{day.times.map((time) => { const value = `${day.date}, ${time}`; return <button type="button" key={value} onClick={() => { setSlot(value); setConfirmed(false); }} className={slot === value ? "active" : ""}>{time}</button>; })}</div></div>)}</div></div>
          <div className="booking-step language-step"><span>03</span><label><Languages />Sprache wählen</label><div className="language-options">{["Deutsch", "Englisch", "Dari/Farsi"].map((item) => <button type="button" key={item} aria-pressed={language === item} onClick={() => { setLanguage(item); setConfirmed(false); }} className={language === item ? "active" : ""}><i />{item}<Check /></button>)}</div></div>
          <div className="booking-contact-grid">
            <label>Name<input required autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setConfirmed(false); }} placeholder="Vor- und Nachname" /></label>
            <label>E-Mail<input required type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setConfirmed(false); }} placeholder="name@beispiel.de" /></label>
            <label>Telefon <small>optional</small><input type="tel" autoComplete="tel" value={phone} onChange={(event) => { setPhone(event.target.value); setConfirmed(false); }} placeholder="+49 ..." /></label>
          </div>
          <label className="booking-concern">Worum geht es? <small>optional</small><textarea maxLength={500} rows={3} value={concern} onChange={(event) => { setConcern(event.target.value); setConfirmed(false); }} placeholder="Ein bis zwei kurze Sätze genügen." /><span>{concern.length}/500</span></label>
          <div className="booking-summary"><div><span>Ihre Buchung</span><strong>{slot}</strong><small>{format} · {language}</small></div><CalendarDays /></div>
          <button className="booking-submit" type="submit">Kostenloses Erstgespräch verbindlich buchen <ArrowRight /></button>
          <AnimatePresence>{confirmed && <motion.p className="booking-success" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>Termin gebucht. Die Bestätigung geht an {email}.</motion.p>}</AnimatePresence>
          <p className="crisis-note">Für akute Krisen oder Notfallsituationen ist dieses Angebot nicht geeignet.</p>
        </motion.form>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section-shell faq-section">
      <SectionTitle index="10" eyebrow="Vor dem Gespräch" title="Fragen, die vor dem ersten Gespräch wichtig sind." />
      <div className="faq-list">{faqs.map(([question, answer], index) => <div className={open === index ? "open" : ""} key={question}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><ChevronDown /></button><AnimatePresence initial={false}>{open === index && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{answer}</motion.p>}</AnimatePresence></div>)}</div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer"><div className="section-shell"><div className="footer-cta"><span>Erst verstehen. Dann stabilisieren. Dann handeln.</span><h2>Aus diffusem Druck werden sortierbare Themen.</h2><ArrowButton href="#termine" light>Erstgespräch buchen</ArrowButton></div><div className="footer-grid"><div><img src={asset("/images/elbmind-logo-clean-transparent.png")} alt="Elbmind" /><p>Psychologische Beratung<br />Arman Ebadi · Psychologe M.Sc.</p></div><div><strong>Beratung</strong><a href="#angebote">Einzel · Paar · Familie</a><a href="#angebote">Angehörige</a><a href="#angebote">Kultursensibel</a></div><div><strong>Rahmen</strong><span>Online per Video</span><span>Hamburg nach Absprache</span><span>DE · EN · Dari/Farsi</span></div><div><strong>Rechtliches</strong><a href="#">Impressum</a><a href="#">Datenschutz</a><a href="#faq">Krisenhinweis</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Elbmind</span><p>Psychologische Beratung, keine heilkundliche Psychotherapie. Bei akuten Krisen wenden Sie sich bitte an den Rettungsdienst, eine Notaufnahme oder den ärztlichen Bereitschaftsdienst.</p></div></div></footer>
  );
}

export default function Home() {
  return <><CustomCursor /><Header /><main><Hero /><StatusRail /><Comparison /><TopicConstellation /><Support /><Services /><FocusAreas /><Pricing /><About /><Process /><Booking /><FAQ /></main><Footer /></>;
}
