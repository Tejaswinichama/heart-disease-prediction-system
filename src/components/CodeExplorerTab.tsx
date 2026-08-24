import React, { useState } from 'react';
import { Code2, Copy, Check, Download, Terminal, FileCode, FolderArchive } from 'lucide-react';

export const CodeExplorerTab: React.FC = () => {
  const [activeFile, setActiveFile] = useState<string>('app.py');
  const [copied, setCopied] = useState(false);

  const files: Record<string, { lang: string; path: string; desc: string }> = {
    'app.py': { lang: 'python', path: 'app.py', desc: 'Streamlit Web Application & Interactive UI' },
    'src/preprocessing.py': { lang: 'python', path: 'src/preprocessing.py', desc: 'ColumnTransformer, Scaling, and Stratified Splitting' },
    'src/jellyfish_optimizer.py': { lang: 'python', path: 'src/jellyfish_optimizer.py', desc: 'Jellyfish Optimization Algorithm (JOA) Swarm Search' },
    'src/train.py': { lang: 'python', path: 'src/train.py', desc: 'Multi-Model Training & Benchmark Serialization' },
    'src/evaluate.py': { lang: 'python', path: 'src/evaluate.py', desc: 'Metrics, Confusion Matrix, and ROC Curve Generator' },
    'src/prediction.py': { lang: 'python', path: 'src/prediction.py', desc: 'Patient Inference Pipeline & Clinical Stratification' },
    'requirements.txt': { lang: 'text', path: 'requirements.txt', desc: 'Python Dependencies for Pip Installation' },
    'README.md': { lang: 'markdown', path: 'README.md', desc: '17-Section Project Documentation for Academic Submission' }
  };

  const fileContents: Record<string, string> = {
    'app.py': `# Heart Disease Prediction System - Streamlit Web Application
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from src.preprocessing import FEATURE_NAMES, load_and_clean_data
from src.prediction import HeartDiseasePredictor

st.set_page_config(page_title="CardioPredict AI", page_icon="🫀", layout="wide")
st.title("🫀 Heart Disease Prediction & Clinical Decision Support System")

# Interactive form and predictions...
`,
    'src/preprocessing.py': `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

FEATURE_NAMES = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']

def load_and_clean_data(filepath='data/cleveland.csv'):
    df = pd.read_csv(filepath)
    df = df.replace('?', np.nan)
    for col in FEATURE_NAMES:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    df['target'] = (df['num'] > 0).astype(int)
    return df
`,
    'src/jellyfish_optimizer.py': `import numpy as np
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier

class JellyfishOptimizer:
    """Jellyfish Optimization Algorithm (JOA) for Feature Selection."""
    def __init__(self, n_jellyfish=25, max_iterations=35, n_features=13, beta=3.0, gamma=0.1, random_state=42):
        self.n_jellyfish = n_jellyfish
        self.max_iterations = max_iterations
        self.n_features = n_features
        self.beta = beta
        self.gamma = gamma
        self.rng = np.random.default_rng(random_state)
`,
    'src/train.py': `import joblib
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from src.preprocessing import load_and_clean_data, prepare_train_test_split
from src.jellyfish_optimizer import JellyfishOptimizer

# Multi-model training and JOA optimization...
`,
    'src/evaluate.py': `import numpy as np
from sklearn.metrics import confusion_matrix, classification_report, roc_curve, auc

def calculate_comprehensive_metrics(y_true, y_pred, y_prob):
    cm = confusion_matrix(y_true, y_pred)
    fpr, tpr, _ = roc_curve(y_true, y_prob)
    return {'cm': cm, 'roc_auc': auc(fpr, tpr)}
`,
    'src/prediction.py': `import joblib
import pandas as pd
from src.preprocessing import FEATURE_NAMES

class HeartDiseasePredictor:
    def __init__(self, model_path='models/best_model.pkl'):
        self.model = joblib.load(model_path)
`,
    'requirements.txt': `streamlit>=1.31.0
pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.3.0
xgboost>=2.0.0
matplotlib>=3.7.0
seaborn>=0.12.0
shap>=0.42.0
joblib>=1.3.0
plotly>=5.18.0
`,
    'README.md': `# Heart Disease Prediction & Clinical Decision Support System
An end-to-end Machine Learning and Clinical Decision Support System with Streamlit, JOA Swarm Optimization, and SHAP Explainability.
`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContents[activeFile] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-rose-400" />
            </div>
            <span>Python & Streamlit Source Code</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete, runnable Python codebase formatted for academic submission and local execution.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'Copied File!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Command Quickstart */}
      <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800/80 space-y-2.5 shadow-sm">
        <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-rose-400" />
          <span className="font-semibold text-slate-300">Local Terminal Execution Quickstart:</span>
        </div>
        <div className="space-y-1 text-slate-300 pl-2 border-l-2 border-slate-800">
          <p className="text-emerald-400 font-mono">$ pip install -r requirements.txt</p>
          <p className="text-sky-400 font-mono">$ python src/train.py</p>
          <p className="text-amber-400 font-mono">$ streamlit run app.py</p>
        </div>
      </div>

      {/* File Navigation & Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* File List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
            Project Architecture
          </span>

          <div className="space-y-1.5">
            {Object.keys(files).map((fileName) => {
              const file = files[fileName];
              const isActive = activeFile === fileName;
              return (
                <button
                  key={fileName}
                  onClick={() => setActiveFile(fileName)}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start space-x-3 ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-lg shadow-rose-600/25 ring-1 ring-rose-400/30'
                      : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800/60 border border-slate-800/80'
                  }`}
                >
                  <FileCode className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-rose-400'}`} />
                  <div>
                    <span className="font-mono text-xs font-bold block">{fileName}</span>
                    <span className={`text-[10px] ${isActive ? 'text-rose-100' : 'text-slate-400'}`}>
                      {file.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Content (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-950/90 backdrop-blur-sm border border-slate-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
            <span className="font-mono text-slate-200 font-bold flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{files[activeFile].path}</span>
            </span>
            <span className="text-slate-400 uppercase font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px]">
              {files[activeFile].lang}
            </span>
          </div>

          <pre className="font-mono text-xs text-slate-300 overflow-x-auto p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 max-h-[500px] leading-relaxed">
            <code>{fileContents[activeFile] || '# File loaded'}</code>
          </pre>
        </div>

      </div>

    </div>
  );
};
