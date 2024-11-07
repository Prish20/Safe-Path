// Updated CommunityEngagement Component

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Incident } from "@/types/incident";
import { RootState, AppDispatch } from "@/redux/store";
import { getAllIncidents } from "@/redux/thunks/incidentThunks";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PATH } from "@/routes/paths"; // Import DASHBOARD_PATH

const CommunityEngagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { incidents, loading, error } = useSelector(
    (state: RootState) => state.incidents
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    dispatch(getAllIncidents());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterStatus(e.target.value);
  };

  // Generate dynamic filter options
  const incidentTypes = [
    "All",
    ...Array.from(new Set(incidents.map((incident) => incident.type))),
  ];
  const incidentStatuses = [
    "All",
    ...Array.from(new Set(incidents.map((incident) => incident.status))),
  ];

  // Filter incidents based on search query and filters
  const filteredIncidents = incidents.filter((incident: Incident) => {
    const matchesSearch =
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "All" || incident.type === filterType;

    const matchesStatus =
      filterStatus === "All" || incident.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <h1 className="text-3xl text-center text-green-500 font-bold mb-6">
        Community Engagement
      </h1>

      <div className="mx-8 gap-4 flex flex-col lg:flex-row items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search incidents..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-1/2 p-2 rounded-md bg-gray-900 border-none font-semibold text-white"
        />
        {/* Filter by Type */}
        <div>
          <label className="text-white">Filter by Type:</label>
          <select
            value={filterType}
            onChange={handleTypeFilterChange}
            className="p-2 rounded-md bg-gray-900 text-green-500 m-2"
          >
            {incidentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Status */}
        <div>
          <label className="text-white ">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={handleStatusFilterChange}
            className="p-2 rounded-md bg-gray-900 text-green-500 m-2"
          >
            {incidentStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-white">Loading incidents...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* No Incidents Found */}
      {filteredIncidents.length === 0 && !loading && (
        <p className="text-white text-center">No incidents found.</p>
      )}

      {/* Incident Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 m-8">
        {filteredIncidents.map((incident: Incident) => (
          <div
            key={incident._id}
            className="bg-gray-900 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            {incident.images && incident.images.length > 0 && (
              <div className="mb-4">
                <img
                  src={incident.images[0]}
                  alt="Incident"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
            <h2 className="text-xl text-green-500 font-semibold mb-2 uppercase">
              {incident.type}
            </h2>
            <p className="text-gray-300 mb-4">
              {incident.description.length > 100
                ? incident.description.substring(0, 100) + "..."
                : incident.description}
            </p>
            <div className="flex flex-row justify-between">
              <p className="text-gray-400 mb-2">
                <strong className="text-green-500">Location:</strong>{" "}
                {incident.location}
              </p>
              <p className="text-gray-400 mb-4">
                <strong className="text-green-500">Date:</strong>{" "}
                {new Date(incident.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Button
                onClick={() =>
                  navigate(
                    DASHBOARD_PATH.incidentDetails.replace(":id", incident._id)
                  )
                }
                className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform"
              >
                Read More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityEngagement;
