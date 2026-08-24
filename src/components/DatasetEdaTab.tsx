import React, { useState } from 'react';
import { CLEVELAND_SUMMARY_STATS, FEATURE_METADATA_LIST } from '../data/clevelandDataset';
import { Database, Search, Filter, BarChart3, TrendingUp, PieChart, Sliders } from 'lucide-react';

export const DatasetEdaTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<string>('age');

  // Sample data points for visualization
  const correlationData = [
    { f1: 'thal', f2: 'target', corr: 0.52 },
    { f1: 'ca', f2: 'target', corr: 0.46 },
    { f1: 'oldpeak', f2: 'target', corr: 0.42 },
    { f1: 'exang', f2: 'target', corr: 0.43 },
    { f1: 'cp', f2: 'target', corr: 0.41 },
    { f1: 'thalach', f2: 'target', corr: -0.42 },
    { f1: 'slope', f2: 'target', corr: 0.35 },
    { f1: 'sex', f2: 'target', corr: 0.28 },
    { f1: 'age', f2: 'target', corr: 0.23 },
    { f1: 'trestbps', f2: 'target', corr: 0.15 },
    { f1: 'chol', f2: 'target', corr: 0.08 },
    { f1: 'fbs', f2: 'target', corr: 0.02 }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800/80">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
            <Database className="w-5 h-5 text-rose-400" />
          </div>
          <span>Clinical Dataset & Exploratory Data Analysis</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Standardized clinical cardiovascular database with 303 patient cases across 13 key clinical attributes.
        </p>
      </div>

      {/* Statistical Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Instances</span>
          <p className="text-xl font-extrabold text-white mt-1">{CLEVELAND_SUMMARY_STATS.totalCount}</p>
          <span className="text-[10px] text-slate-500">100% complete</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-sm">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Class 0 (Healthy)</span>
          <p className="text-xl font-extrabold text-emerald-400 mt-1">{CLEVELAND_SUMMARY_STATS.healthyCount}</p>
          <span className="text-[10px] text-slate-500">{CLEVELAND_SUMMARY_STATS.healthyPercentage}% of cohort</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-sm">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Class 1 (CAD)</span>
          <p className="text-xl font-extrabold text-rose-400 mt-1">{CLEVELAND_SUMMARY_STATS.diseaseCount}</p>
          <span className="text-[10px] text-slate-500">{CLEVELAND_SUMMARY_STATS.diseasePercentage}% of cohort</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mean Age</span>
          <p className="text-xl font-extrabold text-white mt-1">{CLEVELAND_SUMMARY_STATS.meanAge} yrs</p>
          <span className="text-[10px] text-slate-500">Range: 29 - 77 yrs</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Male Ratio</span>
          <p className="text-xl font-extrabold text-white mt-1">{CLEVELAND_SUMMARY_STATS.malePercentage}%</p>
          <span className="text-[10px] text-slate-500">206 Males / 97 Females</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-sm">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Missing Values</span>
          <p className="text-xl font-extrabold text-amber-400 mt-1">6 values</p>
          <span className="text-[10px] text-slate-500">4 in ca, 2 in thal</span>
        </div>
      </div>

      {/* Interactive Charts: Class Balance & Feature Correlations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Class Balance Donut & Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <PieChart className="w-4 h-4 text-rose-400" />
              <span>Target Class Distribution</span>
            </h3>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
              Stratified 54:46
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path
                  className="text-emerald-500"
                  strokeWidth="5.5"
                  strokeDasharray="54.12, 100"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-rose-500"
                  strokeWidth="5.5"
                  strokeDasharray="45.88, 100"
                  strokeDashoffset="-54.12"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Total</span>
                <span className="text-base font-extrabold text-white">303</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
                <span className="font-semibold text-slate-300">Class 0 (No Disease):</span>
                <span className="font-mono font-bold text-white">164 (54.12%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
                <span className="font-semibold text-slate-300">Class 1 (CAD):</span>
                <span className="font-mono font-bold text-white">139 (45.88%)</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                Balanced distribution supports rigorous classification with 5-fold Stratified cross-validation.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Correlation with Heart Disease */}
        <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>Pearson Correlation with Target Disease (r)</span>
            </h3>
            <span className="text-[11px] text-slate-400">Bivariate Association</span>
          </div>

          <div className="space-y-2 text-xs">
            {correlationData.map((item, idx) => {
              const isPos = item.corr >= 0;
              const width = Math.min(Math.abs(item.corr) * 160, 100);
              return (
                <div key={idx} className="flex items-center justify-between">
                  <span className="w-16 font-mono font-medium text-slate-300">{item.f1}</span>
                  <div className="flex-1 mx-3 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full ${isPos ? 'bg-rose-500' : 'bg-sky-500'}`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span className={`w-12 text-right font-mono font-semibold text-xs ${isPos ? 'text-rose-400' : 'text-sky-400'}`}>
                    {isPos ? `+${item.corr.toFixed(2)}` : item.corr.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Feature Explorer Table & Metadata Guide */}
      <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">
              📋 Complete Clinical Feature Dictionary & Normal Reference Ranges
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Detailed clinical descriptions, expected ranges, and physiological significance for each attribute.
            </p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-rose-500 outline-none w-full sm:w-56"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800/80">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                <th className="p-3">Attribute</th>
                <th className="p-3">Type</th>
                <th className="p-3">Clinical Description</th>
                <th className="p-3">Reference / Values</th>
                <th className="p-3">Diagnostic Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
              {FEATURE_METADATA_LIST.filter(f => 
                f.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
                f.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                f.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((feat) => (
                <tr key={feat.key} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-white">
                    <span className="font-mono text-rose-400 font-bold">{feat.key}</span>
                    <span className="block text-[11px] text-slate-400 font-normal">{feat.label}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                      feat.type === 'numerical'
                        ? 'bg-sky-950/60 border-sky-500/30 text-sky-300'
                        : 'bg-purple-950/60 border-purple-500/30 text-purple-300'
                    }`}>
                      {feat.type}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 max-w-xs leading-relaxed">{feat.shortDesc}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-300">{feat.normalRange}</td>
                  <td className="p-3 text-slate-400 max-w-sm leading-relaxed">{feat.clinicalSignificance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
