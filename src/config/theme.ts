/**
 * ============================================================
 * IDENTIDADE VISUAL — PORTO BAA'R BLACK
 * ------------------------------------------------------------
 * Toda a paleta, tipografia, raios e sombras do site saem deste
 * arquivo. Para trocar a identidade de um cliente, edite APENAS
 * os tokens abaixo — os componentes leem as variáveis --t-*.
 * ============================================================
 */

export const theme = {
  colors: {
    /** fundo geral da página (carvão quente, nunca preto puro) */
    bg: "#0d0b09",
    /** superfícies / cards */
    panel: "#16120e",
    /** superfícies elevadas (hover, inputs) */
    panel2: "#1e1812",
    /** linhas e bordas */
    line: "#2c241c",
    linesoft: "#231d16",
    /** texto principal (off-white quente) */
    cream: "#f2ead9",
    /** texto secundário */
    sand: "#a89b8a",
    /** cor primária — brasa */
    ember: "#ff6b2c",
    /** primária em hover / profundidade */
    emberdeep: "#d94f17",
    /** acento secundário — dourado de chope */
    gold: "#e3a83e",
    /** semânticas */
    leaf: "#8fbf6b",
    chili: "#e4573f",
  },
  radius: "0.5rem",
  shadows: {
    /** brilho quente para CTAs e destaques */
    ember: "0 12px 40px -12px rgba(255,107,44,0.45)",
    /** elevação padrão de cards */
    lift: "0 24px 60px -24px rgba(0,0,0,0.75)",
  },
  fonts: {
    display: '"Anton", sans-serif',
    body: '"Sora", sans-serif',
    mono: '"IBM Plex Mono", monospace',
  },
} as const;

/** Gera o CSS injetado no <head> — variáveis consumidas pelo Tailwind e pelos componentes. */
export function themeCss(): string {
  const c = theme.colors;
  return `:root{
  --t-bg:${c.bg};--t-panel:${c.panel};--t-panel2:${c.panel2};
  --t-line:${c.line};--t-linesoft:${c.linesoft};
  --t-cream:${c.cream};--t-sand:${c.sand};
  --t-ember:${c.ember};--t-emberdeep:${c.emberdeep};--t-gold:${c.gold};
  --t-leaf:${c.leaf};--t-chili:${c.chili};
  --t-radius:${theme.radius};
  --t-shadow-ember:${theme.shadows.ember};
  --t-shadow-lift:${theme.shadows.lift};
}`;
}
