import Hero from "../components/Hero";
import MenuBoard from "../components/MenuBoard";
import { ChefSpotlight, MarqueeStrip, OurStory, Promos, StorySticky } from "../components/SectionsA";
import { DeliverySection, FinalCTA, InstagramSection, LocationSection, Testimonials } from "../components/SectionsB";
import { SectionHeading } from "../components/ui";
import { menuItems } from "../config/menu";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />

      {/* cardápio em destaque */}
      <section id="cardapio-home" className="bg-bg py-24 sm:py-28" aria-label="Cardápio em destaque">
        <div className="shell">
          <SectionHeading
            kicker="Cardápio"
            title={
              <>
                O que sai da <span className="text-ember">chapa</span>
              </>
            }
            description="Os queridinhos da casa — toque em um item para ver ingredientes e personalizar com extras. O pedido fecha no WhatsApp."
          />
          <div className="mt-12">
            <MenuBoard items={menuItems} mode="home" />
          </div>
        </div>
      </section>

      <ChefSpotlight />
      <StorySticky />
      <Promos />
      <OurStory />
      <DeliverySection />
      <Testimonials />
      <LocationSection />
      <InstagramSection />
      <FinalCTA />
    </>
  );
}
