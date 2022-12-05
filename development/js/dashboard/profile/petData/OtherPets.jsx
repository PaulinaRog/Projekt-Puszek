import React from "react";
import { useState, useRef } from "react";
import supabase from "../../../contexts/supabaseClient";

export default function PetCharacter({ otherPets, id }) {
  const [clicked, setClicked] = useState(false);
  const [newData, setNewData] = useState(null);
  const [value, setValue] = useState(null);
  const [text, setText] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (value === null) {
      setText("Wybierz jedną z opcji!");
    } else {
      const saveChanges = async () => {
        const { data, error } = await supabase
          .from("owner_form")
          .update({ otherPets: value })
          .eq("uuid", id)
          .select("otherPets");

        if (error) {
          console.log(error);
        }
        if (data) {
          setNewData(data[0].otherPets);
          console.log(data);
          setClicked(false);
          console.log(newData);
          setText(null);
        }
      };
      saveChanges();
    }
  };

  return (
    <>
      {otherPets && (
        <>
          {!clicked ? (
            <p>{!newData ? otherPets : newData}</p>
          ) : (
            <>
              <button
                value="TAK"
                onClick={(e) => {
                  e.preventDefault();
                  setValue(e.target.value);
                }}
              >
                TAK
              </button>
              <button
                value="NIE"
                onClick={(e) => {
                  e.preventDefault();
                  setValue(e.target.value);
                }}
              >
                NIE
              </button>
              <i className="fa-solid fa-download" onClick={handleSave}></i>
            </>
          )}
          <i className="fa-solid fa-pen-to-square" onClick={handleClick}></i>
        </>
      )}
      {text && <p>{text}</p>}
    </>
  );
}
