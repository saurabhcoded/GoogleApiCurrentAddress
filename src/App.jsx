import { useEffect, useState } from 'react'
import './App.css'
import Geocode from "react-geocode"

function App() {
  const [coords, setCoords] = useState({});
  const [address, setAddress] = useState("")
  const apiKey = import.meta.env.VITE_MAP_API_KEY;
  Geocode.setApiKey(apiKey);
  Geocode.setLanguage("en");
  Geocode.setRegion("IN");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();
  const fetchLatLong = () => {
    navigator.geolocation.getCurrentPosition((geolocation) => {
      const coordinates = geolocation?.coords;
      setCoords(coordinates);
      if (coordinates) {
        Geocode.fromLatLng(coordinates.latitude, coordinates.longitude).then(
          (response) => {
            const address = response.results[0].formatted_address;
            setAddress(address);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    })
  }
  console.log("Coordinates", coords)
  useEffect(() => {
    fetchLatLong();
  }, [])

  return (
    <div className="App">
      <h1>Current Location Finder</h1>
      <div style={{ display: "flex" }}>
        <input value={address} type="text" style={{ width: 450, height: 40, alignItems: "stretch" }} />
      </div>
    </div>
  )
}

export default App
