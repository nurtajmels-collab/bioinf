import React from 'react';
import { ExternalLink, ArrowRight, Calculator, Download, CheckCircle2, FileCode2, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white border-b border-slate-200 pt-8 sm:pt-12 pb-12 sm:pb-16 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Academic Section Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono">
          <span className="text-slate-800 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-medium">
            Прикладная математика &amp; Биоинформатика
          </span>
          <span className="text-slate-400 hidden sm:inline">/</span>
          <span className="text-slate-600 hidden sm:inline">Научно-исследовательский проект (2026)</span>
        </div>

        {/* Paper Title */}
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-serif font-bold text-navy-900 leading-[1.2] tracking-tight mb-4">
            Прогнозирование патогенности генетических мутаций с использованием математических признаков и машинного обучения
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-sans leading-relaxed mb-6">
            Интерактивный математический конвейер связывает молекулярную биологию нуклеотидных последовательностей генома человека GRCh38 с открытыми вероятностными формулами бинарной классификации и доказательным анализом ошибок диагностики.
          </p>
        </div>

        {/* Authors and Supervisors Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl py-4 border-y border-slate-200 mb-8 text-xs sm:text-sm">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block mb-1">
              Автор проекта / Докладчик
            </span>
            <div className="font-bold text-navy-900 text-sm sm:text-base">
              Абдукадырова Балауса
            </div>
            <div className="text-slate-600 text-xs mt-0.5">
              10 «Д» класс, ALAN International School, г. Шымкент
            </div>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block mb-1">
              Научный руководитель
            </span>
            <div className="font-bold text-navy-900 text-sm sm:text-base">
              Абдикаримова Акмарал Бахадировна
            </div>
            <div className="text-slate-600 text-xs mt-0.5">
              Учитель математики, ALAN International School
            </div>
          </div>
        </div>

        {/* Pipeline Diagram (Responsive Flow) */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 sm:p-4 mb-8">
          <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider mb-2.5">
            Математический конвейер: Биология → Признаки → Формула → Вероятность → Анализ ошибок
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
            <span className="bg-white border border-slate-300 px-2.5 py-1 rounded font-medium text-slate-800 shadow-2xs">
              1. Биология (ClinVar/hg38)
            </span>
            <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="bg-white border border-slate-300 px-2.5 py-1 rounded font-medium text-slate-800 shadow-2xs">
              2. Признаки (AF, M, L, G, H)
            </span>
            <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="bg-white border border-navy-300 px-2.5 py-1 rounded font-medium text-navy-900 bg-navy-50/50 shadow-2xs">
              3. Формула регрессии (z)
            </span>
            <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="bg-white border border-emerald-300 px-2.5 py-1 rounded font-medium text-emerald-primary bg-emerald-50/50 shadow-2xs">
              4. Вероятность P(y=1|x)
            </span>
            <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="bg-white border border-slate-300 px-2.5 py-1 rounded font-medium text-slate-800 shadow-2xs">
              5. Матрица ошибок (t)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <a
            href="https://colab.research.google.com/drive/1QLS3oyKm5bicvRj0sIfGjEumB6d1oten"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded bg-navy-900 text-white hover:bg-navy-800 text-xs font-medium transition-colors border border-navy-900 shadow-sm"
          >
            <span>Открыть расчёты в Google Colab</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
          </a>

          <a
            href="#calculator-f508del"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded bg-white text-navy-900 hover:bg-slate-50 text-xs font-medium border border-slate-300 transition-colors shadow-sm"
          >
            <Calculator className="w-3.5 h-3.5 text-slate-600" />
            <span>Интерактивный калькулятор F508del</span>
            <ArrowDown className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="ClinVar_модель_и_калькулятор.ipynb"
            download
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono transition-colors border border-slate-300"
            title="Скачать оригинальный блокнот Jupyter Notebook"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Скачать .ipynb (216 КБ)</span>
          </a>
        </div>

        {/* 4 Research Summary KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="border border-slate-200 bg-white p-3.5 sm:p-4 rounded-lg shadow-2xs">
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Выборка GRCh38
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-navy-900 mt-1 font-mono">
              4 000
            </div>
            <div className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug">
              Вариантов NCBI ClinVar, 100% совпадение ref с FASTA hg38
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-3.5 sm:p-4 rounded-lg shadow-2xs">
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Многофакторный ROC-AUC
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-emerald-primary mt-1 font-mono">
              0,990
            </div>
            <div className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug">
              Все 6 признаков превосходят лучший одиночный (0,972)
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-3.5 sm:p-4 rounded-lg shadow-2xs">
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Слепой тест (ген CFTR)
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-navy-900 mt-1 font-mono">
              129 / 135
            </div>
            <div className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug">
              95,6% точность на гене, полностью исключённом из train
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-3.5 sm:p-4 rounded-lg shadow-2xs">
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Формула стенда
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-navy-900 mt-1 font-mono">
              ROC 0,989
            </div>
            <div className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug">
              Открытая 4-факторная регрессия с прозрачными весами
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
