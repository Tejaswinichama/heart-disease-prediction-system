import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Sliders, Info, ShieldCheck, Zap } from 'lucide-react';

export const ExplainabilityTab: React.FC = () => {
  const [method, setMethod] = useState<'rf' | 'lr'>('rf');

  const rfImportances = [
    { feature: 'thal (Thalassemia Perfusion)', importance: 0.21, desc: 'Reversible defect (7) signals severe inducible ischemia' },
    { feature: 'ca (Fluoroscopy Vessels)', importance: 0.18, desc: 'Number of major epicardial vessels with plaque calcification' },
    { feature: 'oldpeak (ST Depression)', importance: 0.15, desc: 'ST segment depression measured during Bruce treadmill stress' },
    { feature: 'cp (Chest Pain Type)', importance: 0.14, desc: 'Asymptomatic Type 4 strongly correlates with severe stenosis' },
    { feature: 'thalach (Max Heart Rate)', importance: 0.09, desc: 'Chronotropic response; higher peak HR is cardioprotective' },
    { feature: 'age', importance: 0.06, desc: 'Cumulative vascular stiffening and plaque accumulation' },
    { feature: 'exang (Exercise Angina)', importance: 0.05, desc: 'Reproducible chest pain during physical exertion' },
    { feature: 'trestbps (Resting BP)', importance: 0.04, desc: 'Systolic blood pressure on hospital admission' },
    { feature: 'chol (Cholesterol)', importance: 0.03, desc: 'Total serum lipid concentration' },
    { feature: 'slope (ST Slope)', importance: 0.025, desc: 'Flat or downsloping ST morphology indicates CAD' },
    { feature: 'sex', importance: 0.015, desc: 'Male biological baseline incidence' },
    { feature: 'restecg', importance: 0.007, desc: 'Resting repolarization / LVH criteria' },
    { feature: 'fbs (Fasting Sugar)', importance: 0.003, desc: 'Glycemic status > 120 mg/dl' }
  ];

  const lrOddsRatios = [
    { feature: 'thal = 7 (Reversible Defect)', odds: 3.85, type: 'risk' },
    { feature: 'ca (Per Calcified Vessel)', odds: 3.12, type: 'risk' },
    { feature: 'cp = 4 (Asymptomatic Type)', odds: 2.95, type: 'risk' },
    { feature: 'exang = 1 (Exercise Angina)', odds: 2.45, type: 'risk' },
    { feature: 'oldpeak (Per 1.0 mm ST Dep)', odds: 1.95, type: 'risk' },
    { feature: 'sex = 1 (Male)', odds: 1.82, type: 'risk' },
    { feature: 'thalach (Per 10 bpm increase)', odds: 0.72, type: 'protective' },
    { feature: 'cp = 1,2 (Typical/Atypical)', odds: 0.45, type: 'protective' },
    { feature: 'thal = 3 (Normal Perfusion)', odds: 0.32, type: 'protective' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800/80">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-purple-400" />
          </div>
          <span>Model Explainability & Clinical Decision Factors</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Unpacking black-box machine learning predictions using Gini Feature Importance, Logistic Odds Ratios, and SHAP (SHapley Additive exPlanations).
        </p>
      </div>

      {/* Selector: Random Forest Gini vs Logistic Regression Log-Odds */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMethod('rf')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            method === 'rf'
              ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/25 ring-1 ring-purple-400/30'
              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          Random Forest Gini Impurity (MDI)
        </button>
        <button
          onClick={() => setMethod('lr')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            method === 'lr'
              ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/25 ring-1 ring-purple-400/30'
              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          Logistic Regression Odds Ratios (e^β)
        </button>
      </div>

      {/* Main Chart Card */}
      {method === 'rf' ? (
        <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Global Feature Importance (Random Forest Gini Index)</span>
            </h3>
            <span className="text-xs text-slate-400">Sum = 1.0 (100%)</span>
          </div>

          <div className="space-y-3">
            {rfImportances.map((item, idx) => {
              const width = item.importance * 350;
              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{item.feature}</span>
                    <span className="font-mono font-bold text-purple-400">
                      {(item.importance * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-white flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Clinical Odds Ratios from Logistic Regression Coefficients</span>
            </h3>
            <span className="text-xs text-slate-400">Odds Ratio &gt; 1: Higher CAD Risk</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lrOddsRatios.map((item, idx) => {
              const isRisk = item.type === 'risk';
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    isRisk
                      ? 'bg-rose-950/30 border-rose-500/30'
                      : 'bg-emerald-950/30 border-emerald-500/30'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs text-white block">{item.feature}</span>
                    <span className={`text-[11px] font-semibold ${isRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {isRisk ? 'Risk Multiplier' : 'Protective Factor'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-mono font-extrabold ${isRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {item.odds}x
                    </span>
                    <span className="block text-[10px] text-slate-400">Odds Ratio</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Clinical Interpretation Guide */}
      <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-4">
        <h3 className="font-bold text-sm sm:text-base text-white flex items-center space-x-2">
          <Info className="w-4 h-4 text-sky-400" />
          <span>Top 3 Clinical Risk Drivers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 font-bold flex items-center justify-center text-xs">1</span>
            <h4 className="font-bold text-white">Thallium-201 Scintigraphy (thal)</h4>
            <p className="text-slate-400 leading-relaxed">
              Reversible perfusion defects demonstrate active myocardial ischemia under physical stress, making it the highest weighting single predictor.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 font-bold flex items-center justify-center text-xs">2</span>
            <h4 className="font-bold text-white">Fluoroscopy Vessels (ca)</h4>
            <p className="text-slate-400 leading-relaxed">
              Direct anatomical evidence of 1, 2, or 3 major epicardial coronary arteries exhibiting calcified atherosclerotic plaques.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 font-bold flex items-center justify-center text-xs">3</span>
            <h4 className="font-bold text-white">ST Depression (oldpeak)</h4>
            <p className="text-slate-400 leading-relaxed">
              Horizontal or downsloping ST segment depression &gt; 1.5 mm represents severe exercise-induced subendocardial hypoxia.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
