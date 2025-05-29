import { prisma } from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginTherapist = async (req, res) => {
  const { email, password } = req.body;
  const therapist = await prisma.therapist.findUnique({ where: { email } });
  if (!therapist) return res.status(404).json({ error: "Usuário não encontrado" });

  const match = await bcrypt.compare(password, therapist.password);
  if (!match) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ id: therapist.id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token });
};

