export interface PatientRecord {
  id: number;
  age: number;
  sex: number; // 1: male, 0: female
  cp: number; // 1: typical, 2: atypical, 3: non-anginal, 4: asymptomatic
  trestbps: number; // resting blood pressure
  chol: number; // serum cholestoral
  fbs: number; // fasting blood sugar > 120 (1: true, 0: false)
  restecg: number; // 0: normal, 1: ST-T wave, 2: LV hypertrophy
  thalach: number; // max heart rate
  exang: number; // exercise induced angina (1: yes, 0: no)
  oldpeak: number; // ST depression
  slope: number; // 1: upsloping, 2: flat, 3: downsloping
  ca: number; // 0-3 major vessels colored by fluoroscopy
  thal: number; // 3: normal, 6: fixed defect, 7: reversible defect
  num: number; // 0: no disease, 1-4: disease
  target: number; // 0: healthy, 1: disease
}

export interface ModelBenchmark {
  id: string;
  name: string;
  category: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  confusionMatrix: {
    tn: number;
    fp: number;
    fn: number;
    tp: number;
  };
  featuresUsed: number;
  description: string;
}

export interface PredictionResult {
  isDisease: boolean;
  probability: number;
  confidence: number;
  riskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  riskScore: number;
  primaryDrivers: {
    feature: string;
    label: string;
    impact: 'risk-increasing' | 'risk-reducing' | 'neutral';
    value: string | number;
    contribution: number;
  }[];
  recommendations: string[];
}

export interface FeatureMetadata {
  key: keyof Omit<PatientRecord, 'id' | 'num' | 'target'>;
  label: string;
  shortDesc: string;
  fullDesc: string;
  unit?: string;
  normalRange: string;
  type: 'numerical' | 'categorical';
  options?: { value: number; label: string; desc?: string }[];
  min?: number;
  max?: number;
  step?: number;
  clinicalSignificance: string;
}

export type ActiveTab = 'home' | 'predict' | 'eda' | 'models' | 'joa' | 'explain' | 'code' | 'guide';
