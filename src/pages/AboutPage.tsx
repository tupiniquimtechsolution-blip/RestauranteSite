import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
import { philosophy, team } from "../config/content";
import { business } from "../config/business";
import { images } from "../config/images";
import { AnimatedCounter, Kicker, ScrollReveal, SectionHeading } from "../components/ui";

export default function AboutPage() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* abertura editorial */}
      <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-16 sm:pt-40 sm:pb-24" aria-label="Sobre o Porto Baa'R Black">
        <div className="shell relative grid items-end gap-12 lg:grid-cols-2">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Kicker>Desde {business.since} · Tatuapé</Kicker>
            <h1 className="display-tight mt-5 font-display uppercase text-cream">
              <span className="block text-5xl sm:text-7xl">Um container,</span>
              <span className="block text-6xl text-ember sm:text-8xl">uma brasa,</span>
              <span className="block text-5xl sm:text-7xl">um bairro inteiro.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-sand sm:text-lg">
              O {business.name} nasceu de uma aposta simples: dava pra fazer burger de brasa de verdade, com chope artesanal
              girando e música ao vivo, dentro de um container de carga preto. Deu certo — e o bairro adotou.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 h-20 w-20 border-l-2 border-t-2 border-gold/60" aria-hidden />
            <img
              src={images.interior}
              alt="Fachada do container do Porto Baa'R Black iluminado à noite"
              className="aspect-[16/10] w-full border border-line object-cover"
            />
            <p className="absolute bottom-4 right-4 bg-bg/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
              A casa, desde o primeiro dia
            </p>
          </motion.div>
        </div>
      </section>

      {/* manifesto / filosofia */}
      <section className="border-b border-line bg-panel py-24 sm:py-28" aria-label="Nossa filosofia">
        <div className="shell">
          <SectionHeading
            kicker="Manifesto black"
            title={
              <>
                O que não <span className="text-ember">negociamos</span>
              </>
            }
          />
          <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {philosophy.map((p, i) => (
              <ScrollReveal key={p.n} delay={(i % 2) * 0.1}>
                <article className="group flex gap-6 border-t border-line pt-7 transition-colors hover:border-ember">
                  <p className="font-display text-5xl text-outline transition-colors group-hover:text-ember group-hover:[-webkit-text-stroke:0px]">
                    {p.n}
                  </p>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-wide text-cream">{p.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-sand">{p.text}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* equipe */}
      <section className="bg-bg py-24 sm:py-28" aria-label="Equipe">
        <div className="shell">
          <SectionHeading
            kicker="Quem toca o fogo"
            title={
              <>
                A tropa da <span className="text-ember">chapa</span>
              </>
            }
            description="Equipe enxuta, obcecada e barulhenta — do jeito que cozinha boa tem que ser."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 0.1} y={32}>
                <article className="group border border-line bg-panel transition-all duration-300 hover:-translate-y-1.5 hover:border-ember/60 hover:shadow-lift">
                  <div className="relative overflow-hidden">
                    <img
                      src={m.image}
                      alt={`Foto ilustrativa de ${m.name}, ${m.role}`}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                    <p className="absolute left-4 top-4 border border-gold/40 bg-bg/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
                      foto ilustrativa
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl uppercase tracking-wide text-cream">{m.name}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-ember">{m.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-sand">{m.bio}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* números + CTA */}
      <section className="relative overflow-hidden border-t border-line bg-panel py-24 sm:py-28" aria-label="Números da casa">
        <img src={images.bgBrasa} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.1]" aria-hidden />
        <div className="shell relative">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {business.stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.08}>
                <div className="border-l-2 border-ember/60 pl-5">
                  <p className="font-display text-6xl text-cream">
                    <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-sand">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-16 flex flex-col items-start justify-between gap-6 border border-line bg-bg p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.26em] text-gold">
                  <Flame aria-hidden size={13} /> Próximo capítulo
                </p>
                <p className="display-tight mt-3 font-display text-3xl uppercase text-cream sm:text-4xl">
                  Vem provar a brasa <span className="text-ember">de perto.</span>
                </p>
              </div>
              <Link
                to="/cardapio"
                className="group flex shrink-0 items-center gap-3 bg-ember px-7 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-bg transition-all duration-300 hover:bg-gold hover:shadow-ember"
              >
                Ver cardápio
                <ArrowRight aria-hidden size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
