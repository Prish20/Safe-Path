import express from 'express';
import { reportIncident, getIncident, getAllIncidents } from '../controllers/incident.controllers';

const router = express.Router();

router.post('/report', reportIncident);
router.get('/:id', getIncident);
router.get('/', getAllIncidents);

export default router;
