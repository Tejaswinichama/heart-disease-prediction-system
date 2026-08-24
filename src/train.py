"""
Model Training & Benchmarking Pipeline
Trains Logistic Regression, SVM, Random Forest, KNN, Decision Tree, XGBoost.
Evaluates on Accuracy, Precision, Recall, F1, ROC-AUC, and optimizes with JOA.
"""

import os
import joblib
import pandas as pd
import numpy as np
from typing import Dict, Any

from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

try:
    from xgboost import XGBClassifier
    HAS_XGBOOST = True
except ImportError:
    HAS_XGBOOST = False

from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score

from src.preprocessing import load_and_clean_data, prepare_train_test_split, FEATURE_NAMES
from src.jellyfish_optimizer import JellyfishOptimizer


def get_base_models(random_state: int = 42) -> Dict[str, Any]:
    """Returns initialized dictionary of standard classifiers."""
    models = {
        'Logistic Regression': LogisticRegression(max_iter=1000, C=0.8, random_state=random_state),
        'Support Vector Machine': SVC(probability=True, kernel='rbf', C=1.2, gamma='scale', random_state=random_state),
        'Random Forest': RandomForestClassifier(n_estimators=120, max_depth=6, min_samples_split=3, random_state=random_state),
        'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=7, weights='distance'),
        'Decision Tree': DecisionTreeClassifier(max_depth=4, min_samples_split=5, random_state=random_state),
    }
    if HAS_XGBOOST:
        models['XGBoost'] = XGBClassifier(
            n_estimators=100,
            max_depth=3,
            learning_rate=0.08,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=random_state,
            eval_metric='logloss'
        )
    return models


def train_and_benchmark():
    """Executes full training and comparison across all models."""
    os.makedirs('models', exist_ok=True)
    df = load_and_clean_data('data/cleveland.csv')
    X_train, X_test, y_train, y_test, preprocessor = prepare_train_test_split(df, test_size=0.20, random_state=42)

    X_train_trans = preprocessor.fit_transform(X_train)
    X_test_trans = preprocessor.transform(X_test)

    models = get_base_models(random_state=42)
    results = []
    trained_models = {}

    for name, model in models.items():
        model.fit(X_train_trans, y_train)
        y_pred = model.predict(X_test_trans)
        y_prob = model.predict_proba(X_test_trans)[:, 1] if hasattr(model, 'predict_proba') else y_pred

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        roc = roc_auc_score(y_test, y_prob)

        results.append({
            'Model': name,
            'Accuracy': acc,
            'Precision': prec,
            'Recall': rec,
            'F1-Score': f1,
            'ROC-AUC': roc
        })
        trained_models[name] = model

    # Jellyfish Optimization (JOA) for Feature Selection on Best Baseline (Random Forest)
    print("Running Jellyfish Optimization Algorithm (JOA)...")
    joa = JellyfishOptimizer(n_jellyfish=25, max_iterations=30, random_state=42)
    mask, best_fit, history = joa.optimize_features(X_train_trans, y_train, base_estimator='rf')

    rf_optimized = RandomForestClassifier(n_estimators=150, max_depth=5, min_samples_split=4, random_state=42)
    rf_optimized.fit(X_train_trans[:, mask], y_train)
    y_pred_opt = rf_optimized.predict(X_test_trans[:, mask])
    y_prob_opt = rf_optimized.predict_proba(X_test_trans[:, mask])[:, 1]

    results.append({
        'Model': 'Random Forest + JOA (Optimized)',
        'Accuracy': accuracy_score(y_test, y_pred_opt),
        'Precision': precision_score(y_test, y_pred_opt, zero_division=0),
        'Recall': recall_score(y_test, y_pred_opt),
        'F1-Score': f1_score(y_test, y_pred_opt),
        'ROC-AUC': roc_auc_score(y_test, y_prob_opt)
    })

    benchmark_df = pd.DataFrame(results).sort_values(by=['F1-Score', 'ROC-AUC'], ascending=False)
    print("\n--- Model Benchmark Table ---")
    print(benchmark_df.to_string(index=False))

    # Save artifacts
    best_model_name = benchmark_df.iloc[0]['Model']
    best_model_obj = rf_optimized if 'JOA' in best_model_name else trained_models[best_model_name]

    joblib.dump(best_model_obj, 'models/best_model.pkl')
    joblib.dump(preprocessor, 'models/preprocessor.pkl')
    joblib.dump(mask, 'models/joa_feature_mask.pkl')
    joblib.dump(benchmark_df, 'models/benchmark_results.pkl')

    print(f"\nBest Model selected: {best_model_name}")
    print("Artifacts successfully saved to /models")


if __name__ == '__main__':
    train_and_benchmark()
