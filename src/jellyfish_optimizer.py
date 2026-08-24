"""
Jellyfish Optimization Algorithm (JOA)
Metaheuristic swarm intelligence algorithm mimicking jellyfish movements in the ocean
for Feature Selection and Hyperparameter Tuning on Heart Disease Prediction.
"""

import numpy as np
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from typing import Tuple, List, Dict, Any, Callable


class JellyfishOptimizer:
    """
    Jellyfish Search (JS) / Jellyfish Optimization Algorithm (JOA)
    
    Principles:
    1. Ocean Current Attraction: Jellyfish follow the direction of ocean currents (trend towards best solution).
    2. Swarm Motions:
       - Type A (Passive motion around own location): x_i(t+1) = x_i(t) + gamma * rand(0,1) * (ub - lb)
       - Type B (Active motion towards/away from other jellyfish): x_i(t+1) = x_i(t) + rand * direction
    3. Time Control Mechanism c(t) = |(1 - t/Max_t) * (2*rand - 1)| switching between current attraction and swarm motions.
    """

    def __init__(
        self,
        n_jellyfish: int = 25,
        max_iterations: int = 35,
        n_features: int = 13,
        beta: float = 3.0,
        gamma: float = 0.1,
        random_state: int = 42
    ):
        self.n_jellyfish = n_jellyfish
        self.max_iterations = max_iterations
        self.n_features = n_features
        self.beta = beta
        self.gamma = gamma
        self.random_state = random_state
        self.rng = np.random.default_rng(random_state)
        
        self.best_solution = None
        self.best_fitness = -np.inf
        self.convergence_history: List[float] = []
        self.selected_features_mask = None

    def _initialize_population(self) -> np.ndarray:
        """Initialize continuous jellyfish positions between 0 and 1."""
        return self.rng.uniform(0.0, 1.0, size=(self.n_jellyfish, self.n_features))

    def _solution_to_mask(self, x: np.ndarray, threshold: float = 0.5) -> np.ndarray:
        """Convert continuous jellyfish coordinate to binary feature mask."""
        mask = (x >= threshold).astype(bool)
        if not np.any(mask):
            mask[np.argmax(x)] = True
        return mask

    def optimize_features(
        self,
        X_train: np.ndarray,
        y_train: np.ndarray,
        base_estimator: str = 'rf'
    ) -> Tuple[np.ndarray, float, List[float]]:
        """
        Run JOA to select the optimal subset of clinical features maximizing CV F1-score & ROC-AUC.
        """
        population = self._initialize_population()
        fitness = np.zeros(self.n_jellyfish)
        
        cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=self.random_state)

        def evaluate_fitness(mask: np.ndarray) -> float:
            if not np.any(mask):
                return 0.0
            X_sub = X_train[:, mask]
            if base_estimator == 'rf':
                clf = RandomForestClassifier(n_estimators=75, max_depth=5, random_state=self.random_state)
            elif base_estimator == 'lr':
                clf = LogisticRegression(max_iter=1000, C=0.5, random_state=self.random_state)
            else:
                clf = SVC(probability=True, kernel='rbf', C=1.0, random_state=self.random_state)

            scores = cross_val_score(clf, X_sub, y_train, cv=cv, scoring='roc_auc')
            # Regularize slightly to reward parsimony (fewer features)
            parsimony_penalty = 0.01 * (np.sum(mask) / self.n_features)
            return float(np.mean(scores) - parsimony_penalty)

        # Initial evaluation
        for i in range(self.n_jellyfish):
            mask = self._solution_to_mask(population[i])
            fitness[i] = evaluate_fitness(mask)
            if fitness[i] > self.best_fitness:
                self.best_fitness = fitness[i]
                self.best_solution = population[i].copy()

        self.convergence_history.append(self.best_fitness)

        # Optimization Loop
        for t in range(1, self.max_iterations + 1):
            time_control = abs((1 - t / self.max_iterations) * (2 * self.rng.random() - 1))
            mean_pos = np.mean(population, axis=0)

            for i in range(self.n_jellyfish):
                if time_control >= 0.5:
                    # Ocean Current Movement
                    trend = self.best_solution - self.beta * self.rng.random() * mean_pos
                    new_pos = population[i] + self.rng.random() * trend
                else:
                    # Swarm Movements
                    if self.rng.random() > (1 - time_control):
                        # Type A: Passive motion inside swarm
                        new_pos = population[i] + self.gamma * self.rng.random() * (1.0 - 0.0)
                    else:
                        # Type B: Active motion relative to a random jellyfish j
                        j = self.rng.choice([idx for idx in range(self.n_jellyfish) if idx != i])
                        if fitness[i] >= fitness[j]:
                            direction = population[i] - population[j]
                        else:
                            direction = population[j] - population[i]
                        new_pos = population[i] + self.rng.random() * direction

                # Boundary clamping
                new_pos = np.clip(new_pos, 0.0, 1.0)
                new_mask = self._solution_to_mask(new_pos)
                new_fit = evaluate_fitness(new_mask)

                if new_fit > fitness[i]:
                    population[i] = new_pos
                    fitness[i] = new_fit
                    if new_fit > self.best_fitness:
                        self.best_fitness = new_fit
                        self.best_solution = new_pos.copy()

            self.convergence_history.append(self.best_fitness)

        self.selected_features_mask = self._solution_to_mask(self.best_solution)
        return self.selected_features_mask, self.best_fitness, self.convergence_history
