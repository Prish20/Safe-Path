// MapNavigation.tsx
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Autocomplete,
  useJsApiLoader,
  GoogleMap,
} from '@react-google-maps/api';
import type { Libraries } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIncidents } from '@/redux/thunks/incidentThunks';
import { RootState } from '@/redux/store';
import { AppDispatch } from '@/redux/store';

interface MapPosition {
  lat: number;
  lng: number;
}

const DEFAULT_LOCATION: MapPosition = {
  lat: 1.3521,
  lng: 103.8198, // Singapore
};

const DEFAULT_ZOOM = 15;
const LIBRARIES: Libraries = ['places', 'marker']; // Include 'marker' library
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
};

function MapNavigation() {
  const dispatch = useDispatch<AppDispatch>();

  const incidents = useSelector((state: RootState) => state.incidents.incidents);
  const loading = useSelector((state: RootState) => state.incidents.loading);
  const error = useSelector((state: RootState) => state.incidents.error);

  const [center, setCenter] = useState<MapPosition>(DEFAULT_LOCATION);
  const [markerPosition, setMarkerPosition] = useState<MapPosition>(DEFAULT_LOCATION);

  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const userMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API ?? '',
    libraries: LIBRARIES,
  });

  useEffect(() => {
    dispatch(getAllIncidents());
  }, [dispatch]);

  const incidentsWithCoordinates = incidents.filter(
    (incident) =>
      incident.coordinates &&
      typeof incident.coordinates.lat === 'number' &&
      typeof incident.coordinates.lng === 'number'
  );

  // Adjust map to fit all markers when map is loaded and incidents are available
  useEffect(() => {
    if (mapLoaded && incidentsWithCoordinates.length > 0 && mapRef.current) {
      const bounds = new google.maps.LatLngBounds();

      // Include user's location
      bounds.extend(markerPosition);

      incidentsWithCoordinates.forEach((incident) => {
        bounds.extend({
          lat: incident.coordinates.lat,
          lng: incident.coordinates.lng,
        });
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [incidentsWithCoordinates, mapLoaded, markerPosition]);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(userLocation);
        setMarkerPosition(userLocation);
      },
      (error) => {
        console.warn('Error getting user location:', error.message);
      }
    );
  }, []);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkerPosition(newPosition);
    mapRef.current?.panTo(newPosition);
  }, []);

  const onPlaceSelected = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();

    if (!place?.geometry?.location) {
      console.warn('Place selection failed: No geometry location');
      return;
    }

    const newPosition = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setMarkerPosition(newPosition);
    setCenter(newPosition);
    mapRef.current?.setZoom(15);
  }, []);

  const mapOptions = useMemo(
    () => ({
      fullscreenControl: true,
      streetViewControl: true,
      mapTypeControl: true,
      zoomControl: true,
      mapId: import.meta.env.VITE_GOOGLE_MAP_ID ?? '',
    }),
    []
  );

  // Create or update the user's marker
  useEffect(() => {
    if (mapLoaded && mapRef.current && google.maps.marker) {
      const { AdvancedMarkerElement } = google.maps.marker;

      if (!userMarkerRef.current) {
        userMarkerRef.current = new AdvancedMarkerElement({
          position: markerPosition,
          title: "Your Location",
          map: mapRef.current,
        });
      } else {
        userMarkerRef.current.position = markerPosition;
      }
    }
  }, [mapLoaded, markerPosition]);

  // Create incident markers using AdvancedMarkerElement
  useEffect(() => {
    if (mapLoaded && mapRef.current && google.maps.marker) {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.map = null);
      markersRef.current = [];

      const { AdvancedMarkerElement } = google.maps.marker;

      // Initialize InfoWindow if not already
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }

      // Create markers for incidents
      incidentsWithCoordinates.forEach((incident) => {
        const incidentMarker = new AdvancedMarkerElement({
          position: {
            lat: incident.coordinates.lat,
            lng: incident.coordinates.lng,
          },
          title: incident.type,
          map: mapRef.current!,
        });

        // Add click listener to marker
        incidentMarker.addListener('click', () => {
          if (infoWindowRef.current && mapRef.current) {
            infoWindowRef.current.setContent(`
              <div style="
                padding: 16px;
                max-width: 300px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                border-radius: 8px;
              ">
                <h3 style="
                  margin: 0 0 8px 0;
                  font-size: 18px;
                  font-weight: 600;
                  color: #1a1a1a;
                ">${incident.type}</h3>
                <p style="
                  margin: 0 0 12px 0;
                  font-size: 14px;
                  line-height: 1.5;
                  color: #4a4a4a;
                ">${incident.description}</p>
                ${
                  incident.images && incident.images.length > 0
                    ? `<img 
                        src="${incident.images[0]}" 
                        alt="Incident" 
                        style="
                          display: block;
                          width: 100%;
                          height: auto;
                          border-radius: 6px;
                          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                          object-fit: cover;
                        "
                      />`
                    : ''
                }
              </div>
            `);
            infoWindowRef.current.open(mapRef.current, incidentMarker);
          }
        });

        markersRef.current.push(incidentMarker);
      });
    }

    // Cleanup markers when component unmounts or incidents change
    return () => {
      markersRef.current.forEach((marker) => marker.map = null);
      markersRef.current = [];
    };
  }, [mapLoaded, incidentsWithCoordinates]);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full">
        Error loading maps: {loadError.message}
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-full">Loading map...</div>;
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading incidents...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        Error loading incidents: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-800 h-full w-full p-3 md:p-8 flex flex-col relative">
      <div className="z-10 mb-4">
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceSelected}
        >
          <input
            type="text"
            placeholder="Search for a location"
            aria-label="Search for a location"
            className="w-full max-w-md p-2.5 text-base rounded-md border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Autocomplete>
      </div>

      <div className="flex-1 rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={center}
          zoom={DEFAULT_ZOOM}
          onClick={onMapClick}
          onLoad={onMapLoad}
          options={mapOptions}
        >
          {/* Markers and InfoWindows are handled via the Google Maps API directly */}
        </GoogleMap>
      </div>
    </div>
  );
}

export default MapNavigation;
