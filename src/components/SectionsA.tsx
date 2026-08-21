import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Copy, Flame, UtensilsCrossed } from "lucide-react";
import { promos, storySteps } from "../config/content";
import { business } from "../config/business";
import { images } from "../config/images";
import { getItemById } from "../config/menu";
import { formatBRL } from "../lib/format";
import { AnimatedCounter, Kicker, ScrollReveal, SectionHeading } from "./ui";
import { useCart } from "../context/CartContext";

/* ============================================================
   SEÇÕES NARRATIVAS — destaque do chef, storytelling sticky,
   promoções e nossa história.
   ============================================================ */

export function ChefSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { add } = useCart();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const dish = getItemById("costela-12h") ?? getItemById("smash-black");
  if (!dish) return null;

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-line bg-panel py-24 sm:py-32" aria-label="Destaque do chef">
      <div className="shell grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <ScrollReveal>
          <div>
            <Kicker>Direto da parrilla</Kicker>
            <h2 className="display-tight mt-4 font-display text-5xl uppercase text-cream sm:text-6xl lg:text-7xl">
              O prato que o chef <span className="text-ember">não tira</span> do cardápio
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-sand sm:text-lg">{dish.description}</p>
            <ul className="mt-6 grid max-w-md gap-2.5">
              {dish.ingredients.slice(0, 4).map((ing) => (
                <li key={ing} className="flex items-center gap-2.5 text-sm text-sand">
                  <Check aria-hidden size={14} className="shrink-0 text-ember" /> {ing}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <p className="font-display text-4xl text-gold">{formatBRL(dish.price)}</p>
              <button
                type="button"
                onClick={() => add(dish.id)}
                className="flex items-center gap-2.5 bg-ember px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-bg transition-all duration-300 hover:bg-gold hover:shadow-ember active:scale-95"
              >
                <UtensilsCrossed aria-hidden size={15} /> Adicionar ao pedido
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute -inset-6 border border-gold/20" aria-hidden />
          <div className="overflow-hidden border border-line">
            <motion.img
              src={dish.image}
              alt={dish.name}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
              style={reduce ? undefined : { y: imgY, scale: 1.15 }}
            />
          </div>
          <p className="absolute -bottom-4 left-6 border border-line bg-bg px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            12h de defumação lenta
          </p>
        </div>
      </div>
    </section>
  );
}

export function StorySticky() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.step ?? 0);
            setStep(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-bg py-24 sm:py-32" aria-label="Como fazemos">
      <div className="shell">
        <SectionHeading
          kicker="Da brasa ao prato"
          title={
            <>
              O ritual do <span className="text-ember">smash</span> em 4 atos
            </>
          }
          description="Role e acompanhe: cada capítulo muda a cena. O processo inteiro leva menos de 8 minutos — a obsessão, anos."
        />
      </div>

      <div className="shell mt-16 grid gap-10 lg:grid-cols-2 lg:gap-20">
        {/* imagem sticky */}
        <div className="relative hidden lg:block">
          <div className="sticky top-28 h-[70vh] overflow-hidden border border-line">
            <AnimatePresence mode="wait">
              <motion.img
                key={step}
                src={storySteps[step].image}
                alt={storySteps[step].title}
                className="absolute inset-0 h-full w-full object-cover"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 border border-gold/40 bg-bg/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
              {storySteps[step].stat}
            </p>
            <div className="absolute right-5 top-5 flex gap-1.5" aria-hidden>
              {storySteps.map((s, i) => (
                <span key={s.id} className={`h-1 w-8 transition-colors duration-500 ${i <= step ? "bg-ember" : "bg-line"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* capítulos */}
        <div>
          {storySteps.map((s, i) => (
            <section
              key={s.id}
              data-step={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="min-h-[52vh] border-t border-linesoft py-12 first:border-t-0 lg:min-h-[46vh]"
              aria-label={s.title}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{s.kicker}</p>
              <h3
                className={`display-tight mt-4 font-display text-4xl uppercase transition-all duration-500 sm:text-5xl ${
                  step === i ? "text-cream" : "text-cream/35"
                }`}
              >
                {s.title}
              </h3>
              <p className={`mt-5 max-w-md leading-relaxed transition-colors duration-500 ${step === i ? "text-sand" : "text-sand/45"}`}>
                {s.text}
              </p>
              {/* imagem no mobile (sem sticky) */}
              <div className="mt-6 overflow-hidden border border-line lg:hidden">
                <img src={s.image} alt={s.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              </div>
              <p className="mt-5 inline-block border border-line bg-panel px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold lg:hidden">
                {s.stat}
              </p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Promos() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const count = promos.length;

  const go = (i: number) => setIndex(((i % count) + count) % count);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [reduce, paused, count]);

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section
      className="border-y border-line bg-panel py-24 sm:py-28"
      aria-label="Promoções da casa"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Pra hoje"
            title={
              <>
                Rolando na <span className="text-ember">chapa</span>
              </>
            }
          />
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="grid h-11 w-11 place-items-center border border-line text-sand transition-all hover:border-ember hover:text-ember"
              aria-label="Promoção anterior"
            >
              <ArrowLeft aria-hidden size={17} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="grid h-11 w-11 place-items-center border border-line text-sand transition-all hover:border-ember hover:text-ember"
              aria-label="Próxima promoção"
            >
              <ArrowRight aria-hidden size={17} />
            </button>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden border border-line bg-bg" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.article
              key={promos[index].id}
              className="grid md:grid-cols-2"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative min-h-[240px] md:min-h-[380px]">
                <img src={promos[index].image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg/60 md:to-bg" />
                <span className="absolute left-4 top-4 bg-ember px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-bg">
                  {promos[index].badge}
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <h3 className="display-tight font-display text-4xl uppercase text-cream sm:text-5xl">{promos[index].title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-sand">{promos[index].description}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-gold">{promos[index].detail}</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {promos[index].code && (
                    <button
                      type="button"
                      onClick={() => copyCode(promos[index].code!)}
                      className="flex items-center gap-2.5 border border-dashed border-gold/60 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-gold transition-all hover:bg-gold/10"
                    >
                      {copied === promos[index].code ? (
                        <>
                          <Check aria-hidden size={13} /> copiado!
                        </>
                      ) : (
                        <>
                          <Copy aria-hidden size={13} /> cupom {promos[index].code}
                        </>
                      )}
                    </button>
                  )}
                  <Link
                    to="/cardapio"
                    className="bg-ember px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-bg transition-all hover:bg-gold hover:shadow-ember"
                  >
                    Aproveitar agora
                  </Link>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="flex items-center justify-between border-t border-line px-5 py-3.5">
            <div className="flex gap-2">
              {promos.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir para promoção ${i + 1}`}
                  className={`h-1.5 transition-all duration-400 ${i === index ? "w-10 bg-ember" : "w-5 bg-line hover:bg-sand/50"}`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sand">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OurStory() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32" aria-label="Nossa história">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <motion.div style={reduce ? undefined : { y }} aria-hidden>
            <img src={images.interior} alt="Container do Porto Baa'R Black iluminado à noite" loading="lazy" className="w-full border border-line object-cover" />
          </motion.div>
          <div className="absolute -bottom-6 -right-4 border border-line bg-panel p-5 sm:-right-8 sm:p-6">
            <p className="font-display text-4xl text-ember">
              <AnimatedCounter value={business.stats[0].value} /> anos
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-sand">de brasa acesa no bairro</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            kicker="Nossa história"
            title={
              <>
                Nascemos num <span className="text-ember">container</span> — e ficamos
              </>
            }
            description={`${business.since}: dois amigos, um container de carga aposentado e a certeza de que o Tatuapé merecia burger de brasa com chope de verdade. O container virou ponto de encontro — a certeza, rotina.`}
          />
          <ScrollReveal delay={0.2}>
            <Link
              to="/sobre"
              className="group mt-8 inline-flex items-center gap-3 border-b border-ember pb-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ember transition-colors hover:text-gold"
            >
              Conhecer a história completa
              <ArrowRight aria-hidden size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.28}>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-linesoft pt-8">
              {business.stats.slice(1).map((s) => (
                <div key={s.label}>
                  <dt className="order-2 mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-sand">{s.label}</dt>
                  <dd className="font-display text-4xl text-cream">
                    <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export function MarqueeStrip() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="relative">
      <div className="flex items-center gap-4 overflow-hidden border-y border-line bg-ember py-3">
        <motion.div
          className="flex shrink-0 items-center"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((n) => (
            <span key={n} className="flex items-center">
              {["Open burger toda quinta", "12 torneiras de chope", "Música ao vivo", "Delivery no Tatuapé", "Brasa de verdade"].map((t) => (
                <span key={t} className="flex items-center font-display text-sm uppercase tracking-[0.16em] text-bg">
                  <span className="px-5">{t}</span>
                  <Flame size={13} />
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
