import React from "react";
import { useState, useEffect } from "react";
import supabase from "../../contexts/supabaseClient";

export default function DeleteProfile({ id }) {
  const [style, setStyle] = useState({
    display: "none",
  });
  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [text, setText] = useState(null);
  const [profile, setProfile] = useState(null);

  // SPRAWDZENIE KTÓRY PROFIL
  useEffect(() => {
    const checkProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("ownerOrSitter")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        data.ownerOrSitter === "owner" ? setProfile("pet") : null;
        data.ownerOrSitter === "sitter" ? setProfile("sitter") : null;
        data.ownerOrSitter === "organisation"
          ? setProfile("organisation")
          : null;
      }
    };
    checkProfile();
  }, []);

  // USUNIĘCIE ZDJĘIA

  const deletePhoto = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .remove(`${profile}pf/${id}`);
    if (error) {
      console.log(error);
      setUserPhoto("Wystąpił błąd. Skontaktuj się z obsługą.");
    }
    if (data) {
      setUserPhoto("Skasowano zdjęcie");
      console.log("skasowano zdjęcie");
    }
  };

  // USINIĘCIE Z TABELI

  const deleteProfileData = async () => {
    const { error } = await supabase
      .from(
        profile === "sitter" || profile === "pet"
          ? `${profile}_form`
          : `${profile}`
      )
      .delete()
      .eq("uuid", id);
    if (error) {
      console.log(error);
      setUserData("Wystąpił błąd. Skontaktuj się z obsługą.");
    } else {
      setUserData("Skasowano dane z profilu użytkownika");
      setText(
        "Usuwanie profilu powiodło się. Za chwilę zostaniesz przekierowany na stronę logowania."
      );
    }
  };

  // WYLOGOWANIE;
  const logOut = async () => {
    let { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
    window.location.reload(false);
    navigate("/signup");
  };

  const handleClick = (e) => {
    e.preventDefault();
    setStyle({
      display: "flex",
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deletePhoto();
    deleteProfileData();
    setTimeout(() => {
      logOut();
    }, 5000);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setStyle({
      display: "none",
    });
  };

  return (
    <>
      <div className="delete">
        <div className="delete-card">
          <h1 className="delete-header">Usuwanie profilu</h1>
          <button onClick={handleClick} className="delete-button">
            USUŃ PROFIL
          </button>
          <div style={style} className="delete-warning-box">
            <p className="text-err delete-err-text">
              Ta operacja spowoduje nieodwracalną utratę wszystkich danych,
              zdjęć oraz wiadomości, czy na pewno chcesz usunąć konto?
            </p>
            <div>
              <button className="delete-button-small" onClick={handleDelete}>
                TAK
              </button>
              <button className="delete-button-small" onClick={handleCancel}>
                NIE
              </button>
              <details>
                <p style={{ fontSize: 15 }}>{userPhoto && userPhoto}</p>
                <p style={{ fontSize: 15 }}>{userData && userData}</p>
              </details>
            </div>
            {text ? (
              <p className="text-ok" style={{ width: 450, marginTop: 20 }}>
                <i className="fa-regular fa-square-check"></i> {text}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
