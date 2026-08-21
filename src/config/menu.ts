/**
 * ============================================================
 * CARDÁPIO — dados configuráveis
 * ------------------------------------------------------------
 * Categorias, itens, preços, ingredientes e adicionais saem
 * daqui. Itens com featured:true aparecem na aba "Destaques".
 * ============================================================
 */
import { images } from "./images";

export interface Extra {
  name: string;
  price: number;
}

export type MenuTag = "mais-pedido" | "novo" | "vegetariano" | "picante" | "da-casa";

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  image: string;
  tags?: MenuTag[];
  extras?: Extra[];
  featured?: boolean;
}

export const menuCategories = [
  { id: "destaques", label: "Destaques" },
  { id: "entradas", label: "Entradas" },
  { id: "principais", label: "Principais" },
  { id: "burgers", label: "Burgers" },
  { id: "sobremesas", label: "Sobremesas" },
  { id: "bebidas", label: "Bebidas" },
] as const;

export const menuItems: MenuItem[] = [
  /* ------------------------------ BURGERS ------------------------------ */
  {
    id: "smash-black",
    category: "burgers",
    name: "Smash Black Duplo",
    description: "Dois smash de 90g prensados na chapa de ferro, crosta caramelizada e muito queijo.",
    ingredients: ["pão potato", "2x smash 90g", "queijo prato", "cebola na chapa", "picles", "molho black"],
    price: 34.9,
    image: images.smash,
    tags: ["mais-pedido"],
    featured: true,
    extras: [
      { name: "Bacon crocante", price: 6 },
      { name: "Cheddar extra", price: 5 },
      { name: "Smash adicional 90g", price: 9 },
      { name: "Ovo caipira", price: 4 },
    ],
  },
  {
    id: "brioche-chef",
    category: "burgers",
    name: "Brioche do Chef",
    description: "Blend 160g na brasa, brioche selado na manteiga, gorgonzola e cebola caramelizada.",
    ingredients: ["brioche artesanal", "blend 160g", "gorgonzola", "cebola caramelizada", "rúcula", "maionese da casa"],
    price: 42.9,
    image: images.brioche,
    tags: ["da-casa"],
    featured: true,
    extras: [
      { name: "Bacon crocante", price: 6 },
      { name: "Queijo extra", price: 5 },
    ],
  },
  {
    id: "bbq-bacon",
    category: "burgers",
    name: "BBQ Bacon Smoke",
    description: "Blend defumado 160g, barbecue de goiabada, bacon duplo e cheddar inglês.",
    ingredients: ["pão australiano", "blend defumado 160g", "bbq de goiabada", "bacon", "cheddar", "onion rings"],
    price: 44.9,
    image: images.smash,
    extras: [
      { name: "Anéis de cebola extras", price: 7 },
      { name: "Bacon extra", price: 6 },
    ],
  },
  {
    id: "duplo-cheddar",
    category: "burgers",
    name: "Duplo Cheddar Melt",
    description: "Dois blends 120g afogados em cheddar derretido no vapor da chapa.",
    ingredients: ["pão potato", "2x blend 120g", "cheddar duplo", "picles", "ketchup defumado"],
    price: 39.9,
    image: images.brioche,
    extras: [{ name: "Cheddar extra", price: 5 }],
  },
  {
    id: "veggie-grao",
    category: "burgers",
    name: "Veggie de Grão-de-Bico",
    description: "Burger de grão-de-bico com cogumelos, coalhada seca e pimenta biquinho.",
    ingredients: ["pão de fermentação natural", "burger de grão-de-bico", "coalhada seca", "pimenta biquinho", "alface"],
    price: 36.9,
    image: images.brioche,
    tags: ["vegetariano"],
    extras: [{ name: "Queijo minas grelhado", price: 6 }],
  },
  {
    id: "costela-12h",
    category: "burgers",
    name: "Costela 12h Burger",
    description: "Costela bovina desfiada após 12 horas de defumação, barbecue e crispy de alho.",
    ingredients: ["pão brioche", "costela desfiada 12h", "bbq da casa", "crispy de alho", "picles de maxixe"],
    price: 46.9,
    image: images.brioche,
    tags: ["novo", "da-casa"],
    featured: true,
    extras: [
      { name: "Costela extra", price: 12 },
      { name: "Queijo prato", price: 5 },
    ],
  },

  /* ------------------------------ ENTRADAS ----------------------------- */
  {
    id: "fritas-trufadas",
    category: "entradas",
    name: "Fritas Black Trufadas",
    description: "Batatas rústicas, maionese de alho negro, parmesão e salsinha.",
    ingredients: ["batata rústica", "maionese de alho negro", "parmesão", "salsinha"],
    price: 26.9,
    image: images.entradas,
    tags: ["mais-pedido"],
    featured: true,
    extras: [
      { name: "Bacon bits", price: 5 },
      { name: "Cheddar cremoso", price: 6 },
    ],
  },
  {
    id: "dadinhos",
    category: "entradas",
    name: "Dadinhos de Tapioca",
    description: "Crocantes por fora, cremosos por dentro, com geleia de pimenta da casa.",
    ingredients: ["tapioca", "queijo coalho", "geleia de pimenta"],
    price: 24.9,
    image: images.entradas,
    tags: ["vegetariano"],
  },
  {
    id: "onion-rings",
    category: "entradas",
    name: "Onion Rings Defumadas",
    description: "Anéis de cebola empanados na farinha panko com páprica defumada.",
    ingredients: ["cebola", "panko", "páprica defumada", "aioli de limão"],
    price: 22.9,
    image: images.entradas,
  },
  {
    id: "bolinho-costela",
    category: "entradas",
    name: "Bolinho de Costela",
    description: "Seis bolinhos de costela desfiada com barbecue de goiabada.",
    ingredients: ["costela desfiada", "mandioca", "bbq de goiabada"],
    price: 29.9,
    image: images.entradas,
    tags: ["da-casa"],
  },
  {
    id: "mandioca-manteiga",
    category: "entradas",
    name: "Mandioca na Manteiga de Garrafa",
    description: "Dourada na chapa, finalizada com manteiga de garrafa e alecrim.",
    ingredients: ["mandioca", "manteiga de garrafa", "alecrim", "sal de parrilla"],
    price: 19.9,
    image: images.entradas,
    tags: ["vegetariano"],
  },

  /* ----------------------------- PRINCIPAIS ---------------------------- */
  {
    id: "ancho-brasa",
    category: "principais",
    name: "Ancho na Brasa 400g",
    description: "Corte argentino na parrilla, sal de parrilla e chimichurri fresco.",
    ingredients: ["ancho 400g", "chimichurri", "sal de parrilla"],
    price: 89.9,
    image: images.montagem,
    featured: true,
    extras: [
      { name: "Porção de arroz biro-biro", price: 12 },
      { name: "Batata rústica", price: 14 },
      { name: "Vinagrete de feijão-fradinho", price: 8 },
    ],
  },
  {
    id: "costela-bbq",
    category: "principais",
    name: "Costela BBQ 12h",
    description: "Meia costela defumada por 12 horas, glaçada no barbecue de goiabada.",
    ingredients: ["costela bovina", "bbq de goiabada", "coleslaw da casa"],
    price: 79.9,
    image: images.montagem,
    tags: ["da-casa"],
    extras: [{ name: "Coleslaw extra", price: 8 }],
  },
  {
    id: "fish-chips",
    category: "principais",
    name: "Fish & Chips do Porto",
    description: "Filé de tilápia empanado na cerveja artesanal, fritas e molho tártaro.",
    ingredients: ["tilápia", "empanado de IPA", "fritas", "tártaro"],
    price: 54.9,
    image: images.entradas,
  },

  /* ----------------------------- SOBREMESAS ---------------------------- */
  {
    id: "brownie-doce-leite",
    category: "sobremesas",
    name: "Brownie com Doce de Leite",
    description: "Brownie quente de chocolate 70%, doce de leite argentino e sorvete de creme.",
    ingredients: ["chocolate 70%", "doce de leite", "sorvete de creme", "castanhas"],
    price: 24.9,
    image: images.sobremesa,
    tags: ["mais-pedido"],
    featured: true,
    extras: [{ name: "Sorvete extra", price: 7 }],
  },
  {
    id: "churros-nutella",
    category: "sobremesas",
    name: "Churros com Nutella",
    description: "Churros crocantes de canela com calda de Nutella e leite ninho.",
    ingredients: ["churros", "nutella", "leite ninho", "canela"],
    price: 21.9,
    image: images.sobremesa,
  },

  /* ------------------------------ BEBIDAS ------------------------------ */
  {
    id: "chope-ipa",
    category: "bebidas",
    name: "Chope IPA da Casa 500ml",
    description: "IPA artesanal rotativa, amargor na medida e notas cítricas.",
    ingredients: ["malte", "lúpulo cítrico", "500ml"],
    price: 21.9,
    image: images.bebidas,
    tags: ["da-casa"],
    featured: true,
  },
  {
    id: "chope-pilsen",
    category: "bebidas",
    name: "Chope Pilsen 400ml",
    description: "Leve, gelado e perigoso de tão refrescante.",
    ingredients: ["pilsen artesanal", "400ml"],
    price: 15.9,
    image: images.bebidas,
  },
  {
    id: "gin-tonica-black",
    category: "bebidas",
    name: "Gin Tônica Black",
    description: "Gin infusionado com carvão ativado, tônica artesanal e zimbro defumado.",
    ingredients: ["gin", "carvão ativado", "tônica artesanal", "zimbro"],
    price: 32.9,
    image: images.bebidas,
    tags: ["novo"],
  },
  {
    id: "limonada-defumada",
    category: "bebidas",
    name: "Limonada Defumada",
    description: "Limão-taiti, xarope de açúcar demerara defumado e espuma de gengibre.",
    ingredients: ["limão-taiti", "demerara defumado", "gengibre"],
    price: 16.9,
    image: images.bebidas,
  },
];

export const getItemById = (id: string): MenuItem | undefined => menuItems.find((i) => i.id === id);

export const getExtrasPrice = (item: MenuItem, chosenExtras: string[]): number =>
  (item.extras ?? []).filter((e) => chosenExtras.includes(e.name)).reduce((sum, e) => sum + e.price, 0);
