import React from "react";
import { useState } from "react";

export default function SearchType() {
  const [typeClicked, setTypeClicked] = useState("");

  const clickedStyle = {
    backgroundColor: "#a4a42ab2",
    boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, 0.627)",
  };

  return (
    <>
      <div>
        <span>Chcesz się zająć:</span>
        <br />
        <button
          className="search-button"
          style={typeClicked === "PIES" ? clickedStyle : null}
          value="PIES"
          onClick={(e) => {
            e.preventDefault();
            setTypeClicked(e.target.value);
          }}
        >
          PSEM
        </button>
        <button
          className="search-button"
          value="KOT"
          style={typeClicked === "KOT" ? clickedStyle : null}
          onClick={(e) => {
            e.preventDefault();
            setTypeClicked(e.target.value);
          }}
        >
          KOTEM
        </button>
      </div>
    </>
  );
}
