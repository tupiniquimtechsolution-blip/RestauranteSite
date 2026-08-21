import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Bike,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Heart,
  Instagram,
  MapPin,
  Navigation,
  Star,
  Store,
  X,
} from "lucide-react";
import { instagramTiles, testimonials } from "../config/content";
import { business } from "../config/business";
import { images } from "../config/images";
import { formatBRL } from "../lib/format";
import { createWhatsAppUrl, interestMessage } from "../lib/whatsapp";
import { ScrollReveal, SectionHeading } from "./ui";

/* ============================================================
   SEÇÕES B — delivery, avaliações, localização, Instagram,
   CTA final com parallax.
   ============================================================ */

export function DeliverySection() {
  return (
    <section className="border-t border-line bg-panel py-24 sm:py-28" aria-label="Delivery e retirada">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <SectionHeading
            kicker="Chega quente"
            title={
              <>
                Do container <span className="text-ember">até você</span>
              </>
            }
            description="Entregamos com embalagem que respira — a crosta chega viva. Prefere buscar? Sai direto da chapa, no balcão."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <ScrollReveal>
              <div className="border border-line bg-bg p-5">
                <Bike aria-hidden size={22} className="text-ember" />
                <p className="mt-3 font-display text-xl uppercase text-cream">Delivery próprio</p>
                <p className="mt-1.5 text-sm leading-relaxed text-sand">
                  {business.delivery.areas.length} regiões atendidas a partir de {formatBRL(business.delivery.areas[0].fee)}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="border border-line bg-bg p-5">
                <Store aria-hidden size={22} className="text-ember" />
                <p className="mt-3 font-display text-xl uppercase text-cream">Retirada no balcão</p>
                <p className="mt-1.5 text-sm leading-relaxed text-sand">Sem taxa e saindo da chapa — avise o horário no pedido</p>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.14}>
            <p className="mt-6 text-xs leading-relaxed text-sand/70">{business.delivery.note}</p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              <Clock aria-hidden size={13} /> Pedido mínimo {formatBRL(business.delivery.minOrder)}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          <div className="overflow-hidden border border-line bg-bg">
            <table className="w-full text-sm">
              <caption className="border-b border-line px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.24em] text-sand">
                Regiões e taxas (demonstrativo)
              </caption>
              <thead>
                <tr className="border-b border-line text-left font-mono text-[10px] uppercase tracking-[0.2em] text-sand">
                  <th scope="col" className="px-5 py-3 font-medium">Bairro</th>
                  <th scope="col" className="px-5 py-3 font-medium">Taxa</th>
                  <th scope="col" className="px-5 py-3 font-medium">Tempo</th>
                </tr>
              </thead>
              <tbody>
                {business.delivery.areas.map((a, i) => (
                  <tr key={a.name} className={`transition-colors hover:bg-panel ${i > 0 ? "border-t border-linesoft" : ""}`}>
                    <td className="px-5 py-3.5 text-cream">{a.name}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-gold">{formatBRL(a.fee)}</td>
                    <td className="px-5 py-3.5 text-sand">{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 5500);
    return () => window.clearInterval(id);
  }, [reduce, paused, count]);

  const go = (i: number) => setIndex(((i % count) + count) % count);
  const t = testimonials[index];

  return (
    <section
      className="bg-bg py-24 sm:py-28"
      aria-label="Avaliações de clientes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeading
            kicker="Quem prova, conta"
            title={
              <>
                A rua já <span className="text-ember">falou</span>
              </>
            }
            description="Depoimentos demonstrativos para apresentação do projeto — as avaliações reais entram na personalização."
          />
          <div className="mt-8 flex gap-2.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="grid h-11 w-11 place-items-center border border-line text-sand transition-all hover:border-ember hover:text-ember"
              aria-label="Avaliação anterior"
            >
              <ChevronLeft aria-hidden size={17} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="grid h-11 w-11 place-items-center border border-line text-sand transition-all hover:border-ember hover:text-ember"
              aria-label="Próxima avaliação"
            >
              <ChevronRight aria-hidden size={17} />
            </button>
          </div>
        </div>

        <div className="relative min-h-[430px] sm:min-h-[340px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              className="absolute inset-0 flex flex-col justify-between border border-line bg-panel p-8 sm:p-10"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <div className="flex items-center gap-1" aria-label={`${t.rating} de 5 estrelas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden
                      size={15}
                      className={i < Math.round(t.rating) ? "text-gold" : "text-line"}
                      fill={i < Math.round(t.rating) ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-2 font-mono text-xs text-sand">{t.rating.toFixed(1).replace(".", ",")}</span>
                </div>
                <p className="mt-6 font-display text-2xl uppercase leading-snug text-cream sm:text-3xl">“{t.text}”</p>
              </div>
              <footer className="mt-8 flex items-center justify-between gap-4 border-t border-linesoft pt-5">
                <cite className="not-italic">
                  <span className="block font-semibold text-cream">{t.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sand">{t.area}</span>
                </cite>
                <span className="border border-line bg-bg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
                  pediu: {t.item}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>

      <div className="shell mt-8 flex justify-end gap-2 lg:pr-0">
        {testimonials.map((tt, i) => (
          <button
            key={tt.name}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ver avaliação de ${tt.name}`}
            className={`h-1.5 transition-all duration-400 ${i === index ? "w-10 bg-ember" : "w-5 bg-line hover:bg-sand/50"}`}
          />
        ))}
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section className="border-t border-line bg-panel py-24 sm:py-28" aria-label="Localização e horários">
      <div className="shell">
        <SectionHeading
          kicker="Onde estamos"
          title={
            <>
              Cola no <span className="text-ember">container</span>
            </>
          }
          description={business.address.full}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <ScrollReveal>
            <div className="relative h-[360px] overflow-hidden border border-line bg-bg sm:h-[440px]">
              <iframe
                title={`Mapa — ${business.address.full}`}
                src={business.address.mapEmbedUrl}
                className="h-full w-full grayscale-[35%] contrast-[1.05]"
                loading="lazy"
              />
              <a
                href={business.address.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-ember px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-bg transition-all hover:bg-gold hover:shadow-ember"
              >
                <Navigation aria-hidden size={14} /> Traçar rota
              </a>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-4">
            <ScrollReveal delay={0.08}>
              <div className="border border-line bg-bg p-6">
                <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
                  <MapPin aria-hidden size={13} /> Endereço
                </p>
                <address className="mt-3 text-sm not-italic leading-relaxed text-sand">
                  {business.address.street} — {business.address.neighborhood}
                  <br />
                  {business.address.city}/{business.address.state} · CEP {business.address.zip}
                  <br />
                  <span className="text-sand/70">{business.address.complement}</span>
                </address>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <div className="flex-1 border border-line bg-bg p-6">
                <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
                  <Clock aria-hidden size={13} /> Funcionamento
                </p>
                <dl className="mt-3 space-y-2.5">
                  {business.hours.map((h) => (
                    <div key={h.days} className="flex items-center justify-between gap-4 text-sm">
                      <dt className="text-sand">{h.days}</dt>
                      <dd className={`text-right font-mono text-xs ${h.time.startsWith("Fechado") ? "text-chili" : "text-cream"}`}>
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <a
                href={createWhatsAppUrl(interestMessage("fazer uma reserva de mesa"))}
                target="_blank"
                rel="noreferrer"
                className="block border border-ember/60 p-5 text-center font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ember transition-all hover:bg-ember hover:text-bg"
              >
                Reservar mesa pelo WhatsApp
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InstagramSection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % instagramTiles.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + instagramTiles.length) % instagramTiles.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section className="bg-bg py-24 sm:py-28" aria-label="Instagram">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker={business.social.instagramHandle}
            title={
              <>
                A brasa no <span className="text-ember">feed</span>
              </>
            }
            description="Bastidores, chope plugando e burger saindo da chapa — segue lá pra não perder a agenda de shows."
          />
          <ScrollReveal>
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 border border-line px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:border-ember hover:text-ember"
            >
              <Instagram aria-hidden size={16} /> Seguir {business.social.instagramHandle}
            </a>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {instagramTiles.map((tile, i) => (
            <ScrollReveal key={tile.id} delay={i * 0.05} y={20}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block aspect-square w-full overflow-hidden border border-linesoft"
                aria-label={`Ampliar foto: ${tile.caption}`}
              >
                <img src={tile.image} alt={tile.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 flex items-center justify-center gap-2 bg-bg/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <Heart aria-hidden size={15} className="text-ember" />
                  <span className="font-mono text-xs text-cream">{tile.likes}</span>
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] text-sand/60">
          Grade demonstrativa — o conteúdo real do {business.social.instagramHandle} entra na personalização.
        </p>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/92 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={instagramTiles[lightbox].caption}
          >
            <motion.figure
              className="relative w-full max-w-3xl"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={instagramTiles[lightbox].image}
                alt={instagramTiles[lightbox].caption}
                className="max-h-[76vh] w-full border border-line object-cover"
              />
              <figcaption className="flex items-center justify-between gap-4 border border-t-0 border-line bg-panel px-5 py-4">
                <span className="text-sm text-sand">{instagramTiles[lightbox].caption}</span>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-ember">
                  <Heart aria-hidden size={13} fill="currentColor" /> {instagramTiles[lightbox].likes}
                </span>
              </figcaption>
              <div className="absolute -top-12 right-0 flex gap-2.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox - 1 + instagramTiles.length) % instagramTiles.length);
                  }}
                  className="grid h-10 w-10 place-items-center border border-line bg-panel text-cream hover:border-ember hover:text-ember"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft aria-hidden size={17} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox + 1) % instagramTiles.length);
                  }}
                  className="grid h-10 w-10 place-items-center border border-line bg-panel text-cream hover:border-ember hover:text-ember"
                  aria-label="Próxima foto"
                >
                  <ChevronRight aria-hidden size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="grid h-10 w-10 place-items-center border border-line bg-panel text-cream hover:border-ember hover:text-ember"
                  aria-label="Fechar foto"
                >
                  <X aria-hidden size={16} />
                </button>
              </div>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-line" aria-label="Faça seu pedido">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }} aria-hidden>
        <img src={images.bgBrasa} alt="" className="h-[130%] w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-bg/78" />
      </motion.div>

      <div className="shell relative py-28 text-center sm:py-36">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-gold">A chapa tá quente</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="display-tight mx-auto mt-5 max-w-3xl font-display text-5xl uppercase text-cream sm:text-7xl">
            Bateu a fome? <span className="text-ember">A brasa resolve.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#/cardapio"
              className="group flex items-center gap-3 bg-ember px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-bg transition-all duration-300 hover:bg-gold hover:shadow-ember"
            >
              Fazer pedido agora
              <ArrowUpRight aria-hidden size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={createWhatsAppUrl(business.whatsappGreeting)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 border border-cream/30 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:border-ember hover:text-ember"
            >
              <ExternalLink aria-hidden size={14} /> Chamar no WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
