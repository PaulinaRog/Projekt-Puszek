import React from "react";
import { useState, useRef } from "react";
import supabase from "../../../contexts/supabaseClient";

export default function OtherPetsDesc({ otherPetsDesc, id }) {
  const [clicked, setClicked] = useState(false);
  const [newData, setNewData] = useState(null);
  const inputRef = useRef();
  const [text, setText] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    const getData = async () => {
      const { data, error } = await supabase
        .from("owner_form")
        .select("otherPetsDesc")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        inputRef.current.value = data.otherPetsDesc;
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
          .from("owner_form")
          .update({ otherPetsDesc: inputRef.current.value })
          .eq("uuid", id)
          .select("otherPetsDesc");

        if (error) {
          console.log(error);
        }
        if (data) {
          setNewData(data[0].otherPetsDesc);
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
      {otherPetsDesc && (
        <>
          {!clicked ? (
            <p>{!newData ? otherPetsDesc : newData}</p>
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
