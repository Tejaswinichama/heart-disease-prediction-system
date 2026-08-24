# Heart Disease Prediction System (UCI Cleveland Dataset)

An end-to-end Machine Learning and Clinical Decision Support System built with **Python**, **Scikit-Learn**, and **Streamlit**, featuring the **Jellyfish Optimization Algorithm (JOA)** and **SHAP Model Explainability**.

---

## 1. Project Overview
Coronary artery disease (CAD) is a primary contributor to global cardiovascular mortality. This project implements a machine learning system trained on the **Cleveland Heart Disease dataset** from the **UCI Machine Learning Repository** to estimate the likelihood of heart disease in patients based on 13 standard non-invasive and minimally invasive clinical attributes.

---

## 2. Problem Statement
Manual cardiovascular risk assessment often requires invasive coronary angiography (fluoroscopy). An automated, accurate, and explainable predictive tool can assist healthcare practitioners in triaging patients, prioritizing angiographic testing, and detecting high-risk ischemic conditions early.

---

## 3. Objectives
- Ingest, clean, and impute missing clinical records from the UCI Cleveland dataset.
- Implement an automated Scikit-Learn `Pipeline` and `ColumnTransformer` to prevent data leakage.
- Train and benchmark 6 machine learning classifiers (Logistic Regression, SVM, Random Forest, KNN, Decision Trees, and XGBoost).
- Implement the **Jellyfish Optimization Algorithm (JOA)** for metaheuristic feature selection and hyperparameter tuning.
- Provide local and global model explainability using SHAP and Gini impurity metrics.
- Deploy an interactive **Streamlit** diagnostic web application.

---

## 4. Dataset Description
The Cleveland database contains 303 patient records with 14 attributes:
- Source: UCI Machine Learning Repository / Cleveland Clinic Foundation (Dr. Robert Detrano).
- Instances: 303 patients (164 healthy [54.1%], 139 disease [45.9%]).
- Target variable: `num` (angiographic disease status 0 to 4), binarized into:
  - `0`: No Heart Disease (<50% diameter narrowing)
  - `1`: Heart Disease Present (>50% diameter narrowing)

---

## 5. Features & Clinical Definitions
| Feature | Name | Clinical Description | Range / Categories |
|---|---|---|---|
| `age` | Age | Patient age in years | 29 - 77 |
| `sex` | Sex | Biological Sex | 1 = Male, 0 = Female |
| `cp` | Chest Pain Type | Symptom presentation | 1: Typical Angina, 2: Atypical, 3: Non-anginal, 4: Asymptomatic |
| `trestbps`| Resting BP | Resting blood pressure on hospital admission | 94 - 200 mm Hg |
| `chol` | Cholesterol | Serum cholestoral | 126 - 564 mg/dl |
| `fbs` | Fasting Blood Sugar| Fasting blood sugar > 120 mg/dl | 1 = True, 0 = False |
| `restecg`| Resting ECG | Resting electrocardiographic status | 0: Normal, 1: ST-T wave, 2: LV Hypertrophy |
| `thalach`| Max Heart Rate | Peak heart rate during stress test | 71 - 202 bpm |
| `exang` | Exercise Angina | Exercise-induced chest pain | 1 = Yes, 0 = No |
| `oldpeak`| ST Depression | ST depression relative to rest | 0.0 - 6.2 mm |
| `slope` | ST Slope | Slope of peak exercise ST segment | 1: Upsloping, 2: Flat, 3: Downsloping |
| `ca` | Major Vessels | Number of vessels colored by fluoroscopy | 0 - 3 (contains missing values) |
| `thal` | Thalassemia Scan | Myocardial perfusion scintigraphy | 3 = Normal, 6 = Fixed, 7 = Reversible |

---

## 6. Data Preprocessing
- **Missing Value Handling**: Imputed `ca` (4 missing) and `thal` (2 missing) with mode/median values.
- **Categorical Handling**: Passthrough with column transformers and ordinal preservation.
- **Continuous Feature Scaling**: `StandardScaler` applied to `age`, `trestbps`, `chol`, `thalach`, `oldpeak`.
- **Stratified Partitioning**: 80% Training (242 samples) and 20% Testing (61 samples) with preserved 54:46 class balance.

---

