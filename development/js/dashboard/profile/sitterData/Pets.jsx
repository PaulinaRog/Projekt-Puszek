import React from "react";
import { useState, useRef } from "react";
import supabase from "../../../contexts/supabaseClient";

export default function Pets({ pets, id }) {
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
          .update({ pets: value })
          .eq("uuid", id)
          .select("pets");

        if (error) {
          console.log(error);
        }
        if (data) {
          setNewData(data[0].pets);
          setClicked(false);
          setText(null);
        }
      };
      saveChanges();
    }
  };

  return (
    <>
      {pets && (
        <>
          {!clicked ? (
            <p>{!newData ? pets : newData}</p>
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
      {text ? <p>{text}</p> : null}
    </>
  );
}
