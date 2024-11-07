// components/IncidentDetails.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getIncidentById } from "@/redux/thunks/incidentThunks";
import { Button } from "@/components/ui/button";

const IncidentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { incident, loading, error } = useSelector(
    (state: RootState) => state.incidentDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(getIncidentById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-white">Loading incident details...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!incident) {
    return <p className="text-white">Incident not found.</p>;
  }

  return (
    <div className="bg-gray-800 min-h-screen p-6 text-white">
      <h1 className="text-3xl text-center text-green-500 font-bold mb-6 uppercase">
        {incident.type}
      </h1>
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-md">
        {incident.images && incident.images.length > 0 && (
          <div className="mb-4">
            {incident.images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Incident Image ${index + 1}`}
                className="w-full h-auto object-cover rounded-md mb-2"
              />
            ))}
          </div>
        )}
        <p className="text-gray-300 mb-4">{incident.description}</p>

        <Button
          onClick={() => navigate(-1)}
          size="sm"
          className="bg-green-500 hover:bg-green-500 text-white w-3/4"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default IncidentDetails;
