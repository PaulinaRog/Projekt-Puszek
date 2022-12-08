import { useState } from "react";
import React from "react";
import supabase from "../../contexts/supabaseClient";

export default function SavePhoto({
  image,
  id,
  profile,
  forUpdate,
  setChange,
}) {
  const [deleted, setDeleted] = useState(false);
  const [sent, setSent] = useState(false);

  const deletePhoto = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .remove(`${profile}pf/${id}`);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setDeleted(true);
      console.log("skasowano");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    deletePhoto();

    const sendPhoto = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${profile}pf/${id}`, forUpdate);
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log("wysłano");
        setSent(true);
        setChange(true);
      }
    };
    sendPhoto();
  };

  return (
    <>
      {!sent ? (
        <>
          <img src={image} className="pfp-image" />
          <button className="pfp-button" onClick={handleClick}>
            ZAPISZ
          </button>
        </>
      ) : null}
    </>
  );
}
