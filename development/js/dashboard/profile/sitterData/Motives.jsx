import React from "react";
import { useState, useRef } from "react";
import supabase from "../../../contexts/supabaseClient";

export default function Motives({ motives, id }) {
  const [clicked, setClicked] = useState(false);
  const [newData, setNewData] = useState(null);
  const inputRef = useRef();
  const [text, setText] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    const getData = async () => {
      const { data, error } = await supabase
        .from("sitter_form")
        .select("motives")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        inputRef.current.value = data.motives;
      }
    };
    getData();
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") {
      setText("Pole nie może być puste!");
    } else {
      const saveChanges = async () => {
        const { data, error } = await supabase
          .from("sitter_form")
          .update({ motives: inputRef.current.value })
          .eq("uuid", id)
          .select("motives");

        if (error) {
          console.log(error);
          setText("Nie udało się zapisać zmian");
        }
        if (data) {
          setNewData(data[0].motives);
          setClicked(false);
          setText(null);
        }
      };
      saveChanges();
    }
  };

  return (
    <>
      {motives && (
        <>
          {!clicked ? (
            <p>{!newData ? motives : newData}</p>
          ) : (
            <>
              <textarea ref={inputRef} onChange={(e) => e.targetValue} />{" "}
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
