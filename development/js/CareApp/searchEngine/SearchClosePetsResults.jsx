import React from "react";
import { useEffect, useState } from "react";
import supabase from "../../contexts/supabaseClient";
import PetCard from "../PetCard";

export default function SearchClosePetsResults({
  filtered,
  parentCity,
  type,
  otherPets,
}) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    if (!filtered.length) {
      getFiltered();
    }
  }, []);

  const getFiltered = async () => {
    const { data, error } = await supabase
      .from("owner_form")
      .select("uuid, id, petName, type, city, character")
      .or(`city.eq.${parentCity},type.eq.${type},otherPets.eq.${otherPets}`);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setProfiles(data);
    }
  };

  return (
    <>
      {profiles ? (
        <>
          <div className="search-not-found">
            <h1>
              Niestety, nie znaleźliśmy profili, które by spełniały wszystie
              warunki - możesz powrócić do wyszukiwania i zmienić filtry bądź
              zapoznać się z polecanymi dla Ciebie profilami. Profile poniżej
              spełniają przynajmniej jeden z podanych przez Ciebie warunków.
            </h1>
          </div>
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
        </>
      ) : null}
    </>
  );
}
