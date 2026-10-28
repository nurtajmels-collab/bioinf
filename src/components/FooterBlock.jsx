import React from 'react';
import { ExternalLink, ShieldAlert, BookOpen, Download } from 'lucide-react';

export default function FooterBlock() {
  const acmgClasses = [
    { code: 'P', name: 'Pathogenic (Патогенный)', criteria: 'Доказанность > 99%', desc: 'Причинная связь с заболеванием подтверждена функциональными тестами' },
    { code: 'LP', name: 'Likely Pathogenic (Вероятно патогенный)', criteria: 'Вероятность 90–99%', desc: 'Высокая вероятность патогенности на основе консервативности и популяционной редкости' },
    { code: 'VUS', name: 'Variant of Uncertain Significance', criteria: 'Неопределённый статус', desc: 'Противоречивые или недостаточные доказательства в литературе' },
    { code: 'LB', name: 'Likely Benign (Вероятно доброкачественный)', criteria: 'Вероятность 90–99%', desc: 'Наблюдается в контрольных популяциях выше эпидемиологического порога' },
    { code: 'B', name: 'Benign (Доброкачественный)', criteria: 'Доказанность > 99%', desc: 'Частый нейтральный полиморфизм здоровой популяции' },
  ];

  const references = [
    {
      authors: 'Richards S., Aziz N., Bale S., Bick D. et al.',
      year: '2015',
      title: 'Standards and guidelines for the interpretation of sequence variants: a joint consensus recommendation of the American College of Medical Genetics and Genomics and the Association for Molecular Pathology',
      source: 'Genetics in Medicine, 17(5):405–424. doi:10.1038/gim.2015.30',
    },
    {
      authors: 'Landrum M.J., Chitipothu S., Brown G.R. et al.',
      year: '2020',
      title: 'ClinVar: improvements to accessing data',
      source: 'Nucleic Acids Research, 48(D1):D835–D844. doi:10.1093/nar/gkz836',
    },
    {
      authors: 'Shannon C.E.',
      year: '1948',
      title: 'A Mathematical Theory of Communication',
      source: 'The Bell System Technical Journal, 27(3):379–423. doi:10.1002/j.1538-7305.1948.tb01338.x',
    },
    {
      authors: 'Rentzsch P., Witten D., Cooper G.M. et al.',
      year: '2019',
      title: 'CADD: predicting the deleteriousness of variants throughout the human genome',
      source: 'Nucleic Acids Research, 47(D1):D886–D894. doi:10.1093/nar/gky1016',
    },
    {
      authors: 'Ioannidis N.M., Roth F.P., Pejaver V. et al.',
      year: '2016',
      title: 'REVEL: An Ensemble Method for Predicting the Pathogenicity of Rare Missense Variants',
      source: 'The American Journal of Human Genetics, 99(4):877–885. doi:10.1016/j.ajhg.2016.08.016',
    },
    {
      authors: 'Cheng J., Novati G., Pan J. et al. (Google DeepMind)',
      year: '2023',
      title: 'Accurate proteome-wide missense variant effect prediction with AlphaMissense',
      source: 'Science, 381(6664):eadg7492. doi:10.1126/science.adg7492',
    },
  ];

  return (
    <footer id="references" className="bg-white border-t border-slate-200 pt-10 sm:pt-12 pb-12 sm:pb-14 text-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Ethical Compliance Statement */}
        <div className="border border-slate-200 rounded-lg p-4 sm:p-5 bg-slate-50 space-y-2 shadow-2xs">
          <div className="flex items-center gap-2 font-mono uppercase text-[10px] sm:text-[11px] font-bold text-slate-700">
            <ShieldAlert className="w-4 h-4 text-slate-600 shrink-0" />
            <span>Этический регламент и академический дисклеймер</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-xs">
            Настоящая платформа создана исключительно в <strong>учебных и исследовательских целях</strong> в рамках школьного научного конкурса. В работе <strong>не используются персональные или конфиденциальные клинические данные пациентов</strong>; все модели обучались и валидировались на открытых базах NCBI ClinVar и консорциума gnomAD (сборка GRCh38).
          </p>
          <p className="text-slate-600 leading-relaxed text-xs">
            Математическая модель демонстрирует фундаментальные методы бинарной классификации (y ∈ &#123;0, 1&#125;) и <strong>не является инструментом практической медицинской диагностики</strong>. В реальной клинической генетике применяется стандартизованная 5-уровневая система <strong>ACMG/AMP</strong>:
          </p>

          {/* ACMG 5-level framework */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 pt-2 font-mono">
            {acmgClasses.map((item, idx) => (
              <div key={idx} className="border border-slate-200 bg-white p-2.5 rounded text-[11px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-navy-900">{item.code}</span>
                  <span className="text-[10px] text-slate-500">{item.criteria}</span>
                </div>
                <div className="font-sans font-medium text-slate-800 text-[11px]">{item.name}</div>
                <p className="font-sans text-[10px] text-slate-500 mt-1 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reproducibility & Colab Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-lg border border-slate-200 bg-slate-50 shadow-2xs">
          <div>
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-slate-500">
              Воспроизводимость результатов (Open Research)
            </div>
            <div className="font-serif font-bold text-navy-900 text-sm sm:text-base mt-0.5">
              Исходный код предобработки, обучения моделей и валидации
            </div>
            <div className="text-slate-600 text-xs mt-0.5">
              Все вычисления, включая фильтрацию ClinVar и проверку локуса CFTR, открыты в Google Colab и доступны локально.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="https://colab.research.google.com/drive/1QLS3oyKm5bicvRj0sIfGjEumB6d1oten"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded bg-navy-900 text-white hover:bg-navy-800 text-xs font-mono font-medium transition-colors shadow-2xs"
            >
              <span>Открыть в Google Colab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="ClinVar_модель_и_калькулятор.ipynb"
              download
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-300 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Скачать .ipynb</span>
            </a>
          </div>
        </div>

        {/* Bibliography List */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-600" />
            <span>Список ключевых научных источников (ACMG, ClinVar, Shannon, CADD, REVEL, AlphaMissense):</span>
          </div>

          <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 bg-white shadow-2xs">
            {references.map((ref, idx) => (
              <div key={idx} className="p-3 text-[11px] text-slate-700 leading-relaxed font-sans">
                <span className="font-mono text-slate-500 font-semibold mr-1.5">[{idx + 1}]</span>
                <span className="font-semibold text-slate-900">{ref.authors} ({ref.year}). </span>
                <span className="italic">{ref.title}. </span>
                <span className="text-slate-500 font-mono text-[10px] block sm:inline mt-0.5 sm:mt-0">{ref.source}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Credits */}
        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-slate-500 text-[11px] font-mono gap-2">
          <div>
            Балауса Абдукадырова (10 «Д» класс) · Руководитель: Акмарал Бахадировна Абдикаримова
          </div>
          <div>
            ALAN International School · г. Шымкент · 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
