"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Brain,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  HeartHandshake,
  Languages,
  LockKeyhole,
  MapPin,
  ShieldAlert,
  Shield,
  Sparkle,
  Sparkles,
  Users,
  UserRound,
  Video
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";

const navItems = [
  ["Angebot", "#angebote"],
  ["Schwerpunkte", "#schwerpunkte"],
  ["Kosten", "#kosten"],
  ["Über mich", "#ueber-mich"],
  ["Ablauf", "#ablauf"],
  ["Termine", "#termine"],
  ["FAQ", "#faq"]
];

const trustTags = [
  "Rückmeldung meist innerhalb von 24 Stunden",
  "Online per Video",
  "Persönliche Termine nach Absprache",
  "Deutsch · Englisch · Dari/Farsi",
  "Privat & diskret",
  "Keine Kassenabrechnung"
];

const trustItems = [
  {
    title: "Zeitnah",
    text: "In der Regel erhalten Sie innerhalb von 24 Stunden eine Rückmeldung."
  },
  {
    title: "Diskret",
    text: "Private Beratung ohne Abrechnung über die gesetzliche Krankenkasse."
  },
  {
    title: "Sprachsensibel",
    text: "Beratung auf Deutsch, Englisch oder Dari/Farsi."
  },
  {
    title: "Kultursensibel",
    text: "Migration, Fluchtgeschichte, familiäre Erwartungen und kulturelle Spannungsfelder werden mitgedacht."
  }
];

const nowCards = [
  "Zeitnahe Rückmeldung",
  "Flexible Termine",
  "Ohne Kassenverfahren",
  "Sprach- und kultursensibel"
];

const services = [
  {
    title: "Einzelberatung",
    text: "Für persönliche Belastungen, innere Konflikte, Angst, Grübeln, depressives Erleben, Selbstzweifel, Erschöpfung und schwierige Lebensphasen. Gemeinsam betrachten wir, welche inneren Dynamiken, Beziehungserfahrungen, Stressoren oder biografischen Prägungen Ihre aktuelle Situation beeinflussen."
  },
  {
    title: "Paarberatung",
    text: "Für Paare, die wiederkehrende Konflikte, emotionale Distanz, Kommunikationsprobleme oder unterschiedliche Bedürfnisse besser verstehen möchten. Im Fokus stehen Beziehungsmuster, emotionale Reaktionen, Bindungs- und Konfliktdynamiken, Grenzen, Bedürfnisse und Kommunikation."
  },
  {
    title: "Familienberatung",
    text: "Für Familien, die belastende Dynamiken, Rollen, Konflikte, Erwartungen oder kulturelle Spannungsfelder gemeinsam reflektieren möchten. Ziel ist es, gegenseitiges Verständnis, Klarheit und neue Umgangsweisen zu fördern."
  },
  {
    title: "Angehörigenberatung",
    text: "Für Angehörige, Partner*innen und Bezugspersonen psychisch oder emotional belasteter Menschen. Die Beratung unterstützt dabei, die eigene Rolle zu klären, Überforderung zu reduzieren, Grenzen zu reflektieren und hilfreiche Umgangsweisen zu entwickeln."
  },
  {
    title: "Kultursensible Beratung",
    text: "Für Menschen, deren Belastungen auch mit Herkunft, Familie, Migration, Fluchtgeschichte oder kulturellen Erwartungen verbunden sind. Diese Zusammenhänge werden differenziert, respektvoll und ohne vorschnelle Einordnung einbezogen."
  }
];

const focusAreas = [
  {
    title: "Ängste, Grübeln und innere Anspannung",
    text: "Wenn Gedanken kreisen, Unsicherheit zunimmt und Erholung schwerfällt.",
    icon: Brain
  },
  {
    title: "Depressives Erleben und Erschöpfung",
    text: "Wenn Energie, Antrieb und emotionale Stabilität spürbar nachlassen.",
    icon: Sparkle
  },
  {
    title: "Stress, Überforderung und Funktionieren",
    text: "Wenn äußerer Druck und innere Ansprüche dauerhaft zu hoch werden.",
    icon: ShieldAlert
  },
  {
    title: "Beziehungsmuster und Konflikte",
    text: "Wenn Kommunikation kippt, Distanz wächst oder Konflikte sich wiederholen.",
    icon: HeartHandshake
  },
  {
    title: "Migration, Flucht und kulturelle Spannungsfelder",
    text: "Wenn Herkunft, Loyalität, Erwartungen und Lebensrealitäten aneinander geraten.",
    icon: Users
  },
  {
    title: "Selbstwert, Identität und Abgrenzung",
    text: "Wenn eigene Bedürfnisse undeutlich bleiben oder Grenzen schwerfallen.",
    icon: UserRound
  }
];

