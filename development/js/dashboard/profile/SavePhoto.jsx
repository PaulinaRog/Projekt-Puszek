import { useState } from "react";
import React from "react";
import supabase from "../../contexts/supabaseClient";

export default function SavePhoto({ image, id, profile, forUpdate }) {
  const [deleted, setDeleted] = useState(false);

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
      }
    };
    sendPhoto();
  };

  return (
    <>
      <img src={image} className="pfp-image" />
      <button className="pfp-button" onClick={handleClick}>
        ZAPISZ
      </button>
    </>
  );
}
