import React from "react";
import { useState } from "react";
import supabase from "../../contexts/supabaseClient";
import { useRef } from "react";

export default function OrgBasicData({ name, type, id, setFlex }) {
  const [clicked, setClicked] = useState(false);
  const [newName, setNewName] = useState(null);
  const [newType, setNewType] = useState(null);
  const formRef = useRef();
  const [text, setText] = useState(null);
  const [style, setStyle] = useState({ float: "right" });
  const [orgType, setOrgType] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    setStyle(null);
    const getData = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("name, type")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        formRef.current[0].value = data.type;
        formRef.current[1].value = data.name;
      }
    };
    getData();
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (formRef.current[0].value === "" || formRef.current[1].value === "") {
      setText("Pola nie mogą być puste!");
    } else {
      const saveChanges = async () => {
        const { data, error } = await supabase
          .from("organisation")
          .update({
            type: orgType ? orgType : formRef.current[0].value,
            name: formRef.current[1].value,
          })
          .eq("uuid", id)
          .select("type, name");

        if (error) {
          console.log(error);
        }
        if (data) {
          console.log(data);
          setNewName(data[0].name);
          setNewType(data[0].type);
          setClicked(false);
          setText(null);
          setStyle({ float: "right" });
        }
      };
      saveChanges();
    }
  };

  console.log(formRef);

  return (
    <div>
      <>
        {!clicked ? (
          <h1 style={{ textAlign: "center" }}>{`${newType ? newType : type} ${
            newName ? newName : name
          }`}</h1>
        ) : (
          <>
            <form ref={formRef} style={{ display: "grid" }}>
              <label>Rodzaj organizacji:</label>
              <select
                className="pf-select"
                onChange={(e) => {
                  setOrgType(e.target.value);
                }}
              >
                <option value={null}>Wybierz...</option>
                <option>Schronisko</option>
                <option>Fundacja</option>
                <option>Stowarzyszenie</option>
                <option>Dom tymczasowy</option>
              </select>
              <label>Nazwa:</label>
              <input className="pf-text" />
            </form>
            <i className="fa-solid fa-download" onClick={handleSave}></i>
          </>
        )}
        <i
          className="fa-solid fa-pen-to-square"
          onClick={handleClick}
          style={style}
        ></i>
      </>
      {text ? <p className="text-err">{text}</p> : null}
    </div>
  );
}
