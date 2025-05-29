import prisma from '../lib/prisma.js';

export const submitSurvey = async (req, res) => {
  try {
    const { scale_id, client_id, therapist_id, session_id, resposta_json } = req.body;

    const survey = await prisma.surveyResponse.create({
      data: {
        scale_id,
        clientId: client_id,
        therapistId: therapist_id,
        sessionId: session_id,
        resposta_json
      }
    });

    res.status(201).json({ success: true, id: survey.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar dados" });
  }
};

