"""
Cleveland Heart Disease Dataset Preprocessing Pipeline
Handles missing values, invalid detection, categorical encoding, feature scaling,
and stratified train-test splitting.
"""

import pandas as pd
import numpy as np
from typing import Tuple, Dict, Any, List
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder, OrdinalEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer


FEATURE_NAMES = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
    'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
]

NUMERICAL_FEATURES = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
CATEGORICAL_FEATURES = ['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca', 'thal']

FEATURE_DESCRIPTIONS = {
    'age': 'Age in years (29 - 77)',
    'sex': 'Sex (1 = Male, 0 = Female)',
    'cp': 'Chest Pain Type (1: Typical Angina, 2: Atypical Angina, 3: Non-Anginal, 4: Asymptomatic)',
    'trestbps': 'Resting Blood Pressure in mm Hg on hospital admission (94 - 200)',
    'chol': 'Serum Cholesterol in mg/dl (126 - 564)',
    'fbs': 'Fasting Blood Sugar > 120 mg/dl (1 = True, 0 = False)',
    'restecg': 'Resting ECG (0: Normal, 1: ST-T wave abnormality, 2: LV hypertrophy)',
    'thalach': 'Maximum Heart Rate Achieved (71 - 202 bpm)',
    'exang': 'Exercise Induced Angina (1 = Yes, 0 = No)',
    'oldpeak': 'ST depression induced by exercise relative to rest (0.0 - 6.2)',
    'slope': 'Peak exercise ST segment slope (1: Upsloping, 2: Flat, 3: Downsloping)',
    'ca': 'Number of major vessels (0-3) colored by fluoroscopy',
    'thal': 'Thalassemia scintigraphy (3: Normal, 6: Fixed defect, 7: Reversible defect)'
}


def load_and_clean_data(filepath: str = 'data/cleveland.csv') -> pd.DataFrame:
    """
    Load Cleveland dataset, replace missing '?' placeholders with NaN,
    clean invalid values, and binarize target variable num.
    """
    df = pd.read_csv(filepath)

    # Standardize column names
    df.columns = [c.strip().lower() for c in df.columns]

    # Target column might be 'num' or 'target'
    target_col = 'num' if 'num' in df.columns else 'target'

    # Replace '?' with NaN across all columns
    df = df.replace('?', np.nan)

    # Convert all feature columns to numeric
    for col in FEATURE_NAMES:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')

    # Convert target variable: 0 -> 0 (No Disease), 1,2,3,4 -> 1 (Heart Disease)
    df[target_col] = pd.to_numeric(df[target_col], errors='coerce')
    df['target'] = (df[target_col] > 0).astype(int)
    
    if target_col != 'target' and target_col in df.columns:
        df = df.drop(columns=[target_col])

    # Impute missing values in ca and thal using median / mode for robustness
    if df['ca'].isnull().sum() > 0:
        df['ca'] = df['ca'].fillna(df['ca'].mode()[0])
    if df['thal'].isnull().sum() > 0:
        df['thal'] = df['thal'].fillna(df['thal'].mode()[0])

    return df


def get_preprocessor() -> ColumnTransformer:
    """
    Construct scikit-learn ColumnTransformer for numerical scaling and categorical handling.
    """
    num_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])

    cat_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('pass', 'passthrough')
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', num_pipeline, NUMERICAL_FEATURES),
            ('cat', cat_pipeline, CATEGORICAL_FEATURES)
        ],
        remainder='drop'
    )
    return preprocessor


def prepare_train_test_split(
    df: pd.DataFrame, 
    test_size: float = 0.20, 
    random_state: int = 42
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series, ColumnTransformer]:
    """
    Performs stratified 80:20 train-test split to preserve 54%:46% class distribution.
    """
    X = df[FEATURE_NAMES].copy()
    y = df['target'].copy()

    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=test_size,
        stratify=y,
        random_state=random_state
    )

    preprocessor = get_preprocessor()
    return X_train, X_test, y_train, y_test, preprocessor
