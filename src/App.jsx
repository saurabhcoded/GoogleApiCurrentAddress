import { useEffect, useState } from 'react'
import './App.css'
import Geocode from "react-geocode"

function App() {
  const [coords, setCoords] = useState({});
  const apiKey = "AIzaSyBxphSkk_cMLJE6Ii12fiToBaXuxGYQukQ";
  Geocode.setApiKey(apiKey);
  Geocode.setLanguage("en");
  Geocode.setRegion("IN");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();
  const fetchLatLong = () => {
    navigator.geolocation.getCurrentPosition((geolocation) => {
      const coordinates = geolocation?.coords;
      setCoords(coordinates);
      Geocode.fromLatLng(coords.latitude, coords.longitude).then(
        (response) => {
          const address = response.results[0].formatted_address;
          console.log(address);
        },
        (error) => {
          console.error(error);
        }
      );
    })
  }
  console.log("Coordinates", coords)
  useEffect(() => {
    fetchLatLong();
  }, [])

  useEffect(() => {
    // Define the 'otpless' function
    window.otpless = (otplessUser) => {
      // Retrieve the user's details after successful login
      const waName = otplessUser.waName;
      const waNumber = otplessUser.waNumber;
      console.log("otplessUser",otplessUser);
      // Handle the signup/signin process
      // ...
    };
  }, []);
  return (
    <div className="App">
      <h1>Google Maps API</h1>
      <div style={{ display: "flex" }}>
        <input type="text" style={{ width: 350, height: 40, alignItems: "stretch" }} />
        <button style={{ background: "navy", borderRadius: 0, marginLeft: 3, color: 'white' }}>Save</button>
      </div>
    </div>
  )
}

export default App
