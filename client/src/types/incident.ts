export interface Incident {
  _id: string;
  type: string;
  description: string;
  location: string;
  images?: string[];
  status: string;
  createdAt: string;
  coordinates: {
    lat: number;
    lng: number;
  };
} 
