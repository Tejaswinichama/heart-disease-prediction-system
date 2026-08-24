import React, { useState } from 'react';
import { PatientRecord, PredictionResult } from '../types';
import { runInference } from '../utils/mlEngine';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  Info, 
  FileText, 
  RotateCcw, 
  Printer, 
  X, 
  Heart, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  Check 
} from 'lucide-react';

interface PredictionTabProps {
  patientState: Omit<PatientRecord, 'id' | 'num' | 'target'>;
  setPatientState: React.Dispatch<React.SetStateAction<Omit<PatientRecord, 'id' | 'num' | 'target'>>>;
}

export const PredictionTab: React.FC<PredictionTabProps> = ({ patientState, setPatientState }) => {
  const [result, setResult] = useState<PredictionResult | null>(() => runInference(patientState));
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const handleInputChange = (key: keyof typeof patientState, val: number) => {
    const updated = { ...patientState, [key]: val };
    setPatientState(updated);
    setResult(runInference(updated));
  };

  const handlePredictClick = () => {
    setResult(runInference(patientState));
  };

  const resetToDefault = () => {
    const baseline = { age: 50, sex: 1, cp: 1, trestbps: 120, chol: 195, fbs: 0, restecg: 0, thalach: 160, exang: 0, oldpeak: 0.0, slope: 1, ca: 0, thal: 3 };
    setPatientState(baseline);
    setResult(runInference(baseline));
  };

  const loadPreset = (type: 'healthy' | 'moderate' | 'high') => {
    let preset: Omit<PatientRecord, 'id' | 'num' | 'target'>;
    if (type === 'healthy') {
      preset = { age: 38, sex: 0, cp: 1, trestbps: 115, chol: 180, fbs: 0, restecg: 0, thalach: 178, exang: 0, oldpeak: 0.0, slope: 1, ca: 0, thal: 3 };
    } else if (type === 'moderate') {
      preset = { age: 58, sex: 1, cp: 3, trestbps: 148, chol: 260, fbs: 1, restecg: 1, thalach: 142, exang: 1, oldpeak: 1.4, slope: 2, ca: 1, thal: 6 };
    } else {
      preset = { age: 65, sex: 1, cp: 4, trestbps: 160, chol: 310, fbs: 1, restecg: 2, thalach: 112, exang: 1, oldpeak: 3.2, slope: 3, ca: 3, thal: 7 };
    }
    setPatientState(preset);
    setResult(runInference(preset));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header with Quick Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-rose-400" />
            </div>
            <span>Patient Risk Assessment Engine</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Easy-to-use patient screening: adjust the health parameters below to view real-time cardiovascular risk probability and actionable guidance.
          </p>
        </div>

        {/* Quick Action Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800/80 p-1.5 rounded-xl shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 pl-1.5 hidden sm:inline">Try Scenario:</span>
            <button
              onClick={() => loadPreset('healthy')}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 font-medium hover:bg-emerald-900/80 transition-all cursor-pointer flex items-center space-x-1"
            >
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Healthy Profile</span>
            </button>
            <button
              onClick={() => loadPreset('moderate')}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-amber-950/70 text-amber-300 border border-amber-500/30 font-medium hover:bg-amber-900/80 transition-all cursor-pointer flex items-center space-x-1"
            >
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>Moderate Risk</span>
            </button>
            <button
              onClick={() => loadPreset('high')}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-rose-950/70 text-rose-300 border border-rose-500/30 font-medium hover:bg-rose-900/80 transition-all cursor-pointer flex items-center space-x-1"
            >
              <Heart className="w-3 h-3 text-rose-400" />
              <span>High Risk</span>
            </button>
          </div>

          <button
            onClick={resetToDefault}
            title="Reset form to baseline"
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <span>13 Core Health Indicators</span>
                <span className="text-[11px] font-normal text-slate-400">(Standard Clinical Biomarkers)</span>
              </h3>
              <div className="flex items-center space-x-1.5 text-xs text-rose-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>Instant Assessment</span>
              </div>
            </div>

            {/* Demographics & Baseline Vitals */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">1. Demographics & Baseline Vitals</h4>
                <span className="text-[10px] text-slate-500">Standard non-invasive metrics</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Age */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                    <span>Patient Age:</span>
                    <span className="text-rose-400 font-bold font-mono text-sm">{patientState.age} yrs</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={80}
                    value={patientState.age}
                    onChange={(e) => handleInputChange('age', Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Min: 25 yrs</span>
                    <span className="text-slate-400">Higher age = higher baseline risk</span>
                    <span>Max: 80 yrs</span>
                  </div>
                </div>

                {/* Sex */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <label className="text-xs font-medium text-slate-300">Biological Sex</label>
                  <select
                    value={patientState.sex}
                    onChange={(e) => handleInputChange('sex', Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-medium focus:ring-1 focus:ring-rose-500 outline-none"
                  >
                    <option value={1}>Male (Historically higher early incidence)</option>
                    <option value={0}>Female</option>
                  </select>
                  <p className="text-[10px] text-slate-500">Biological sex influences cardiovascular baseline risk</p>
                </div>

                {/* Resting Blood Pressure */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                    <span>Resting Blood Pressure:</span>
                    <span className="text-rose-400 font-bold font-mono text-sm">{patientState.trestbps} mm Hg</span>
                  </div>
                  <input
                    type="range"
                    min={90}
                    max={200}
                    step={2}
                    value={patientState.trestbps}
                    onChange={(e) => handleInputChange('trestbps', Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Optimal: &lt;120</span>
                    <span className={patientState.trestbps >= 140 ? 'text-rose-400 font-semibold' : 'text-emerald-400'}>
                      {patientState.trestbps >= 140 ? 'Hypertensive' : patientState.trestbps >= 120 ? 'Pre-hypertension' : 'Normal'}
                    </span>
                    <span>Max: 200</span>
                  </div>
                </div>

                {/* Cholesterol */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                    <span>Serum Cholesterol:</span>
                    <span className="text-rose-400 font-bold font-mono text-sm">{patientState.chol} mg/dl</span>
                  </div>
                  <input
                    type="range"
                    min={120}
                    max={560}
                    step={5}
                    value={patientState.chol}
                    onChange={(e) => handleInputChange('chol', Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Desirable: &lt;200</span>
                    <span className={patientState.chol >= 240 ? 'text-rose-400 font-semibold' : patientState.chol >= 200 ? 'text-amber-400' : 'text-emerald-400'}>
                      {patientState.chol >= 240 ? 'High' : patientState.chol >= 200 ? 'Borderline' : 'Desirable'}
                    </span>
                    <span>Max: 560</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Symptoms & Stress Electrocardiography */}
            <div className="space-y-4 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">2. Symptoms & Exercise Stress Response</h4>
                <span className="text-[10px] text-slate-500">Treadmill test & chest symptoms</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Chest Pain Type */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <label className="text-xs font-medium text-slate-300">Chest Pain Type</label>
                  <select
                    value={patientState.cp}
                    onChange={(e) => handleInputChange('cp', Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-medium focus:ring-1 focus:ring-rose-500 outline-none"
                  >
                    <option value={1}>1: Typical Angina (Exertional pressure)</option>
                    <option value={2}>2: Atypical Angina (Atypical chest pain)</option>
                    <option value={3}>3: Non-Anginal (Sharp/positional pain)</option>
                    <option value={4}>4: Asymptomatic (Silent ischemia risk)</option>
                  </select>
                  <p className="text-[10px] text-slate-500">Type 4 (Asymptomatic) frequently signals advanced CAD</p>
                </div>

                {/* Fasting Blood Sugar */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <label className="text-xs font-medium text-slate-300">Fasting Blood Sugar &gt; 120 mg/dl</label>
                  <select
                    value={patientState.fbs}
                    onChange={(e) => handleInputChange('fbs', Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-medium focus:ring-1 focus:ring-rose-500 outline-none"
                  >
                    <option value={0}>False: Normal / Pre-meal (≤ 120 mg/dl)</option>
                    <option value={1}>True: Elevated / Diabetic (&gt; 120 mg/dl)</option>
                  </select>
                  <p className="text-[10px] text-slate-500">Chronic hyperglycemia accelerates vascular plaque</p>
                </div>

                {/* Resting ECG */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <label className="text-xs font-medium text-slate-300">Resting Electrocardiogram (ECG)</label>
                  <select
                    value={patientState.restecg}
                    onChange={(e) => handleInputChange('restecg', Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-medium focus:ring-1 focus:ring-rose-500 outline-none"
                  >
                    <option value={0}>0: Normal ECG wave pattern</option>
                    <option value={1}>1: ST-T wave abnormalities (Inverted T-waves)</option>
                    <option value={2}>2: Left Ventricular Hypertrophy (LV Strain)</option>
                  </select>
                  <p className="text-[10px] text-slate-500">Evaluates baseline heart rhythm and chamber thickening</p>
                </div>

                {/* Max Heart Rate */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                    <span>Peak Exertion Heart Rate:</span>
                    <span className="text-rose-400 font-bold font-mono text-sm">{patientState.thalach} bpm</span>
                  </div>
                  <input
                    type="range"
                    min={70}
                    max={205}
                    value={patientState.thalach}
                    onChange={(e) => handleInputChange('thalach', Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Low: 70 bpm</span>
                    <span className="text-slate-400">Higher peak HR reflects better fitness</span>
                    <span>High: 205 bpm</span>
                  </div>
                </div>

                {/* Exercise Angina */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <label className="text-xs font-medium text-slate-300">Exercise-Induced Chest Pain (Angina)</label>
                  <select
                    value={patientState.exang}
                    onChange={(e) => handleInputChange('exang', Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-medium focus:ring-1 focus:ring-rose-500 outline-none"
                  >
                    <option value={0}>0: No chest pain during exercise</option>
                    <option value={1}>1: Yes, chest pain triggered by exercise</option>
                  </select>
                  <p className="text-[10px] text-slate-500">Direct indicator of heart muscle oxygen deficit</p>
                </div>

                {/* ST Depression (oldpeak) */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                    <span>ST Depression (oldpeak):</span>
                    <span className="text-rose-400 font-bold font-mono text-sm">{patientState.oldpeak.toFixed(1)} mm</span>
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={6.2}
                    step={0.1}
                    value={patientState.oldpeak}
                    onChange={(e) => handleInputChange('oldpeak', Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Normal: 0.0 mm</span>
                    <span className={patientState.oldpeak >= 1.5 ? 'text-rose-400 font-semibold' : 'text-emerald-400'}>
                      {patientState.oldpeak >= 2.0 ? 'Severe Ischemia' : patientState.oldpeak >= 1.0 ? 'Mild Depressed' : 'Normal'}
                    </span>
                    <span>Severe: &gt;2.5 mm</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Specialized Cardiac Diagnostic Tests */}
            <div className="space-y-4 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">3. Specialized Diagnostic Scans</h4>
                <span className="text-[10px] text-slate-500">Fluoroscopy & Perfusion</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* ST Slope */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <label className="text-xs font-medium text-slate-300">ST Segment Slope</label>
                  <select
                    value={patientState.slope}
                    onChange={(e) => handleInputChange('slope', Number(e.target.value))}
                    className="w-full p-2 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-medium focus:ring-1 focus:ring-rose-500 outline-none"
                  >
                    <option value={1}>1: Upsloping (Healthy)</option>
                    <option value={2}>2: Flat (Ischemic)</option>
                    <option value={3}>3: Downsloping (Severe)</option>
                  </select>
                  <p className="text-[10px] text-slate-500">Wave slope at peak stress</p>
                </div>

                {/* Major Vessels (ca) */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <label className="text-xs font-medium text-slate-300">Fluoroscopy Vessels</label>
                  <select
                    value={patientState.ca}
                    onChange={(e) => handleInputChange('ca', Number(e.target.value))}
                    className="w-full p-2 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-medium focus:ring-1 focus:ring-rose-500 outline-none"
                  >
                    <option value={0}>0 Major Vessels (Clear)</option>
                    <option value={1}>1 Calcified Vessel</option>
                    <option value={2}>2 Calcified Vessels</option>
                    <option value={3}>3 Calcified Vessels</option>
                  </select>
                  <p className="text-[10px] text-slate-500">Plaque blockage count (0-3)</p>
                </div>

                {/* Thalassemia */}
                <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors">
                  <label className="text-xs font-medium text-slate-300">Thallium Perfusion</label>
                  <select
                    value={patientState.thal}
                    onChange={(e) => handleInputChange('thal', Number(e.target.value))}
                    className="w-full p-2 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white font-medium focus:ring-1 focus:ring-rose-500 outline-none"
                  >
                    <option value={3}>3: Normal Blood Flow</option>
                    <option value={6}>6: Fixed Defect (Scar)</option>
                    <option value={7}>7: Reversible Defect (Ischemia)</option>
                  </select>
                  <p className="text-[10px] text-slate-500">Nuclear stress perfusion scan</p>
                </div>

              </div>
            </div>

            {/* Quick Biomarker Glossary Toggle */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowGlossary(!showGlossary)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-sky-400" />
                  <span className="font-semibold">Need help understanding medical terms? View Plain-English Biomarker Guide</span>
                </div>
                {showGlossary ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {showGlossary && (
                <div className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-3 text-slate-300 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <strong className="text-rose-400 block font-semibold">Chest Pain (cp):</strong>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Typical angina is tight pressure during exertion. Asymptomatic cases can be deceptive because silent ischemia carries high blockage risk.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-sky-400 block font-semibold">ST Depression (oldpeak):</strong>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        On an ECG, the ST segment dips under physical stress when heart tissue receives insufficient oxygenated blood flow.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-purple-400 block font-semibold">Thallium Perfusion (thal):</strong>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        A nuclear stress test. Reversible defect means blood flow is restricted during exercise but recovers at rest.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-amber-400 block font-semibold">Fluoroscopy Vessels (ca):</strong>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        X-ray dye imaging counting the number of major coronary arteries (0 to 3) showing calcification or significant narrowing.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recalculate Button */}
            <button
              type="button"
              id="predict-submit-btn"
              onClick={handlePredictClick}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/25 ring-1 ring-rose-400/30 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              <Stethoscope className="w-5 h-5" />
              <span>Update Risk Assessment</span>
            </button>

          </div>

        </div>

        {/* Right Column: Prediction Results & Local SHAP Waterfall (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {result && (
            <div className={`p-6 rounded-2xl border transition-all shadow-xl ${
              result.isDisease
                ? 'bg-gradient-to-b from-rose-950/40 via-slate-900/90 to-slate-900/95 border-rose-500/40 shadow-rose-950/20'
                : 'bg-gradient-to-b from-emerald-950/40 via-slate-900/90 to-slate-900/95 border-emerald-500/40 shadow-emerald-950/20'
            }`}>
              
              {/* Header Risk Badge */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm ${
                  result.riskLevel === 'High Risk'
                    ? 'bg-rose-600 text-white'
                    : result.riskLevel === 'Moderate Risk'
                    ? 'bg-amber-500 text-white'
                    : 'bg-emerald-600 text-white'
                }`}>
                  {result.riskLevel}
                </span>

                <span className="text-xs font-semibold text-slate-400">
                  AI Confidence: <strong className="text-white">{(result.confidence * 100).toFixed(1)}%</strong>
                </span>
              </div>

              {/* Status Display */}
              <div className="mt-5 flex items-center space-x-3.5">
                {result.isDisease ? (
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h3 className={`text-lg font-bold ${
                    result.isDisease ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {result.isDisease ? 'Elevated CAD Risk Detected' : 'Low CAD Risk (Normal)'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {result.isDisease
                      ? 'Biomarkers indicate likely coronary artery stenosis > 50%'
                      : 'Non-invasive markers indicate optimal cardiac baseline'}
                  </p>
                </div>
              </div>

              {/* 3-Zone Visual Risk Probability Bar */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Cardiovascular Risk Probability</span>
                  <span className="text-xl font-extrabold text-white font-mono">{result.riskScore}%</span>
                </div>
                
                <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 relative">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      result.riskLevel === 'High Risk'
                        ? 'bg-gradient-to-r from-amber-500 to-rose-600'
                        : result.riskLevel === 'Moderate Risk'
                        ? 'bg-gradient-to-r from-teal-500 to-amber-500'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    }`}
                    style={{ width: `${result.riskScore}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 text-[10px] text-center pt-1 font-semibold">
                  <span className="text-emerald-400 text-left">Low (0-35%)</span>
                  <span className="text-amber-400 text-center">Moderate (36-65%)</span>
                  <span className="text-rose-400 text-right">High (&gt;65%)</span>
                </div>
              </div>

              {/* Local SHAP / Feature Contributions */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                    <span>Top Diagnostic Factors for this Patient</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">Explainability</span>
                </div>

                <div className="space-y-2">
                  {result.primaryDrivers.map((driver, idx) => {
                    const isPositive = driver.contribution > 0;
                    const magnitude = Math.min(Math.abs(driver.contribution) * 40, 100);
                    return (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200">{driver.label}</span>
                          <span className={`font-mono font-bold ${
                            driver.impact === 'risk-increasing'
                              ? 'text-rose-400'
                              : driver.impact === 'risk-reducing'
                              ? 'text-emerald-400'
                              : 'text-slate-400'
                          }`}>
                            {isPositive ? `+${driver.contribution.toFixed(2)}` : driver.contribution.toFixed(2)} log-odds
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              driver.impact === 'risk-increasing' ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${magnitude}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personalized Clinical Guidance */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                <h5 className="font-bold text-slate-200 flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-400" />
                  <span>Personalized Health Recommendations</span>
                </h5>
                <ul className="space-y-1.5 text-slate-300 pl-4 list-disc">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="leading-relaxed">{rec}</li>
                  ))}
                </ul>
              </div>

              {/* Export Report Action */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setShowReportModal(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-2 border border-slate-700 cursor-pointer hover:border-slate-600"
                >
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>View Printable Patient Assessment Report</span>
                </button>
              </div>

            </div>
          )}

          {/* Educational Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3 text-xs text-slate-400 shadow-sm">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-300">Clinical Triage Aid:</strong> This AI assessment provides supportive risk stratification. Always consult a board-certified cardiologist for diagnostic angiography.
            </p>
          </div>

        </div>

      </div>

      {/* Printable Clinical Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-white">
            
            {/* Close Button */}
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Report Header */}
            <div className="border-b border-slate-800 pb-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">CardioPredict AI &bull; Clinical Assessment Report</h3>
                  <p className="text-xs text-slate-400">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            </div>

            {/* Assessment Summary Box */}
            <div className={`p-4 rounded-xl border ${
              result?.isDisease ? 'bg-rose-950/30 border-rose-500/30' : 'bg-emerald-950/30 border-emerald-500/30'
            } flex items-center justify-between`}>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Diagnostic Risk Category:</span>
                <span className={`text-base font-extrabold ${result?.isDisease ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {result?.riskLevel} ({result?.riskScore}% Probability)
                </span>
              </div>
              <div className="text-right text-xs">
                <span className="text-slate-400 block font-medium">Model Confidence:</span>
                <span className="font-mono font-bold text-white">{(Number(result?.confidence) * 100).toFixed(1)}%</span>
              </div>
            </div>

            {/* Patient Parameter Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recorded Patient Biomarkers</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Age / Sex:</span>
                  <span className="font-bold text-white">{patientState.age} yrs &bull; {patientState.sex === 1 ? 'Male' : 'Female'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Resting BP:</span>
                  <span className="font-bold text-white">{patientState.trestbps} mm Hg</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Serum Cholesterol:</span>
                  <span className="font-bold text-white">{patientState.chol} mg/dl</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Max Heart Rate:</span>
                  <span className="font-bold text-white">{patientState.thalach} bpm</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">ST Depression:</span>
                  <span className="font-bold text-white">{patientState.oldpeak.toFixed(1)} mm</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Calcified Vessels:</span>
                  <span className="font-bold text-white">{patientState.ca} Major Vessels</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Doctor & Patient Action Items</h4>
              <ul className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs text-slate-300 list-disc pl-5">
                {result?.recommendations.map((rec, idx) => (
                  <li key={idx} className="leading-relaxed">{rec}</li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center space-x-2 cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
