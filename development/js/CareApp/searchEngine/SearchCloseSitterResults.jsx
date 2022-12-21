import React from "react";
import { useEffect, useState } from "react";
import supabase from "../../contexts/supabaseClient";
import SitterCard from "../SitterCard";

export default function SearchCloseSitterResults({
  filtered,
  parentCity,
  preference,
  pets,
}) {
  const [profiles, setProfiles] = useState(null);
  const whatever = "OBOJĘTNE";

  useEffect(() => {
    if (!filtered.length) {
      getFiltered();
    }
  }, []);

  const getFiltered = async () => {
    const { data, error } = await supabase
      .from("sitter_form")
      .select("id, uuid, name, city, birth, description")
      .or(
        `city.eq.${parentCity},preference.eq.${preference},pets.eq.${pets},preference.eq.${whatever}`
      );
    if (error) {
      console.log(error);
    }
    if (data) {
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
            profiles.map((pf) => {
              return (
                <SitterCard
                  key={pf.id}
                  name={pf.name}
                  uuid={pf.uuid}
                  description={pf.description}
                  age={pf.birth}
                  city={pf.city}
                />
              );
            })}
        </>
      ) : null}
    </>
  );
}
