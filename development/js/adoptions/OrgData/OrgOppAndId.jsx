import React from "react";
import { useState } from "react";
import supabase from "../../contexts/supabaseClient";
import { useRef } from "react";

export default function OrgOppAndId({ identification, opp, id }) {
  const [clicked, setClicked] = useState(false);
  const [newId, setNewId] = useState(null);
  const [newOpp, setNewOpp] = useState(null);
  const formRef = useRef();
  const [text, setText] = useState(null);
  const [style, setStyle] = useState({ float: "right" });
  const [org, setOrg] = useState(null);
  const [newData, setNewData] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    setStyle(null);
    const getData = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("identification, opp")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        formRef.current[0].value = data.identification;
        formRef.current[1].value = data.opp;
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
            identification: formRef.current[0].value,
            opp: org ? org : formRef.current[1].value,
          })
          .eq("uuid", id)
          .select("identification, opp");

        if (error) {
          console.log(error);
        }
        if (data) {
          console.log(data);
          setNewId(data[0].identification);
          setNewOpp(data[0].opp);
          setClicked(false);
          setText(null);
          setStyle({ float: "right" });
          setNewData(true);
        }
      };
      saveChanges();
    }
  };

  return (
    <>
      <div>
        {!clicked ? (
          <div style={{ display: "grid" }}>
            <span>KRS: {newId ? newId : identification}</span>
            {newData ? (
              <span>
                {newOpp === false
                  ? "OPP: NIE"
                  : "Organizacja Pożytku Publicznego"}
              </span>
            ) : (
              <span>
                {opp ? "Organizacja Pożytku Publicznego" : "OPP: NIE"}
              </span>
            )}
          </div>
        ) : (
          <>
            <form ref={formRef} style={{ display: "grid" }}>
              <label>KRS:</label>
              <input className="pf-text" />
              <label className="pf-label">OPP:</label>
              <select
                className="pf-select"
                onChange={(e) => {
                  e.preventDefault();
                  setOrg(e.target.value);
                }}
              >
                <option>Wybierz...</option>
                <option value="true">tak</option>
                <option value="false">nie</option>
              </select>
            </form>
            <i className="fa-solid fa-download" onClick={handleSave}></i>
          </>
        )}
        <i
          className="fa-solid fa-pen-to-square"
          onClick={handleClick}
          style={style}
        ></i>
      </div>
      {text ? <p className="text-err">{text}</p> : null}
    </>
  );
}
