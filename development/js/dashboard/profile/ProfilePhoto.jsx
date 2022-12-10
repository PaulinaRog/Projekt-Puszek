import React, { useState, useEffect } from "react";
import { useRef } from "react";
import supabase from "../../contexts/supabaseClient";
import CurrentPhoto from "./CurrentPhoto";
import SavePhoto from "./SavePhoto";

export default function ProfilePhoto({}) {
  const inputRef = useRef();
  const [image, setImage] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [owner, setOwner] = useState(null);
  const [sitter, setSitter] = useState(null);
  const [forUpdate, setForUpdate] = useState(null);
  const [photoChange, setPhotoChange] = useState(false);

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
        data.ownerOrSitter === "owner" ? setOwner("pet") : null;
        data.ownerOrSitter === "sitter" ? setSitter("sitter") : null;
      }
    };
    checkProfile();
  }

  const onPhotoChange = (value) => {
    setPhotoChange(value);
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
                  >
                    WYBIERZ NOWE ZDJĘCIE
                  </button>
                </main>
                <div className="pfp-current">
                  {image &&
                    (sitter ? (
                      <SavePhoto
                        profile={sitter}
                        image={image}
                        forUpdate={forUpdate}
                        id={userInfo.id}
                        setChange={onPhotoChange}
                      />
                    ) : (
                      <SavePhoto
                        profile={owner}
                        image={image}
                        forUpdate={forUpdate}
                        id={userInfo.id}
                        setChange={onPhotoChange}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
