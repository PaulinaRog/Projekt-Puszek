import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../contexts/supabaseClient";
import SendMessage from "./SendMessage";

export default function PetPf() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const [src, setSrc] = useState(null);
  const [loggedInfo, setLoggedInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("owner_form")
        .select("*")
        .eq("uuid", id)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setUserData(data);
      }
    };
    getProfile();

    const sitterPhoto = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(`petpf/${id}`);
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
        .createSignedUrls([`petpf/${id}`], 60);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data[0].signedUrl);
        setSrc(data[0].signedUrl);
      }
    };
    urls();

    const isUserLogged = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
      }
      if (user) {
        setIsLogged(true);
        setLoggedInfo(user);
      }
    };

    isUserLogged();
  }, []);

  return (
    <>
      {userData && (
        <>
          <div className="view-profile">
            <div className="view-profile-card">
              <div className="profile-data-container">
                <div className="view-profile-basic-data-and-photo">
                  <img src={src && src} className="view-usercard-photo" />
                  <div className="view-profile-basic-data">
                    <h1>{userData.petName}</h1>
                    {userData.type === "KOT" ? (
                      <i className="fa-solid fa-cat"></i>
                    ) : null}
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                        fontSize: 25,
                      }}
                    >
                      {userData.city}
                    </span>
                  </div>
                </div>
                <div className="view-profile-decor"></div>
                <h3>CHARAKTER:</h3>
                <p>{userData.character}</p>
                <h3>INNE ZWIERZĘTA:</h3>
                <span>{userData.otherPets}</span>
                <p>{userData.otherPetsDesc}</p>
                <h3>JAKIEGO OPIEKUNA SZUKAM:</h3>
                <p>{userData.perfectSitter}</p>
                <h3>SZCZEGÓLNA OPIEKA:</h3>
                <span>{userData.specialCare}</span>
                <p>{userData.specialCareDesc}</p>
              </div>
              {isLogged && isLogged ? (
                <SendMessage loggedInfo={loggedInfo} userData={userData} />
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}
