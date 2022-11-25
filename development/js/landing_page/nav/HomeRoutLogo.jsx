import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function HomeRoutLogo() {
  const { pathname } = useLocation();

  const style = {
    padding: "1em 1em",
  };

  return (
    <NavLink to="/">
      <img
        className="header_logo"
        src="../../development/assets/puszek_logo_vertical.png"
        alt="logo-home page link"
        style={
          !(pathname === "/" || pathname.includes("articles")) ? style : null
        }
      />
    </NavLink>
  );
}
