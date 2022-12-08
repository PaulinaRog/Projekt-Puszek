import React from "react";
import { useState, useEffect } from "react";
import supabase from "../../contexts/supabaseClient";
import Description from "./sitterData/Description";
import Experience from "./sitterData/Experience";
import Motives from "./sitterData/Motives";
import Pets from "./sitterData/Pets";
import PetsDesc from "./sitterData/PetsDesc";
import Vaccine from "./sitterData/Vaccine";
import Preference from "./sitterData/Preference";

export default function ViewSitterProfile({ id }) {
  const [userData, setUserData] = useState(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const viewSitter = async () => {
      const { data, error } = await supabase
        .from("sitter_form")
        .select("*")
        .eq("uuid", id)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        setUserData(data);
        console.log(data);
      }
    };
    viewSitter();

    const sitterPhoto = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(`sitterpf/${id}`);
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setSrc(data);
      }
    };
    sitterPhoto();

    const urls = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrls([`sitterpf/${id}`], 60);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data[0].signedUrl);
        setSrc(data[0].signedUrl);
      }
    };
    urls();
  }, []);

  console.log(id);

  let today = new Date();
  let year = today.getFullYear();

  return (
    <>
      {userData && (
        <div className="view-profile">
          <div className="view-profile-card">
            <img src={src && src} className="view-usercard-photo" />
            <div className="profile-data">
              <h1>{userData.name}</h1>
              <span>{userData.surname}</span>
              <span>Wiek: {year - userData.birth}</span>
              <span>{userData.city}</span>
              <h3>OPIS:</h3>
              <Description description={userData.description} id={id} />
              <h3>DOŚWIADCZENIE:</h3>
              <Experience experience={userData.experience} id={id} />
              <h3>DLACZEGO CHCĘ ZOSTAĆ OPIEKUNEM:</h3>
              <Motives motives={userData.motives} id={id} />
              <h3>CZY POSIADAM ZWIERZAKI:</h3>
              <Pets pets={userData.pets} id={id} />
              <PetsDesc petsDesc={userData.petsDesc} id={id} />

              <h3>
                CZY SĄ SZCZEPIONE I PRZEBADANE POD KĄTEM NAJCHĘSTSZYCH CHORÓB:
              </h3>
              <Vaccine vaccine={userData.vaccine} id={id} />

              <h3>NAJCHĘTNIEJ ZAJMĘ SIĘ:</h3>
              <Preference preference={userData.preference} id={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
