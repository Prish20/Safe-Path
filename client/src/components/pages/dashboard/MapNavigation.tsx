import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Autocomplete, useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import type { Libraries } from '@react-google-maps/api';

interface MapPosition {
  lat: number;
  lng: number;
}

const DEFAULT_LOCATION: MapPosition = {
  lat: 1.3521,
  lng: 103.8198, // Singapore
};

const DEFAULT_ZOOM = 20;
const LIBRARIES: Libraries = ['places'];
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
};

function MapNavigation() {
  const [center, setCenter] = useState<MapPosition>(DEFAULT_LOCATION);
  const [markerPosition, setMarkerPosition] = useState<MapPosition>(DEFAULT_LOCATION);

  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Load the Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: LIBRARIES,
  });

  // Get user's location on component mount
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

  // Map load handler
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Map click handler
  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkerPosition(newPosition);
    mapRef.current?.panTo(newPosition);
  }, []);

  // Place selection handler
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
    }),
    []
  );

  if (loadError) {
    return <div className="flex items-center justify-center h-full">Error loading maps: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-full">Loading map...</div>;
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
          <Marker
            position={markerPosition}
            animation={google.maps.Animation.DROP}
          />
        </GoogleMap>
      </div>
    </div>
  );
}

export default MapNavigation;
