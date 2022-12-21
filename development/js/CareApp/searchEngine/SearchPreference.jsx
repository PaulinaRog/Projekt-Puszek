import React from "react";
import { useState, useEffect } from "react";

export default function SearchPreference({ setPreference }) {
  const [preferenceClicked, setPreferenceClicked] = useState("");

  const clickedStyle = {
    backgroundColor: "#a4a42ab2",
    boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, 0.627)",
  };

  useEffect(() => {
    setPreference(preferenceClicked);
  }, [preferenceClicked]);

  return (
    <>
      <div>
        <span>Szukasz dla:</span>
        <br />
        <button
          className="search-button"
          value="PSEM"
          style={preferenceClicked === "PSEM" ? clickedStyle : null}
          onClick={(e) => {
            e.preventDefault();
            setPreferenceClicked(e.target.value);
          }}
        >
          PSA
        </button>
        <button
          className="search-button"
          style={preferenceClicked === "KOTEM" ? clickedStyle : null}
          value="KOTEM"
          onClick={(e) => {
            e.preventDefault();
            setPreferenceClicked(e.target.value);
          }}
        >
          KOTA
        </button>
      </div>
    </>
  );
}
