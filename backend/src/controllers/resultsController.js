import prisma from "../lib/prisma.js"; // Adicionado import
import { calcRCI, getPsychometricData } from "../utils/rci.js";
import { zToPercentile } from "../utils/stats.js";
import { analyzeByScale } from "../utils/analyzer.js";

export const getClientResults = async (req, res) => {
  const { clientId } = req.params;

  const sessions = await prisma.session.findMany({
    where: { clientId },
    include: { response: true }
  });

  const enriched = sessions.map(sess => {
    const raw = sess.response?.resposta_json || {};
    const analise = analyzeByScale(sess.scale, raw);
    const psych = getPsychometricData(sess.scale);

    let stats = null;
    let rci = null;

    if (psych && psych.mean && psych.std && psych.alpha) {
      const z = (analise.total - psych.mean) / psych.std;
      stats = {
        zScore: z.toFixed(2),
        percentil: zToPercentile(z).toFixed(1)
      };
      rci = calcRCI(psych.mean, analise.total, psych.std, psych.alpha);
    }

    return {
      sessionId: sess.id,
      scale: sess.scale,
      date: sess.response?.created_at,
      analise,
      stats,
      rci
    };
  });

  res.json(enriched);
};

