import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../../contexts/supabaseClient";
import SearchClosePetsResults from "./SearchClosePetsResults";
import PetCard from "../PetCard";

export default function SearchResultPets() {
  const location = useLocation();

  const filterByCity = location.state.parentCity;
  const filterByType = location.state.type;
  const filterByOtherPets = location.state.otherPets;

  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    getFilteredProfiles();
  }, []);

  const getFilteredProfiles = async () => {
    let query = supabase
      .from("owner_form")
      .select("uuid, id, petName, city, character");

    if (filterByCity && filterByOtherPets && filterByType) {
      query = query.match({
        city: `${filterByCity}`,
        otherPets: `${filterByOtherPets}`,
        type: `${filterByType}`,
      });
    }

    if (filterByCity && filterByType) {
      query = query.match({ city: `${filterByCity}`, type: `${filterByType}` });
    }
    if (filterByCity && filterByOtherPets) {
      query = query.match({
        city: `${filterByCity}`,
        otherPets: `${filterByOtherPets}`,
      });
    }
    if (filterByType && filterByOtherPets) {
      query = query.match({
        type: `${filterByType}`,
        otherPets: `${filterByOtherPets}`,
      });
    }
    if (filterByCity) {
      query = query.eq("city", filterByCity);
    }
    if (filterByType) {
      query = query.eq("type", filterByType);
    }
    if (filterByOtherPets) {
      query = query.eq("otherPets", filterByOtherPets);
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
        <h1 className="care-app-header">SZUKAJĄ OPIEKUNÓW:</h1>
        <div className="cards-container">
          {filtered &&
            filtered.map((pf) => {
              return (
                <PetCard
                  key={pf.id}
                  petName={pf.petName}
                  uuid={pf.uuid}
                  character={pf.character}
                  city={pf.city}
                />
              );
            })}

          {filtered && (
            <SearchClosePetsResults
              filtered={filtered}
              parentCity={location.state.parentCity}
              type={location.state.type}
              otherPets={location.state.otherPets}
            />
          )}
        </div>
      </div>
    </>
  );
}
