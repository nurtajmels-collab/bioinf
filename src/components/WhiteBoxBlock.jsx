import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, Check, ArrowRight, Dna, Activity } from 'lucide-react';

export default function WhiteBoxBlock() {
  // Model features as defined in the research notebook:
  // z = -16.3 + 8.1*x1 + 4.7*x2 - 1.8*x3 + 2.2*x4
  const [x1, setX1] = useState(0);       // LOF (Loss of Function: nonsense, frameshift, splice) ∈ {0, 1}
  const [x2, setX2] = useState(1);       // PROT (Protein altering: in-frame deletion, missense) ∈ {0, 1}
  const [x3, setX3] = useState(-5.0);    // log10(AF) allele frequency score (for F508del: -5.0)
  const [x4, setX4] = useState(1.93);    // H Shannon entropy (for F508del window: 1.93 bit)

  const [isTrapActive, setIsTrapActive] = useState(false);

  const loadF508del = (trap = false) => {
    setX1(0);
    setX2(1);
    setX4(1.93);
    if (trap) {
      setIsTrapActive(true);
      setX3(-3.4); // Naive frequency score gives P = 0.23 (False Benign)
    } else {
      setIsTrapActive(false);
      setX3(-5.0); // Corrected recessive frequency score gives P = 0.838 ~ 0.84 (Pathogenic)
    }
  };

  const toggleTrap = () => {
    if (!isTrapActive) {
      setIsTrapActive(true);
      setX3(-3.4);
    } else {
      setIsTrapActive(false);
      setX3(-5.0);
    }
  };

  const w0 = -16.3;
  const w1 = 8.1;
  const w2 = 4.7;
  const w3 = -1.8;
  const w4 = 2.2;

  const term1 = w1 * x1;
  const term2 = w2 * x2;
  const term3 = w3 * x3;
  const term4 = w4 * x4;

  const z = w0 + term1 + term2 + term3 + term4;
  const prob = 1 / (1 + Math.exp(-z));
  const isPathogenic = prob >= 0.5;

  return (
    <section id="calculator-f508del" className="py-12 sm:py-14 bg-slate-50 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Раздел 4.0 · Интерпретируемый классификатор (White Box)
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900 tracking-tight">
            Калькулятор открытой формулы и мутация F508del
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            В отличие от непроницаемых нейросетей, компактная логистическая регрессия со стенда позволяет жюри и врачу точно проследить вклад каждого биологического параметра в итоговую вероятность.
          </p>
        </div>

        {/* Master Formula Box */}
        <div className="border border-slate-200 bg-white p-4 sm:p-5 rounded-lg mb-6 sm:mb-8 font-mono text-xs shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Аналитическая модель исследования:</span>
              <div className="text-sm sm:text-base lg:text-lg font-bold text-navy-900 mt-0.5 overflow-x-auto">
                z = -16,3 + 8,1 · x₁ + 4,7 · x₂ - 1,8 · x₃ + 2,2 · x₄
              </div>
            </div>
            <div className="text-left md:text-right">
              <span className="text-[10px] uppercase text-slate-500 block">Сигмоид вероятности:</span>
              <div className="text-xs sm:text-sm font-bold text-emerald-primary mt-0.5">
                P(y=1 | x) = 1 / (1 + e⁻ᶻ)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-3 text-[10px] sm:text-[11px] text-slate-600">
            <div>• x₁: Потеря функции LOF (w₁ = +8,1)</div>
            <div>• x₂: Мутация белка PROT (w₂ = +4,7)</div>
            <div>• x₃: log₁₀(AF) частоты (w₃ = -1,8)</div>
            <div>• x₄: Энтропия Шеннона H (w₄ = +2,2)</div>
          </div>
        </div>

        {/* F508del Case & Biological Diagram */}
        <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block">
                Клинический кейс муковисцидоза (Cystic Fibrosis)
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-navy-900">
                Мутация CFTR: c.1521_1523delCTT (p.Phe508del)
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Делеция 3 нуклеотидов CTT в 10-м экзоне гена <em>CFTR</em> приводит к потере фенилаланина в позиции 508 первого нуклеотид-связывающего домена (NBD1).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => loadF508del(false)}
                className="px-3.5 py-2 rounded text-xs font-mono font-medium bg-navy-900 text-white hover:bg-navy-800 transition-colors shadow-2xs"
              >
                Загрузить F508del (P = 0,84)
              </button>
              <button
                onClick={toggleTrap}
                className={`px-3.5 py-2 rounded text-xs font-mono font-medium border transition-colors ${
                  isTrapActive
                    ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                    : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isTrapActive ? 'Отключить ловушку частоты' : 'Показать ловушку частоты'}
              </button>
            </div>
          </div>

          {/* Biological Diagram: Scientific Membrane Schematic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border border-slate-200 rounded p-4 bg-slate-50 text-xs">
              <div className="font-mono font-semibold text-slate-800 mb-1 flex items-center justify-between">
                <span>Норма (CFTR Wild-Type)</span>
                <span className="text-[10px] text-emerald-primary bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Канал функционален</span>
              </div>
              <div className="border border-slate-200 rounded bg-white p-3 font-mono text-[11px] text-slate-600 my-2 space-y-1">
                <div className="text-slate-400 text-[10px]">// Просвет дыхательных путей:</div>
                <div className="h-4 bg-emerald-100 rounded flex items-center justify-center text-[10px] text-emerald-800 font-bold">
                  ↑ Свободный отток Cl⁻ и гидратация слизи
                </div>
                <div className="h-6 bg-slate-200 rounded border border-slate-300 flex items-center justify-center text-[10px] text-slate-700 font-sans font-medium">
                  Апикальная мембрана эпителия (канал CFTR открыт)
                </div>
                <div className="text-slate-400 text-[10px]">// Цитоплазма: нормальный фолдинг NBD1</div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Ионы хлора и вода свободно поступают в секрет, поддерживая его жидкую консистенцию и очищая лёгкие от бактерий.
              </p>
            </div>

            <div className="border border-slate-200 rounded p-4 bg-slate-50 text-xs">
              <div className="font-mono font-semibold text-slate-800 mb-1 flex items-center justify-between">
                <span>Мутация F508del (Муковисцидоз)</span>
                <span className="text-[10px] text-coral-primary bg-coral-soft px-2 py-0.5 rounded border border-coral-border">Класс II: Деградация в ER</span>
              </div>
              <div className="border border-slate-200 rounded bg-white p-3 font-mono text-[11px] text-slate-600 my-2 space-y-1">
                <div className="text-slate-400 text-[10px]">// Просвет дыхательных путей:</div>
                <div className="h-4 bg-coral-soft rounded flex items-center justify-center text-[10px] text-coral-primary font-bold">
                  ✕ Отсутствие транспорта Cl⁻ → Густая вязкая слизь
                </div>
                <div className="h-6 bg-slate-200 rounded border border-slate-300 flex items-center justify-center text-[10px] text-slate-700 font-sans font-medium">
                  Апикальная мембрана (каналы не доходят)
                </div>
                <div className="text-slate-400 text-[10px]">// ЭПР: неправильная укладка → гибель в протеасоме</div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Потеря фенилаланина нарушает пространственную укладку белка. Клетка уничтожает его до выхода на мембрану.
              </p>
            </div>
          </div>

          {/* Allele Frequency Trap Callout */}
          {isTrapActive && (
            <div className="border-l-4 border-amber-600 bg-amber-50 p-4 rounded-r text-xs leading-relaxed text-amber-950 mb-6 animate-fadeIn">
              <div className="font-serif font-bold text-sm text-amber-900 mb-1">
                Клиническая ловушка частоты аллеля (Carrier Frequency Trap):
              </div>
              <p>
                В европейских популяциях мутация F508del встречается у здоровых гетерозиготных носителей с частотой <strong className="font-mono">AF ≈ 0,7% (1 на 25–30 человек)</strong>. Так как муковисцидоз наследуется аутосомно-рецессивно, носители одной копии гена полностью здоровы.
              </p>
              <p className="mt-1.5">
                Если алгоритм классификации наивно оценивает популяционную частоту, он трактует $AF &gt; 0,5\%$ как безвредный полиморфизм, выдавая ложный ответ: <span className="font-mono font-bold text-coral-primary">P = 0,23 (Ложно-доброкачественный)</span>.
              </p>
              <p className="mt-1 text-slate-800 font-medium">
                ✓ С поправкой нашего конвейера на рецессивный тип модель выдаёт верный результат: <span className="font-mono font-bold text-emerald-primary">P = 0,84 (Патогенный)</span>.
              </p>
            </div>
          )}

          {/* Interactive Parameters and Step Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sliders (6 cols) */}
            <div className="lg:col-span-6 space-y-3 text-xs">
              <div className="font-mono text-slate-500 uppercase text-[10px]">
                Входные переменные x_i:
              </div>

              {/* x1: LOF */}
              <div className="p-3 border border-slate-200 rounded bg-slate-50">
                <div className="flex justify-between font-mono font-medium text-slate-800 mb-1">
                  <span>x₁: Потеря функции (LOF: стоп, сдвиг рамки, сплайсинг)</span>
                  <span className="font-bold text-navy-900">{x1}</span>
                </div>
                <div className="flex gap-2 mt-1.5">
                  <button
                    onClick={() => setX1(0)}
                    className={`flex-1 py-1.5 rounded text-xs font-mono font-medium border transition-colors ${
                      x1 === 0 ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    0 (Нет LOF)
                  </button>
                  <button
                    onClick={() => setX1(1)}
                    className={`flex-1 py-1.5 rounded text-xs font-mono font-medium border transition-colors ${
                      x1 === 1 ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    1 (Есть LOF: +8,1)
                  </button>
                </div>
              </div>

              {/* x2: PROT */}
              <div className="p-3 border border-slate-200 rounded bg-slate-50">
                <div className="flex justify-between font-mono font-medium text-slate-800 mb-1">
                  <span>x₂: Изменение белка (PROT: миссенс, индел без сдвига)</span>
                  <span className="font-bold text-navy-900">{x2}</span>
                </div>
                <div className="flex gap-2 mt-1.5">
                  <button
                    onClick={() => setX2(0)}
                    className={`flex-1 py-1.5 rounded text-xs font-mono font-medium border transition-colors ${
                      x2 === 0 ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    0 (Синонимичная)
                  </button>
                  <button
                    onClick={() => setX2(1)}
                    className={`flex-1 py-1.5 rounded text-xs font-mono font-medium border transition-colors ${
                      x2 === 1 ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    1 (PROT замена: +4,7)
                  </button>
                </div>
              </div>

              {/* x3: logAF */}
              <div className="p-3 border border-slate-200 rounded bg-slate-50">
                <div className="flex justify-between font-mono font-medium text-slate-800 mb-1">
                  <span>x₃: log₁₀(AF) частоты аллеля</span>
                  <span className="font-bold text-navy-900">{x3.toFixed(2).replace('.', ',')}</span>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="0"
                  step="0.1"
                  value={x3}
                  onChange={(e) => setX3(parseFloat(e.target.value))}
                  className="w-full accent-navy-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>-8 (ультраредкий)</span>
                  <span className="font-bold text-navy-900">-5,0 (F508del)</span>
                  <span>-3,4 (0,7%)</span>
                  <span>0 (частый)</span>
                </div>
              </div>

              {/* x4: Entropy */}
              <div className="p-3 border border-slate-200 rounded bg-slate-50">
                <div className="flex justify-between font-mono font-medium text-slate-800 mb-1">
                  <span>x₄: Энтропия Шеннона H</span>
                  <span className="font-bold text-navy-900">{x4.toFixed(2).replace('.', ',')} бит</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  value={x4}
                  onChange={(e) => setX4(parseFloat(e.target.value))}
                  className="w-full accent-navy-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0,0 (монотонный)</span>
                  <span className="font-bold text-navy-900">1,93 (окно F508del)</span>
                  <span>2,0 (максимум)</span>
                </div>
              </div>
            </div>

            {/* Calculations Breakdown (6 cols) */}
            <div className="lg:col-span-6 border border-slate-200 rounded p-4 bg-slate-50 font-mono text-xs space-y-3 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Класс решения:</span>
                  <span className={`text-base font-bold ${isPathogenic ? 'text-coral-primary' : 'text-emerald-primary'}`}>
                    {isPathogenic ? 'ПАТОГЕННЫЙ (1)' : 'ДОБРОКАЧЕСТВЕННЫЙ (0)'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-500 block">Вероятность P:</span>
                  <span className="text-2xl font-bold text-navy-900">
                    {(prob * 100).toFixed(1).replace('.', ',')}%
                  </span>
                </div>
              </div>

              {/* Waterfall contributions */}
              <div className="space-y-1.5 text-[11px] text-slate-700">
                <div className="flex justify-between">
                  <span>• Bias (w₀):</span>
                  <span className="font-bold text-slate-900">{w0.toFixed(1).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span>• LOF: 8,1 · {x1} =</span>
                  <span className="font-bold text-emerald-primary">+{term1.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span>• PROT: 4,7 · {x2} =</span>
                  <span className="font-bold text-emerald-primary">+{term2.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span>• Частота: -1,8 · ({x3.toFixed(2).replace('.', ',')}) =</span>
                  <span className={`font-bold ${term3 >= 0 ? 'text-emerald-primary' : 'text-coral-primary'}`}>
                    {term3 >= 0 ? `+${term3.toFixed(2).replace('.', ',')}` : term3.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>• Энтропия: 2,2 · {x4.toFixed(2).replace('.', ',')} =</span>
                  <span className="font-bold text-emerald-primary">+{term4.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-navy-900">
                <span>Линейный предиктор z =</span>
                <span>{z >= 0 ? `+${z.toFixed(2).replace('.', ',')}` : z.toFixed(2).replace('.', ',')}</span>
              </div>

              <div className="p-2.5 bg-white rounded border border-slate-200 text-[11px] text-slate-700 leading-relaxed overflow-x-auto">
                P = 1 / (1 + e^({(-z).toFixed(2).replace('.', ',')})) = <strong className="text-navy-900">{prob.toFixed(3).replace('.', ',')}</strong>
                {isPathogenic ? ' ≥ 0,50 → ПАТОГЕННЫЙ' : ' < 0,50 → ДОБРОКАЧЕСТВЕННЫЙ'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
