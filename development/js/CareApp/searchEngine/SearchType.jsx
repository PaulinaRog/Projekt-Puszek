import React, { useEffect } from "react";
import { useState } from "react";

export default function SearchType({ setType }) {
  const [typeClicked, setTypeClicked] = useState("");

  const clickedStyle = {
    backgroundColor: "#a4a42ab2",
    boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, 0.627)",
  };

  useEffect(() => {
    setType(typeClicked);
  }, [typeClicked]);

  const handleClick = (e) => {
    e.preventDefault();
    setTypeClicked(e.target.value);
  };

  return (
    <>
      <div>
        <h3>Chcesz się zająć:</h3>
        <button
          className="search-button"
          style={typeClicked === "PIES" ? clickedStyle : null}
          value="PIES"
          onClick={handleClick}
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
