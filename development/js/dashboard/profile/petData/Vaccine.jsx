import React from "react";
import { useState } from "react";
import supabase from "../../../contexts/supabaseClient";

export default function Vaccine({ vaccine, id }) {
  const [clicked, setClicked] = useState(false);
  const [newData, setNewData] = useState(null);
  const [value, setValue] = useState(null);
  const [text, setText] = useState(null);
  const clickedStyle = {
    backgroundColor: "#a4a42ab2",
    boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, 0.627)",
  };

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
          .update({ vaccine: value })
          .eq("uuid", id)
          .select("vaccine");

        if (error) {
          console.log(error);
        }
        if (data) {
          setNewData(data[0].vaccine);
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
      {vaccine && (
        <>
          {!clicked ? (
            <p>{!newData ? vaccine : newData}</p>
          ) : (
            <>
              <button
                value="TAK"
                style={value === "TAK" ? clickedStyle : null}
                onClick={(e) => {
                  e.preventDefault();
                  setValue(e.target.value);
                }}
              >
                TAK
              </button>
              <button
                value="NIE"
                style={value === "NIE" ? clickedStyle : null}
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
      {text ? <p className="text-err">{text}</p> : null}
    </>
  );
}
