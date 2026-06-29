import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Numeros } from "./components/Numeros";
import { Servicos } from "./components/Servicos";
import { Acervo } from "./components/Acervo";
import { Processo } from "./components/Processo";
import { Historia } from "./components/Historia";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="grain">
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Numeros />
        <Servicos />
        <Acervo />
        <Processo />
        <Historia />
      </main>
      <Footer />
    </div>
  );
}
