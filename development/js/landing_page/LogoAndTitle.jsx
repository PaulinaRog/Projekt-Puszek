import React from "react";

export default function LogoAndTitle() {
  return (
    <>
      <div className="header_logo-background">
        <img
          className="header_logo-background-logo"
          src="../development/assets/puszek_logo.png"
          alt="logo"
        />
      </div>
      <h1 className="banner_title">
        Twoja alternatywa dla drogich hoteli dla zwierząt
      </h1>
      <h2 className="banner_text">Nie pobieramy opłat za pośrednictwo</h2>
    </>
  );
}
