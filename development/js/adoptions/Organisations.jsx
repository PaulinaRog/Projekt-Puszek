import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrgCard from "./OrgCard";
import supabase from "../contexts/supabaseClient";
import SearchEngine from "../CareApp/searchEngine/SearchEngine";

export default function Organisations() {
  const [profiles, setProfiles] = useState(null);

  const [visibility, setVisibility] = useState(null);

  const { pathname } = useLocation();

  const hideProfiles = (val) => {
    setVisibility(val);
  };

  useEffect(() => {
    const getProfiles = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("uuid, type, name, shortDesc, city");

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
      {pathname === "/care/organisations" ? (
        <main className="care-app-org">
          <h1 className="care-app-header">ORGANIZACJE:</h1>
          {/* <SearchEngine onHeightChange={hideProfiles} /> */}
          <div style={visibility && visibility} className="cards-container">
            {profiles &&
              profiles.map((pf, idx) => {
                return (
                  <OrgCard
                    key={idx}
                    name={pf.name}
                    uuid={pf.uuid}
                    shortDesc={pf.shortDesc}
                    city={pf.city}
                    type={pf.type}
                  />
                );
              })}
          </div>
        </main>
      ) : null}
    </>
  );
}
