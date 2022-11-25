import React from "react";
import { NavLink } from "react-router-dom";
import HomeRoutLogo from "./HomeRoutLogo";

export default function CareApp() {
  return (
    <>
      <NavLink to="/">
        <HomeRoutLogo />
      </NavLink>
    </>
  );
}
