import React from "react";
import { useState } from "react";

export default function SearchOtherPets() {
  const [otherPetsClicked, setOtherPetsClicked] = useState("");

  const clickedStyle = {
    backgroundColor: "#a4a42ab2",
    boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, 0.627)",
  };

  return (
    <>
      <div>
        <span>Czy masz zwierzęta:</span>
        <br />
        <button
          className="search-button"
          value="TAK"
          style={otherPetsClicked === "TAK" ? clickedStyle : null}
          onClick={(e) => {
            e.preventDefault();
            setOtherPetsClicked(e.target.value);
          }}
        >
          TAK
        </button>
        <button
          className="search-button"
          value="NIE"
          style={otherPetsClicked === "NIe" ? clickedStyle : null}
          onClick={(e) => {
            e.preventDefault();
            setOtherPetsClicked(e.target.value);
          }}
        >
          NIE
        </button>
      </div>
    </>
  );
}