const pricing = [
  {
    title: "Kostenloses Erstgespräch",
    meta: "15 Minuten · kostenlos",
    text: "Das Erstgespräch dient dazu, Ihr Anliegen kurz kennenzulernen, offene Fragen zu klären und gemeinsam einzuschätzen, ob mein Beratungsangebot zu Ihrer aktuellen Situation passt.",
    items: ["Unverbindliche Klärung", "Passung einschätzen", "Offene Fragen besprechen"],
    featured: true
  },
  {
    title: "Einzelberatung online",
    meta: "Online per Video",
    text: "Für persönliche Belastungen, Angst, Grübeln, depressives Erleben, innere Anspannung, Selbstzweifel, emotionale Erschöpfung und schwierige Lebensphasen.",
    items: ["1 Sitzung · 50 Minuten · 119 €", "3 Sitzungen · 1x pro Woche · 299 €", "6 Sitzungen · 1x pro Woche · 529 €"]
  },
  {
    title: "Einzelberatung persönlich in Hamburg",
    meta: "Nach individueller Absprache",
    text: "Sofern ein ruhiger, privater und vertraulicher Rahmen gegeben ist.",
    items: ["1 Sitzung · 50 Minuten · 149 €", "3 Sitzungen · 1x pro Woche · 374 €", "6 Sitzungen · 1x pro Woche · 661 €"]
  },
  {
    title: "Paar- und Familienberatung online",
    meta: "Online per Video",
    text: "Für Paare und Familien, die Konflikte, emotionale Distanz, Kommunikationsprobleme, familiäre Dynamiken, kulturelle Spannungsfelder oder unterschiedliche Bedürfnisse besser verstehen möchten.",
    items: ["1 Sitzung · 75 Minuten · 149 €", "3 Sitzungen · 1x pro Woche · 399 €", "6 Sitzungen · 1x pro Woche · 749 €"]
  },
  {
    title: "Paar- und Familienberatung persönlich in Hamburg",
    meta: "Nach individueller Absprache",
    text: "Sofern ein ruhiger, privater und vertraulicher Rahmen gegeben ist.",
    items: ["1 Sitzung · 75 Minuten · 186 €", "3 Sitzungen · 1x pro Woche · 499 €", "6 Sitzungen · 1x pro Woche · 936 €"]
  },
  {
    title: "Angehörigenberatung",
    meta: "Analog zur Einzelberatung",
    text: "Für Angehörige, Partner*innen und Bezugspersonen, die Orientierung, Entlastung und hilfreiche Umgangsweisen suchen.",
    items: ["Online · 50 Minuten · 119 €", "3 Sitzungen online · 1x pro Woche · 299 €", "6 Sitzungen online · 1x pro Woche · 529 €", "Persönlich in Hamburg · 50 Minuten · 149 €", "3 Sitzungen persönlich · 1x pro Woche · 374 €", "6 Sitzungen persönlich · 1x pro Woche · 661 €"]
  }
];

const accessCards = [
  {
    title: "Online per Video",
    text: "Flexibel, ortsunabhängig und vertraulich - geeignet, wenn Sie von einem privaten Ort aus teilnehmen möchten.",
    icon: Video
  },
  {
    title: "Persönliche Termine nach Absprache",
    text: "In ausgewählten Fällen sind persönliche Termine in Hamburg möglich, sofern ein ruhiger und geschützter Rahmen gegeben ist.",
    icon: MapPin
  },
  {
    title: "Sprachen",
    text: "Beratung auf Deutsch, Englisch und Dari/Farsi. Die Sprache muss nicht perfekt sein - wichtig ist, dass eine ausreichende Verständigung möglich ist.",
    icon: Languages
  }
];

const qualifications = [
  "Psychologe M.Sc.",
  "M.Sc. Klinische Psychologie & Psychotherapie",
  "Praktische Erfahrung im ambulanten und stationären klinischen Setting",
  "Erfahrung mit psychologischer Befunderhebung, Fallkonzeption, Dokumentation und therapeutisch orientierten Prozessen",
  "Forschungserfahrung im Bereich KI-gestützter Diagnostik psychischer Erkrankungen",
  "Sprachen: Deutsch, Englisch, Dari/Farsi"
];

const process = [
  ["Termin wählen", "Sie buchen direkt einen freien Termin für das kostenfreie Erstgespräch und hinterlassen Ihre Kontaktdaten."],
  ["Kostenfreies Erstgespräch", "In einem 15-minütigen Gespräch klären wir Ihr Anliegen, die passende Sprache und ob mein Beratungsangebot zu Ihrer Situation passt."],
  ["Format wählen", "Sie entscheiden, ob Sie online per Video oder - nach Absprache - persönlich in Hamburg teilnehmen möchten."],
  ["Beratung", "Die Sitzungen finden strukturiert und vertraulich statt. Wir arbeiten an Klärung, Stabilisierung, emotionaler Entlastung und konkreten Handlungsmöglichkeiten."],
  ["Nächste Schritte", "Bei Bedarf bespreche ich mit Ihnen, welche weitere Unterstützung sinnvoll sein kann."]
];

const appointmentFormats = ["Online per Video", "Persönlich nach Absprache"];

const appointmentSlots = [
  { day: "Mi", date: "24. Juni", times: ["09:30", "12:00", "17:30"] },
  { day: "Do", date: "25. Juni", times: ["10:00", "14:30", "18:00"] },
  { day: "Fr", date: "26. Juni", times: ["08:30", "13:00", "16:30"] },
  { day: "Mo", date: "29. Juni", times: ["11:00", "15:30", "19:00"] }
];

