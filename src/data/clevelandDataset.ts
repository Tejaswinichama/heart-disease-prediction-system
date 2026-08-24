import { FeatureMetadata, PatientRecord } from '../types';

export const FEATURE_METADATA_LIST: FeatureMetadata[] = [
  {
    key: 'age',
    label: 'Age',
    shortDesc: 'Patient age in years',
    fullDesc: 'Chronological age in completed years. Risk of cardiovascular disease increases progressively with age due to vascular remodeling and arterial stiffness.',
    unit: 'years',
    normalRange: '< 55 (lower baseline risk)',
    type: 'numerical',
    min: 25,
    max: 80,
    step: 1,
    clinicalSignificance: 'Advanced age correlates with higher calcification and atherosclerotic plaque burden.'
  },
  {
    key: 'sex',
    label: 'Biological Sex',
    shortDesc: 'Biological sex assigned at birth',
    fullDesc: '1 = Male; 0 = Female. Males have higher early baseline risk; post-menopausal females see escalating incidence.',
    normalRange: 'N/A',
    type: 'categorical',
    options: [
      { value: 1, label: 'Male (1)', desc: 'Higher historical prevalence in early-onset CAD' },
      { value: 0, label: 'Female (0)', desc: 'Estrogen cardioprotective pre-menopause' }
    ],
    clinicalSignificance: 'Males account for nearly 70% of symptomatic presentations in clinical CAD cohorts.'
  },
  {
    key: 'cp',
    label: 'Chest Pain Type (cp)',
    shortDesc: 'Angina symptom classification',
    fullDesc: 'Four-tier categorization of chest discomfort based on exertion triggers, relief with rest/nitrates, and substernal location.',
    normalRange: 'Type 1-3 (lower likelihood of severe blockage than asymptomatic type 4 in this cohort)',
    type: 'categorical',
    options: [
      { value: 1, label: '1: Typical Angina', desc: 'Substernal, exertional, relieved by nitroglycerin/rest' },
      { value: 2, label: '2: Atypical Angina', desc: 'Meets 2 of the 3 classic Diamond-Forrester criteria' },
      { value: 3, label: '3: Non-Anginal Pain', desc: 'Sharp, positional, or pleuritic discomfort' },
      { value: 4, label: '4: Asymptomatic', desc: 'Silent ischemia / atypical presentation (strongest positive CAD marker in clinical risk scoring)' }
    ],
    clinicalSignificance: 'Type 4 (Asymptomatic) has >75% positive angiographic stenosis rate in symptomatic clinical cohorts.'
  },
  {
    key: 'trestbps',
    label: 'Resting Blood Pressure',
    shortDesc: 'Resting BP on admission (mm Hg)',
    fullDesc: 'Systolic blood pressure measured upon admission after 5 minutes of seated rest.',
    unit: 'mm Hg',
    normalRange: '90 - 120 mm Hg (Normal), 130+ (Hypertension)',
    type: 'numerical',
    min: 90,
    max: 200,
    step: 2,
    clinicalSignificance: 'Chronic hypertension damages vascular endothelium, accelerating atheroma development.'
  },
  {
    key: 'chol',
    label: 'Serum Cholesterol',
    shortDesc: 'Total serum cholesterol in mg/dl',
    fullDesc: 'Total serum lipid concentration measured via enzymatic fasting assay.',
    unit: 'mg/dl',
    normalRange: '< 200 mg/dl (Desirable), 200-239 (Borderline), ≥ 240 (High)',
    type: 'numerical',
    min: 120,
    max: 560,
    step: 5,
    clinicalSignificance: 'Elevated total cholesterol promotes subendothelial lipoprotein deposition and inflammatory plaques.'
  },
  {
    key: 'fbs',
    label: 'Fasting Blood Sugar > 120',
    shortDesc: 'Fasting glycemia status',
    fullDesc: 'Fasting blood glucose > 120 mg/dl (indicating prediabetes or diabetes mellitus).',
    normalRange: '0 (≤ 120 mg/dl)',
    type: 'categorical',
    options: [
      { value: 0, label: 'False: ≤ 120 mg/dl (0)', desc: 'Normoglycemic fasting level' },
      { value: 1, label: 'True: > 120 mg/dl (1)', desc: 'Hyperglycemia / Diabetes indicator' }
    ],
    clinicalSignificance: 'Diabetes accelerates microvascular and macrovascular atherosclerosis.'
  },
  {
    key: 'restecg',
    label: 'Resting ECG',
    shortDesc: 'Resting 12-lead electrocardiogram',
    fullDesc: 'Standard resting 12-lead ECG findings for repolarization abnormalities or ventricular voltage criteria.',
    normalRange: '0: Normal',
    type: 'categorical',
    options: [
      { value: 0, label: '0: Normal', desc: 'No significant baseline repolarization defect' },
      { value: 1, label: '1: ST-T Wave Abnormality', desc: 'T-wave inversions and/or ST elevation/depression > 0.05 mV' },
      { value: 2, label: '2: Left Ventricular Hypertrophy', desc: 'Probable or definite LVH by Estes criteria' }
    ],
    clinicalSignificance: 'LV hypertrophy and ST abnormalities signify long-term cardiac strain or past ischemic injury.'
  },
  {
    key: 'thalach',
    label: 'Maximum Heart Rate Achieved',
    shortDesc: 'Peak HR achieved during treadmill test',
    fullDesc: 'Highest beats per minute (bpm) reached during graded Bruce protocol exercise stress testing.',
    unit: 'bpm',
    normalRange: '> 150 bpm (healthy age-predicted target)',
    type: 'numerical',
    min: 70,
    max: 205,
    step: 1,
    clinicalSignificance: 'Chronotropic incompetence (inability to reach expected target HR) is an independent CAD marker.'
  },
  {
    key: 'exang',
    label: 'Exercise-Induced Angina',
    shortDesc: 'Chest pain triggered by treadmill stress',
    fullDesc: 'Presence of typical ischemic chest discomfort reproduced during physical exertion.',
    normalRange: '0: No',
    type: 'categorical',
    options: [
      { value: 0, label: '0: No Angina with Exercise', desc: 'No angina elicited during peak physical stress' },
      { value: 1, label: '1: Yes (Exercise Angina)', desc: 'Classic ischemic symptoms triggered by exertion' }
    ],
    clinicalSignificance: 'Direct clinical manifestation of supply-demand mismatch in coronary blood flow.'
  },
  {
    key: 'oldpeak',
    label: 'ST Depression (oldpeak)',
    shortDesc: 'Exercise ST depression relative to rest',
    fullDesc: 'Magnitude of horizontal or downsloping ST segment displacement measured at 60-80 ms past the J-point.',
    unit: 'mm',
    normalRange: '< 1.0 mm (Normal/Insignificant), ≥ 2.0 mm (Severe Ischemia)',
    type: 'numerical',
    min: 0.0,
    max: 6.5,
    step: 0.1,
    clinicalSignificance: 'One of the strongest diagnostic predictors; ST depression > 2.0 mm indicates subendocardial ischemia.'
  },
  {
    key: 'slope',
    label: 'Peak ST Segment Slope',
    shortDesc: 'Morphology of the ST segment during stress',
    fullDesc: '1 = Upsloping, 2 = Flat (horizontal), 3 = Downsloping.',
    normalRange: '1: Upsloping (typically benign)',
    type: 'categorical',
    options: [
      { value: 1, label: '1: Upsloping', desc: 'Rapid upstroke, often physiological/benign' },
      { value: 2, label: '2: Flat (Horizontal)', desc: 'Classic ischemic response' },
      { value: 3, label: '3: Downsloping', desc: 'High specificity for severe multi-vessel disease' }
    ],
    clinicalSignificance: 'Horizontal (2) and downsloping (3) ST slopes strongly signal severe coronary insufficiency.'
  },
  {
    key: 'ca',
    label: 'Major Vessels by Fluoroscopy (ca)',
    shortDesc: 'Number of major vessels (0-3) with fluoroscopy coloring',
    fullDesc: 'Fluoroscopic visualization of major epicardial coronary arteries (LAD, LCx, RCA) showing calcified lesions or contrast opacification.',
    normalRange: '0 (no vessels calcified)',
    type: 'categorical',
    options: [
      { value: 0, label: '0 Major Vessels', desc: 'No fluoroscopic arterial opacification/calcification' },
      { value: 1, label: '1 Major Vessel', desc: 'Single vessel involvement' },
      { value: 2, label: '2 Major Vessels', desc: 'Two vessel involvement' },
      { value: 3, label: '3 Major Vessels', desc: 'Severe triple vessel disease' }
    ],
    clinicalSignificance: 'Direct anatomical surrogate for multi-vessel atherosclerotic plaque.'
  },
  {
    key: 'thal',
    label: 'Thalassemia Scintigraphy (thal)',
    shortDesc: 'Thallium-201 myocardial perfusion scan',
    fullDesc: 'Nuclear imaging evaluating regional blood supply at stress and rest.',
    normalRange: '3: Normal blood flow',
    type: 'categorical',
    options: [
      { value: 3, label: '3: Normal Perfusion', desc: 'Homogeneous tracer uptake at stress and redistribution' },
      { value: 6, label: '6: Fixed Defect', desc: 'Prior myocardial infarction / non-viable scar tissue' },
      { value: 7, label: '7: Reversible Defect', desc: 'Active inducible ischemia (perfusion defect at stress, normalizes at rest)' }
    ],
    clinicalSignificance: 'Reversible defect (7) is the single highest weighting predictor for active ischemic CAD.'
  }
];

export const CLEVELAND_SUMMARY_STATS = {
  totalCount: 303,
  healthyCount: 164,
  diseaseCount: 139,
  healthyPercentage: 54.12,
  diseasePercentage: 45.88,
  meanAge: 54.4,
  malePercentage: 67.98,
  meanChol: 246.6,
  meanRestbps: 131.6,
  meanThalach: 149.6,
  meanOldpeak: 1.04,
  missingCaCount: 4,
  missingThalCount: 2
};
