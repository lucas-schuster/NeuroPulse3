import React from 'react';
import { Survey } from 'survey-react-ui';
import * as SurveyCore from 'survey-core';
import 'survey-core/defaultV2.min.css';
import 'survey-react-ui/survey.min.css';
import { scales } from '../data/scales';

SurveyCore.StylesManager.applyTheme("defaultV2");

export const SurveyForm = ({ scaleId, clientId, therapistId, sessionId }) => {
  const surveyData = scales[scaleId];

  if (!surveyData) return <p>Escala não encontrada.</p>;

  const surveyModel = new SurveyCore.Model(surveyData);

  const handleComplete = async (sender) => {
    const payload = {
      scale_id: scaleId,
      client_id: clientId,
      therapist_id: therapistId,
      session_id: sessionId,
      resposta_json: sender.data
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/survey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Erro ao enviar dados");

      alert("Respostas enviadas com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Falha ao enviar respostas.");
    }
  };

  surveyModel.onComplete.add(handleComplete);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{surveyData.title}</h2>
      <Survey model={surveyModel} />
    </div>
  );
};
]
