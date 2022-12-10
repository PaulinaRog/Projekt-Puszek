import React from "react";
import { useState, useEffect } from "react";
import supabase from "../contexts/supabaseClient";
import PetCard from "./PetCard";

export default function Pets() {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const getProfiles = async () => {
      const { data, error } = await supabase
        .from("owner_form")
        .select("uuid, petName, character, city");

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setProfiles(data);
      }
    };
    getProfiles();
  }, []);

  return (
    <div>
      <main className="care-app-pets">
        <div className="pets-cards-container">
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
  );
}
