import React, { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const Test = () => {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [country, setCountry] = useState("");

  console.log(country);

  return (
    <div className="w-96">
      <h6>Country</h6>
      <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
          console.log(e);
        }}
        placeHolder="Select Country"
      />
      <h6>State</h6>
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
          console.log(e);
        }}
        placeHolder="Select State"
      />
      <h6>City</h6>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select City"
      />
      <h6>Language</h6>
      <LanguageSelect
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select Language"
      />
    </div>
  );
};

export default Test;
