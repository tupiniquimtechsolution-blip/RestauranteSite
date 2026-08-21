import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Bike, ChevronDown, Star } from "lucide-react";
import { business } from "../config/business";
import { images } from "../config/images";

/**
 * HERO — composição em camadas com parallax em velocidades distintas:
 * fundo de brasa (lento), burger flutuante (rápido), conteúdo (médio).
 * Respeita prefers-reduced-motion desligando os transforms.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const burgerY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const scrollToMenu = () => {
    document.getElementById("cardapio-home")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col overflow-hidden bg-bg" aria-label="Destaque principal">
      {/* camada 1 — fundo de brasa com parallax lento */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: bgY }} aria-hidden>
        <img src={images.bgBrasa} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/88 to-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/70" />
      </motion.div>

      {/* camada 2 — marca d'água tipográfica */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[16%] select-none overflow-hidden">
        <p className="text-outline display-tight whitespace-nowrap text-center font-display text-[22vw] uppercase leading-none opacity-40 lg:text-[17vw]">
          Brasa &amp; Chope
        </p>
      </div>

      {/* camada 3 — burger com parallax rápido + anel + badges */}
      <motion.div
        className="absolute right-[-14%] top-[16%] z-10 hidden w-[44vw] max-w-[560px] md:block"
        style={reduce ? undefined : { y: burgerY }}
        aria-hidden
      >
        <div className="animate-floaty relative">
          <div className="animate-ember absolute inset-[6%] rounded-full bg-ember/20 blur-3xl" />
          <svg
            viewBox="0 0 200 200"
            className="animate-spin-slow absolute inset-[-4%] text-gold/50"
            fill="none"
            aria-hidden
          >
            <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 9" />
          </svg>
          <img
            src={images.heroBurger}
            alt=""
            className="relative w-full object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.85)]"
          />
          <div className="absolute left-[4%] top-[22%] border border-gold/40 bg-bg/85 px-3 py-2 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Smash duplo</p>
            <p className="font-display text-xl uppercase text-cream">R$ 34,90</p>
          </div>
          <div className="absolute bottom-[16%] right-[2%] border border-line bg-panel/90 px-3 py-2 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sand">Chapa a</p>
            <p className="font-display text-xl uppercase text-ember">280°C</p>
          </div>
        </div>
      </motion.div>

      {/* camada 4 — conteúdo */}
      <motion.div style={reduce ? undefined : { y: contentY, opacity: fade }} className="relative z-20 flex flex-1 items-center">
        <div className="shell w-full pt-24 pb-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-gold sm:text-xs">
              Bar container · Tatuapé · desde {business.since}
            </p>

            <h1 className="display-tight mt-6 font-display uppercase text-cream">
              <span className="block text-5xl sm:text-7xl lg:text-[5.6rem]">O lado</span>
              <span className="block text-6xl text-ember sm:text-8xl lg:text-[7.5rem]">black</span>
              <span className="block text-5xl sm:text-7xl lg:text-[5.6rem]">
                da <span className="text-outline-ember">brasa.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-sand sm:text-lg">
              Smash burgers prensados na hora, chopes artesanais em 12 torneiras e música ao vivo dentro de um container
              preto. Delivery em todo o Tatuapé.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/cardapio"
                className="group flex items-center gap-3 bg-ember px-7 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-bg transition-all duration-300 hover:bg-gold hover:shadow-ember"
              >
                Fazer pedido
                <ArrowRight aria-hidden size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <button
                type="button"
                onClick={scrollToMenu}
                className="group flex items-center gap-3 border border-cream/25 px-7 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:border-ember hover:text-ember"
              >
                Ver cardápio
              </button>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-linesoft pt-6">
              <div>
                <dt className="sr-only">Avaliação média</dt>
                <dd className="flex items-center gap-1.5 font-display text-2xl text-cream">
                  4,9 <Star aria-hidden size={16} fill="currentColor" className="text-gold" />
                </dd>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-sand">nota média*</dd>
              </div>
              <div>
                <dt className="sr-only">Tempo de entrega</dt>
                <dd className="flex items-center gap-1.5 font-display text-2xl text-cream">
                  <Bike aria-hidden size={20} className="text-ember" /> 40 min
                </dd>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-sand">entrega média</dd>
              </div>
              <div>
                <dt className="sr-only">Horário</dt>
                <dd className="font-display text-2xl text-cream">18h–01h</dd>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-sand">sex e sáb</dd>
              </div>
            </dl>
            <p className="mt-3 font-mono text-[10px] text-sand/60">*Avaliação demonstrativa para fins de apresentação.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* indicador de scroll */}
      <motion.button
        type="button"
        onClick={scrollToMenu}
        aria-label="Rolar para o cardápio"
        className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 text-sand transition-colors hover:text-ember md:block"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown aria-hidden size={26} />
      </motion.button>
    </section>
  );
}
