import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['accident', 'theft', 'other']
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  location: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: false
  }],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  coordinates: {
    _id: false,
    type: {
      lat: Number,
      lng: Number
    },
    required: false
  },
  status: {
    type: String,
    enum: ['pending', 'investigating', 'resolved'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Incident = mongoose.model('Incident', incidentSchema);
export default Incident; 
