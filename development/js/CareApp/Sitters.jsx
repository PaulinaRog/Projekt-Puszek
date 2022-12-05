import React from "react";
import { useEffect, useState } from "react";
import SitterCard from "./SitterCard";
import supabase from "../contexts/supabaseClient";

export default function Sitters() {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const getProfiles = async () => {
      const { data, error } = await supabase
        .from("sitter_form")
        .select("uuid, name, birth, city, description");

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
      <main className="care-app-sitters">
        <div className="pets-cards-container">
          {profiles &&
            profiles.map((pf, idx) => {
              return (
                <SitterCard
                  key={idx}
                  name={pf.name}
                  uuid={pf.uuid}
                  description={pf.description}
                  age={pf.birth}
                />
              );
            })}
        </div>
      </main>
    </div>
  );
}
