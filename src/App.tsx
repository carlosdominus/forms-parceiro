import React from "react";
import CandidaturaForm from "./components/CandidaturaForm";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-[#41F20A]/20 selection:text-white overflow-x-hidden w-full max-w-full relative flex flex-col justify-between">
      
      {/* Background Image with Dark Gradient Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.75) 60%, rgba(0, 0, 0, 1) 100%), url('https://dominus.site/image/bk.webp')"
        }}
      />

      {/* Ambient Neon Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] max-w-full bg-[#41F20A]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] max-w-full bg-[#1B4D3E]/20 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Header with DOMINUS Logo */}
      <header className="relative z-20 w-full pt-6 pb-4 px-4 sm:px-8 flex items-center justify-center max-w-6xl mx-auto">
        <a href="https://dominus.site/" className="inline-block transition-transform active:scale-95">
          <img 
            src="https://dominus.site/image/logo-extensa-branca.webp" 
            alt="DOMINUS"
            width={180}
            height={32}
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-7 sm:h-9 w-auto object-contain brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          />
        </a>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 py-6 sm:py-10 px-4 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.1] max-w-3xl mb-8">
          Diagnóstico de Perfil e Funil
        </h1>

        {/* Primary Multi-step Form */}
        <div id="formulario-diagnostico" className="w-full">
          <CandidaturaForm />
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 px-4 text-center border-t border-zinc-900/80 bg-black/40 backdrop-blur-md flex items-center justify-center max-w-6xl mx-auto">
        <p className="text-xs font-mono text-zinc-600">
          © {new Date().getFullYear()} DOMINUS. Todos os direitos reservados.
        </p>
      </footer>

    </div>
  );
}
