import React, { useState } from 'react';
import { BENCHMARK_MODELS } from '../utils/mlEngine';
import { ModelBenchmark } from '../types';
import { Trophy, CheckCircle2, TrendingUp, HelpCircle, GitCommit, Target, BarChart2 } from 'lucide-react';

export const ModelBenchmarkTab: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>('rf_joa');
  const selectedModel = BENCHMARK_MODELS.find(m => m.id === selectedModelId) || BENCHMARK_MODELS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800/80">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <span>Machine Learning Model Benchmarks & Comparison</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Rigorous 80:20 stratified test split evaluation (N=61) across 6 fundamental algorithms + Jellyfish Optimization (JOA).
        </p>
      </div>

      {/* Benchmark Summary Table */}
      <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">
              📊 Multi-Metric Model Comparison Table
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Sorted by diagnostic priority: <strong className="text-slate-200">F1-Score, ROC-AUC, and Recall</strong> (Sensitivity).
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
            Top Performer: Random Forest + JOA (F1: 0.8727 | AUC: 0.9242)
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800/80">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                <th className="p-3">Rank / Model</th>
                <th className="p-3">Category</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">Precision</th>
                <th className="p-3 text-amber-400">Recall (Sens)</th>
                <th className="p-3 text-emerald-400">F1-Score</th>
                <th className="p-3 text-rose-400">ROC-AUC</th>
                <th className="p-3">Features</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
              {BENCHMARK_MODELS.map((model, idx) => {
                const isSelected = model.id === selectedModelId;
                const isBest = idx === 0;
                return (
                  <tr
                    key={model.id}
                    onClick={() => setSelectedModelId(model.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-rose-950/40 font-semibold border-l-2 border-rose-500'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isBest
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className={isBest ? 'text-rose-400 font-bold' : 'text-white'}>
                          {model.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-400">{model.category}</td>
                    <td className="p-3 font-mono font-medium text-slate-300">{(model.accuracy * 100).toFixed(2)}%</td>
                    <td className="p-3 font-mono font-medium text-slate-300">{(model.precision * 100).toFixed(2)}%</td>
                    <td className="p-3 font-mono font-bold text-amber-400">{(model.recall * 100).toFixed(2)}%</td>
                    <td className="p-3 font-mono font-bold text-emerald-400">{model.f1Score.toFixed(4)}</td>
                    <td className="p-3 font-mono font-bold text-rose-400">{model.rocAuc.toFixed(4)}</td>
                    <td className="p-3 font-mono text-slate-400">{model.featuresUsed} / 13</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Deep Dive: Confusion Matrix & Diagnostic Interpretation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Confusion Matrix (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <Target className="w-4 h-4 text-rose-400" />
              <span>Confusion Matrix ({selectedModel.name})</span>
            </h3>
            <span className="text-[11px] text-slate-400">Stratified Test Set (N=61)</span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950/70 rounded-xl border border-slate-800/80">
            
            {/* True Negative */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center">
              <span className="text-[10px] font-bold text-emerald-400 block uppercase tracking-wider">True Negatives (TN)</span>
              <span className="text-3xl font-extrabold text-emerald-300 mt-1 block">{selectedModel.confusionMatrix.tn}</span>
              <p className="text-[10px] text-slate-400 mt-1">Correctly identified Healthy</p>
            </div>

            {/* False Positive */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center">
              <span className="text-[10px] font-bold text-amber-400 block uppercase tracking-wider">False Positives (FP)</span>
              <span className="text-3xl font-extrabold text-amber-300 mt-1 block">{selectedModel.confusionMatrix.fp}</span>
              <p className="text-[10px] text-slate-400 mt-1">Healthy misclassified as CAD</p>
            </div>

            {/* False Negative */}
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-center">
              <span className="text-[10px] font-bold text-rose-400 block uppercase tracking-wider">False Negatives (FN)</span>
              <span className="text-3xl font-extrabold text-rose-300 mt-1 block">{selectedModel.confusionMatrix.fn}</span>
              <p className="text-[10px] text-rose-400 font-semibold mt-1">Critical: Missed CAD cases</p>
            </div>

            {/* True Positive */}
            <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-center">
              <span className="text-[10px] font-bold text-sky-400 block uppercase tracking-wider">True Positives (TP)</span>
              <span className="text-3xl font-extrabold text-sky-300 mt-1 block">{selectedModel.confusionMatrix.tp}</span>
              <p className="text-[10px] text-slate-400 mt-1">Correctly identified CAD</p>
            </div>

          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            In cardiovascular triaging, minimizing <strong className="text-white">False Negatives (FN)</strong> is prioritized over minimizing False Positives to ensure severe ischemic patients receive angiographic evaluation.
          </p>
        </div>

        {/* Diagnostic Metrics & ROC Discussion (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center space-x-2">
            <BarChart2 className="w-4 h-4 text-emerald-400" />
            <span>Why Prioritize Recall & ROC-AUC?</span>
          </h3>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <strong className="text-white block font-bold">1. Clinical Risk of False Negatives</strong>
              <p className="text-slate-400">
                A false negative patient with asymptomatic multi-vessel CAD is discharged without treatment, risking myocardial infarction. A high <strong className="text-emerald-400">Recall (Sensitivity = 85.71%)</strong> ensures critical patients are flagged.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <strong className="text-white block font-bold">2. Threshold-Independent ROC-AUC (0.9242)</strong>
              <p className="text-slate-400">
                ROC-AUC measures the probability that the classifier ranks a randomly chosen positive CAD patient higher than a healthy patient across all decision cutoffs.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <strong className="text-white block font-bold">3. Balanced F1-Score (0.8727)</strong>
              <p className="text-slate-400">
                Harmonic mean of precision (88.89%) and recall (85.71%) ensures high specificity without inflating false alarms.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
