import React from "react";
import { useState } from "react";
import supabase from "../../contexts/supabaseClient";
import { useRef } from "react";

export default function OrgshortDesc({ shortDesc, id }) {
  const [clicked, setClicked] = useState(false);
  const inputRef = useRef();
  const [style, setStyle] = useState({ float: "right" });
  const [newData, setNewData] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    setStyle(null);
    const getData = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("shortDesc")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        inputRef.current.value = data.shortDesc;
      }
    };
    getData();
  };

  const handleSave = (e) => {
    e.preventDefault();
    const saveChanges = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .update({
          shortDesc: inputRef.current.value,
        })
        .eq("uuid", id)
        .select("shortDesc");

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setClicked(false);
        setStyle({ float: "right" });
        setNewData(data[0].shortDesc);
      }
    };
    saveChanges();
  };

  console.log(inputRef);
  return (
    <div>
      <div>
        {!clicked ? (
          <div style={{ display: "grid" }}>
            <h3 style={{ marginTop: 50 }}>OPIS:</h3>
            <p>{newData ? newData : shortDesc}</p>
          </div>
        ) : (
          <>
            <h3>OPIS:</h3>
            <textarea className="pf-textarea" type="text" ref={inputRef} />
            <i className="fa-solid fa-download" onClick={handleSave}></i>
          </>
        )}
        <i
          className="fa-solid fa-pen-to-square"
          onClick={handleClick}
          style={style}
        ></i>
      </div>
    </div>
  );
}
