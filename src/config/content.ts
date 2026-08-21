/**
 * ============================================================
 * CONTEÚDO EDITORIAL — promos, storytelling, avaliações,
 * equipe, Instagram e FAQ. Tudo demonstrativo, centralizado
 * e com imagens vindas de src/config/images.ts.
 * ============================================================
 */
import { images } from "./images";

export interface Promo {
  id: string;
  badge: string;
  title: string;
  description: string;
  detail: string;
  code?: string;
  image: string;
}

export const promos: Promo[] = [
  {
    id: "quinta-open",
    badge: "Toda quinta",
    title: "Open Burger + Open Chope",
    description: "Quinta é o dia oficial do Porto: smash à vontade e chope pilsen liberado das 19h às 23h, com música ao vivo.",
    detail: "R$ 79,90 por pessoa · das 19h às 23h · reservas pelo WhatsApp",
    image: images.smash,
  },
  {
    id: "combo-black",
    badge: "Combo da casa",
    title: "Combo Black Label",
    description: "Smash Black Duplo + Fritas Black Trufadas + Chope IPA 500ml pelo preço que o container aguenta.",
    detail: "De R$ 74,70 por R$ 64,90 · todos os dias no delivery",
    code: "BLACKLABEL",
    image: images.entradas,
  },
  {
    id: "terca-dobro",
    badge: "Terça em dobro",
    title: "Terça do Chope em Dobro",
    description: "Pediu um chope artesanal, levou dois. Todas as terças, no salão e na retirada.",
    detail: "Das 18h às 20h · valem IPA, Pilsen e Weiss",
    image: images.bebidas,
  },
  {
    id: "frete-domingo",
    badge: "Domingo",
    title: "Domingo sem Taxa no Tatuapé",
    description: "Pedidos acima de R$ 60 entregues sem taxa em todo o Tatuapé, das 17h às 22h.",
    detail: "Acima de R$ 60 · pagamento via Pix",
    code: "DOMINGO0",
    image: images.brioche,
  },
];

export interface StoryStep {
  id: string;
  kicker: string;
  title: string;
  text: string;
  image: string;
  stat: string;
}

export const storySteps: StoryStep[] = [
  {
    id: "ingredientes",
    kicker: "Capítulo 01",
    title: "Ingredientes sem atalho",
    text: "Blend moído diariamente na casa, 80/20 de ponta de agulha e peito. Pão potato assado na padoca da esquina, queijo de verdade e picles que a gente cura aqui mesmo.",
    image: images.montagem,
    stat: "100% blend artesanal",
  },
  {
    id: "preparo",
    kicker: "Capítulo 02",
    title: "Chapa de brasa, 280°C",
    text: "A bola de carne vai pra chapa quente e é prensada uma única vez. É aí que nasce a crosta caramelizada — o Maillard que dá nome ao jogo.",
    image: images.chef,
    stat: "90g por disco",
  },
  {
    id: "montagem",
    kicker: "Capítulo 03",
    title: "Montagem em camadas",
    text: "Molho black no pão tostado na manteiga, queijo derretido no vapor da própria carne, picles e a segunda camada. Ordem não é detalhe: é estrutura.",
    image: images.brioche,
    stat: "6 camadas exatas",
  },
  {
    id: "resultado",
    kicker: "Capítulo 04",
    title: "Do container pra sua mesa",
    text: "Embalagem que respira pra crosta não amolecer, chope na temperatura certa e 40 minutos até a sua porta. Ou melhor: direto no balcão, saindo da chapa.",
    image: images.smash,
    stat: "40 min até você",
  },
];

export interface Testimonial {
  name: string;
  area: string;
  text: string;
  rating: number;
  item: string;
}

