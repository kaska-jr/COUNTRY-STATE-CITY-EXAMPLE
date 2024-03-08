import "./App.css";
import CountryStateCity from "./CountryStateCity";
import Default from "./Default";
import { useState } from "react";

function App() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  return (
    <>
      <Default />
      <CountryStateCity
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        selectedCity={selectedCity}
        onCountryChange={handleCountryChange}
        onStateChange={handleStateChange}
        onCityChange={handleCityChange}
      />
    </>
  );
}

export default App;
