import React from "react";
import { useState } from "react";
import { cities } from "../../cities/cities";

export default function SearchCity() {
  const [city, setCity] = useState(null);

  return (
    <div className="search-city-box">
      <label>Miasto:</label>
      <select
        className="search-city-box-select"
        onChange={(e) => {
          e.preventDefault();
          setCity(e.target.value);
        }}
      >
        <option>Wybierz...</option>
        {cities.map((city) => (
          <option key={city.id} value={city.city}>
            {city.city}
          </option>
        ))}
      </select>
    </div>
  );
}
