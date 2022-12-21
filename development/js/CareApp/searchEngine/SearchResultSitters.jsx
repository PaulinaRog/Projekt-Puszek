import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../../contexts/supabaseClient";
import SearchCloseSitterResults from "./SearchCloseSitterResults";
import SitterCard from "../SitterCard";

export default function SearchResultSitters() {
  const location = useLocation();

  const filterByCity = location.state.parentCity;
  const filterByPreference = location.state.preference;
  const filterByPets = location.state.pets;

  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    getFilteredProfiles();
  }, []);

  const getFilteredProfiles = async () => {
    let query = supabase
      .from("sitter_form")
      .select("id, name, city, uuid, description, birth");

    if (filterByCity && filterByPets && filterByPreference) {
      query = query.match({
        city: `${filterByCity}`,
        pets: `${filterByPets}`,
        preference: `${filterByPreference}`,
      });
    }

    if (filterByCity && filterByPreference) {
      query = query.match({
        city: `${filterByCity}`,
        preference: `${filterByPreference}`,
      });
    }
    if (filterByCity && filterByPets) {
      query = query.match({
        city: `${filterByCity}`,
        pets: `${filterByPets}`,
      });
    }
    if (filterByPreference && filterByPets) {
      query = query.match({
        preference: `${filterByPreference}`,
        pets: `${filterByPets}`,
      });
    }
    if (filterByCity) {
      query = query.eq("city", filterByCity);
    }
    if (filterByPreference) {
      query = query.eq("preference", filterByPreference);
    }
    if (filterByPets) {
      query = query.eq("pets", filterByPets);
    }

    const { data, error } = await query;
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setFiltered(data);
    }
  };

  return (
    <>
      <div className="search-page">
        <h1 className="care-app-header">PODEJMĄ SIĘ OPIEKI:</h1>
        <div className="cards-container">
          {filtered &&
            filtered.map((pf, idx) => {
              return (
                <SitterCard
                  key={idx}
                  name={pf.name}
                  uuid={pf.uuid}
                  description={pf.description}
                  age={pf.birth}
                  city={pf.city}
                />
              );
            })}
          {filtered && (
            <SearchCloseSitterResults
              filtered={filtered}
              parentCity={location.state.parentCity}
              preference={location.state.preference}
              pets={location.state.pets}
            />
          )}
        </div>
      </div>
    </>
  );
}
