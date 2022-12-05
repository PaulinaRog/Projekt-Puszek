import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../contexts/supabaseClient";
import SendMessage from "./SendMessage";

export default function PetPf() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const [src, setSrc] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loggedInfo, setLoggedInfo] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("sitter_form")
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

  let today = new Date();
  let year = today.getFullYear();

  return (
    <>
      {userData && (
        <>
          <div className="petpf-bg">
            <div className="petpf-card">
              <img src={src && src} className="view-usercard-photo" />
              <div className="profile-data-container">
                <h1>{userData.name}</h1>
                <span>{userData.surname}</span>
                <span>Wiek: {year - userData.birth}</span>
                <span>{userData.city}</span>

                <h3>OPIS:</h3>
                <p>{userData.description}</p>
                <h3>DOŚWIADCZENIE:</h3>
                <p>{userData.experience}</p>
                <h3>DLACZEGO CHCĘ ZOSTAĆ OPIEKUNEM:</h3>
                <p>{userData.motives}</p>
                <h3>CZY POSIADAM ZWIERZAKI:</h3>
                <span>{userData.pets}</span>
                <span>
                  {userData.pets === "TAK" ? userData.petsDesc : null}
                </span>
                {userData.pets === "TAK" ? (
                  <>
                    <h3>
                      CZY SĄ SZCZEPIONE I PRZEBADANE POD KĄTEM NAJCHĘSTSZYCH
                      CHORÓB:
                    </h3>
                    <span>{userData.vaccine}</span>
                  </>
                ) : null}
                <h3>NAJCHĘTNIEJ ZAJMĘ SIĘ:</h3>
                <p>{userData.preference}</p>
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
