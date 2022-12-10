import React, { useState, useEffect, useRef } from "react";
import supabase from "../../contexts/supabaseClient";

export default function SetSitterPhoto({ userId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef();
  const [done, setDone] = useState(null);
  const [check, setCheck] = useState(null);
  const [err, setErr] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    const sendPhoto = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`sitterpf/${userId}`, selectedFile);
      if (error) {
        console.log(error);
        setErr("Nie udało się wysłać zdjęcia, spróbuj ponownie później.");
      }
      if (data) {
        setCheck(
          <p>
            <i
              style={{ fontSize: 25 }}
              className="fa-solid fa-square-check text-ok"
            ></i>
          </p>
        );
      }
    };
    sendPhoto();
  };

  const triggerFileSelectPopup = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setDone(
        <p>
          <i
            style={{ fontSize: 25 }}
            className="fa-solid fa-square-check text-ok"
          ></i>
        </p>
      );
    }
  };

  return (
    <>
      <label className="pf-label">Prześlij zdjęcie profilowe:</label>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={onSelectFile}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          marginBottom: 20,
          alignItems: "flex-start",
        }}
      >
        <button className="set-pfp-button" onClick={triggerFileSelectPopup}>
          WYBIERZ ZDJĘCIE
        </button>
        {done ? done : null}
        <button className="set-pfp-button" onClick={handleClick}>
          PRZEŚLIJ PLIK
        </button>
        {check ? check : null}
      </div>
      {err ? <p className="text-err"></p> : null}
    </>
  );
}