const faqs = [
  ["Ist das Psychotherapie?", "Mein Angebot ist psychologische Beratung und keine heilkundliche Psychotherapie. Es ersetzt keine ärztliche, psychotherapeutische oder psychiatrische Behandlung. Sollte sich im Verlauf zeigen, dass eine psychotherapeutische oder ärztliche Abklärung sinnvoll ist, bespreche ich mit Ihnen passende nächste Schritte."],
  ["Warum gibt es ein kostenloses Erstgespräch?", "Das kostenlose Erstgespräch dauert 15 Minuten und dient dazu, Ihr Anliegen kurz kennenzulernen, offene Fragen zu klären und einzuschätzen, ob mein Beratungsangebot zu Ihrer aktuellen Situation passt."],
  ["Wie schnell bekomme ich einen Termin?", "In der Regel erhalten Sie innerhalb von 24 Stunden eine Rückmeldung auf Ihre Anfrage. Termine sind je nach Verfügbarkeit kurzfristig möglich."],
  ["In welchen Sprachen ist Beratung möglich?", "Die Beratung ist auf Deutsch, Englisch und Dari/Farsi möglich. Die Sprache muss nicht perfekt sein - wichtig ist, dass eine ausreichende Verständigung möglich ist."],
  ["Wird die Beratung von der Krankenkasse bezahlt?", "Nein. Meine Beratung ist eine private Leistung und wird nicht über die gesetzliche Krankenkasse abgerechnet. Deshalb wird durch meine Beratung keine Abrechnungsdiagnose an Ihre Krankenkasse übermittelt."],
  ["Sind persönliche Termine oder Hausbesuche möglich?", "Der Schwerpunkt liegt auf Beratung per Video. Persönliche Termine oder Hausbesuche in Hamburg sind in ausgewählten Fällen nach individueller Absprache möglich. Da kein fester Praxisraum besteht, prüfen wir gemeinsam, ob ein ruhiger, privater und vertraulicher Rahmen vorhanden ist. Persönliche Termine eignen sich nicht für akute Krisen oder Notfallsituationen."],
  ["Was passiert bei akuten Krisen?", "Mein Angebot ist keine Notfallversorgung. Bei akuter Selbst- oder Fremdgefährdung, schweren psychischen Krisen oder medizinischen Notfällen wenden Sie sich bitte an den Rettungsdienst, die nächstgelegene Notaufnahme oder den ärztlichen Bereitschaftsdienst."]
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.75, ease: "easeOut" }
} as const;

