import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoProfile() {
  const navigate = useNavigate();

  return (
    <div>
      <p style={{ marginBottom: 20 }}>Nie znaleziono profilu</p>
      <p>Jeśli masz profil, poczekaj na jego załadowanie. Jeśli nie -</p>
      <p style={{ marginBottom: 20 }}>
        Kliknij tutaj, żeby przejść do uzupełniania danych:
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate("/setprofile");
        }}
      >
        PROFIL
      </button>
    </div>
  );
}
