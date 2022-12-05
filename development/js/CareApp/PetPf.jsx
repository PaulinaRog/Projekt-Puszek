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
          <div className="petpf-bg">
            <div className="petpf-card">
              <h1>{userData.petName}</h1>
              <h2>{userData.city}</h2>
              <img src={src && src} className="view-usercard-photo" />
              <h2>CHARAKTER:</h2>
              <p>{userData.character}</p>
              <h2>INNE ZWIERZĘTA:</h2>
              <span>{userData.otherPets}</span>
              <p>{userData.otherPetsDesc}</p>
              <h2>JAKIEGO OPIEKUNA SZUKAM:</h2>
              <p>{userData.perfectSitter}</p>
              <h2>SZCZEGÓLNA OPIEKA:</h2>
              <span>{userData.specialCare}</span>
              <p>{userData.specialCareDesc}</p>
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
