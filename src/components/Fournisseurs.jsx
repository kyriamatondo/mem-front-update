// Fournisseurs.jsx
import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const Fournisseurs = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([
    { id: 1, lat: 0, lng: 0, name: 'Service 1', price: '20 €' },
    { id: 2, lat: 0, lng: 0, name: 'Service 2', price: '25 €' },
    { id: 3, lat: 0, lng: 0, name: 'Service 3', price: '18 €' },
  ]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDjDwp89gISztoEQHuaXhfrptjx_qfLeBg',
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setMarkers((prevMarkers) =>
          prevMarkers.map((marker, index) => ({
            ...marker,
            lat: position.coords.latitude + (index + 1) * 0.01,
            lng: position.coords.longitude + (index + 1) * 0.01,
          }))
        );
      },
      (error) => {
        console.error('Erreur de géolocalisation : ', error);
      }
    );
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const center = userLocation || { lat: 0, lng: 0 };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={(map) => setMap(map)}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
            icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }}
          />
        ))}

        {userLocation && (
          <Marker
            position={userLocation}
            title="Emplacement actuel de l'utilisateur"
            icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
          />
        )}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h4>{selectedMarker.name}</h4>
              <p>Prix: {selectedMarker.price}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Fournisseurs;
