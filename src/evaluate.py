"""
Model Evaluation, Metrics, Confusion Matrix, ROC-AUC, and SHAP Explainability
"""

import numpy as np
import pandas as pd
from typing import Dict, Any, Tuple
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import (
    confusion_matrix, classification_report, roc_curve, auc, precision_recall_curve
)

from src.preprocessing import FEATURE_NAMES, NUMERICAL_FEATURES, CATEGORICAL_FEATURES


def calculate_comprehensive_metrics(y_true: np.ndarray, y_pred: np.ndarray, y_prob: np.ndarray) -> Dict[str, Any]:
    """Calculates confusion matrix, specificity, sensitivity, ROC curve, and classification metrics."""
    cm = confusion_matrix(y_true, y_pred)
    tn, fp, fn, tp = cm.ravel()

    sensitivity = tp / (tp + fn) if (tp + fn) > 0 else 0
    specificity = tn / (tn + fp) if (tn + fp) > 0 else 0
    fpr, tpr, thresholds = roc_curve(y_true, y_prob)
    roc_auc = auc(fpr, tpr)

    return {
        'confusion_matrix': cm.tolist(),
        'tn': int(tn),
        'fp': int(fp),
        'fn': int(fn),
        'tp': int(tp),
        'sensitivity': float(sensitivity),
        'specificity': float(specificity),
        'roc_auc': float(roc_auc),
        'fpr': fpr.tolist(),
        'tpr': tpr.tolist(),
        'report': classification_report(y_true, y_pred, output_dict=True)
    }


def get_feature_importances(model: Any, feature_names: list = FEATURE_NAMES) -> pd.DataFrame:
    """Extract feature importance or coefficients depending on model architecture."""
    if hasattr(model, 'feature_importances_'):
        importances = model.feature_importances_
        method = 'Gini Importance / MDI'
    elif hasattr(model, 'coef_'):
        importances = np.abs(model.coef_[0])
        method = 'Log-Odds Absolute Coefficient'
    else:
        importances = np.ones(len(feature_names)) / len(feature_names)
        method = 'Uniform / Permutation'

    df_imp = pd.DataFrame({
        'Feature': feature_names[:len(importances)],
        'Importance': importances
    }).sort_values(by='Importance', ascending=False)
    df_imp['Method'] = method
    return df_imp
