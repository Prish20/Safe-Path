import { Request, Response } from 'express';
import Incident from '../models/incident.model';

export const reportIncident = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type, description, location, images, coordinates } = req.body;
    
    console.log('Received incident data:', { type, description, location, images, coordinates });
    
    if (!type || !description || !location) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const newIncident = new Incident({
      type,
      description,
      location,
      coordinates,
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

export const getIncident = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const incident = await Incident.findById(id);
    
    if (!incident) {
      res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      incident
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
      message: 'Error fetching incident',
      error: err.message
    });
  }
};

export const getAllIncidents = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      incidents
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
      message: 'Error fetching incidents',
      error: err.message
    });
  }
};
