import express from 'express';
import { reportIncident } from '../controllers/incident.controllers';

const router = express.Router();

router.post('/report', reportIncident);

export default router;
