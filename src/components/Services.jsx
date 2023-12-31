import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { Link } from "react-router-dom";

const Services = () => {
  const [map, setMap] = useState(null);
  const [services, setServices] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Erreur de géolocalisation : ', error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/services-de-depannage");
        setServices(response.data);
        console.log("Services fetched:", response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (service) => {
    setSelectedService(service);
  };

  const handleInfoWindowClose = () => {
    setSelectedService(null);
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDjDwp89gISztoEQHuaXhfrptjx_qfLeBg"
      onLoad={() => setApiLoaded(true)}
      onError={() => console.error('Error loading Google Maps API')}
    >
      {apiLoaded && (
        <div className="mapcontainer">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || { lat: -4.441931, lng: 15.266293 }}
            zoom={11}
            onLoad={(map) => setMap(map)}
          >
            {/* Marqueur de la position actuelle */}
            {userLocation && (
              <Marker
                position={userLocation}
                title="Emplacement actuel de l'utilisateur"
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
              />
            )}

            {/* Marqueurs de services */}
            {services.map((service) => (
              <Marker
                key={service.idService}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
                position={{
                  lat: service.latitude,
                  lng: service.longitude,
                }}
                onClick={() => handleMarkerClick(service)}
              />
            ))}

            {/* InfoWindow pour le service sélectionné */}
            {selectedService && (
              <InfoWindow
                position={{
                  lat: selectedService.latitude,
                  lng: selectedService.longitude,
                }}
                onCloseClick={handleInfoWindowClose}
              >
                <div>
                  <div className="card">
                    <div className="card-header">
                      <h4>{selectedService.nomFournisseur}</h4>
                    </div>
                    <div className="card-body">
                      <p>Description : {selectedService.descriptionDuService}</p>
                      <p>Prix : {selectedService.prix}</p>
                      {/* Ajoutez d'autres attributs selon vos besoins */}
                    </div>
                    <div className="card-footer"></div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
          <div className="row mt-5">
            <div className="col-md-12 text-center">
              <footer>
                <p>&copy; 2023 Locapp. All Rights Reserved.</p>
              </footer>
            </div>
            <Link className="btn btn-outline-primary" to="/accueil">Back to home</Link>
          </div>
        </div>
      )}
    </LoadScript>
  );
};

export default Services;
