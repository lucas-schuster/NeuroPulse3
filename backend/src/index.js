import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import resultsRoutes from './routes/resultsRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/results', resultsRoutes);


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

