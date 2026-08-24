import React, { useState } from 'react';
import { ActiveTab, PatientRecord } from './types';
import { Navbar } from './components/Navbar';
import { HomeTab } from './components/HomeTab';
import { PredictionTab } from './components/PredictionTab';
import { DatasetEdaTab } from './components/DatasetEdaTab';
import { ModelBenchmarkTab } from './components/ModelBenchmarkTab';
import { OptimizationTab } from './components/OptimizationTab';
import { ExplainabilityTab } from './components/ExplainabilityTab';
import { CodeExplorerTab } from './components/CodeExplorerTab';
import { EducationalGuideModal } from './components/EducationalGuideModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Default demo patient (Healthy baseline)
  const [patientState, setPatientState] = useState<Omit<PatientRecord, 'id' | 'num' | 'target'>>({
    age: 52,
    sex: 1,
    cp: 4,
    trestbps: 135,
    chol: 240,
    fbs: 0,
    restecg: 1,
    thalach: 145,
    exang: 1,
    oldpeak: 1.8,
    slope: 2,
    ca: 1,
    thal: 7
  });

  const handleSelectPreset = (presetName: string) => {
    if (presetName === 'healthy') {
      setPatientState({ age: 38, sex: 0, cp: 1, trestbps: 115, chol: 180, fbs: 0, restecg: 0, thalach: 178, exang: 0, oldpeak: 0.0, slope: 1, ca: 0, thal: 3 });
    } else if (presetName === 'moderate') {
      setPatientState({ age: 58, sex: 1, cp: 3, trestbps: 148, chol: 260, fbs: 1, restecg: 1, thalach: 142, exang: 1, oldpeak: 1.4, slope: 2, ca: 1, thal: 6 });
    } else if (presetName === 'high') {
      setPatientState({ age: 65, sex: 1, cp: 4, trestbps: 160, chol: 310, fbs: 1, restecg: 2, thalach: 112, exang: 1, oldpeak: 3.2, slope: 3, ca: 3, thal: 7 });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white relative">
      
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-600/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-sky-600/5 rounded-full blur-[160px]" />
      </div>

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <HomeTab
            setActiveTab={setActiveTab}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeTab === 'predict' && (
          <PredictionTab
            patientState={patientState}
            setPatientState={setPatientState}
          />
        )}

        {activeTab === 'eda' && <DatasetEdaTab />}

        {activeTab === 'models' && <ModelBenchmarkTab />}

        {activeTab === 'joa' && <OptimizationTab />}

        {activeTab === 'explain' && <ExplainabilityTab />}

        {activeTab === 'code' && <CodeExplorerTab />}
      </main>

      {/* Academic Viva & Study Guide Modal */}
      <EducationalGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-slate-900/90 bg-slate-950/80 backdrop-blur-md py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-medium text-slate-400">
            CardioPredict AI &copy; {new Date().getFullYear()} &bull; Cardiovascular Clinical Risk Prediction Platform &bull; Health Informatics Project
          </p>
          <p className="text-[11px] text-slate-600">
            For academic, educational, and research evaluation purposes only. Not certified for clinical medical diagnostics.
          </p>
        </div>
      </footer>

    </div>
  );
}
