import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PetsSearch from "./PetsSearch";
import SittersSearch from "./SittersSearch";

export default function SearchEngine({ onHeightChange }) {
  const [style, setStyle] = useState(null);
  const [hide, setHide] = useState(null);
  const [visible, setVisible] = useState({ display: "none" });
  const { pathname } = useLocation();

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
        {pathname.includes("pets") ? <PetsSearch /> : null}
        {pathname.includes("sitters") ? <SittersSearch /> : null}
        <div className="search-button-box">
          <button className="search-button" onClick={handleCancel}>
            ANULUJ
          </button>
          <button className="search-button">SZUKAJ</button>
        </div>
      </div>
    </div>
  );
}
