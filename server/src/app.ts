import express, { Application } from 'express';
import connectDB from './config/db';
import 'dotenv/config';

const app: Application = express();

app.use(express.json({ limit: '10mb' }));

app.get('/', (_, res) => {
  res.send('Root endpoint check ');
});

connectDB();

export default app;
