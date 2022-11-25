import React from "react";
import { NavLink } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <div className="profile-form">
        <aside>
          <button>ZAPISZ</button>
          <NavLink to="/dashboard">
            <button>COFNIJ</button>
          </NavLink>
        </aside>
        <form>
          <h1>UZUPEŁNIJ PROFIL</h1>
          <label>IMIĘ</label>
          <input />
          <label>NAZWISKO</label>
          <input />
          <label>ROK URODZENIA</label>
          <input />
          <label>MIASTO</label>
          <input />
          <label>OPIS</label>
          <input />
          <label>DLACZEGO PODEJMUJESZ SIĘ OPIEKI?</label>
          <input />
        </form>
      </div>
    </>
  );
}
