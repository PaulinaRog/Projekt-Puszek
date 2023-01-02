import React from "react";
import { useState } from "react";
import supabase from "../../contexts/supabaseClient";
import { useRef } from "react";
import { cities } from "../../cities/cities";

export default function OrgAddressData({
  address,
  city,
  voivodeship,
  zipCode,
  id,
}) {
  const [clicked, setClicked] = useState(false);
  const formRef = useRef();
  const [style, setStyle] = useState({ float: "right" });
  const [newAddress, setNewAddress] = useState(null);
  const [newCity, setNewCity] = useState(null);
  const [newVoivodeship, setNewVoivodeship] = useState(null);
  const [newZipCode, setNewZipCode] = useState(null);
  const [voi, setVoi] = useState(null);
  const [cty, setCty] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    setStyle(null);
    const getData = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("address, city, voivodeship, zipCode")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        formRef.current[0].value = data.address;
        formRef.current[1].value = data.zipCode;
        formRef.current[2].value = data.city;
        formRef.current[3].value = data.voivodeship;
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
          address: formRef.current[0].value,
          zipCode: formRef.current[1].value,
          city: cty ? cty : formRef.current[2].value,
          voivodeship: voi ? voi : formRef.current[3].value,
        })
        .eq("uuid", id)
        .select("address, zipCode, city, voivodeship");

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setNewAddress(data[0].address);
        setNewZipCode(data[0].zipCode);
        setNewCity(data[0].city);
        setNewVoivodeship(data[0].voivodeship);
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
              <h3>Dane adresowe:</h3>
              <p>{newAddress ? newAddress : address}</p>
              <p>{`${newZipCode ? newZipCode : zipCode} ${
                newCity ? newCity : city
              }`}</p>
              <p>{newVoivodeship ? newVoivodeship : voivodeship}</p>
            </div>
          </div>
        ) : (
          <>
            <form ref={formRef} style={{ display: "grid" }}>
              <h3>Dane adresowe:</h3>
              <label className="pf-label">Ulica i nr budynku:</label>
              <input type="text" className="pf-text" />
              <label className="pf-label">Kod pocztowy:</label>
              <input type="text" className="pf-text" />
              <label className="pf-label">Miasto:</label>
              <select
                className="pf-select"
                onChange={(e) => {
                  e.preventDefault();
                  setCty(e.target.value);
                }}
              >
                <option className="pf-option">Wybierz...</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
              <label className="pf-label">Województwo:</label>
              <select
                className="pf-select"
                onChange={(e) => {
                  e.preventDefault();
                  setVoi(e.target.value);
                }}
              >
                <option>Wybierz...</option>
                <option>dolnośląskie</option>
                <option>kujawsko-pomorskie</option>
                <option>lubelskie</option>
                <option>lubuskie</option>
                <option>łódzkie</option>
                <option>małopolskie</option>
                <option>mazowieckie</option>
                <option>opolskie</option>
                <option>podkarpackie</option>
                <option>podlaskie</option>
                <option>pomorskie</option>
                <option>śląskie</option>
                <option>świętokrzyskie</option>
                <option>warmińsko-mazurskie</option>
                <option>wielkopolskie</option>
                <option>zachodniopomorskie</option>
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
    </div>
  );
}
