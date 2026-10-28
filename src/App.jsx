import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StagesBlock from './components/StagesBlock';
import FeaturesBlock from './components/FeaturesBlock';
import ShannonBlock from './components/ShannonBlock';
import WhiteBoxBlock from './components/WhiteBoxBlock';
import ConfusionMatrixBlock from './components/ConfusionMatrixBlock';
import FooterBlock from './components/FooterBlock';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-primary selection:text-white">
      {/* Sticky Academic Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero />

        {/* 1. Three Research Stages */}
        <StagesBlock />

        {/* 2. Feature System (6 real + 2 theoretical) */}
        <FeaturesBlock />

        {/* 3. Shannon Entropy & DNA Window Calculator */}
        <ShannonBlock />

        {/* 4. White-Box Model & F508del Case */}
        <WhiteBoxBlock />

        {/* 5. Interactive Confusion Matrix & Threshold */}
        <ConfusionMatrixBlock />
      </main>

      {/* 6. Footer, Ethical Disclaimer & Literature */}
      <FooterBlock />
    </div>
  );
}
