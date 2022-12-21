import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchPets from "./SearchPets";
import SearchCity from "./SearchCity";
import SearchOtherPets from "./SearchOtherPets";
import SearchType from "./SearchType";
import { Link } from "react-router-dom";
import SearchPreference from "./SearchPreference";

export default function SearchEngine({ onHeightChange }) {
  const [style, setStyle] = useState(null);
  const [hide, setHide] = useState(null);
  const [visible, setVisible] = useState({ display: "none" });
  const { pathname } = useLocation();
  const [parentCity, setParentCity] = useState(null);
  const [type, setType] = useState(null);
  const [otherPets, setOtherPets] = useState(null);
  const [preference, setPreference] = useState(null);
  const [pets, setPets] = useState(null);

  useEffect(() => {
    onHeightChange(hide);
  }, [hide]);

  const handleClick = (e) => {
    e.preventDefault();
    setHide({ display: "none" });
    setStyle({ animation: "expand linear 1s", height: 500 });
    setVisible({ animation: "appear ease-out 1.5s", display: "flex" });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setStyle((prev) => ({
      ...prev,
      animation: "hide linear 0.3s",
      height: 25,
    }));
    setVisible({ display: "none" });
    setHide((prev) => ({
      ...prev,
      animation: "appear ease-out 2s",
      display: "flex",
    }));
  };

  return (
    <div className="search" style={style}>
      <h1 onClick={handleClick} className="search-header">
        FILTRUJ <i className="fa-solid fa-caret-down"></i>
      </h1>
      <div style={visible} className="search-box">
        {pathname.includes("pets") ? (
          <>
            <SearchCity setParentCity={setParentCity} />
            <SearchType setType={setType} />
            <SearchOtherPets setOtherPets={setOtherPets} />
          </>
        ) : null}
        {pathname.includes("sitters") ? (
          <>
            <SearchCity setParentCity={setParentCity} />
            <SearchPreference setPreference={setPreference} />
            <SearchPets setPets={setPets} />
          </>
        ) : null}
        <div className="search-button-box">
          <button className="search-button" onClick={handleCancel}>
            ANULUJ
          </button>
          <Link
            to={`${pathname.includes("pets") ? "searchpets" : "searchsitters"}`}
            state={{
              parentCity: parentCity,
              type: type,
              otherPets: otherPets,
              preference: preference,
              pets: pets,
            }}
          >
            <button className="search-button">SZUKAJ</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
