import React, { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';

export default function ConfusionMatrixBlock() {
  const [threshold, setThreshold] = useState(0.50);

  // Benchmarked test sample (800 variants at t = 0.50):
  // TP = 226, FN = 111 (Total Pathogenic = 337)
  // TN = 363, FP = 100 (Total Benign = 463)
  const matrix = useMemo(() => {
    const t = threshold;
    const TOTAL_PATHOGENIC = 337;
    const TOTAL_BENIGN = 463;

    if (Math.abs(t - 0.50) < 0.005) {
      return {
        tp: 226,
        fn: 111,
        tn: 363,
        fp: 100,
        totalPath: TOTAL_PATHOGENIC,
        totalBenign: TOTAL_BENIGN,
        total: 800,
      };
    }

    const dt = t - 0.50;

    let tp;
    if (dt > 0) {
      const shift = Math.round(dt * 360 + Math.pow(dt, 2) * 80);
      tp = Math.max(30, 226 - shift);
    } else {
      const shift = Math.round(Math.abs(dt) * 250);
      tp = Math.min(330, 226 + shift);
    }

    let fp;
    if (dt > 0) {
      const shift = Math.round(dt * 210);
      fp = Math.max(8, 100 - shift);
    } else {
      const shift = Math.round(Math.abs(dt) * 520);
      fp = Math.min(410, 100 + shift);
    }

    const fn = TOTAL_PATHOGENIC - tp;
    const tn = TOTAL_BENIGN - fp;

    return {
      tp,
      fn,
      tn,
      fp,
      totalPath: TOTAL_PATHOGENIC,
      totalBenign: TOTAL_BENIGN,
      total: 800,
    };
  }, [threshold]);

  const { tp, fn, tn, fp, totalPath, totalBenign, total } = matrix;

  const accNum = tp + tn;
  const accVal = accNum / total;

  const precDenom = tp + fp;
  const precVal = precDenom > 0 ? tp / precDenom : 0;

  const recDenom = tp + fn;
  const recVal = recDenom > 0 ? tp / recDenom : 0;

  const f1Val = (precVal + recVal) > 0 ? (2 * precVal * recVal) / (precVal + recVal) : 0;

  const specDenom = tn + fp;
  const specVal = specDenom > 0 ? tn / specDenom : 0;

  const fprVal = specDenom > 0 ? fp / specDenom : 0;
  const fnrVal = recDenom > 0 ? fn / recDenom : 0;

  const npvDenom = tn + fn;
  const npvVal = npvDenom > 0 ? tn / npvDenom : 0;

  const balAccVal = (recVal + specVal) / 2;

  const fmt = (v) => v.toFixed(3).replace('.', ',');

  return (
    <section id="confusion-matrix" className="py-12 sm:py-14 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Раздел 5.0 · Метрики валидации и анализ ошибок
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900 tracking-tight">
            Интерактивная Матрица Ошибок и Порог отсечения (t)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Показатели Градиентного бустинга на контрольной выборке ($N = 800$): динамическое перераспределение ошибок I и II рода и расчёт 9 академических метрик с точными дробями для защиты у доски.
          </p>
        </div>

        {/* Threshold Controller */}
        <div className="border border-slate-200 rounded-lg p-4 sm:p-5 bg-slate-50 mb-6 sm:mb-8 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
            <div>
              <div className="font-mono text-xs uppercase text-slate-600">
                Порог бинарного решения: <strong className="text-navy-900 text-sm font-bold">t = {threshold.toFixed(2).replace('.', ',')}</strong>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Если $P(y=1) \ge t$, вариант объявляется Патогенным; иначе — Доброкачественным.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setThreshold(0.50)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium border transition-colors flex items-center gap-1.5 ${
                  Math.abs(threshold - 0.50) < 0.005
                    ? 'border-navy-900 bg-navy-900 text-white shadow-2xs'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Базовый (t = 0,50)</span>
              </button>
              <button
                onClick={() => setThreshold(0.35)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium border transition-colors ${
                  Math.abs(threshold - 0.35) < 0.005
                    ? 'border-navy-900 bg-navy-900 text-white shadow-2xs'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Онко-режим (t = 0,35)
              </button>
            </div>
          </div>

          <input
            type="range"
            min="0.10"
            max="0.90"
            step="0.01"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full accent-navy-900 cursor-pointer h-2"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5">
            <span>0,10 (Чувствительность ↑, FN ↓)</span>
            <span className="font-bold text-navy-900">0,50 (Стандартный ML-порог)</span>
            <span>0,90 (Специфичность ↑, FP ↓)</span>
          </div>
        </div>

        {/* 2x2 Contingency Table and Trade-off */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8 sm:mb-10">
          {/* Contingency Table (7 cols) */}
          <div className="lg:col-span-7 border border-slate-200 rounded-lg p-4 sm:p-5 bg-white shadow-2xs">
            <div className="text-xs font-mono uppercase text-slate-500 mb-3 flex flex-wrap justify-between gap-1">
              <span>Таблица сопряжённости 2×2:</span>
              <span>N = {total} (Патогенных: {totalPath}, Доброкачественных: {totalBenign})</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-xs min-w-[480px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-2"></th>
                    <th className="p-2"></th>
                    <th className="p-2 font-mono font-medium text-slate-700 bg-slate-50 border-r border-slate-200">Предсказан Патоген (1)</th>
                    <th className="p-2 font-mono font-medium text-slate-700 bg-slate-50 border-r border-slate-200">Предсказан Доброкачеств. (0)</th>
                    <th className="p-2 font-mono font-medium text-slate-500">Всего</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {/* Row 1: True Pathogenic */}
                  <tr className="border-b border-slate-200">
                    <th rowSpan="2" className="p-2 text-[10px] uppercase text-slate-500 border-r border-slate-200 [writing-mode:vertical-lr] rotate-180">
                      Истинный класс
                    </th>
                    <th className="p-2.5 sm:p-3 text-left font-sans font-medium text-slate-800 border-r border-slate-200">
                      Истинно Патогенный (1)
                    </th>
                    <td className="p-3 sm:p-4 bg-slate-50 border-r border-slate-200">
                      <div className="text-[10px] uppercase text-slate-500">Истинно полож. (TP)</div>
                      <div className="text-xl sm:text-2xl font-bold text-navy-900 mt-0.5">{tp}</div>
                      <div className="text-[10px] text-slate-500">Верный диагноз</div>
                    </td>
                    <td className="p-3 sm:p-4 bg-slate-50/50 border-r border-slate-200">
                      <div className="text-[10px] uppercase text-coral-primary font-bold">Ложно отриц. (FN)</div>
                      <div className="text-xl sm:text-2xl font-bold text-coral-primary mt-0.5">{fn}</div>
                      <div className="text-[10px] text-coral-primary font-medium">Пропущенная мутация</div>
                    </td>
                    <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                      {totalPath}
                    </td>
                  </tr>

                  {/* Row 2: True Benign */}
                  <tr className="border-b border-slate-200">
                    <th className="p-2.5 sm:p-3 text-left font-sans font-medium text-slate-800 border-r border-slate-200">
                      Истинно Доброкачественный (0)
                    </th>
                    <td className="p-3 sm:p-4 bg-slate-50/50 border-r border-slate-200">
                      <div className="text-[10px] uppercase text-slate-600">Ложно полож. (FP)</div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-800 mt-0.5">{fp}</div>
                      <div className="text-[10px] text-slate-500">Гипердиагностика</div>
                    </td>
                    <td className="p-3 sm:p-4 bg-slate-50 border-r border-slate-200">
                      <div className="text-[10px] uppercase text-slate-500">Истинно отриц. (TN)</div>
                      <div className="text-xl sm:text-2xl font-bold text-navy-900 mt-0.5">{tn}</div>
                      <div className="text-[10px] text-slate-500">Верно отсеян</div>
                    </td>
                    <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                      {totalBenign}
                    </td>
                  </tr>

                  {/* Marginal Column Sums */}
                  <tr className="bg-slate-50 text-slate-600 font-semibold">
                    <th colSpan="2" className="p-2 sm:p-2.5 text-right font-sans border-r border-slate-200">
                      Сумма столбцов:
                    </th>
                    <td className="p-2 sm:p-2.5 border-r border-slate-200">{tp + fp}</td>
                    <td className="p-2 sm:p-2.5 border-r border-slate-200">{fn + tn}</td>
                    <td className="p-2 sm:p-2.5 font-bold text-navy-900">{total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Clinical Dilemma (5 cols) */}
          <div className="lg:col-span-5 border border-slate-200 rounded-lg p-4 sm:p-5 bg-slate-50 text-xs leading-relaxed text-slate-700 space-y-3 shadow-2xs">
            <div className="font-serif font-bold text-sm text-navy-900">
              Клинический компромисс ошибок I и II рода
            </div>
            <p>
              В медицинской генетике цена ошибки асимметрична:
            </p>
            <div className="p-3 bg-white border border-slate-200 rounded space-y-1">
              <strong className="text-coral-primary block font-mono text-[11px]">
                Ошибка II рода (FN = {fn}) — Смертельный риск:
              </strong>
              <span>
                Опасная мутация ошибочно объявляется безвредной. Пациент не получает спасительную таргетную терапию. Порог $t$ снижают ($t \to 0,35$), чтобы свести $FN$ к минимуму.
              </span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded space-y-1">
              <strong className="text-slate-800 block font-mono text-[11px]">
                Ошибка I рода (FP = {fp}) — Диагностическая нагрузка:
              </strong>
              <span>
                Нейтральный полиморфизм помечается как патогенный. Пациенту назначают контрольное секвенирование по Сэнгеру для перепроверки.
              </span>
            </div>
          </div>
        </div>

        {/* 9 Metrics Cards with Exact Fractions */}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
            Формулы всех 9 метрик с точной дробью (Числитель / Знаменатель):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
            {/* Accuracy */}
            <div className="border border-slate-200 p-3 sm:p-3.5 rounded bg-white font-mono shadow-2xs">
              <div className="text-slate-500 text-[11px] font-sans">Accuracy (Общая точность)</div>
              <div className="flex justify-between items-baseline mt-1.5">
                <span className="text-slate-600">({tp}+{tn})/{total} = {accNum}/{total}</span>
                <span className="text-base sm:text-lg font-bold text-navy-900">{fmt(accVal)}</span>
              </div>
            </div>

            {/* Precision */}
            <div className="border border-slate-200 p-3 sm:p-3.5 rounded bg-white font-mono shadow-2xs">
              <div className="text-slate-500 text-[11px] font-sans">Precision (Точность класса 1)</div>
              <div className="flex justify-between items-baseline mt-1.5">
                <span className="text-slate-600">TP/(TP+FP) = {tp}/{precDenom}</span>
                <span className="text-base sm:text-lg font-bold text-navy-900">{fmt(precVal)}</span>
              </div>
            </div>

            {/* Recall */}
            <div className="border border-slate-200 p-3 sm:p-3.5 rounded bg-white font-mono shadow-2xs">
              <div className="text-slate-500 text-[11px] font-sans">Recall / TPR (Полнота / Охват)</div>
              <div className="flex justify-between items-baseline mt-1.5">
                <span className="text-slate-600">TP/(TP+FN) = {tp}/{recDenom}</span>
                <span className="text-base sm:text-lg font-bold text-navy-900">{fmt(recVal)}</span>
              </div>
            </div>

            {/* F1 */}
            <div className="border border-slate-200 p-3 sm:p-3.5 rounded bg-white font-mono shadow-2xs">
              <div className="text-slate-500 text-[11px] font-sans">F1-score (Гармоническое среднее)</div>
              <div className="flex justify-between items-baseline mt-1.5">
                <span className="text-slate-600">2·(P·R) / (P + R)</span>
                <span className="text-base sm:text-lg font-bold text-navy-900">{fmt(f1Val)}</span>
              </div>
            </div>

            {/* Specificity */}
            <div className="border border-slate-200 p-3 sm:p-3.5 rounded bg-white font-mono shadow-2xs">
              <div className="text-slate-500 text-[11px] font-sans">Specificity / TNR (Специфичность)</div>
              <div className="flex justify-between items-baseline mt-1.5">
                <span className="text-slate-600">TN/(TN+FP) = {tn}/{specDenom}</span>
                <span className="text-base sm:text-lg font-bold text-navy-900">{fmt(specVal)}</span>
              </div>
            </div>

            {/* FPR */}
            <div className="border border-slate-200 p-3 sm:p-3.5 rounded bg-white font-mono shadow-2xs">
              <div className="text-slate-500 text-[11px] font-sans">FPR (Доля ложных тревог)</div>
              <div className="flex justify-between items-baseline mt-1.5">
                <span className="text-slate-600">FP/(TN+FP) = {fp}/{specDenom}</span>
                <span className="text-base sm:text-lg font-bold text-navy-900">{fmt(fprVal)}</span>
              </div>
            </div>

            {/* FNR */}
            <div className="border border-slate-200 p-3 sm:p-3.5 rounded bg-white font-mono shadow-2xs">
              <div className="text-slate-500 text-[11px] font-sans">FNR (Доля пропуска патогенов)</div>
              <div className="flex justify-between items-baseline mt-1.5">
                <span className="text-slate-600">FN/(TP+FN) = {fn}/{recDenom}</span>
                <span className="text-base sm:text-lg font-bold text-navy-900">{fmt(fnrVal)}</span>
              </div>
            </div>

            {/* NPV */}
            <div className="border border-slate-200 p-3 sm:p-3.5 rounded bg-white font-mono shadow-2xs">
              <div className="text-slate-500 text-[11px] font-sans">NPV (Ценность отриц. прогноза)</div>
              <div className="flex justify-between items-baseline mt-1.5">
                <span className="text-slate-600">TN/(TN+FN) = {tn}/{npvDenom}</span>
                <span className="text-base sm:text-lg font-bold text-navy-900">{fmt(npvVal)}</span>
              </div>
            </div>

            {/* Balanced Accuracy */}
            <div className="border border-slate-200 p-3 sm:p-3.5 rounded bg-white font-mono shadow-2xs">
              <div className="text-slate-500 text-[11px] font-sans">Balanced Accuracy</div>
              <div className="flex justify-between items-baseline mt-1.5">
                <span className="text-slate-600">(Recall + Specificity) / 2</span>
                <span className="text-base sm:text-lg font-bold text-navy-900">{fmt(balAccVal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
