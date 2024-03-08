import React, { useState, useEffect, ChangeEvent } from "react";
import { Country, State, City } from "country-state-city";

const CountryStateCity = ({
  selectedCountry,
  selectedState,
  selectedCity,
  onCountryChange,
  onStateChange,
  onCityChange,
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountryName, setSelectedCountryName] = useState("");

  useEffect(() => {
    setCountries(
      Country.getAllCountries().map((country) => ({
        isoCode: country.isoCode,
        name: country.name,
      }))
    );
  }, []);

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setSelectedCountryName(countryName);
    onCountryChange(countryName);
    const countryCode = countries.find(
      (country) => country.name === countryName
    )?.isoCode;
    if (countryCode) {
      setStates(
        State.getStatesOfCountry(countryCode).map((state) => ({
          isoCode: state.isoCode,
          name: state.name,
        }))
      );
      onStateChange("");
      setCities([]);
    }
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    onStateChange(stateName);
    const selectedState = states.find((state) => state.name === stateName);
    if (selectedState) {
      const selectedCountry = countries.find(
        (country) => country.name === selectedCountryName
      );
      if (selectedCountry) {
        setCities(
          City.getCitiesOfState(
            selectedCountry.isoCode,
            selectedState.isoCode
          ).map((city) => ({ name: city.name }))
        );
      }
      onCityChange("");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>

          <select
            id="country"
            name="country"
            className="mt-1 block w-full pl-3 pr-10 py-3 text-base bg-[#EDF2F7] px-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <select
            id="state"
            name="state"
            className={`mt-1 block w-full pl-3 pr-10 py-3 text-base  bg-[#EDF2F7] px-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
              !selectedCountry && "pointer-events-none"
            }`}
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <option value="" disabled={!selectedCountry}>
              {selectedCountry
                ? "Choose an Option"
                : "Please Select a Country First"}
            </option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full py-4">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <select
          id="city"
          name="city"
          className={`mt-1 block w-full pl-3 pr-10 py-3  bg-[#EDF2F7] px-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
            !selectedState && "pointer-events-none"
          }`}
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          disabled={!selectedState}
        >
          <option value="" disabled={!selectedState}>
            {selectedState ? "Choose an Option" : "Please Select a State First"}
          </option>
          {cities.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CountryStateCity;
