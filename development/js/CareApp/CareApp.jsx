import React from "react";
import HomeRoutLogo from "../landing_page/nav/HomeRoutLogo";
import { NavLink, Outlet, useLocation } from "react-router-dom";

function CareAppView() {
  return <main className="care-app"></main>;
}

export default function CareApp() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="care-app-nav-bg">
        <HomeRoutLogo />
        <nav className="care-app-nav">
          <NavLink to="sitters" className="care-app-navlink care-nav">
            OPIEKUNOWIE
          </NavLink>
          {/* profil opiekuna na kliku */}
          <NavLink to="pets" className="care-app-navlink care-nav">
            OGŁOSZENIA
          </NavLink>
        </nav>
        {/* profil pupila na kliku */}
        <NavLink to="/signup" className="care-app-signup care-nav">
          LOGOWANIE
        </NavLink>
      </div>
      <Outlet />
      {!pathname.includes("sitters") && !pathname.includes("pets") ? (
        <CareAppView />
      ) : null}
    </>
  );
}
