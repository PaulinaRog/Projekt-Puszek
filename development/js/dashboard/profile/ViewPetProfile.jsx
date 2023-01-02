import React from "react";
import { useState, useEffect } from "react";
import supabase from "../../contexts/supabaseClient";
import PetCharacter from "./petData/PetCharacter";
import PerfectSitter from "./petData/PerfectSitter";
import SpecialCareDesc from "./petData/SpecialCareDesc";
import OtherPetsDesc from "./petData/OtherPetsDesc";
import OtherPets from "./petData/OtherPets";
import SpecialCare from "./petData/SpecialCare";
import Vaccine from "./petData/Vaccine";
import { useNavigate } from "react-router-dom";
import NoProfile from "./NoProfile";

export default function ViewPetProfile({ id }) {
  const [userData, setUserData] = useState(null);
  const [src, setSrc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const viewOwner = async () => {
      const { data, error } = await supabase
        .from("owner_form")
        .select("*")
        .eq("uuid", id)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        setUserData(data);
      }
    };
    viewOwner();

    const urls = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrls([`petpf/${id}`], 60);

      if (error) {
        console.log(error);
      }
      if (data) {
        setSrc(data[0].signedUrl);
      }
    };
    urls();
  }, []);

  return (
    <>
      <div className="view-profile">
        <div className="view-profile-card">
          {userData && (
            <div className="profile-data-container">
              <div className="view-profile-basic-data-and-photo">
                <img src={src && src} className="view-usercard-photo" />

                <div className="view-profile-basic-data">
                  <h1>{userData.petName}</h1>
                  {userData.type === "KOT" ? (
                    <i className="fa-solid fa-cat"></i>
                  ) : null}
                  {userData.type === "PIES" ? (
                    <i className="fa-solid fa-dog"></i>
                  ) : null}
                  <h2>{userData.city}</h2>
                </div>
              </div>
              <div className="view-profile-decor"></div>
              <h2>CHARAKTER:</h2>
              <PetCharacter character={userData.character} id={id} />
              <br />
              <h2>INNE ZWIERZĘTA:</h2>
              <OtherPets otherPets={userData.otherPets} id={id} />
              <br />
              <OtherPetsDesc otherPetsDesc={userData.otherPetsDesc} id={id} />
              <br />
              <h2>JAKIEGO OPIEKUNA SZUKAM:</h2>
              <PerfectSitter perfectSitter={userData.perfectSitter} id={id} />
              <br />
              <h2>SZCZEGÓLNA OPIEKA:</h2>
              <SpecialCare specialCare={userData.specialCare} id={id} />
              <br />
              <SpecialCareDesc
                specialCareDesc={userData.specialCareDesc}
                id={id}
              />
              <h2>CZY MA SZCZEPIENIA I BADANIA W ZAKRESIE POWAŻNYCH CHORÓB:</h2>
              <Vaccine vaccine={userData.vaccine} id={id} />
            </div>
          )}
          {!userData ? <NoProfile /> : null}
        </div>
      </div>
    </>
  );
}
