import React from 'react';
import { X, BookOpen, CheckCircle, HelpCircle, AlertCircle, Award } from 'lucide-react';

interface EducationalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EducationalGuideModal: React.FC<EducationalGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const vivaQuestions = [
    {
      q: 'Why convert multi-class `num` (0, 1, 2, 3, 4) into binary target (0 vs 1)?',
      a: 'The clinical reference dataset specifies `0 = < 50% diameter narrowing (healthy)` and `1-4 = > 50% diameter narrowing (CAD)`. For screening and clinical decision support, the priority is identifying whether actionable CAD is present rather than sub-stratifying multi-vessel severity on non-invasive data alone.'
    },
    {
      q: 'How did you prevent data leakage during preprocessing?',
      a: 'The `ColumnTransformer` (StandardScaler & SimpleImputer) is strictly fitted on the training set (`X_train`) only and applied via `.transform()` to the test set (`X_test`) and runtime inference instances. This prevents test set statistics (e.g. mean, std) from contaminating model training.'
    },
    {
      q: 'Why is Jellyfish Optimization Algorithm (JOA) used instead of simple Recursive Feature Elimination (RFE)?',
      a: 'JOA is a population-based metaheuristic swarm algorithm that balances global exploration (ocean current movement) and local exploitation (active/passive swarm motion). Unlike greedy methods like RFE which can get trapped in local optima, JOA searches non-linear combinatorial feature subsets to optimize cross-validated ROC-AUC.'
    },
    {
      q: 'Why is Recall (Sensitivity) more critical than Accuracy in heart disease prediction?',
      a: 'A False Negative in medical diagnosis means a patient with severe coronary artery disease is sent home without intervention, risking acute myocardial infarction or cardiac arrest. Maximizing Recall ensures patients with CAD are reliably flagged for follow-up testing.'
    },
    {
      q: 'What is the clinical significance of Thallium Scintigraphy (`thal`) and Fluoroscopy (`ca`)?',
      a: '`thal` (specifically reversible defect = 7) directly visualizes active stress-induced ischemia. `ca` measures the number of major epicardial coronary arteries exhibiting calcified atherosclerotic plaques. Both are non-invasive proxies with strong diagnostic power.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800/90 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>Academic Defense & Viva Guide</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Academic Viva & Project Examination Questions
          </h2>
          <p className="text-xs text-slate-400">
            Key theoretical and practical concepts commonly asked by project evaluators and professors.
          </p>
        </div>

        {/* Viva Questions Accordion / List */}
        <div className="space-y-3.5">
          {vivaQuestions.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <h4 className="font-bold text-sm text-white">{item.q}</h4>
              </div>
              <p className="text-xs text-slate-300 pl-7 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Close Modal Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all cursor-pointer border border-slate-700"
          >
            Close Study Guide
          </button>
        </div>

      </div>
    </div>
  );
};
