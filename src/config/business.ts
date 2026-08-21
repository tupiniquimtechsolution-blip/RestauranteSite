/**
 * ============================================================
 * DADOS DO ESTABELECIMENTO — fonte única da verdade
 * ------------------------------------------------------------
 * Todos os textos institucionais, contatos, endereço, horários,
 * delivery e links saem deste arquivo. Nada fica hardcoded nos
 * componentes. (Conteúdo demonstrativo — substitua pelos dados
 * reais seguindo o CLIENT_REPLACEMENT_GUIDE.md)
 * ============================================================
 */

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export const business = {
  name: "Porto Baa'R Black",
  shortName: "Porto Black",
  legalName: "Porto Baa'R Black Bar e Hamburgueria Ltda.",
  slogan: "Bar container, brasa & chope artesanal",
  tagline: "O lado black da brasa",
  description:
    "Bar container e hamburgueria artesanal no Tatuapé, São Paulo. Smash burgers prensados na brasa, chopes artesanais em 12 torneiras, drinks autorais e música ao vivo toda semana. Delivery e retirada pelo WhatsApp.",
  since: 2019,
  cnpj: "12.345.678/0001-90 (demonstrativo)",

  contact: {
    phoneDisplay: "(11) 2091-0000",
    phoneRaw: "+551120910000",
    /** DDI + DDD + número, apenas dígitos — usado em createWhatsAppUrl() */
    whatsapp: "5511976543210",
    whatsappDisplay: "(11) 97654-3210",
    email: "contato@portobaarblack.com.br",
  },

  social: {
    instagram: "https://www.instagram.com/portobaarblack/",
    instagramHandle: "@portobaarblack",
    facebook: "https://www.facebook.com/portobaarblack",
    tiktok: "https://www.tiktok.com/@portobaarblack",
  },

  address: {
    street: "Rua Itapura, 823",
    complement: "Container em frente à praça",
    neighborhood: "Tatuapé",
    city: "São Paulo",
    state: "SP",
    zip: "03310-000",
    full: "Rua Itapura, 823 — Tatuapé, São Paulo/SP",
    /** coordenadas usadas no mapa e no link de rota */
    lat: -23.5435,
    lng: -46.5668,
    /** iframe do OpenStreetMap — troque pelo embed do Google Maps se preferir */
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=-46.5838%2C-23.5525%2C-46.5498%2C-23.5345&layer=mapnik&marker=-23.5435%2C-46.5668",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=-23.5435,-46.5668",
  },

  hours: [
    { days: "Segunda", time: "Fechado — dia de brasa fria" },
    { days: "Terça a Quinta", time: "18h — 00h" },
    { days: "Sexta e Sábado", time: "18h — 01h" },
    { days: "Domingo", time: "17h — 23h" },
  ],

  delivery: {
    minOrder: 35,
    note: "Taxas demonstrativas — confirme o valor final no WhatsApp. Pedidos até 45 min antes do fechamento.",
    areas: [
      { name: "Tatuapé", fee: 6.9, time: "30–40 min" },
      { name: "Anália Franco", fee: 8.9, time: "35–45 min" },
      { name: "Vila Formosa", fee: 8.9, time: "35–50 min" },
      { name: "Mooca", fee: 10.9, time: "40–55 min" },
      { name: "Penha", fee: 10.9, time: "40–55 min" },
      { name: "Aricanduva", fee: 12.9, time: "45–60 min" },
    ],
  },

  /** números exibidos nos contadores animados (demonstrativo) */
  stats: [
    { value: 6, suffix: "", label: "anos de brasa acesa" },
    { value: 8500, suffix: "+", label: "burgers por mês" },
    { value: 12, suffix: "", label: "torneiras de chope" },
    { value: 4.9, suffix: "★", label: "nota média (demo)", decimals: 1 },
  ] as Stat[],

  /** mensagem padrão quando nenhum contexto é informado */
  whatsappGreeting: "Olá! Vim pelo site do Porto Baa'R Black e quero fazer um pedido. 🔥",
} as const;

export type Business = typeof business;
