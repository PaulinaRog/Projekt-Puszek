import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { cities } from "../../cities/cities";

export default function SearchCity({ setParentCity }) {
  const [city, setCity] = useState(null);

  useEffect(() => {
    setParentCity(city);
  }, [city]);

  const handleChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  return (
    <div className="search-city-box">
      <label>Miasto:</label>
      <select className="search-city-box-select" onChange={handleChange}>
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
