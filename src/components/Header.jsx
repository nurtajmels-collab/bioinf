import React, { useState, useEffect } from 'react';
import { ExternalLink, Menu, X, Download, Dna, Calculator, BookOpen, Layers, Activity, GitCommit } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#stages', label: '1. Три этапа', icon: Layers },
    { href: '#features', label: '2. Признаки', icon: Activity },
    { href: '#shannon', label: '3. Энтропия ДНК', icon: GitCommit },
    { href: '#calculator-f508del', label: '4. Модель F508del', icon: Calculator },
    { href: '#confusion-matrix', label: '5. Матрица ошибок', icon: BookOpen },
    { href: '#references', label: '6. Литература', icon: BookOpen },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-2 sm:py-2.5' 
        : 'bg-white border-b border-slate-200 py-2.5 sm:py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Academic Institutional Branding */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded border border-navy-900 bg-navy-900 text-white flex items-center justify-center font-serif text-sm sm:text-base font-bold tracking-tight shadow-sm">
            ∑
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-navy-900 text-xs sm:text-sm tracking-tight font-sans">
                BioMath Genomics
              </span>
              <span className="text-[10px] font-mono text-emerald-primary bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-semibold">
                2026
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-normal truncate max-w-[200px] sm:max-w-none">
              ALAN International School · Шымкент
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-navy-900 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Colab Link */}
          <a
            href="https://colab.research.google.com/drive/1QLS3oyKm5bicvRj0sIfGjEumB6d1oten"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs font-medium bg-navy-900 text-white hover:bg-navy-800 transition-colors border border-navy-900 shadow-sm"
            title="Открыть расчёты в Google Colab"
          >
            <span>Google Colab</span>
            <ExternalLink className="w-3 h-3 text-slate-300" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
            aria-label="Открыть меню навигации"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-fadeIn">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Разделы стенда:
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-800 font-medium"
                >
                  <Icon className="w-3.5 h-3.5 text-navy-900" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Балауса Абдукадырова, 10 «Д»</span>
            <a
              href="ClinVar_модель_и_калькулятор.ipynb"
              download
              className="text-navy-900 font-bold hover:underline flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>.ipynb</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
