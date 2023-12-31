import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";

const InfoPage = () => {
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchedCoords, setSearchedCoords] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

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
        setCoords(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
    setActiveMarker(null);
  };

  const handleSearchChange = (event) => {
    setSearchAddress(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchAddress.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:8080/p/${encodeURIComponent(searchAddress)}`
        );
        setSearchedCoords(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filterMarkers = () => {
    if (searchAddress === "") {
      return coords;
    } else {
      return searchedCoords ? [searchedCoords] : [];
    }
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDjDwp89gISztoEQHuaXhfrptjx_qfLeBg">
      <div className="mapcontainer">
        <br />
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Rechercher une adresse"
            value={searchAddress}
            onChange={handleSearchChange}
          />
          <button type="submit">Rechercher</button>
        </form>
        <br />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: -4.441931, lng: 15.266293 }}
          zoom={11}
          onLoad={(map) => setMap(map)}
        >
          {filterMarkers().map((coord) => (
            <Marker
              key={coord.idPoste}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(50, 50)
              }}
              position={{
                lat: coord.latitude,
                lng: coord.longitude,
              }}
              onClick={() => handleMarkerClick(coord)}
            />
          ))}
          {userLocation && (
            <Marker
              position={userLocation}
              title="Emplacement actuel de l'utilisateur"
            />
          )}

          {selectedPlace && (
            <InfoWindow
              position={{
                lat: selectedPlace.latitude,
                lng: selectedPlace.longitude,
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <div className="card">
                  <div className="card-header">
                    <h4>{selectedPlace.typePoste} {selectedPlace.nomPoste}</h4>
                  </div>
                  <div className="card-body">
                    <p>Adresse : {selectedPlace.adresse}</p>
                    <p>Services : {selectedPlace.services}</p>
                    <p>Contact : {selectedPlace.telephone}</p>
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
              <p>&copy; 2023 Urgence-App. All Rights Reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default InfoPage;
