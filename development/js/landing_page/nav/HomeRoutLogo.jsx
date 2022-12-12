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
        src="https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/logos/puszek_logo_vertical.png"
        alt="logo home page link"
        style={
          !(
            pathname === "/" ||
            pathname.includes("articles") ||
            pathname.includes("contact")
          )
            ? style
            : null
        }
      />
    </NavLink>
  );
}
