const getTotalFromLikert = (respostas) => {
  return Object.values(respostas).reduce((sum, val) => {
    const num = parseInt(val);
    return isNaN(num) ? sum : sum + num;
  }, 0);
};

export const analyzeByScale = (scale, respostas) => {
  const total = getTotalFromLikert(respostas);

  switch (scale) {
    case "PHQ-9":
      if (total <= 4) return { total, classificacao: 'Mínimo' };
      else if (total <= 9) return { total, classificacao: 'Leve' };
      else if (total <= 14) return { total, classificacao: 'Moderado' };
      else if (total <= 19) return { total, classificacao: 'Moderadamente grave' };
      else return { total, classificacao: 'Grave' };

    case "GAD-7":
      if (total <= 4) return { total, classificacao: 'Leve' };
      else if (total <= 9) return { total, classificacao: 'Moderada' };
      else return { total, classificacao: 'Grave' };

    case "DASS-21":
      return { total, classificacao: "Interpretação depende dos subescores" };

    case "PsyFlex":
    case "MPFI-24":
    case "Flourishing":
    case "ORS":
    case "SRS":
      return { total, classificacao: "Quanto maior, melhor" };

    default:
      return { total, classificacao: "Escala não reconhecida" };
  }
};

