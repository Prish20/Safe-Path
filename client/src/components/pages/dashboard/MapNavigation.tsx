import { useState, useEffect, useCallback } from 'react';
import { Autocomplete, LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import type { Libraries } from '@react-google-maps/api';

interface MapPosition {
  lat: number;
  lng: number;
}

const DEFAULT_LOCATION: MapPosition = {
  lat: 1.3521,
  lng: 103.8198 // Singapore
};

const DEFAULT_ZOOM = 12;
const LIBRARIES: Libraries = ['places'];
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%'
};

function MapNavigation() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<MapPosition>(DEFAULT_LOCATION);
  const [markerPosition, setMarkerPosition] = useState<MapPosition>(DEFAULT_LOCATION);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<Error | null>(null);

  // Get user's location on component mount
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by your browser');
      setIsLoading(false);
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
        setIsLoading(false);
      },
      (error) => {
        console.warn('Error getting user location:', error.message);
        setIsLoading(false);
      }
    );
  }, []);

  // Map load handler
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setIsLoading(false);
  }, []);

  // Map load error handler
  const onLoadError = useCallback((error: Error) => {
    setLoadError(error);
    setIsLoading(false);
  }, []);

  // Map click handler
  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    
    setMarkerPosition(newPosition);
    map?.panTo(newPosition);
  }, [map]);

  // Place selection handler
  const onPlaceSelected = useCallback(() => {
    const place = autocomplete?.getPlace();
    
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
    map?.setZoom(15);
  }, [autocomplete, map]);

  if (loadError) {
    return <div className="flex items-center justify-center h-full">Error loading maps: {loadError.message}</div>;
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading map...</div>;
  }

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
      libraries={LIBRARIES}
      onError={onLoadError}
    >
      <div className="bg-gray-800 h-full w-full p-3 md:p-8 flex flex-col relative">
        <div className="z-10 mb-4">
          <Autocomplete
            onLoad={setAutocomplete}
            onPlaceChanged={onPlaceSelected}
          >
            <input
              type="text"
              placeholder="Search for a location"
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
            options={{
              fullscreenControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              zoomControl: true,
            }}
          >
            {!isLoading && (
              <Marker
                position={markerPosition}
                animation={window.google?.maps.Animation.DROP}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}

export default MapNavigation;
