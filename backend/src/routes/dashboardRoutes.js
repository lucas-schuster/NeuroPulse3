import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import prisma from '../lib/prisma.js';

const router = express.Router();

router.get('/sessions', authenticateToken, async (req, res) => {
  const therapistId = req.user.id;

  const sessions = await prisma.session.findMany({
    where: { therapistId },
    include: {
      client: true,
      response: true
    }
  });

  res.json(sessions);
});

export default router;

