import React from "react";
import { useState, useEffect } from "react";
import supabase from "../contexts/supabaseClient";
import PetCard from "./PetCard";
import SearchEngine from "./searchEngine/SearchEngine";
import { useLocation } from "react-router-dom";
import SearchResultPets from "./searchEngine/SearchResultPets";

export default function Pets({}) {
  const [profiles, setProfiles] = useState(null);

  const [visibility, setVisibility] = useState(null);

  const { pathname } = useLocation();

  const hideProfiles = (val) => {
    setVisibility(val);
  };

  useEffect(() => {
    const getProfiles = async () => {
      const { data, error } = await supabase
        .from("owner_form")
        .select("uuid, petName, character, city");

      if (error) {
        console.log(error);
      }
      if (data) {
        setProfiles(data);
      }
    };
    getProfiles();
  }, []);

  return (
    <>
      {pathname === "/care/pets" ? (
        <div>
          <main className="care-app-pets">
            <h1 className="care-app-header">SZUKAJĄ OPIEKUNÓW:</h1>
            <SearchEngine onHeightChange={hideProfiles} />
            <div style={visibility && visibility} className="cards-container">
              {profiles &&
                profiles.map((pf, idx) => {
                  return (
                    <PetCard
                      key={idx}
                      petName={pf.petName}
                      uuid={pf.uuid}
                      character={pf.character}
                      city={pf.city}
                    />
                  );
                })}
            </div>
          </main>
        </div>
      ) : null}
      {pathname.includes("search") ? <SearchResultPets /> : null}
    </>
  );
}
