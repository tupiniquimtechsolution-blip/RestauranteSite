import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Flame } from "lucide-react";

/* ============================================================
   Blocos de UI reutilizáveis: reveal, cabeçalho de seção,
   contadores, letreiro e logo.
   ============================================================ */

export function ScrollReveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] sm:text-xs uppercase tracking-[0.32em] text-ember ${className}`}>
      <span aria-hidden className="mr-2 inline-block h-[2px] w-6 bg-ember align-middle" />
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  light = false,
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <ScrollReveal>
        <Kicker className={align === "center" ? "justify-center" : ""}>{kicker}</Kicker>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <h2
          className={`display-tight mt-4 font-display text-4xl uppercase sm:text-5xl lg:text-6xl ${
            light ? "text-bg" : "text-cream"
          }`}
        >
          {title}
        </h2>
      </ScrollReveal>
      {description && (
        <ScrollReveal delay={0.16}>
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? "text-bg/70" : "text-sand"}`}>{description}</p>
        </ScrollReveal>
      )}
    </div>
  );
}

/** Contador animado que respeita prefers-reduced-motion */
export function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals).replace(".", ",")
      : Math.round(display).toLocaleString("pt-BR");

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}

/** Letreiro contínuo (marquee) — conteúdo duplicado p/ loop perfeito */
export function Marquee({ items, className = "", speed = 28 }: { items: string[]; className?: string; speed?: number }) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 font-display text-sm uppercase tracking-[0.18em] text-cream/85 sm:text-base">{item}</span>
          <Flame aria-hidden size={14} className="text-ember" />
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={`marquee-paused overflow-hidden border-y border-line bg-panel py-3 ${className}`}
      style={{ "--marquee-speed": `${speed}s` } as CSSProperties}
      role="presentation"
    >
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Logo tipográfica em SVG — substituir por arquivo oficial quando houver */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#/" className="group flex items-center gap-2.5" aria-label="Porto Baa'R Black — início">
      <span className="relative grid h-9 w-9 place-items-center bg-ember text-bg transition-transform duration-300 group-hover:-rotate-6">
        <Flame aria-hidden size={19} strokeWidth={2.4} />
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 border border-bg bg-gold" aria-hidden />
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg uppercase tracking-wide text-cream">
          Porto Baa<span className="text-ember">'R</span>
        </span>
        {!compact && (
          <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.42em] text-sand">Black · Est. 2019</span>
        )}
      </span>
    </a>
  );
}
