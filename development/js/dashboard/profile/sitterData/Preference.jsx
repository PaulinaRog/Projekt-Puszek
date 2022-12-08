import React from "react";
import { useState, useRef } from "react";
import supabase from "../../../contexts/supabaseClient";

export default function Preference({ preference, id }) {
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
          .from("sitter_form")
          .update({ preference: value })
          .eq("uuid", id)
          .select("preference");

        if (error) {
          console.log(error);
        }
        if (data) {
          setNewData(data[0].preference);
          setClicked(false);
          setText(null);
        }
      };
      saveChanges();
    }
  };

  return (
    <>
      {preference && (
        <>
          {!clicked ? (
            <p>{!newData ? preference : newData}</p>
          ) : (
            <>
              <button
                value="PSEM"
                onClick={(e) => {
                  e.preventDefault();
                  setValue(e.target.value);
                }}
              >
                PSEM
              </button>
              <button
                value="KOTEM"
                onClick={(e) => {
                  e.preventDefault();
                  setValue(e.target.value);
                }}
              >
                KOTEM
              </button>
              <button
                value="OBOJĘTNE"
                onClick={(e) => {
                  e.preventDefault();
                  setValue(e.target.value);
                }}
              >
                OBOJĘTNE
              </button>
              <i className="fa-solid fa-download" onClick={handleSave}></i>
            </>
          )}
          <i className="fa-solid fa-pen-to-square" onClick={handleClick}></i>
        </>
      )}
      {text ? <p>{text}</p> : null}
    </>
  );
}
