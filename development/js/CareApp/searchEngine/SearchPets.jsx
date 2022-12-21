import React from "react";
import { useState, useEffect } from "react";

export default function SearchPets({ setPets }) {
  const [petsClicked, setPetsClicked] = useState("");

  const clickedStyle = {
    backgroundColor: "#a4a42ab2",
    boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, 0.627)",
  };

  useEffect(() => {
    setPets(petsClicked);
  }, [petsClicked]);

  return (
    <>
      <div>
        <span>Czy może mieć zwierzęta?</span>
        <br />
        <button
          className="search-button"
          style={petsClicked === "TAK" ? clickedStyle : null}
          value="TAK"
          onClick={(e) => {
            e.preventDefault();
            setPetsClicked(e.target.value);
          }}
        >
          TAK
        </button>
        <button
          className="search-button"
          style={petsClicked === "NIE" ? clickedStyle : null}
          value="NIE"
          onClick={(e) => {
            e.preventDefault();
            setPetsClicked(e.target.value);
          }}
        >
          NIE
        </button>
      </div>
    </>
  );
}
