import React from "react";
import { NavLink } from "react-router-dom";

export default function HomeRoutLogo() {
  return (
    <NavLink to="/">
      <img
        className="header_logo"
        src={require("../../../assets/puszek_logo_vertical.png")}
        alt="logo-home page link"
      />
    </NavLink>
  );
}
