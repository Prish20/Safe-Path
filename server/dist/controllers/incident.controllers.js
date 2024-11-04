"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getAllIncidents: function() {
        return getAllIncidents;
    },
    getIncident: function() {
        return getIncident;
    },
    reportIncident: function() {
        return reportIncident;
    }
});
const _incidentmodel = /*#__PURE__*/ _interop_require_default(require("../models/incident.model"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const reportIncident = async (req, res)=>{
    try {
        const { type, description, location, images } = req.body;
        console.log('Received incident data:', {
            type,
            description,
            location,
            images
        });
        if (!type || !description || !location) {
            res.status(400).json({
                message: 'Missing required fields'
            });
            return;
        }
        const newIncident = new _incidentmodel.default({
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
        const err = error;
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
const getIncident = async (req, res)=>{
    try {
        const { id } = req.params;
        const incident = await _incidentmodel.default.findById(id);
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
        const err = error;
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
const getAllIncidents = async (_req, res)=>{
    try {
        const incidents = await _incidentmodel.default.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            incidents
        });
    } catch (error) {
        const err = error;
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
