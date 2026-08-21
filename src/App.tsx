import { Component, useEffect } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { themeCss } from "./config/theme";
import Navbar from "./components/Navbar";
import { Footer, FloatingWhatsApp } from "./components/Footer";
import { CartDrawer, MobileOrderBar } from "./components/CartDrawer";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

/** Garante topo da página a cada troca de rota */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/** Evita tela em branco diante de erros inesperados de runtime */
class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("Erro de renderização:", error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0d0b09", color: "#f2ead9", fontFamily: "Sora, sans-serif", padding: 24, textAlign: "center" }}>
          <div>
            <p style={{ fontFamily: "Anton, sans-serif", fontSize: 32, textTransform: "uppercase" }}>A chapa apagou 😅</p>
            <p style={{ color: "#a89b8a", marginTop: 8 }}>Algo deu errado por aqui. Recarregue a página para reacender.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{ marginTop: 20, background: "#ff6b2c", color: "#1a0c05", border: "none", padding: "12px 28px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 2, cursor: "pointer" }}
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <HashRouter>
          {/* identidade visual injetada de src/config/theme.ts */}
          <style>{themeCss()}</style>
          <ScrollToTop />
          <div className="grain min-h-screen bg-bg font-body text-cream">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cardapio" element={<MenuPage />} />
                <Route path="/sobre" element={<AboutPage />} />
                <Route path="/contato" element={<ContactPage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
            <MobileOrderBar />
            <FloatingWhatsApp />
          </div>
        </HashRouter>
      </CartProvider>
    </ErrorBoundary>
  );
}
