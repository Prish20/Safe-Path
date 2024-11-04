// import { useEffect, useState } from 'react';
// import { Marker } from '@react-google-maps/api';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/redux/store';
// import { getAllIncidents } from '@/redux/thunks/incidentThunks';
// import type { Incident } from '@/types/incident';

// interface IncidentMarkersProps {
//   map: google.maps.Map | null;
// }

// function IncidentMarkers({ map }: IncidentMarkersProps) {
//   const dispatch = useDispatch<AppDispatch>();
//   const { incidents } = useSelector((state: RootState) => state.incidents);
//   const [visibleMarkers, setVisibleMarkers] = useState<Incident[]>([]);

//   // Fetch incidents on mount
//   useEffect(() => {
//     dispatch(getAllIncidents());
//   }, [dispatch]);

//   // Update markers when map bounds change or incidents change
//   useEffect(() => {
//     if (!map || !incidents.length) return;

//     const updateVisibleMarkers = () => {
//       const bounds = map.getBounds();
//       if (!bounds) return;

//       const newVisibleMarkers = incidents.filter(incident => 
//         bounds.contains(incident.location)
//       );

//       setVisibleMarkers(newVisibleMarkers);
//     };

//     // Initial update
//     updateVisibleMarkers();

//     // Listen for bounds changes
//     const boundsChangedListener = map.addListener('bounds_changed', updateVisibleMarkers);

//     return () => {
//       google.maps.event.removeListener(boundsChangedListener);
//     };
//   }, [map, incidents]);

//   return (
//     <>
//       {visibleMarkers.map((incident) => (
//         <Marker
//           key={incident._id}
//           position={incident.location}
//           title={incident.type}
//           animation={google.maps.Animation.DROP}
//         />
//       ))}
//     </>
//   );
// }

// export default IncidentMarkers;