function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href={href}
      className={`focus-ring group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 ${
        variant === "primary"
          ? "btn-primary bg-[#1f2524] text-[#fffaf0] shadow-[0_18px_48px_rgba(31,37,36,0.18)] hover:bg-[#31413c]"
          : "border border-[#2223211f] bg-white/45 text-[#222321] hover:bg-white/75"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 16));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto flex max-w-[1240px] items-center justify-between gap-5 rounded-full border px-4 py-2.5 transition duration-300 ${
          scrolled
            ? "border-[#2223211f] bg-[#fffdf8cc] shadow-[0_18px_60px_rgba(35,31,24,0.10)] backdrop-blur-2xl"
            : "border-transparent bg-[#fffdf866] backdrop-blur-xl"
        }`}
      >
        <a href="#" className="focus-ring flex shrink-0 items-center rounded-full">
          <img
            src="/images/elbmind-logo-improved.png"
            alt="Elbmind"
            className="h-[44px] w-auto max-w-[178px] object-contain sm:h-[50px] sm:max-w-[208px]"
          />
          <span className="sr-only">Elbmind - Psychologische Beratung</span>
        </a>
        <nav className="hidden flex-1 items-center justify-center gap-4 lg:flex" aria-label="Hauptnavigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="focus-ring rounded-full text-[12px] font-medium text-[#514f49] transition hover:text-[#171717] xl:text-[13px]">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <a
            href="#termine"
            className="btn-primary focus-ring group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1f2524] px-4 text-xs font-semibold text-[#fffaf0] shadow-[0_18px_48px_rgba(31,37,36,0.18)] transition duration-300 hover:bg-[#31413c] xl:px-5 xl:text-sm"
          >
            Erstgespräch
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[#2223211f] bg-white/55 lg:hidden"
          aria-label="Navigation öffnen"
          aria-expanded={open}
        >
          <span className="relative h-3.5 w-4">
            <span className={`absolute left-0 top-0 h-px w-4 bg-[#222321] transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-px w-4 bg-[#222321] transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 grid max-w-[1180px] gap-1 rounded-3xl border border-[#2223211f] bg-[#fffdf8f2] p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-[#222321] hover:bg-[#f0eadf]">
              {label}
            </a>
          ))}
          <a href="#termine" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-[#1f2524] px-4 py-3 text-center text-sm font-semibold text-[#fffaf0]">
            Kostenloses Erstgespräch
          </a>
        </motion.div>
      ) : null}
    </header>
  );
}

function NeuralSignalVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const motionProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = [
      [0.08, 0.18],
      [0.22, 0.08],
      [0.37, 0.2],
      [0.52, 0.1],
      [0.72, 0.18],
      [0.9, 0.1],
      [0.14, 0.38],
      [0.31, 0.48],
      [0.48, 0.36],
      [0.65, 0.48],
      [0.82, 0.36],
      [0.06, 0.66],
      [0.24, 0.76],
      [0.42, 0.62],
      [0.58, 0.74],
      [0.76, 0.64],
      [0.94, 0.8],
      [0.34, 0.9],
      [0.68, 0.91]
    ];
    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [0, 6],
      [1, 7],
      [2, 8],
      [3, 8],
      [4, 9],
      [5, 10],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [6, 11],
      [7, 12],
      [8, 13],
      [9, 14],
      [10, 15],
      [15, 16],
      [12, 13],
      [13, 14],
      [14, 15],
      [12, 17],
      [14, 18],
      [17, 18]
    ];

    let width = 0;
    let height = 0;
    let raf = 0;
    let progress = 0;
    let running = true;

    const unsubscribe = motionProgress.on("change", (value) => {
      progress = value;
    });

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      const points = nodes.map(([x, y], index) => {
        const driftX = Math.cos(time / 3100 + index * 1.7) * 7;
        const driftY = Math.sin(time / 2400 + index) * 9;
        return [x * width + driftX, y * height + driftY] as const;
      });

      const field = ctx.createRadialGradient(width * 0.55, height * 0.48, 0, width * 0.55, height * 0.48, Math.max(width, height) * 0.7);
      field.addColorStop(0, "rgba(255, 250, 240, 0.42)");
      field.addColorStop(0.46, "rgba(205, 187, 157, 0.16)");
      field.addColorStop(1, "rgba(37, 59, 79, 0)");
      ctx.fillStyle = field;
      ctx.fillRect(0, 0, width, height);

      const base = ctx.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "rgba(37, 59, 79, 0.32)");
      base.addColorStop(0.55, "rgba(104, 121, 111, 0.38)");
      base.addColorStop(1, "rgba(205, 187, 157, 0.34)");

      ctx.lineWidth = 1.15;
      ctx.strokeStyle = base;
      edges.forEach(([a, b]) => {
        const [x1, y1] = points[a];
        const [x2, y2] = points[b];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        const cx = (x1 + x2) / 2 + Math.sin(time / 3800 + a) * 12;
        const cy = (y1 + y2) / 2 + Math.cos(time / 4200 + b) * 12;
        ctx.quadraticCurveTo(cx, cy, x2, y2);
        ctx.stroke();
      });

      const burst = 0.18 + Math.pow((Math.sin(progress * Math.PI * 10 + time / 620) + 1) / 2, 2) * 0.82;
      edges.slice(0, 12).forEach(([a, b], index) => {
        const [x1, y1] = points[a];
        const [x2, y2] = points[b];
        const sweep = (progress * 3.2 + time / 2800 + index * 0.09) % 1;
        const sx = x1 + (x2 - x1) * Math.max(0, sweep - 0.22);
        const sy = y1 + (y2 - y1) * Math.max(0, sweep - 0.22);
        const ex = x1 + (x2 - x1) * sweep;
        const ey = y1 + (y2 - y1) * sweep;
        ctx.strokeStyle = `rgba(255, 250, 240, ${0.16 + burst * 0.48})`;
        ctx.lineWidth = 1.6 + burst * 1.2;
        ctx.shadowColor = "rgba(255, 250, 240, 0.72)";
        ctx.shadowBlur = 14 + burst * 18;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      edges.forEach(([a, b], index) => {
        const [x1, y1] = points[a];
        const [x2, y2] = points[b];
        const t = (time / 3400 + progress * 2.8 + index * 0.053) % 1;
        const pulseX = x1 + (x2 - x1) * t;
        const pulseY = y1 + (y2 - y1) * t;
        const glow = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 36);
        glow.addColorStop(0, "rgba(255, 250, 240, 0.9)");
        glow.addColorStop(0.22, "rgba(205, 187, 157, 0.46)");
        glow.addColorStop(0.58, "rgba(37, 59, 79, 0.22)");
        glow.addColorStop(1, "rgba(37, 59, 79, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 36, 0, Math.PI * 2);
        ctx.fill();

        if (index % 4 === 0) {
          ctx.strokeStyle = "rgba(255, 250, 240, 0.52)";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(x1 + (x2 - x1) * Math.max(0, t - 0.08), y1 + (y2 - y1) * Math.max(0, t - 0.08));
          ctx.lineTo(pulseX, pulseY);
          ctx.stroke();
        }
      });

      points.forEach(([x, y], index) => {
        ctx.fillStyle = index % 3 === 0 ? "rgba(37, 59, 79, 0.88)" : "rgba(104, 121, 111, 0.76)";
        ctx.beginPath();
        ctx.arc(x, y, index % 4 === 0 ? 3.7 : 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      unsubscribe();
    };
  }, [motionProgress]);

  return (
    <div ref={wrapRef} className="relative min-h-[360px] overflow-hidden rounded-[2.6rem] border border-[#22232114] bg-[#e9dfcf]/70 shadow-[0_30px_100px_rgba(35,31,24,0.12)] md:min-h-[430px]">
      <div className="brain-shell absolute inset-[6%_8%_10%_8%]" aria-hidden="true">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="brain-divider" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,253,248,0.20),rgba(37,59,79,0.04))]" />
      <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/55 bg-[#fffdf8c9] p-5 backdrop-blur-2xl">
        <p className="eyebrow mb-3">Klarheit entsteht durch Einordnung</p>
        <div className="flex flex-wrap gap-2 text-xs text-[#514f49]">
          {["Stabilisierung", "Orientierung", "Handlungsspielraum"].map((item) => (
            <span key={item} className="rounded-full border border-[#22232114] bg-white/55 px-3 py-2">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="section-shell relative grid min-h-screen items-start gap-10 pb-16 pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.82fr)] lg:pt-40 xl:pt-40">
      <div className="hero-ambient" aria-hidden="true" />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
        <motion.p
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow mb-5"
        >
          Arman Ebadi · Psychologe M.Sc.
        </motion.p>
        <h1 className="max-w-4xl text-[clamp(3rem,5.35vw,5.45rem)] font-medium leading-[0.94] tracking-normal text-[#171717]">
          Klinisch-psychologische Beratung, die Klarheit schafft.
        </h1>
        <p className="mt-7 max-w-2xl text-xl leading-8 text-[#514f49] md:text-2xl md:leading-9">
          Zeitnah, kultursensibel und vertraulich - online per Video oder persönlich nach Absprache in Hamburg.
        </p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#6f6b63]">
          Ich unterstütze Einzelpersonen, Paare, Familien und Angehörige dabei, emotionale Belastungen, Angst, Grübeln, depressives Erleben, Beziehungsmuster und familiäre Dynamiken besser zu verstehen und konkrete nächste Schritte zu entwickeln.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#termine">Kostenloses Erstgespräch anfragen</ButtonLink>
          <ButtonLink href="#angebote" variant="secondary">
            Angebote ansehen
          </ButtonLink>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 grid max-w-xl grid-cols-3 overflow-hidden rounded-[1.35rem] border border-[#22232112] bg-[#fffdf875] backdrop-blur-xl"
        >
          {[
            ["24 h", "Rückmeldung"],
            ["3", "Sprachen"],
            ["Privat", "Diskret"]
          ].map(([value, label]) => (
            <div key={label} className="border-r border-[#22232110] p-4 last:border-r-0">
              <p className="text-xl font-semibold tracking-tight text-[#171717]">{value}</p>
              <p className="mt-1 text-xs font-medium text-[#6f6b63]">{label}</p>
            </div>
          ))}
        </motion.div>
        <div className="mt-5 flex flex-wrap gap-2">
          {trustTags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#22232114] bg-white/45 px-3 py-2 text-xs font-medium text-[#514f49]">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 26 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.05, ease: "easeOut", delay: 0.1 }}
        className="relative hero-stage-shell mx-auto w-full max-w-[540px] lg:mx-0 lg:mt-4"
      >
        <div className="portrait-stage">
          <div className="network-panel">
            <NeuralSignalVisual />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="section-shell pb-24">
      <div className="grid gap-px overflow-hidden rounded-[1.7rem] border border-[#22232112] bg-[#22232112] md:grid-cols-4">
        {trustItems.map((item) => (
          <motion.div key={item.title} {...fadeUp} className="bg-[#fffdf8b8] p-6 backdrop-blur-xl">
            <p className="mb-2 text-sm font-semibold text-[#222321]">{item.title}</p>
            <p className="text-sm leading-6 text-[#6f6b63]">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function KineticClarityBand() {
  const words = [
    "Depressive Stimmung",
    "Ängste",
    "Sorgen",
    "Grübeln",
    "Innere Anspannung",
    "Paarberatung",
    "Familienberatung",
    "Angehörigenberatung",
    "Migrationserfahrung",
    "Selbstwert",
    "Abgrenzung",
    "Emotionale Erschöpfung"
  ];
  return (
    <section className="kinetic-band" aria-label="Beratungsziele">
      <div className="kinetic-track">
        {[...words, ...words].map((word, index) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="text-[clamp(2.3rem,5vw,5rem)] font-medium leading-[0.96] tracking-normal text-[#171717]">{title}</h2>
      {text ? <p className="mt-6 text-lg leading-8 text-[#6f6b63]">{text}</p> : null}
    </motion.div>
  );
}

function ProblemSection() {
  const terms = ["Klarheit", "Stabilität", "Verstehen", "Handlungsspielraum", "Entlastung", "Orientierung"];
  return (
    <section className="section-shell grid gap-12 py-20 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:py-24">
      <motion.div {...fadeUp}>
        <p className="eyebrow mb-5">Psychologische Einordnung</p>
        <h2 className="max-w-[9.5ch] text-[clamp(2.35rem,4.3vw,4.25rem)] font-medium leading-[0.98] tracking-normal text-[#171717]">
          Wenn innerlich vieles schwer wird, braucht es einen Raum, der versteht.
        </h2>
      </motion.div>
      <div className="lg:pt-6">
        <motion.p {...fadeUp} className="max-w-2xl text-lg leading-8 text-[#514f49]">
          Manchmal ist es nicht ein einzelnes Problem. Es ist das Zusammenspiel aus innerer Anspannung, Grübeln, Erschöpfung, familiären Erwartungen, Beziehungskonflikten oder dem Gefühl, funktionieren zu müssen. In meiner Beratung geht es darum, diese Belastungen zu sortieren, Muster zu erkennen und wieder mehr Klarheit, Stabilität und Handlungsspielraum zu entwickeln.
        </motion.p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {terms.map((term, index) => (
            <motion.div
              key={term}
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              className="rounded-2xl border border-[#22232112] bg-white/42 p-4 text-center text-sm font-semibold text-[#31413c]"
            >
              {term}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyNowSection() {
  return (
    <section className="border-y border-[#22232110] bg-[#fffdf84f] py-20 lg:py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <motion.div {...fadeUp}>
          <p className="eyebrow mb-5">Zeitnahe Unterstützung</p>
          <h2 className="max-w-[10ch] text-[clamp(2.35rem,4.25vw,4.15rem)] font-medium leading-[0.99] tracking-normal text-[#171717]">
            Unterstützung, bevor aus Belastung Stillstand wird.
          </h2>
        </motion.div>
        <motion.div {...fadeUp} className="space-y-6 text-lg leading-8 text-[#5d5a53] lg:pt-6">
          <p>
            Viele Menschen merken, dass sie psychologisch belastet sind - und erleben gleichzeitig, wie schwer es sein kann, zeitnah passende Unterstützung zu finden. Lange Wartezeiten, unklare Zuständigkeiten oder fehlende Erreichbarkeit können zusätzlich verunsichern.
          </p>
          <p>
            Meine psychologische Beratung bietet einen niedrigschwelligen, zeitnahen und vertraulichen Rahmen, um Ihre Situation zu sortieren, emotionale Belastungen einzuordnen und konkrete nächste Schritte zu entwickeln.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {nowCards.map((card) => (
              <div key={card} className="rounded-2xl border border-[#22232112] bg-[#fffdf8a8] p-4 text-sm font-semibold text-[#253b4f] shadow-sm">
                {card}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="angebote" className="section-shell py-24">
      <SectionHeading
        eyebrow="Meine Angebote"
        title="Beratung, die sortiert, stabilisiert und Handlungsspielraum öffnet."
        text="Ich biete psychologische Beratung für Einzelpersonen, Paare, Familien und Angehörige. Je nach Anliegen arbeiten wir an Klärung, Stabilisierung, emotionaler Entlastung, Beziehungsmustern, familiären Dynamiken, kultursensiblen Themen und konkreten Handlungsmöglichkeiten im Alltag."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.68, delay: index * 0.045 }}
            whileHover={{ y: -6 }}
            className={`group rounded-[1.75rem] border border-[#22232112] bg-[#fffdf8b8] p-6 shadow-[0_22px_80px_rgba(35,31,24,0.07)] backdrop-blur-xl transition ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
          >
            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#e6ded0] text-[#253b4f] transition group-hover:bg-[#253b4f] group-hover:text-[#fffdf8]">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-[#171717]">{service.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[#6f6b63]">{service.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function FocusAreas() {
  return (
    <section id="schwerpunkte" className="section-shell py-24">
      <div className="grid gap-12 xl:grid-cols-[0.76fr_1.24fr]">
        <motion.div {...fadeUp}>
          <p className="eyebrow mb-5">Schwerpunkte</p>
          <h2 className="text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.96] tracking-normal text-[#171717]">
            Wobei ich Sie unterstützen kann
          </h2>
          <p className="mt-7 text-lg leading-8 text-[#6f6b63]">
            Belastungen entstehen nicht im luftleeren Raum. Herkunft, Familie, Beziehungserfahrungen, kulturelle Prägungen, biografische Erfahrungen und aktuelle Lebensumstände können eng miteinander verwoben sein. In meiner Beratung betrachten wir diese Zusammenhänge mit fachlicher Klarheit und menschlicher Sensibilität.
          </p>
        </motion.div>
        <div className="focus-grid grid gap-4 md:grid-cols-2">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.58, delay: index * 0.035 }}
              whileHover={{ y: -4 }}
              className="group rounded-[1.8rem] border border-[#22232112] bg-[#fffdf8bf] p-5 shadow-[0_18px_60px_rgba(35,31,24,0.06)] backdrop-blur-xl transition"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e9dfcf] text-[#253b4f] transition group-hover:bg-[#253b4f] group-hover:text-[#fffdf8]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-6 text-[#171717]">{area.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#6f6b63]">{area.text}</p>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="kosten" className="bg-[#1f2524] py-24 text-[#fffaf0]">
      <div className="section-shell">
        <motion.div {...fadeUp} className="max-w-3xl">
          <p className="eyebrow mb-5 text-[#bfcabe]">Honorare</p>
          <h2 className="text-[clamp(2.6rem,5.4vw,5.6rem)] font-medium leading-[0.95] tracking-normal">
            Transparent, privat und ruhig kalkulierbar.
          </h2>
          <p className="mt-7 text-lg leading-8 text-[#d9d4c8]">
            Meine Beratung ist eine private Leistung. Damit Sie vorab Klarheit haben, finden Sie hier eine transparente Übersicht der Beratungsformate.
          </p>
          <p className="mt-3 text-sm text-[#b9b2a5]">Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.</p>
        </motion.div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {pricing.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.65, delay: index * 0.04 }}
              className={`rounded-[1.65rem] border p-6 ${
                card.featured
                  ? "border-[#d9d4c840] bg-[#fffaf0] text-[#1f2524] shadow-[0_30px_100px_rgba(255,250,240,0.13)]"
                  : "border-[#fffaf01f] bg-[#fffaf00b] text-[#fffaf0]"
              }`}
            >
              <p className={`text-xs font-bold uppercase tracking-[0.14em] ${card.featured ? "text-[#68796f]" : "text-[#bfcabe]"}`}>{card.meta}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{card.title}</h3>
              <p className={`mt-4 min-h-[84px] text-sm leading-7 ${card.featured ? "text-[#5d5a53]" : "text-[#d9d4c8]"}`}>{card.text}</p>
              <div className="mt-6 space-y-3">
                {card.items.map((item) => (
                  <div key={item} className={`flex gap-3 rounded-2xl border p-3 text-sm ${card.featured ? "border-[#22232112] bg-[#f5efe4]" : "border-[#fffaf014] bg-[#fffaf008]"}`}>
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              {card.featured ? (
                <a href="#termine" className="btn-primary mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#1f2524] px-4 py-3 text-sm font-semibold text-[#fffaf0]">
                  Erstgespräch buchen
                </a>
              ) : null}
            </motion.article>
          ))}
        </div>
        <p className="mt-10 max-w-4xl text-sm leading-7 text-[#c9c2b4]">
          Die Honorare beziehen sich auf psychologische Beratung. Es handelt sich nicht um heilkundliche Psychotherapie und nicht um eine Leistung der gesetzlichen Krankenversicherung. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
        </p>
      </div>
    </section>
  );
}

