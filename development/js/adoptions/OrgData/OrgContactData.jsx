import React from "react";
import { useState } from "react";
import supabase from "../../contexts/supabaseClient";
import { useRef } from "react";

export default function OrgContactData({ phone, email, id }) {
  const [clicked, setClicked] = useState(false);
  const formRef = useRef();
  const [style, setStyle] = useState({ float: "right" });
  const [newPhone, setNewPhone] = useState(null);
  const [newEmail, setNewEmail] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    setStyle(null);
    const getData = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("phone, email")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        formRef.current[0].value = data.phone;
        formRef.current[1].value = data.email;
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
          phone: formRef.current[0].value,
          email: formRef.current[1].value,
        })
        .eq("uuid", id)
        .select("phone, email");

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setNewPhone(data[0].phone);
        setNewEmail(data[0].email);
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
            <div>
              <h3>Dane kontaktowe:</h3>
              <p>Tel: {newPhone ? newPhone : phone}</p>
              <p>E-mail: {newEmail ? newEmail : email}</p>
            </div>
          </div>
        ) : (
          <>
            <form ref={formRef} style={{ display: "grid" }}>
              <h3>Dane kontaktowe:</h3>
              <label className="pf-label">Nr telefonu:</label>
              <input type="text" className="pf-text" />
              <label className="pf-label">E-mail:</label>
              <input type="text" className="pf-text" />
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
