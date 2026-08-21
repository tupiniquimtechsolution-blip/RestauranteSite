import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { business } from "../config/business";
import { faqs } from "../config/content";
import { createWhatsAppUrl } from "../lib/whatsapp";
import { Kicker, ScrollReveal, SectionHeading } from "../components/ui";

type Errors = Partial<Record<"name" | "message" | "phone", string>>;

export default function ContactPage() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", phone: "", subject: "Reserva de mesa", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const set = (key: keyof typeof form, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Informe seu nome";
    if (form.phone.trim() && !/^[\d\s()+-]{8,}$/.test(form.phone)) next.phone = "Telefone inválido";
    if (form.message.trim().length < 10) next.message = "Conte um pouco mais (mín. 10 caracteres)";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    const msg = [
      `*CONTATO PELO SITE — ${business.name}*`,
      `*Nome:* ${form.name}`,
      form.phone ? `*Telefone:* ${form.phone}` : "",
      `*Assunto:* ${form.subject}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(createWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 600);
  };

  return (
    <>
      <section className="relative border-b border-line bg-bg pt-32 pb-14 sm:pt-40 sm:pb-20" aria-label="Contato">
        <div className="shell">
          <motion.div initial={reduce ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Kicker>Fala com a gente</Kicker>
            <h1 className="display-tight mt-4 font-display uppercase text-cream">
              <span className="block text-5xl sm:text-7xl">
                Reserva, evento <span className="text-ember">&amp; afins</span>
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sand sm:text-lg">
              Reservas, eventos fechados, parcerias ou aquele feedback sincero: manda ver. Respondemos rápido — geralmente
              entre uma virada de burger e outra.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-bg py-16 sm:py-20" aria-label="Formulário e canais de contato">
        <div className="shell grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          {/* formulário */}
          <div>
            {sent ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-leaf/40 bg-leaf/10 p-8 text-center"
                role="status"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-leaf text-bg">
                  <Check aria-hidden size={24} strokeWidth={3} />
                </span>
                <p className="mt-5 font-display text-2xl uppercase text-cream">Mensagem na chapa!</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-sand">
                  Abrimos o WhatsApp com a sua mensagem pronta. É só conferir e enviar — nossa equipe responde por lá.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", phone: "", subject: "Reserva de mesa", message: "" });
                  }}
                  className="mt-6 border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cream hover:border-ember hover:text-ember"
                >
                  Enviar outra mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="border border-line bg-panel p-6 sm:p-9" noValidate>
                <h2 className="font-display text-2xl uppercase tracking-wide text-cream">Manda a braba</h2>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="block sm:col-span-1">
                    <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-sand">Nome *</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={`field ${errors.name ? "field-error" : ""}`}
                      placeholder="Seu nome"
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <span className="mt-1 block text-xs text-chili">{errors.name}</span>}
                  </label>
                  <label className="block sm:col-span-1">
                    <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-sand">Telefone</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={`field ${errors.phone ? "field-error" : ""}`}
                      placeholder="(11) 9…"
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone && <span className="mt-1 block text-xs text-chili">{errors.phone}</span>}
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-sand">Assunto</span>
                    <select value={form.subject} onChange={(e) => set("subject", e.target.value)} className="field">
                      <option>Reserva de mesa</option>
                      <option>Evento fechado / aniversário</option>
                      <option>Pedido e delivery</option>
                      <option>Parceria / fornecedor</option>
                      <option>Imprensa</option>
                      <option>Elogio, crítica ou sugestão</option>
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-sand">Mensagem *</span>
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={5}
                      className={`field resize-none ${errors.message ? "field-error" : ""}`}
                      placeholder="Data, número de pessoas, o que você precisa…"
                      aria-invalid={Boolean(errors.message)}
                    />
                    {errors.message && <span className="mt-1 block text-xs text-chili">{errors.message}</span>}
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-7 flex w-full items-center justify-center gap-2.5 bg-ember py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-bg transition-all duration-300 hover:bg-gold hover:shadow-ember disabled:opacity-60 sm:w-auto sm:px-10"
                >
                  {sending ? "Abrindo WhatsApp…" : (
                    <>
                      <Send aria-hidden size={14} /> Enviar pelo WhatsApp
                    </>
                  )}
                </button>
                <p className="mt-3 font-mono text-[10px] text-sand/70">
                  Demonstração: a mensagem abre pronta no WhatsApp oficial — sem envio automático.
                </p>
              </form>
            )}
          </div>

          {/* canais diretos */}
          <div className="space-y-4">
            {[
              {
                icon: <MessageCircle aria-hidden size={17} />,
                title: "WhatsApp",
                value: business.contact.whatsappDisplay,
                note: "pedidos, reservas e eventos",
                href: createWhatsAppUrl(business.whatsappGreeting),
                external: true,
              },
              {
                icon: <Phone aria-hidden size={17} />,
                title: "Telefone",
                value: business.contact.phoneDisplay,
                note: "horário de funcionamento",
                href: `tel:${business.contact.phoneRaw}`,
                external: false,
              },
              {
                icon: <Mail aria-hidden size={17} />,
                title: "E-mail",
                value: business.contact.email,
                note: "parcerias e imprensa",
                href: `mailto:${business.contact.email}`,
                external: false,
              },
              {
                icon: <Instagram aria-hidden size={17} />,
                title: "Instagram",
                value: business.social.instagramHandle,
                note: "novidades e agenda de shows",
                href: business.social.instagram,
                external: true,
              },
              {
                icon: <MapPin aria-hidden size={17} />,
                title: "Endereço",
                value: business.address.full,
                note: business.address.complement,
                href: business.address.directionsUrl,
                external: true,
              },
            ].map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.06}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center gap-4 border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/60"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-line text-ember transition-colors group-hover:border-ember group-hover:bg-ember group-hover:text-bg">
                    {c.icon}
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-sand">{c.title}</span>
                    <span className="block text-sm text-cream">{c.value}</span>
                    <span className="block text-xs text-sand/80">{c.note}</span>
                  </span>
                </a>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.32}>
              <div className="border border-line bg-panel p-5">
                <p className="flex items-center gap-2.5 font-display text-lg uppercase text-cream">
                  <Clock aria-hidden size={16} className="text-ember" /> Horários
                </p>
                <dl className="mt-3 space-y-1.5">
                  {business.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-3 text-sm">
                      <dt className="text-sand">{h.days}</dt>
                      <dd className={`font-mono text-xs ${h.time.startsWith("Fechado") ? "text-chili" : "text-cream"}`}>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-panel py-24 sm:py-28" aria-label="Perguntas frequentes">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHeading
            kicker="FAQ"
            title={
              <>
                Perguntas de <span className="text-ember">barriga vazia</span>
              </>
            }
            description="O que mais perguntam antes do primeiro pedido. Não achou a resposta? Chama no WhatsApp."
          />
          <div>
            {faqs.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 0.04}>
                <div className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-${i}`}
                  >
                    <span className="font-display text-lg uppercase tracking-wide text-cream transition-colors hover:text-ember sm:text-xl">
                      {f.q}
                    </span>
                    <ChevronDown
                      aria-hidden
                      size={18}
                      className={`shrink-0 text-ember transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-sm leading-relaxed text-sand sm:text-base">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