function OnlineAndPersonalSection() {
  return (
    <section className="section-shell py-24">
      <SectionHeading
        eyebrow="Setting"
        title="Online-Beratung - persönliche Termine nach Absprache"
        text="Der Schwerpunkt meines Angebots liegt auf vertraulicher Beratung per Video. In ausgewählten Fällen sind persönliche Termine oder Hausbesuche in Hamburg nach individueller Absprache möglich. Voraussetzung ist ein ruhiger, geschützter Rahmen, in dem Diskretion, Sicherheit und konzentriertes Arbeiten gewährleistet sind."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {accessCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.article key={card.title} {...fadeUp} className="rounded-[1.65rem] border border-[#22232112] bg-[#fffdf88f] p-6 backdrop-blur-xl">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-[#253b4f] text-[#fffaf0]">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#6f6b63]">{card.text}</p>
            </motion.article>
          );
        })}
      </div>
      <motion.div {...fadeUp} className="mt-6 rounded-[1.8rem] border border-[#22232112] bg-[#fffdf8b8] p-7 backdrop-blur-xl">
        <div className="grid gap-8 md:grid-cols-[auto_1fr]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7ded1] text-[#253b4f]">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Privat, diskret und ohne Kassenverfahren</h3>
            <p className="mt-4 text-base leading-8 text-[#5d5a53]">
              Meine Beratung ist eine private Leistung und wird nicht über die gesetzliche Krankenkasse abgerechnet. Deshalb übermittle ich keine Abrechnungsdiagnose an Ihre Krankenkasse.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d5a53]">
              Für Sie bedeutet das: Sie können psychologische Unterstützung in Anspruch nehmen, ohne dass im Rahmen meiner Beratung eine Diagnose zur Abrechnung mit der gesetzlichen Krankenkasse erforderlich ist.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="ueber-mich" className="border-y border-[#22232110] bg-[#fffdf84f] py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div {...fadeUp}>
          <p className="eyebrow mb-5">Über mich</p>
          <h2 className="text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.96] tracking-normal text-[#171717]">Fachlich klar. Menschlich sensibel. Strukturiert im Vorgehen.</h2>
          <div className="about-visual mt-8">
            <div className="about-portrait-ring">
              <div className="about-portrait">
                <img src="/images/arman-ebadi.png" alt="Arman Ebadi" className="h-full w-full object-cover object-[52%_35%]" />
              </div>
            </div>
            <div className="about-note">
              <span>Hamburg</span>
              <span>Deutsch · Englisch · Dari/Farsi</span>
            </div>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="space-y-6 text-lg leading-8 text-[#5d5a53]">
          <p>
            Ich bin Psychologe M.Sc. mit Schwerpunkt Klinische Psychologie und Psychotherapie. Durch praktische Erfahrungen in ambulanten, stationären sowie kinder- und jugendpsychiatrischen Einrichtungen bringe ich ein differenziertes Verständnis für psychische Belastungen, familiäre Dynamiken, Krisen und komplexe Lebensgeschichten mit.
          </p>
          <p>
            Als in Hamburg aufgewachsener Mensch aus einer Migrantenfamilie kenne ich die Spannungsfelder zwischen familiären Erwartungen, kulturellen Prägungen und westlich geprägten Lebensmodellen auch aus eigener Perspektive. Diese Erfahrung verbinde ich mit meinem klinisch-psychologischen Fachwissen.
          </p>
          <p>
            Ich arbeite strukturiert, empathisch und wissenschaftlich fundiert - mit dem Ziel, Belastungen verständlicher zu machen, Stabilität zu fördern und konkrete Schritte im Alltag zu entwickeln.
          </p>
          <div className="grid gap-3 pt-4">
            {qualifications.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-[#22232112] bg-white/43 p-4 text-sm font-medium leading-6 text-[#363631]">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[#68796f]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="ablauf" className="section-shell py-24">
      <SectionHeading eyebrow="Ablauf" title="So läuft die Beratung ab" />
      <div className="mx-auto mt-14 max-w-4xl">
        {process.map(([title, text], index) => (
          <motion.div key={title} {...fadeUp} className="grid gap-5 border-t border-[#22232112] py-7 sm:grid-cols-[120px_1fr]">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#253b4f] text-sm font-semibold text-[#fffaf0]">{index + 1}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-base leading-7 text-[#6f6b63]">{text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BookingSystem() {
  const type = "Kostenfreies Erstgespräch";
  const [format, setFormat] = useState(appointmentFormats[0]);
  const [slot, setSlot] = useState(`${appointmentSlots[0].date}, ${appointmentSlots[0].times[0]}`);
  const [language, setLanguage] = useState("Deutsch");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const inputClass = "focus-ring min-h-12 w-full rounded-2xl border border-[#fffaf024] bg-[#fffaf00d] px-4 text-sm text-[#fffaf0] transition placeholder:text-[#b9b2a5] focus:border-[#fffaf066]";

  return (
    <section id="termine" className="section-shell py-24">
      <div className="grid gap-10 rounded-[2rem] border border-[#22232112] bg-[#1f2524] p-5 text-[#fffaf0] shadow-[0_30px_110px_rgba(35,31,24,0.16)] md:p-9 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div {...fadeUp}>
          <p className="eyebrow mb-5 text-[#bfcabe]">Terminsystem</p>
          <h2 className="text-[clamp(2.4rem,5vw,5.1rem)] font-medium leading-[0.96] tracking-normal">
            Erstgespräch direkt buchen.
          </h2>
          <p className="mt-7 text-lg leading-8 text-[#d9d4c8]">
            Der Einstieg erfolgt immer über ein kostenfreies Erstgespräch. Wählen Sie das bevorzugte Setting, einen freien Termin und hinterlegen Sie direkt Ihre Kontaktdaten.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-[#d9d4c8]">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-4 w-4" />
              Direkte Terminbuchung ohne externes Portal
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4" />
              Kostenfreies Erstgespräch in 15 Minuten
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4" />
              Persönliche Termine nur nach individueller Absprache
            </div>
          </div>
        </motion.div>

        <motion.form
          {...fadeUp}
          onSubmit={(event) => {
            event.preventDefault();
            setConfirmed(true);
          }}
          className="rounded-[1.7rem] border border-[#fffaf01f] bg-[#fffaf00d] p-4 backdrop-blur-xl sm:p-6"
        >
          <div className="grid gap-5">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#bfcabe]">Einstieg</p>
              <div className="rounded-[1.35rem] border border-[#fffaf01f] bg-[#fffaf00d] p-4">
                <p className="text-lg font-semibold text-[#fffaf0]">{type}</p>
                <p className="mt-2 text-sm leading-6 text-[#d9d4c8]">
                  15 Minuten, kostenlos. Wir klären Ihr Anliegen, die passende Sprache und welcher Beratungsrahmen danach sinnvoll ist.
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#bfcabe]">Format</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {appointmentFormats.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFormat(item);
                      setConfirmed(false);
                    }}
                    className={`focus-ring rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      format === item
                        ? "border-[#fffaf066] bg-[#fffaf0] text-[#1f2524]"
                        : "border-[#fffaf01f] bg-[#fffaf00a] text-[#eee7d9] hover:bg-[#fffaf014]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#bfcabe]">Freier Termin</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {appointmentSlots.map((day) => (
                  <div key={day.date} className="rounded-2xl border border-[#fffaf01a] bg-[#fffaf008] p-3">
                    <div className="mb-3 flex items-baseline justify-between">
                      <p className="text-sm font-semibold">{day.day}</p>
                      <p className="text-xs text-[#c9c2b4]">{day.date}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {day.times.map((time) => {
                        const value = `${day.date}, ${time}`;
                        const selected = slot === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => {
                              setSlot(value);
                              setConfirmed(false);
                            }}
                            className={`focus-ring rounded-full border px-2 py-2 text-xs font-semibold transition ${
                              selected
                                ? "border-[#fffaf066] bg-[#fffaf0] text-[#1f2524]"
                                : "border-[#fffaf01f] text-[#eee7d9] hover:bg-[#fffaf014]"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-[#fffaf0]">
                Name
                <input
                  className={inputClass}
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setConfirmed(false);
                  }}
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[#fffaf0]">
                E-Mail
                <input
                  className={inputClass}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setConfirmed(false);
                  }}
                  required
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-[#fffaf0]">
              Sprache
              <select
                className={inputClass}
                name="language"
                value={language}
                onChange={(event) => {
                  setLanguage(event.target.value);
                  setConfirmed(false);
                }}
              >
                <option value="Deutsch">Deutsch</option>
                <option value="Englisch">Englisch</option>
                <option value="Dari/Farsi">Dari/Farsi</option>
              </select>
            </label>

            <div className="rounded-[1.35rem] border border-[#fffaf01f] bg-[#fffaf00d] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#bfcabe]">Ihre Buchung</p>
              <p className="mt-3 text-lg font-semibold">{type}</p>
              <p className="mt-1 text-sm text-[#d9d4c8]">{format} · {slot} · {language}</p>
              <p className="mt-3 text-xs leading-5 text-[#b9b2a5]">
                Mit der Buchung reservieren Sie diesen Termin für das Erstgespräch. Für akute Krisen ist dieses Angebot nicht geeignet.
              </p>
            </div>

            <button
              type="submit"
              className="btn-inverse focus-ring min-h-12 rounded-full bg-[#fffaf0] px-5 text-sm font-semibold text-[#1f2524] transition hover:bg-white"
            >
              Erstgespräch verbindlich buchen
            </button>

            {confirmed ? (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[#e7efe8] px-4 py-3 text-sm font-medium text-[#31413c]">
                Termin gebucht: {type}, {format}, {slot}. Die Bestätigung geht an {email}.
              </motion.p>
            ) : null}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section-shell py-24">
      <SectionHeading eyebrow="FAQ" title="Häufige Fragen" />
      <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-[1.8rem] border border-[#22232112] bg-[#fffdf88f]">
        {faqs.map(([question, answer], index) => {
          const isOpen = open === index;
          return (
            <div key={question} className="border-b border-[#22232110] last:border-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="focus-ring flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7"
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold text-[#222321] sm:text-lg">{question}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden">
                <p className="px-5 pb-6 text-sm leading-7 text-[#6f6b63] sm:px-7">{answer}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#22232112] bg-[#eee8dc] py-12">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xl font-semibold tracking-tight">Elbmind</p>
          <p className="mt-3 text-sm leading-7 text-[#6f6b63]">
            Psychologische Beratung<br />
            Psychologe M.Sc.<br />
            Klinische Psychologie & Psychotherapie<br />
            Arman Ebadi
          </p>
        </div>
        <div className="grid gap-6 text-sm text-[#5d5a53] md:grid-cols-2">
          <div className="space-y-2">
            <p>Online per Video</p>
            <p>Persönliche Termine nach Absprache in Hamburg</p>
            <p>Deutsch · Englisch · Dari/Farsi</p>
          </div>
          <div className="space-y-3">
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#171717]">Impressum</a>
              <a href="#" className="hover:text-[#171717]">Datenschutz</a>
              <a href="#" className="hover:text-[#171717]">Rechtlicher Hinweis</a>
            </div>
            <p className="text-xs leading-6 text-[#6f6b63]">
              Mein Angebot ist psychologische Beratung und keine heilkundliche Psychotherapie. Es ersetzt keine ärztliche, psychotherapeutische oder psychiatrische Behandlung. Bei akuten Krisen wenden Sie sich bitte an den Rettungsdienst, die nächstgelegene Notaufnahme oder den ärztlichen Bereitschaftsdienst. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="fixed left-0 top-0 z-[70] h-px origin-left bg-[#253b4f]" style={{ scaleX }} />;
}

export default function Home() {
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Elbmind - Psychologische Beratung",
      areaServed: "Hamburg",
      availableLanguage: ["German", "English", "Dari", "Farsi"],
      description: "Klinisch-psychologisch fundierte Beratung für Einzelpersonen, Paare, Familien und Angehörige."
    }),
    []
  );

  return (
    <main className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ScrollProgress />
      <Header />
      <Hero />
      <TrustBar />
      <KineticClarityBand />
      <ProblemSection />
      <WhyNowSection />
      <Services />
      <FocusAreas />
      <Pricing />
      <OnlineAndPersonalSection />
      <About />
      <Process />
      <BookingSystem />
      <FAQ />
      <Footer />
      <div className="noise" />
    </main>
  );
}
