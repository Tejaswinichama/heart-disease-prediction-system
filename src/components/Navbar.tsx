import React from 'react';
import { ActiveTab } from '../types';
import { Activity, Stethoscope, BarChart3, Trophy, Waves, BrainCircuit, Code2, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openGuide }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
    { id: 'predict', label: 'Patient Predictor', icon: <Stethoscope className="w-4 h-4" />, badge: 'Live' },
    { id: 'eda', label: 'Dataset & EDA', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'models', label: 'Model Benchmarks', icon: <Trophy className="w-4 h-4" /> },
    { id: 'joa', label: 'Jellyfish Opt (JOA)', icon: <Waves className="w-4 h-4" />, badge: 'Metaheuristic' },
    { id: 'explain', label: 'Explainability', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'code', label: 'Python & Streamlit', icon: <Code2 className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 text-white shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center shadow-md shadow-rose-600/30 ring-1 ring-white/10 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-rose-300 transition-colors">CardioPredict AI</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  Clinical AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Clinical ML Decision Support System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25 ring-1 ring-rose-500/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Academic Guide & Project Viva Help */}
          <div className="flex items-center space-x-2">
            <button
              id="academic-guide-btn"
              onClick={openGuide}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all shadow-sm cursor-pointer hover:shadow-emerald-500/10"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Viva & Study Guide</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1.5 border-t border-slate-800/80 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/70'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
