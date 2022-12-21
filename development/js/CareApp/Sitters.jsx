import React from "react";
import { useEffect, useState } from "react";
import SitterCard from "./SitterCard";
import supabase from "../contexts/supabaseClient";
import SearchEngine from "./searchEngine/SearchEngine";
import { useLocation } from "react-router-dom";
import SearchResultSitters from "./searchEngine/SearchResultSitters";

export default function Sitters() {
  const [profiles, setProfiles] = useState(null);

  const [visibility, setVisibility] = useState(null);

  const { pathname } = useLocation();

  const hideProfiles = (val) => {
    setVisibility(val);
  };

  useEffect(() => {
    const getProfiles = async () => {
      const { data, error } = await supabase
        .from("sitter_form")
        .select("uuid, name, birth, city, description");

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
      {pathname === "/care/sitters" ? (
        <div>
          <main className="care-app-sitters">
            <h1 className="care-app-header">PODEJMĄ SIĘ OPIEKI:</h1>
            <SearchEngine onHeightChange={hideProfiles} />
            <div style={visibility && visibility} className="cards-container">
              {profiles &&
                profiles.map((pf, idx) => {
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
            </div>
          </main>
        </div>
      ) : null}{" "}
      {pathname.includes("search") ? <SearchResultSitters /> : null}
    </>
  );
}
