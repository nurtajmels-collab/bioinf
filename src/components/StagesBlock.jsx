import React, { useState } from 'react';
import { Database, Filter, Target, Cpu, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';

export default function StagesBlock() {
  const [activeStage, setActiveStage] = useState(1);

  const stage1Models = [
    { name: 'Градиентный бустинг (LightGBM/XGBoost)', accuracy: '0,736', precision: '0,693', recall: '0,671', f1: '0,682', rocAuc: '0,804', note: 'Оптимальный баланс точности и полноты' },
    { name: 'Логистическая регрессия (L2 Baseline)', accuracy: '0,741', precision: '0,711', recall: '0,650', f1: '0,679', rocAuc: '0,801', note: 'Прямая интерпретируемость весов' },
    { name: 'Случайный лес (Random Forest, 300 деревьев)', accuracy: '0,734', precision: '0,688', recall: '0,674', f1: '0,681', rocAuc: '0,801', note: 'Устойчив к шуму и выбросам' },
  ];

  return (
    <section id="stages" className="py-12 sm:py-14 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Раздел 1.0 · Архитектура и методология
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900 tracking-tight">
            Три этапа исследования: от модели к геному
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Эволюция проекта от синтетического прототипа до анализа 500&nbsp;000+ мутаций генома человека GRCh38 и слепого клинического тестирования на локусе <em>CFTR</em>.
          </p>
        </div>

        {/* Tab Selector (Touch-friendly scroll) */}
        <div className="flex border-b border-slate-200 mb-6 sm:mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveStage(1)}
            className={`py-2.5 sm:py-3 px-3.5 sm:px-5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeStage === 1
                ? 'border-navy-900 text-navy-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Синтетический прототип (4 000)
          </button>
          <button
            onClick={() => setActiveStage(2)}
            className={`py-2.5 sm:py-3 px-3.5 sm:px-5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeStage === 2
                ? 'border-navy-900 text-navy-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. ClinVar GRCh38 + hg38 (ROC-AUC 0,990)
          </button>
          <button
            onClick={() => setActiveStage(3)}
            className={`py-2.5 sm:py-3 px-3.5 sm:px-5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeStage === 3
                ? 'border-navy-900 text-navy-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Валидация на локусе CFTR (129 / 135)
          </button>
        </div>

        {/* Tab 1 Content */}
        {activeStage === 1 && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-lg">
              <div className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                Параметры калибровочного датасета:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Объём выборки:</span>
                  <span className="font-mono font-bold text-navy-900 text-xs sm:text-sm">4 000 записей</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Разбиение выборки:</span>
                  <span className="font-mono font-bold text-navy-900 text-xs sm:text-sm">3 200 / 800 (80/20)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Доброкачественные:</span>
                  <span className="font-mono font-bold text-emerald-primary text-xs sm:text-sm">2 314 (57,85%)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Патогенные:</span>
                  <span className="font-mono font-bold text-coral-primary text-xs sm:text-sm">1 686 (42,15%)</span>
                </div>
              </div>
            </div>

            {/* Scientific Comparison Table */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500 tracking-wider mb-2">
                <span>Метрики на тестовой выборке (800 вариантов):</span>
                <span className="text-[10px] sm:hidden text-slate-400">← свайп таблицы →</span>
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs border-collapse min-w-[550px]">
                  <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] border-b border-slate-200 uppercase">
                    <tr>
                      <th className="py-2.5 px-3 sm:px-4">Алгоритм</th>
                      <th className="py-2.5 px-2.5 sm:px-3 text-right">Accuracy</th>
                      <th className="py-2.5 px-2.5 sm:px-3 text-right">Precision</th>
                      <th className="py-2.5 px-2.5 sm:px-3 text-right">Recall</th>
                      <th className="py-2.5 px-2.5 sm:px-3 text-right">F1-score</th>
                      <th className="py-2.5 px-2.5 sm:px-3 text-right font-bold text-navy-900">ROC-AUC</th>
                      <th className="py-2.5 px-3 sm:px-4 text-slate-500">Примечание</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {stage1Models.map((row, idx) => (
                      <tr key={idx} className={idx === 0 ? 'bg-slate-50 font-medium' : 'bg-white'}>
                        <td className="py-2.5 px-3 sm:px-4 font-sans font-medium text-slate-900">
                          {row.name}
                        </td>
                        <td className="py-2.5 px-2.5 sm:px-3 text-right">{row.accuracy}</td>
                        <td className="py-2.5 px-2.5 sm:px-3 text-right">{row.precision}</td>
                        <td className="py-2.5 px-2.5 sm:px-3 text-right">{row.recall}</td>
                        <td className="py-2.5 px-2.5 sm:px-3 text-right">{row.f1}</td>
                        <td className="py-2.5 px-2.5 sm:px-3 text-right font-bold text-navy-900">{row.rocAuc}</td>
                        <td className="py-2.5 px-3 sm:px-4 font-sans text-slate-500 text-[11px]">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs leading-relaxed text-slate-700">
              <strong className="text-navy-900 font-semibold">Итог 1-го этапа:</strong> Градиентный бустинг продемонстрировал наибольшую интегральную разделительную способность (<span className="font-mono font-bold">ROC-AUC = 0,804</span>). Логистическая регрессия показала близкую точность (<span className="font-mono font-bold">0,801</span>), что обосновало возможность построения полностью интерпретируемой формулы для школьного стенда.
            </div>
          </div>
        )}

        {/* Tab 2 Content */}
        {activeStage === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
              <div className="border border-slate-200 p-3.5 sm:p-4 rounded-lg bg-slate-50">
                <span className="font-mono text-slate-500 uppercase tracking-wider block text-[10px]">
                  1. Исходная база NCBI ClinVar
                </span>
                <div className="text-xl sm:text-2xl font-serif font-bold text-navy-900 mt-1 font-mono">
                  500 570
                </div>
                <p className="text-slate-600 mt-1 text-[11px]">
                  Релиз 23.09.2019, сборка GRCh38, интеграция с gnomAD.
                </p>
              </div>

              <div className="border border-slate-200 p-3.5 sm:p-4 rounded-lg bg-slate-50">
                <span className="font-mono text-slate-500 uppercase tracking-wider block text-[10px]">
                  2. Фильтрация консенсуса
                </span>
                <div className="text-xl sm:text-2xl font-serif font-bold text-navy-900 mt-1 font-mono">
                  208 363
                </div>
                <p className="text-slate-600 mt-1 text-[11px]">
                  Review status ≥ 1 звезды без противоречий (no conflicts).
                </p>
              </div>

              <div className="border border-slate-300 p-3.5 sm:p-4 rounded-lg bg-white">
                <span className="font-mono text-slate-700 uppercase tracking-wider block text-[10px] font-bold">
                  3. Стратифицированная выборка
                </span>
                <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-primary mt-1 font-mono">
                  4 000
                </div>
                <p className="text-slate-600 mt-1 text-[11px]">
                  1 333 патогенных, 2 667 доброкачественных из 1 399 генов. 100% совпадение ref с hg38.
                </p>
              </div>
            </div>

            {/* Hypothesis Proof Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-slate-200 rounded-lg p-4 sm:p-5 bg-white">
              <div className="lg:col-span-7 space-y-3">
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-500">
                  Доказательство исследовательской гипотезы:
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-navy-900">
                  Многофакторная модель превосходит лучший одиночный признак
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Популяционная частота аллеля ($AF$) является сильнейшим одиночным признаком (<span className="font-mono font-bold">ROC-AUC = 0,972</span>). Однако включение молекулярного последствия, длины и нуклеотидного типа повышает интегральную точность до <span className="font-mono font-bold text-emerald-primary">0,990</span>, надёжно разделяя редкие безвредные полиморфизмы.
                </p>
                <div className="pt-2 text-xs font-mono text-slate-700 space-y-1">
                  <div>• Все 6 признаков (ClinVar GRCh38): <strong className="text-navy-900 font-bold">ROC-AUC = 0,990</strong></div>
                  <div>• Лучший одиночный признак (Популяционная частота): <strong className="text-slate-700">ROC-AUC = 0,972</strong></div>
                  <div>• Подвыборка сложных миссенс-мутаций: <strong className="text-navy-900 font-bold">ROC-AUC = 0,90 – 0,91</strong></div>
                </div>
              </div>

              {/* Publication ROC-curve SVG */}
              <div className="lg:col-span-5 border border-slate-200 rounded p-4 bg-slate-50 flex flex-col items-center">
                <div className="text-[11px] font-mono font-semibold text-slate-700 mb-2">
                  Кривые ROC-AUC (тестовая выборка):
                </div>
                <svg viewBox="0 0 240 180" className="w-full max-w-[260px] overflow-visible">
                  <line x1="35" y1="140" x2="215" y2="140" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="35" y1="20" x2="35" y2="140" stroke="#cbd5e1" strokeWidth="1" />
                  
                  {/* Diagonal random line */}
                  <line x1="35" y1="140" x2="215" y2="20" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />

                  {/* Single Best (AUC = 0.972) */}
                  <path
                    d="M 35,140 C 40,55 55,28 215,20"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                  />

                  {/* All 6 features (AUC = 0.990) */}
                  <path
                    d="M 35,140 C 37,35 45,22 215,20"
                    fill="none"
                    stroke="#1F8A70"
                    strokeWidth="2.5"
                  />

                  {/* Missense only (AUC = 0.905) */}
                  <path
                    d="M 35,140 C 50,75 80,35 215,20"
                    fill="none"
                    stroke="#D9534F"
                    strokeWidth="1.5"
                  />

                  {/* Axis ticks */}
                  <text x="35" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontFamily="monospace">0</text>
                  <text x="125" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontFamily="monospace">0,5</text>
                  <text x="215" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontFamily="monospace">1,0</text>
                  <text x="125" y="165" fontSize="9" fill="#475569" textAnchor="middle" fontWeight="bold">FPR (1 - Specificity)</text>

                  <text x="28" y="143" fontSize="8" fill="#64748b" textAnchor="end" fontFamily="monospace">0</text>
                  <text x="28" y="83" fontSize="8" fill="#64748b" textAnchor="end" fontFamily="monospace">0,5</text>
                  <text x="28" y="24" fontSize="8" fill="#64748b" textAnchor="end" fontFamily="monospace">1,0</text>
                  <text x="12" y="80" fontSize="9" fill="#475569" textAnchor="middle" fontWeight="bold" transform="rotate(-90 12 80)">TPR (Recall)</text>
                </svg>

                <div className="w-full mt-2 pt-2 border-t border-slate-200 text-[10px] font-mono space-y-0.5 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-emerald-primary inline-block"></span>
                    <span>Все 6 признаков (AUC = 0,990)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-slate-500 inline-block"></span>
                    <span>Одиночный AF (AUC = 0,972)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-coral-primary inline-block"></span>
                    <span>Миссенс варианты (AUC = 0,905)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3 Content */}
        {activeStage === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
              <div className="border border-slate-200 p-3.5 sm:p-4 rounded-lg bg-slate-50">
                <span className="font-mono text-slate-500 uppercase tracking-wider block text-[10px]">
                  Тестовый клинический локус
                </span>
                <div className="text-lg sm:text-xl font-serif font-bold text-navy-900 mt-1">
                  Ген CFTR (муковисцидоз)
                </div>
                <p className="text-slate-600 mt-1 text-[11px]">
                  Полностью изолирован при обучении (Out-of-Distribution).
                </p>
              </div>

              <div className="border border-slate-200 p-3.5 sm:p-4 rounded-lg bg-slate-50">
                <span className="font-mono text-slate-500 uppercase tracking-wider block text-[10px]">
                  Качество на слепом тесте
                </span>
                <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-primary mt-1 font-mono">
                  129 / 135
                </div>
                <p className="text-slate-600 mt-1 text-[11px]">
                  Точность классификации: 95,6% (только 6 ошибок).
                </p>
              </div>

              <div className="border border-slate-200 p-3.5 sm:p-4 rounded-lg bg-slate-50">
                <span className="font-mono text-slate-500 uppercase tracking-wider block text-[10px]">
                  Компактная 4-факторная формула
                </span>
                <div className="text-xl sm:text-2xl font-serif font-bold text-navy-900 mt-1 font-mono">
                  ROC-AUC = 0,989
                </div>
                <p className="text-slate-600 mt-1 text-[11px]">
                  Кросс-валидация: 0,989 ± 0,004 на 4 ключевых признаках.
                </p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 sm:p-5 bg-white space-y-3 text-xs leading-relaxed text-slate-700">
              <h4 className="text-sm font-serif font-bold text-navy-900">
                Методологическая строгость: изоляция генов для защиты от Data Leakage
              </h4>
              <p>
                В генетике близко расположенные мутации в рамках одного гена разделяют одинаковый нуклеотидный контекст и свойства белкового домена. Если разбивать выборку случайно по строкам, модель может «запомнить» контекст гена и переобучиться.
              </p>
              <p>
                Поэтому валидация проводилась строго на отдельном гене <strong className="text-navy-900 font-mono">CFTR</strong>, ни одна запись которого не входила в обучающую выборку. Результат 129 из 135 подтверждает сильную обобщающую способность математического конвейера.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
