import React, { useState } from 'react';
import { Check, ShieldCheck, Binary, Sliders } from 'lucide-react';

export default function FeaturesBlock() {
  const [viewMode, setViewMode] = useState('math'); // 'bio' | 'math'
  const [selectedConsequence, setSelectedConsequence] = useState('frameshift');

  const consequences = [
    { key: 'synonymous', label: 'Синонимичная (synonymous)', desc: 'Замена нуклеотида не изменяет кодируемую аминокислоту', vector: [1, 0, 0, 0, 0] },
    { key: 'missense', label: 'Миссенс (missense)', desc: 'Замена одного аминокислотного остатка на другой', vector: [0, 1, 0, 0, 0] },
    { key: 'splice', label: 'Сайт сплайсинга (splice)', desc: 'Повреждение канонических динуклеотидов GT-AG на границе экзон-интрон', vector: [0, 0, 1, 0, 0] },
    { key: 'stop-gained', label: 'Нонсенс (stop-gained)', desc: 'Образование преждевременного стоп-кодона (усечение белка)', vector: [0, 0, 0, 1, 0] },
    { key: 'frameshift', label: 'Сдвиг рамки (frameshift)', desc: 'Делеция или инсерция числа нуклеотидов, не кратного 3', vector: [0, 0, 0, 0, 1] },
  ];

  const features = [
    {
      id: 1,
      name: 'Частота аллеля',
      symbol: 'AF',
      domain: '[0, 1]',
      type: 'Вещественный',
      bioDesc: 'Доля хромосом в популяции, несущих данный вариант. Вредные мутации отсеиваются отбором и редки. Нейтральные полиморфизмы накапливаются в популяции.',
      mathDesc: 'Значение из популяционных баз (gnomAD, ExAC, 1000G). Для устранения сильной правосторонней асимметрии логарифмируется: log₁₀(AF + 10⁻⁶), а также кодируется бинарный индикатор is_very_rare = I(AF < 10⁻⁴).',
      tag: 'ClinVar hg38',
    },
    {
      id: 2,
      name: 'Молекулярное последствие',
      symbol: 'M',
      domain: '{syn, mis, splice, stop, frameshift}',
      type: 'Категориальный (OHE)',
      bioDesc: 'Степень повреждения первичной структуры полипептидной цепи: от нейтральной синонимичной замены до полной потери функции при стоп-кодоне или сдвиге рамки.',
      mathDesc: 'One-Hot Encoding: категориальная переменная преобразуется в бинарный вектор v ∈ {0, 1}⁵. При умножении на вектор весов W выделяется строго один аддитивный коэффициент.',
      tag: 'ClinVar hg38',
    },
    {
      id: 3,
      name: 'Длина и тип мутации',
      symbol: 'L',
      domain: 'L ∈ ℕ, {SNV, DEL, INS}',
      type: 'Дискретный + Флаг',
      bioDesc: 'Количество затронутых пар нуклеотидов. Однонуклеотидные замены (SNV) чаще вызывают точечные дефекты; протяжённые делеции и вставки способны разрушить функциональные домены.',
      mathDesc: 'L = |len(ALT) - len(REF)|. Вектор признаков включает длину L и категориальные признаки типа: is_snv, is_deletion, is_insertion.',
      tag: 'ClinVar hg38',
    },
    {
      id: 4,
      name: 'Тип нуклеотидной замены',
      symbol: 'T',
      domain: '{Transition, Transversion, N/A}',
      type: 'Категориальный (OHE)',
      bioDesc: 'Транзиции (пурин↔пурин A↔G или пиримидин↔пиримидин C↔T) биохимически происходят в 2–3 раза чаще трансверсий (пурин↔пиримидин) из-за таутомерии оснований.',
      mathDesc: 'Бинарное кодирование: is_transition ∈ {0, 1}, is_transversion ∈ {0, 1}, is_na ∈ {0, 1}. Для инделов присваивается категория N/A.',
      tag: 'ClinVar hg38',
    },
    {
      id: 5,
      name: 'Локальный GC-контекст',
      symbol: 'G',
      domain: '[0, 1]',
      type: 'Вещественный',
      bioDesc: 'Доля пар G-C в окрестности мутации. Основания G и C связаны 3 водородными связями. Обогащённые GC-участки (CpG-островки) склонны к метилированию цитозина и дезаминированию в тимин.',
      mathDesc: 'Вычисляется в симметричном геномном окне hg38 шириной 51 нуклеотид (25 слева + позиция + 25 справа): G = (Count(G) + Count(C)) / 51.',
      tag: 'ClinVar hg38',
    },
    {
      id: 6,
      name: 'Локальная энтропия Шеннона',
      symbol: 'H',
      domain: '[0; 2,0] бит',
      type: 'Информационный',
      bioDesc: 'Мера информационной неопределённости нуклеотидного состава в окне мутации. Низкая энтропия указывает на гомополимерные повторы и микросателлиты.',
      mathDesc: 'H = - ∑ p_i · log₂(p_i), где p_i — эмпирическая относительная частота нуклеотида в окне 51 нт генома hg38.',
      tag: 'ClinVar hg38',
    },
    {
      id: 7,
      name: 'Эволюционная консервативность',
      symbol: 'C',
      domain: '[0, 1]',
      type: 'Теоретический',
      bioDesc: 'Показатель неизменности позиции генома среди 100 видов позвоночных. Мутации в консервативных сайтах с высокой вероятностью нарушают жизнедеятельность клетки.',
      mathDesc: 'Нормированный логарифмический скор консервативности phyloP / PhastCons на интервале [0, 1] с помощью логистической функции.',
      tag: 'Этап 1 / Теория',
    },
    {
      id: 8,
      name: 'Биохимическая дистанция',
      symbol: 'D',
      domain: 'D ≥ 0 (Grantham)',
      type: 'Теоретический',
      bioDesc: 'Мера различия физико-химических свойств заменяемых аминокислот (полярность, гидрофобность, молекулярный объём).',
      mathDesc: 'Матрица Грантама (1974): D(aa₁, aa₂) = [ α(c₁-c₂)² + β(p₁-p₂)² + γ(v₁-v₂)² ]^(1/2). Диапазон от 5 (Leu→Ile) до 215 (Cys→Trp).',
      tag: 'Этап 1 / Теория',
    },
  ];

  return (
    <section id="features" className="py-12 sm:py-14 bg-slate-50 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Раздел 2.0 · Математическая формализация признаков
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900 tracking-tight">
            Система признаков: 6 реальных + 2 теоретических
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Преобразование биологической структуры молекулы ДНК и клинической статистики в числовые и бинарные матрицы признаков.
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Формат карточек:</span>
          <div className="inline-flex border border-slate-300 rounded bg-white p-0.5 text-xs">
            <button
              onClick={() => setViewMode('bio')}
              className={`px-3 py-1.5 rounded transition-colors font-medium ${
                viewMode === 'bio'
                  ? 'bg-navy-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Биологический смысл
            </button>
            <button
              onClick={() => setViewMode('math')}
              className={`px-3 py-1.5 rounded transition-colors font-medium ${
                viewMode === 'math'
                  ? 'bg-navy-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Математическое кодирование
            </button>
          </div>
        </div>

        {/* Feature Cards Grid (Responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8 sm:mb-10">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="border border-slate-200 bg-white p-4 rounded-lg flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {feat.tag}
                  </span>
                  <span className="font-mono text-xs font-bold text-navy-900">
                    {feat.symbol}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-sm sm:text-base text-navy-900 mt-1 mb-1">
                  {feat.name}
                </h3>
                
                <div className="font-mono text-[11px] text-slate-500 mb-2">
                  Область: <span className="text-slate-800 font-semibold">{feat.domain}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {viewMode === 'bio' ? feat.bioDesc : feat.mathDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex justify-between">
                <span>Тип:</span>
                <span className="text-slate-700 font-medium">{feat.type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Linear Algebra One-Hot Encoding Box */}
        <div className="border border-slate-200 rounded-lg p-4 sm:p-6 bg-white mb-8 sm:mb-10 shadow-2xs">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
            Кодирование категориальных признаков · One-Hot Encoding (OHE)
          </div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-navy-900 mb-4">
            Вектор молекулярного последствия M ∈ &#123;0, 1&#125;⁵
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Category Selectors */}
            <div className="lg:col-span-5 space-y-1.5 text-xs">
              <span className="font-mono text-slate-500 uppercase text-[10px] block mb-1">
                Выберите молекулярное последствие:
              </span>
              {consequences.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setSelectedConsequence(c.key)}
                  className={`w-full text-left p-2.5 rounded border transition-colors flex items-center justify-between ${
                    selectedConsequence === c.key
                      ? 'border-navy-900 bg-slate-50 font-semibold text-navy-900 shadow-2xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div>{c.label}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{c.desc}</div>
                  </div>
                  {selectedConsequence === c.key && (
                    <Check className="w-3.5 h-3.5 text-navy-900 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>

            {/* Matrix Form Visualizer (Responsive flex/grid) */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-lg">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-2">
                Результирующий бинарный вектор в матрице X:
              </span>

              {/* Vector representation */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center font-mono my-3 sm:my-4">
                {consequences.map((c, i) => {
                  const current = consequences.find(item => item.key === selectedConsequence);
                  const isOne = current.vector[i] === 1;
                  return (
                    <div
                      key={c.key}
                      className={`p-2 sm:p-2.5 rounded border ${
                        isOne
                          ? 'border-navy-900 bg-white font-bold text-navy-900 shadow-xs scale-102 sm:scale-105'
                          : 'border-slate-200 bg-slate-100/60 text-slate-400'
                      }`}
                    >
                      <div className="text-[9px] sm:text-[10px] text-slate-500">x_{i+1}</div>
                      <div className="text-xl sm:text-2xl font-bold my-0.5 sm:my-1">{isOne ? '1' : '0'}</div>
                      <div className="text-[8px] sm:text-[9px] truncate text-slate-500">{c.key}</div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded font-mono text-xs text-slate-800 space-y-1">
                <div className="overflow-x-auto">
                  v_OHE = [
                  {consequences.find(item => item.key === selectedConsequence).vector.join(', ')}
                  ]ᵀ
                </div>
                <div className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  При перемножении на вектор весов W активируется ровно один аддитивный коэффициент (для стоп-мутаций и сдвига рамки вес достигает <strong className="text-navy-900 font-mono">+8,1</strong>).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Scaling & Data Leakage Protection */}
        <div className="border border-slate-200 rounded-lg p-4 sm:p-6 bg-white shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-500">
                Защита от утечки данных (Data Leakage Protection)
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-navy-900">
                Z-Стандартизация числовых признаков: z = (x - μ_train) / σ_train
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Числовые признаки (частота аллеля $AF$, длина $L$, энтропия $H$, GC-доля) имеют разные физические масштабы: от тысячных долей до десятков единиц. Стандартизация приводит их к единому масштабу с нулевым средним и единичной дисперсией.
              </p>
              
              <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-1.5 text-slate-700">
                <div className="font-semibold text-navy-900">
                  Почему выборочные среднее μ и отклонение σ вычисляются СТРОГО по обучающей выборке (`train`)?
                </div>
                <p className="leading-relaxed">
                  Если посчитать параметры нормализации по всему датасету (включая test), информация о будущем распределении тестовых данных просочится в модель. Это приводит к искусственно завышенным показателям в отчётах, но разрушает обобщающую способность в реальной клинике.
                </p>
                <div className="font-mono text-slate-800 pt-1 text-[11px] overflow-x-auto">
                  μ_train = (1 / N_train) · ∑ x_i, &nbsp;&nbsp; σ_train = √[ (1 / N_train) · ∑ (x_i - μ_train)² ]
                </div>
              </div>
            </div>

            <div className="border border-slate-200 p-4 rounded bg-slate-50 text-center shrink-0 md:w-64 font-mono">
              <span className="text-[10px] uppercase text-slate-500 block mb-1">Трансформация</span>
              <div className="text-xl font-bold text-navy-900 py-2 border-y border-slate-200 my-2">
                z = (x - μ) / σ
              </div>
              <div className="text-[11px] text-slate-600">
                E[z] = 0<br />Var(z) = 1
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
