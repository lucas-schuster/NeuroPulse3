import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("senha123", 10);

  const therapist = await prisma.therapist.create({
    data: {
      name: "Dr. Pulse",
      email: "neuro@pulse.com",
      password: hash
    }
  });

  const client = await prisma.client.create({
    data: {
      code: "client001",
      therapistId: therapist.id
    }
  });

  const session = await prisma.session.create({
    data: {
      clientId: client.id,
      therapistId: therapist.id,
      scale: "PHQ-9"
    }
  });

  await prisma.surveyResponse.create({
    data: {
      sessionId: session.id,
      scale_id: "PHQ-9",
      resposta_json: {
        phq9_q1: "2 = Mais da metade dos dias",
        phq9_q2: "1 = Vários dias"
      }
    }
  });

  console.log("Seed completo.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

