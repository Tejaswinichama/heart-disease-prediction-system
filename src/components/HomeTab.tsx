import React from 'react';
import { ActiveTab } from '../types';
import { HeartPulse, Cpu, ShieldAlert, ArrowRight, Zap, Target, GitCompare, Database, Sparkles } from 'lucide-react';
import { CLEVELAND_SUMMARY_STATS } from '../data/clevelandDataset';

interface HomeTabProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectPreset: (presetName: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ setActiveTab, onSelectPreset }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Banner with Medical Accent */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/80 text-white p-8 md:p-12 border border-slate-800/90 shadow-xl shadow-black/40">
        <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <HeartPulse className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span>Machine Learning & Clinical Decision Support System</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Predict Coronary Artery Disease with <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300">Intelligent Clinical AI</span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            An intuitive, end-to-end clinical diagnostic platform combining 13 non-invasive health markers, 
            multi-model benchmarking (6 ML algorithms), bio-inspired <strong className="text-white">Jellyfish Optimization (JOA)</strong>, and 
            <strong className="text-white"> transparent explainability</strong> for rapid patient risk stratification.
          </p>

          <div className="flex flex-wrap gap-3.5 pt-2">
            <button
              id="hero-start-predict-btn"
              onClick={() => setActiveTab('predict')}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-sm shadow-lg shadow-rose-600/30 ring-1 ring-rose-400/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch Patient Predictor</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-view-benchmarks-btn"
              onClick={() => setActiveTab('models')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all cursor-pointer hover:border-slate-600 active:scale-[0.98]"
            >
              <GitCompare className="w-4 h-4 text-rose-400" />
              <span>Compare Models</span>
            </button>

            <button
              id="hero-view-joa-btn"
              onClick={() => setActiveTab('joa')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-sky-950/50 hover:bg-sky-900/50 text-sky-200 border border-sky-600/30 font-semibold text-sm transition-all cursor-pointer hover:border-sky-500/50 active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Jellyfish Opt (JOA)</span>
            </button>
          </div>
        </div>
      </div>

      {/* High-Level Diagnostic Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Validation Cohort</span>
            <Database className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-white">
            {CLEVELAND_SUMMARY_STATS.totalCount} <span className="text-xs font-normal text-slate-400">Patients</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">164 Healthy (54%) vs 139 CAD (46%)</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Top ROC-AUC</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-400">
            0.9242
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Random Forest + JOA Swarm</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Sensitivity / Recall</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-white">
            85.71%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Minimizes critical false negatives</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Clinical Features</span>
            <Cpu className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-white">
            13 Attributes
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Hemodynamics, ECG & Scintigraphy</p>
        </div>
      </div>

      {/* Quick Interactive Patient Presets */}
      <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>⚡ Quick Demo Profiles (Try Clinical Scenarios)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any clinical prototype below to immediately test the prediction engine with representative patient parameters.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            id="preset-healthy-card"
            onClick={() => { onSelectPreset('healthy'); setActiveTab('predict'); }}
            className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/70 cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-500/10 group hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Low Risk Scenario
              </span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-bold text-sm text-white mt-2.5">Healthy 38yo Female Athlete</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Resting BP 115 mm Hg, Max HR 178 bpm, 0 ST depression, Normal Thal scan, 0 fluoroscopy vessels.
            </p>
          </div>

          <div
            id="preset-moderate-card"
            onClick={() => { onSelectPreset('moderate'); setActiveTab('predict'); }}
            className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-500/70 cursor-pointer transition-all hover:shadow-lg hover:shadow-amber-500/10 group hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950 text-amber-300 border border-amber-500/30">
                Moderate Risk Scenario
              </span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-bold text-sm text-white mt-2.5">58yo Hypertensive Male</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Resting BP 148 mm Hg, Cholesterol 260 mg/dl, 1.4 mm ST depression, 1 vessel calcified, fixed defect.
            </p>
          </div>

          <div
            id="preset-high-card"
            onClick={() => { onSelectPreset('high'); setActiveTab('predict'); }}
            className="p-4 rounded-xl bg-slate-900/90 border border-rose-500/30 hover:border-rose-500/70 cursor-pointer transition-all hover:shadow-lg hover:shadow-rose-500/10 group hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-500/30">
                High Risk CAD
              </span>
              <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-bold text-sm text-white mt-2.5">65yo Male with Ischemia</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Asymptomatic chest pain, 3.2 mm ST depression, downsloping ST, 3 vessels calcified, reversible defect.
            </p>
          </div>
        </div>
      </div>

      {/* End-to-End Pipeline Step Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <span>🔬 End-to-End Machine Learning Workflow</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h4 className="font-bold text-sm text-white">Dataset Ingestion & Cleaning</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Loads 303 records, handles missing fluoroscopy (<code className="text-rose-400">ca</code>) & thallium (<code className="text-rose-400">thal</code>) values, and binarizes target (<code className="text-rose-400">num &gt; 0</code>).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h4 className="font-bold text-sm text-white">Stratified Preprocessing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              StandardScaler for continuous variables (<code className="text-sky-400">age, chol, thalach</code>) with 80:20 stratified split ensuring strict zero data leakage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h4 className="font-bold text-sm text-white">Swarm Optimization (JOA)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jellyfish Search metaheuristic eliminates collinear/noisy dimensions, improving ROC-AUC from 0.8864 to 0.9242.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <h4 className="font-bold text-sm text-white">SHAP Explainability</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decomposes model predictions into interpretable local feature contributions so clinicians understand why risk is elevated.
            </p>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer Banner */}
      <div className="p-5 rounded-2xl bg-amber-950/25 border border-amber-500/30 flex items-start space-x-3 text-amber-200/90 shadow-md">
        <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-sm text-amber-300">Educational & Research Disclaimer</p>
          <p className="leading-relaxed text-amber-200/80">
            This system was engineered as a B.Tech Computer Science / Health Informatics academic project. 
            Outputs generated by machine learning models represent statistical risk correlations and must not be used as clinical medical diagnoses or to substitute formal coronary angiography.
          </p>
        </div>
      </div>

    </div>
  );
};
