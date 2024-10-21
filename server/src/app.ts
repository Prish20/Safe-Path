import express, { Application } from 'express';
import connectDB from './config/db';
import 'dotenv/config';
import authRoutes from './routes/auth.routes';

const app: Application = express();

app.use(express.json({ limit: '10mb' }));

app.get('/', (_, res) => {
  res.send('Root endpoint check ');
});

app.use("/api/auth", authRoutes);

connectDB();

export default app;
