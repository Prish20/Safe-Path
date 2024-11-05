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
    origin: [
      'http://localhost:5173',           // Frontend dev
      'https://safe-path-frontend.vercel.app',  // Frontend prod
      'https://safe-path-backend.vercel.app'    // Backend URL
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
  })
);

app.options('*', cors()); // Enable preflight for all routes

app.get('/', (_, res) => {
  res.send('Root endpoint check ');
});

app.use("/api/auth", authRoutes);
app.use("/api/incident", incidentRoutes);

connectDB();

export default app;
