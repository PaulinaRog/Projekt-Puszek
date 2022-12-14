import React, { useState, useEffect } from "react";
import { useRef } from "react";
import supabase from "../../contexts/supabaseClient";
import CurrentPhoto from "./CurrentPhoto";
import SavePhoto from "./SavePhoto";

export default function ProfilePhoto({}) {
  const inputRef = useRef();
  const [image, setImage] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [forUpdate, setForUpdate] = useState(null);
  const [photoChange, setPhotoChange] = useState(false);
  const [visible, setVisible] = useState({ display: "block" });
  const [text, setText] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const isUserLogged = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
      }
      if (!user) {
        navigate("/signup");
      }
      if (user) {
        setUserInfo(user);
      }
    };
    isUserLogged();
  }, []);

  if (userInfo) {
    const checkProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("ownerOrSitter")
        .eq("id", userInfo.id)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        if (data.ownerOrSitter === "owner") {
          setProfile("pet");
        } else if (data.ownerOrSitter === "sitter") {
          setProfile("sitter");
        } else if (data.ownerOrSitter === "organisation") {
          setProfile("organisation");
        }
      }
    };
    checkProfile();
  }

  const onPhotoChange = (value) => {
    setPhotoChange(value);
    setVisible({ display: "none" });
    setText("Zdjęcie zostało wysłane!");
  };

  const triggerFileSelectPopup = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
        setForUpdate(e.target.files[0]);
      });
    }
  };

  return (
    <>
      {userInfo && (
        <>
          <div className="pfp">
            <div className="pfp-card">
              <h1 className="pfp-header">ZMIEŃ ZDJĘCIE</h1>

              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={onSelectFile}
              />
              <img />
              <div className="pfp-flex">
                <main className="pfp-current">
                  <CurrentPhoto userInfo={userInfo} photoChange={photoChange} />
                  <button
                    className="pfp-button"
                    onClick={triggerFileSelectPopup}
                    style={visible}
                  >
                    WYBIERZ NOWE ZDJĘCIE
                  </button>
                  {text ? (
                    <p className="text-ok">
                      {text} <i className="fa-solid fa-paw"></i>
                    </p>
                  ) : null}
                </main>
                <div className="pfp-current">
                  {image && (
                    <SavePhoto
                      profile={profile}
                      image={image}
                      forUpdate={forUpdate}
                      id={userInfo.id}
                      setChange={onPhotoChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
