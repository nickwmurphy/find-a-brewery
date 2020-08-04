import React, { useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Context } from "./Context";

const containerStyle = {
  width: "100%",
  height: "400px",
};

let zoomLevel = 12;

let center = {
  lat: 34.4208,
  lng: -119.6982,
};

function Map() {
  const { brewery } = useContext(Context);

  if (Object.keys(brewery).length) {
    center = {
      lat: brewery.latitude * 1,
      lng: brewery.longitude * 1,
    };

    zoomLevel = 17;
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoomLevel}
      >
        <Marker position={center}></Marker>
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
