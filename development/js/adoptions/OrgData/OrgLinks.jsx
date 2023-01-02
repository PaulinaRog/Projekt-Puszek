import React from "react";
import { useState } from "react";
import supabase from "../../contexts/supabaseClient";
import { useRef } from "react";

export default function OrgLinks({ facebook, instagram, www, id }) {
  const [clicked, setClicked] = useState(false);
  const formRef = useRef();
  const [style, setStyle] = useState({ float: "right" });
  const [newFacebook, setNewFacebook] = useState(null);
  const [newInstagram, setNewInstagram] = useState(null);
  const [newWww, setNewWww] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    setStyle(null);
    const getData = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("facebook, instagram, www")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        formRef.current[0].value = data.facebook;
        formRef.current[1].value = data.instagram;
        formRef.current[2].value = data.www;
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
          facebook: formRef.current[0].value,
          instagram: formRef.current[1].value,
          www: formRef.current[2].value,
        })
        .eq("uuid", id)
        .select("facebook, instagram, www");

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setNewFacebook(data[0].facebook);
        setNewInstagram(data[0].instagram);
        setNewWww(data[0].www);
        setClicked(false);
        setStyle({ float: "right" });
      }
    };
    saveChanges();
  };

  console.log(formRef);

  return (
    <div>
      <div>
        {!clicked ? (
          <div style={{ display: "grid" }}>
            <h3>Linki:</h3>
            <div style={{ display: "flex", gap: 20, fontSize: 30 }}>
              <a
                href={newFacebook ? newFacebook : facebook}
                className="view-profile-links"
              >
                <i className="fa-brands fa-square-facebook"></i>
              </a>
              <a
                href={newInstagram ? newInstagram : instagram}
                className="view-profile-links"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href={newWww ? newWww : www} className="view-profile-links">
                <i className="fa-solid fa-globe"></i>
              </a>
            </div>
          </div>
        ) : (
          <>
            <form ref={formRef} style={{ display: "grid" }}>
              <div style={{ display: "grid" }}>
                <h3>Linki:</h3>
                <label className="pf-label">Facebook:</label>
                <input type="text" className="pf-text" placeholder="https://" />
              </div>
              <div style={{ display: "grid" }}>
                <label className="pf-label">Instagram:</label>
                <input type="text" className="pf-text" placeholder="https://" />
              </div>
              <div style={{ display: "grid" }}>
                <label className="pf-label">www:</label>
                <input type="text" className="pf-text" placeholder="https://" />
              </div>
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
    </div>
  );
}
