import React, { useState, useMemo } from 'react';
import { RotateCcw, AlertCircle, Dna } from 'lucide-react';

export default function ShannonBlock() {
  // 50-nt genomic window around CFTR F508del (c.1521_1523delCTT)
  const [dnaInput, setDnaInput] = useState('ATCATCTTTGGTGTTTCCTATGATGAATATAGATACAGAAGCGTCATCAA');

  const presets = [
    { label: 'AAAA (H = 0,000)', seq: 'AAAAAAAA', desc: 'Монотонный гомополимер: неопределённость равна 0' },
    { label: 'AACC (H = 1,000)', seq: 'AAAACCCC', desc: 'Два нуклеотида в равных долях (p=0.5): ровно 1 бит' },
    { label: 'ACGT (H = 2,000)', seq: 'AACCGGTT', desc: 'Все 4 нуклеотида по 25%: максимальная энтропия H_max' },
    { label: 'F508del CFTR (50 нт)', seq: 'ATCATCTTTGGTGTTTCCTATGATGAATATAGATACAGAAGCGTCATCAA', desc: 'Реальный нуклеотидный контекст локуса муковисцидоза' },
  ];

  const cleanDna = useMemo(() => {
    return dnaInput.toUpperCase().replace(/[^ACGT]/g, '');
  }, [dnaInput]);

  const stats = useMemo(() => {
    const total = cleanDna.length;
    if (total === 0) {
      return {
        total: 0,
        counts: { A: 0, C: 0, G: 0, T: 0 },
        freqs: { A: 0, C: 0, G: 0, T: 0 },
        terms: { A: 0, C: 0, G: 0, T: 0 },
        entropy: 0,
        gcPercent: 0,
      };
    }

    const counts = { A: 0, C: 0, G: 0, T: 0 };
    for (let char of cleanDna) {
      if (counts[char] !== undefined) counts[char]++;
    }

    const freqs = {
      A: counts.A / total,
      C: counts.C / total,
      G: counts.G / total,
      T: counts.T / total,
    };

    const terms = {};
    let entropy = 0;

    ['A', 'C', 'G', 'T'].forEach((b) => {
      const p = freqs[b];
      if (p > 0) {
        const term = p * (Math.log(p) / Math.LN2);
        terms[b] = term;
        entropy -= term;
      } else {
        terms[b] = 0;
      }
    });

    const gcCount = counts.G + counts.C;
    const gcPercent = (gcCount / total) * 100;

    return { total, counts, freqs, terms, entropy, gcPercent };
  }, [cleanDna]);

  const nucColorMap = {
    A: { border: 'border-emerald-300', bg: 'bg-emerald-50', text: 'text-emerald-800' },
    C: { border: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-800' },
    G: { border: 'border-amber-300', bg: 'bg-amber-50', text: 'text-amber-800' },
    T: { border: 'border-rose-300', bg: 'bg-rose-50', text: 'text-rose-800' },
  };

  return (
    <section id="shannon" className="py-12 sm:py-14 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Раздел 3.0 · Информационные признаки в геномике
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900 tracking-tight">
            Живой калькулятор Энтропии Шеннона и GC-контекста
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Вычисление информационной неопределённости $H = -\sum p_i \log_2(p_i)$ и соотношения оснований GC в геномном окне $25 + 1 + 25 = 51$ нуклеотид сборки GRCh38.
          </p>
        </div>

        {/* Presets bar (Responsive horizontal scroll) */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <span className="text-xs font-mono text-slate-500 uppercase shrink-0 mr-1">Быстрые пресеты:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setDnaInput(p.seq)}
              className="text-xs font-mono px-3 py-1.5 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors shrink-0 shadow-2xs"
              title={p.desc}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8 sm:mb-10">
          {/* Input & Frequency Bars (6 cols) */}
          <div className="lg:col-span-6 border border-slate-200 rounded-lg p-4 sm:p-5 bg-white space-y-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-800 uppercase font-semibold flex items-center gap-1.5">
                <Dna className="w-3.5 h-3.5 text-navy-900" />
                Последовательность (A, C, G, T):
              </span>
              <span className="text-slate-500">Длина: <strong className="text-navy-900">{stats.total} нт</strong></span>
            </div>

            <div className="relative">
              <textarea
                rows={3}
                value={dnaInput}
                onChange={(e) => setDnaInput(e.target.value)}
                placeholder="Введите буквы A, C, G, T..."
                className="w-full font-mono text-xs tracking-wider uppercase p-3 rounded border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-navy-900 transition-colors shadow-inner"
              />
              <button
                onClick={() => setDnaInput('')}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700 rounded bg-white/80 border border-slate-200"
                title="Очистить"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Nucleotide Frequency Table */}
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 tracking-wider mb-2">
                Эмпирические частоты оснований p(i):
              </div>
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                {(['A', 'C', 'G', 'T']).map((b) => {
                  const p = stats.freqs[b];
                  const c = stats.counts[b];
                  const col = nucColorMap[b];
                  return (
                    <div key={b} className={`border rounded p-2 sm:p-2.5 ${col.bg} ${col.border}`}>
                      <div className={`text-xs font-bold ${col.text}`}>{b}</div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                        {p.toFixed(3).replace('.', ',')}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-slate-500">
                        {c} нт ({(p * 100).toFixed(1).replace('.', ',')}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mathematical Step-by-Step Breakdown (6 cols) */}
          <div className="lg:col-span-6 border border-slate-200 rounded-lg p-4 sm:p-5 bg-slate-50 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 font-mono">
              <div>
                <span className="text-[10px] uppercase text-slate-500 block">Энтропия Шеннона (H)</span>
                <span className="text-xl sm:text-2xl font-bold text-navy-900">
                  {stats.entropy.toFixed(3).replace('.', ',')} <span className="text-xs font-normal text-slate-500">бит</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-500 block">GC-состав (G)</span>
                <span className="text-xl sm:text-2xl font-bold text-navy-900">
                  {stats.gcPercent.toFixed(1).replace('.', ',')}%
                </span>
              </div>
            </div>

            {/* Step-by-step substitution */}
            <div className="font-mono text-xs space-y-2 bg-white p-3.5 sm:p-4 rounded border border-slate-200 text-slate-800">
              <div className="text-slate-500 border-b border-slate-200 pb-1.5 text-[11px] overflow-x-auto">
                H = - ∑ p_i · log₂(p_i), &nbsp; i ∈ &#123;A, C, G, T&#125;
              </div>

              <div className="space-y-1 text-[11px] text-slate-600">
                {(['A', 'C', 'G', 'T']).map((b) => {
                  const p = stats.freqs[b];
                  const term = stats.terms[b];
                  if (p === 0) {
                    return (
                      <div key={b} className="text-slate-400">
                        • {b}: p({b}) = 0 → 0 · log₂(0) ≡ 0
                      </div>
                    );
                  }
                  const logVal = Math.log(p) / Math.LN2;
                  return (
                    <div key={b} className="overflow-x-auto">
                      • <strong className="text-navy-900">{b}</strong>: {p.toFixed(3).replace('.', ',')} · log₂({p.toFixed(3).replace('.', ',')}) = {p.toFixed(3).replace('.', ',')} · ({logVal.toFixed(3).replace('.', ',')}) = <span className="font-semibold text-navy-900">{term.toFixed(4).replace('.', ',')}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-200 font-bold text-navy-900 flex justify-between text-xs">
                <span>H = - ( ∑ слагаемых )</span>
                <span>{stats.entropy.toFixed(3).replace('.', ',')} бит (макс. 2,000)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Honest Scientific Result Discussion */}
        <div className="border border-slate-300 rounded-lg p-4 sm:p-5 bg-white text-xs leading-relaxed text-slate-700 shadow-2xs">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <div className="font-serif font-bold text-navy-900 text-sm flex flex-wrap items-center gap-2">
                <span>Честный научный результат: низкая предсказательная сила энтропии</span>
                <span className="font-mono text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200 font-normal">
                  ROC-AUC = 0,579
                </span>
              </div>
              <p>
                В ходе исследования на 4 000 мутаций ClinVar энтропия Шеннона в одиночку показала <strong className="font-mono">ROC-AUC = 0,579</strong> — лишь незначительно выше случайного угадывания (0,500). Исключение энтропии из общего ансамбля 6 признаков практически не меняет итоговое качество (0,990).
              </p>
              <p className="text-slate-500 text-[11px]">
                <strong>Академическая ценность:</strong> В настоящей науке отрицательный результат — это важное открытие. Он доказал жюри, что тяжесть генетического дефекта определяется поломкой белкового домена, а не монотонностью нуклеотидного контекста вокруг мутации.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
