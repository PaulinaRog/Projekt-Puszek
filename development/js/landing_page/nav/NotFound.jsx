import React from "react";
import HomeRoutLogo from "./homeRoutLogo";

export default function NotFound() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
      }}
    >
      <span style={{ fontSize: 300 }}>404</span>
      <span
        style={{
          fontSize: 100,
          marginTop: 30,
          marginBottom: 100,
        }}
      >
        Page not found
      </span>
      <span style={{ fontSize: 20, marginBottom: 20 }}>
        Kliknij, żeby przejść do strony głównej:
      </span>
      <HomeRoutLogo />
    </section>
  );
}
