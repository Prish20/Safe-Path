import express, { Application } from 'express';
import connectDB from './config/db';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes';
import incidentRoutes from './routes/incident.routes';

const app: Application = express();

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://safe-path-frontend.vercel.app'],
    credentials: true,
  })
);

app.get('/', (_, res) => {
  res.send('Root endpoint check ');
});

app.use("/api/auth", authRoutes);
app.use("/api/incident", incidentRoutes);

connectDB();

export default app;
