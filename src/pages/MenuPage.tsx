import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Flame, MessageCircle } from "lucide-react";
import MenuBoard from "../components/MenuBoard";
import { menuItems } from "../config/menu";
import { business } from "../config/business";
import { images } from "../config/images";
import { createWhatsAppUrl, interestMessage } from "../lib/whatsapp";
import { formatBRL } from "../lib/format";
import { ScrollReveal } from "../components/ui";

export default function MenuPage() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* cabeçalho da página */}
      <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-14 sm:pt-40 sm:pb-20" aria-label="Cardápio completo">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={reduce ? undefined : { scale: [1.05, 1] }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          aria-hidden
        >
          <img src={images.montagem} alt="" className="h-full w-full object-cover opacity-[0.16]" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/85 to-bg" />
        </motion.div>

        <div className="shell relative">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-gold">Preços em reais · atualizado semanalmente</p>
            <h1 className="display-tight mt-4 font-display uppercase text-cream">
              <span className="block text-6xl sm:text-8xl">
                Card<span className="text-ember">ápio</span>
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sand sm:text-lg">
              Tudo que sai da nossa chapa e das nossas torneiras. Toque em <span className="text-cream">“adicionar”</span> para
              personalizar extras e montar o pedido — a finalização é pelo WhatsApp, sem pagamento online.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-sand">
              <span className="flex items-center gap-2">
                <Flame aria-hidden size={13} className="text-ember" /> {menuItems.length} itens na brasa
              </span>
              <span>Entrega a partir de {formatBRL(business.delivery.areas[0].fee)}</span>
              <span>Pedido mínimo {formatBRL(business.delivery.minOrder)}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-bg py-16 sm:py-20" aria-label="Itens do cardápio">
        <div className="shell">
          <MenuBoard mode="full" items={menuItems} />

          <ScrollReveal delay={0.1}>
            <div className="mt-16 grid gap-6 border-t border-line pt-10 lg:grid-cols-[1.4fr_1fr]">
              <div className="flex items-start gap-3.5 border border-gold/30 bg-panel p-5">
                <AlertTriangle aria-hidden size={18} className="mt-0.5 shrink-0 text-gold" />
                <p className="text-sm leading-relaxed text-sand">
                  <span className="font-semibold text-cream">Alergênicos:</span> nossos produtos podem conter glúten, lactose,
                  ovo, soja e derivados. Informamos ingredientes de cada item — para restrições severas, fale com a equipe
                  antes de pedir.
                </p>
              </div>
              <a
                href={createWhatsAppUrl(interestMessage("um item que não encontrei no cardápio"))}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 border border-ember/60 p-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ember transition-all hover:bg-ember hover:text-bg"
              >
                <MessageCircle aria-hidden size={15} /> Não achou algo? Pergunta no WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