/** AVALIAÇÕES DEMONSTRATIVAS — não representam clientes reais. */
export const testimonials: Testimonial[] = [
  {
    name: "Mariana C.",
    area: "Tatuapé",
    text: "O Smash Black Duplo chegou quente e com a crosta intacta — coisa rara em delivery. O molho black é viciante.",
    rating: 5,
    item: "Smash Black Duplo",
  },
  {
    name: "Rafael T.",
    area: "Anália Franco",
    text: "Fui na quinta do open burger e voltei nas outras três quintas do mês. Chope gelado, som ao vivo e burger saindo sem parar.",
    rating: 5,
    item: "Open de Quinta",
  },
  {
    name: "Juliana P.",
    area: "Mooca",
    text: "As fritas trufadas são um perigo. Pedi 'só uma entradinha' e viraram o prato principal. Atendimento pelo WhatsApp super rápido.",
    rating: 4.5,
    item: "Fritas Black Trufadas",
  },
  {
    name: "Diego A.",
    area: "Vila Formosa",
    text: "Levei a família no domingo. O Brioche do Chef com gorgonzola é outro nível — e a equipe tratou as crianças como clientes VIP.",
    rating: 5,
    item: "Brioche do Chef",
  },
  {
    name: "Camila R.",
    area: "Penha",
    text: "O Gin Tônica Black é o drink mais bonito do Tatuapé — e o sabor acompanha. Virei cliente do balcão.",
    rating: 4.8,
    item: "Gin Tônica Black",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    name: "Caio Ferraz",
    role: "Chef & fundador",
    bio: "Passou por cozinhas de brasa em Buenos Aires e trouxe a obsessão pela crosta perfeita pra dentro do container.",
    image: images.chef,
  },
  {
    name: "Lígia Andrade",
    role: "Head de bar",
    bio: "Assina os drinks autorais e a curadoria das 12 torneiras de chope que rotacionam toda semana.",
    image: images.bebidas,
  },
  {
    name: "Bruno Sales",
    role: "Mestre churrasqueiro",
    bio: "Responsável pela costela de 12h e pelo ancho no ponto exato. Fala pouco, defuma muito.",
    image: images.montagem,
  },
];

export interface InstaTile {
  id: string;
  image: string;
  caption: string;
  likes: string;
}

export const instagramTiles: InstaTile[] = [
  { id: "i1", image: images.smash, caption: "Smash saindo da chapa a 280°C", likes: "1,2 mil" },
  { id: "i2", image: images.interior, caption: "Sexta no container: casa cheia", likes: "986" },
  { id: "i3", image: images.bebidas, caption: "IPA da semana acabou de plugar", likes: "754" },
  { id: "i4", image: images.entradas, caption: "Fritas Black: o perigo tem nome", likes: "1,5 mil" },
  { id: "i5", image: images.chef, caption: "Chef Caio no comando da brasa", likes: "2,1 mil" },
  { id: "i6", image: images.sobremesa, caption: "Brownie da casa com doce de leite", likes: "890" },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Como faço um pedido pelo site?",
    a: "Monte seu pedido no cardápio, revise o carrinho e finalize pelo WhatsApp. Você recebe a confirmação do valor e do prazo direto com a nossa equipe.",
  },
  {
    q: "Vocês entregam em quais bairros?",
    a: "Tatuapé, Anália Franco, Vila Formosa, Mooca, Penha e Aricanduva, com taxas a partir de R$ 6,90. Outras regiões? Chama no WhatsApp que a gente avalia.",
  },
  {
    q: "Precisa reservar para a Quinta do Open?",
    a: "Recomendamos muito. O open de quinta costuma lotar a partir das 20h. Reserve pelo WhatsApp com seu nome e número de pessoas.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Pix, cartão de crédito/débito (na entrega e no salão) e dinheiro. No pedido pelo WhatsApp você informa como prefere pagar.",
  },
  {
    q: "O cardápio tem opções vegetarianas?",
    a: "Sim! Temos o Veggie de Grão-de-Bico, dadinhos de tapioca, mandioca na manteiga de garrafa e entradas vegetarianas.",
  },
  {
    q: "Posso retirar no balcão?",
    a: "Pode e recomendamos — o burger sai direto da chapa. Avise no pedido o horário estimado de retirada.",
  },
];

export const philosophy = [
  {
    n: "01",
    title: "Brasa antes de tudo",
    text: "Fogo de verdade, chapa de ferro e fumaça. Nada de atalho elétrico onde carvão resolve melhor.",
  },
  {
    n: "02",
    title: "Ingredientes com origem",
    text: "Fornecedores do bairro, blend moído na casa e pão de padoca local. Curto é o caminho bom.",
  },
  {
    n: "03",
    title: "Bar de gente grande",
    text: "Chope artesanal rotativo e drinks autorais. Burger sem copo certo é burger pela metade.",
  },
  {
    n: "04",
    title: "Container de porta aberta",
    text: "Do pet do vizinho ao date de sexta: aqui todo mundo cabe. Música ao vivo faz parte do couvert emocional.",
  },
];
