// rci.js
import { psychometrics } from "./psychometrics.js";

export const calcRCI = (pre, post, dp, alpha) => {
  const sem = dp * Math.sqrt(1 - alpha);
  const diff = post - pre;
  const rci = diff / (sem * Math.sqrt(2));
  return {
    rci: rci.toFixed(2),
    confiavel: Math.abs(rci) >= 1.96
  };
};

export const getPsychometricData = (scale) => {
  const base = psychometrics[scale];
  if (!base) return null;

  if (base.mean && base.std && base.alpha) {
    return {
      mean: base.mean,
      std: base.std,
      alpha: base.alpha
    };
  }

  if (base.FP) {
    return {
      mean: base.FP.mean,
      std: base.FP.std,
      alpha: base.FP.alpha
    };
  }

  return null;
};

