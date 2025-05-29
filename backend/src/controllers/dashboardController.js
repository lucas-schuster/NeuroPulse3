import { prisma } from '../utils/db.js';

export const getTherapistSessions = async (req, res) => {
  const therapistId = req.user.id;

  const sessions = await prisma.session.findMany({
    where: { therapistId },
    include: {
      client: true,
      response: true
    }
  });

  res.json(sessions);
};