## 7. Exploratory Data Analysis (EDA)
- **Target Distribution**: Balanced 54.1% healthy vs 45.9% coronary disease.
- **Chest Pain (cp)**: Type 4 (Asymptomatic) presents the highest incidence of coronary stenosis.
- **Thalassemia (`thal`) & Vessels (`ca`)**: Strongly correlated with positive ischemic diagnoses.
- **ST Depression (`oldpeak`)**: Higher values (>2.0 mm) strongly differentiate CAD patients.

---

## 8. Machine Learning Algorithms
1. **Logistic Regression (L2 Regularized)**
2. **Support Vector Machine (RBF Kernel)**
3. **Random Forest Ensemble (MDI Optimized)**
4. **K-Nearest Neighbors (Distance Weighted)**
5. **Decision Tree Classifier (CART)**
6. **XGBoost (Extreme Gradient Boosting)**

---

## 9. Model Evaluation & Benchmark
Evaluated on the 20% stratified test split ($N=61$):

| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC |
|---|---|---|---|---|---|
| **Random Forest + JOA** | **88.52%** | **88.89%** | **85.71%** | **0.8727** | **0.9242** |
| **Logistic Regression** | 85.25% | 85.19% | 82.14% | 0.8364 | 0.9026 |
| **Random Forest (Baseline)** | 85.25% | 84.62% | 82.14% | 0.8333 | 0.8864 |
| **SVM (RBF)** | 83.61% | 82.14% | 82.14% | 0.8214 | 0.8831 |
| **XGBoost** | 81.97% | 81.48% | 78.57% | 0.8000 | 0.8712 |
| **KNN (k=7)** | 81.97% | 81.48% | 78.57% | 0.8000 | 0.8539 |
| **Decision Tree** | 77.05% | 75.86% | 78.57% | 0.7719 | 0.7857 |

---

## 10. Best Model Selection
**Random Forest with Jellyfish Optimization (JOA)** achieved the highest performance across all key diagnostic metrics:
- **Recall (Sensitivity): 85.71%** (minimizes critical false negatives in clinical triage).
- **ROC-AUC: 0.9242** (superior discriminatory capability across all decision thresholds).
- **F1-Score: 0.8727**

---

## 11. System Architecture
```
heart-disease-prediction/
│
├── data/
│   └── cleveland.csv               # UCI Cleveland raw and cleaned records
├── notebooks/
│   └── heart_disease_analysis.ipynb # End-to-end Jupyter analysis
├── src/
│   ├── preprocessing.py            # Data cleaning & ColumnTransformer pipeline
│   ├── jellyfish_optimizer.py      # JOA Swarm optimization algorithm
│   ├── train.py                    # Multi-model training and artifact export
│   ├── evaluate.py                 # Confusion matrices, ROC curves, SHAP
│   └── prediction.py               # Patient inference helper
├── models/
│   └── best_model.pkl              # Serialized trained model
├── app.py                          # Interactive Streamlit application
├── requirements.txt                # Python environment specifications
└── README.md                       # Comprehensive documentation
```

---

## 12. How to Install
```bash
# Clone the repository
git clone https://github.com/your-username/heart-disease-prediction.git
cd heart-disease-prediction

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

---

## 13. How to Run the Application
```bash
# Execute model training and generate serialized model files
python src/train.py

# Launch the interactive Streamlit Web App
streamlit run app.py
```

---

## 14. Screenshots & Visual Interface
The web app includes:
1. **Interactive Patient Diagnostic Form**: Slider and dropdown inputs for all 13 clinical factors.
2. **Radial Risk Probability Gauge**: Real-time risk estimation with color-coded severity tiers.
3. **Exploratory Data Analysis Dashboard**: Histograms, class proportions, and correlation heatmaps.
4. **JOA Optimization Convergence Viewer**: Step-by-step fitness trajectories.

---

## 15. Limitations
- Small sample size ($N=303$) typical of historical clinical benchmarks.
- Single clinical center cohort (Cleveland Clinic Foundation).
- Missing values in fluoroscopy (`ca`) and thallium scintigraphy (`thal`).

---

## 16. Future Enhancements
- Multi-cohort integration with Hungarian, Swiss, and Long Beach VA datasets.
- Deep Learning (MLP & TabNet) architectures with Bayesian Uncertainty Quantification.
- DICOM angiography and 12-lead ECG waveform integration.

---

## 17. Medical Disclaimer
**⚠️ Strictly for Educational and Research Purposes.** This software is developed as part of a B.Tech Computer Science / Health Informatics curriculum. It does not constitute medical advice or a certified medical device. Always consult certified medical practitioners for cardiovascular diagnostics.
