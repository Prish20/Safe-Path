import { Request, Response } from 'express';
import Incident from '../models/incident.model';

export const reportIncident = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type, description, location, images } = req.body;
    
    console.log('Received incident data:', { type, description, location, images });
    
    if (!type || !description || !location) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const newIncident = new Incident({
      type,
      description,
      location,
      images: images || [],
      status: 'pending'
    });

    console.log('Attempting to save incident:', newIncident);

    await newIncident.save();

    res.status(201).json({
      success: true,
      message: 'Incident reported successfully',
      incident: newIncident
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });

    res.status(500).json({
      success: false,
      message: 'Error reporting incident',
      error: err.message
    });
  }
};
