import React, { useState, useEffect } from "react";
import HomeRoutLogo from "../landing_page/nav/HomeRoutLogo";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import supabase from "../contexts/supabaseClient";

function CareAppView({ isLogged }) {
  const { pathname } = useLocation();
  return (
    <>
      <div className="care-app-nav-bg">
        <HomeRoutLogo />
        <nav className="care-app-nav">
          <NavLink to="sitters" className="care-app-navlink care-nav">
            OPIEKUNOWIE
          </NavLink>
          {pathname.includes("sitterpf") && (
            <h3
              style={{
                fontSize: 20,
                paddingLeft: 50,
                borderLeft: "5px solid yellow",
              }}
              className="care-app-navlink care-nav"
            >
              PROFIL
            </h3>
          )}
          <NavLink to="pets" className="care-app-navlink care-nav">
            OGŁOSZENIA
          </NavLink>
        </nav>
        {pathname.includes("petpf") && (
          <h3
            style={{
              fontSize: 20,
              paddingLeft: 50,
              borderLeft: "5px solid yellow",
            }}
            className="care-app-navlink care-nav"
          >
            PROFIL
          </h3>
        )}

        {isLogged ? (
          <NavLink to="/dashboard" className="care-app-signup care-nav">
            PULPIT
          </NavLink>
        ) : (
          <NavLink to="/signup" className="care-app-signup care-nav">
            <i className="fa-solid fa-arrow-right-to-bracket"></i> LOGOWANIE
          </NavLink>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default function CareApp() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const isUserLogged = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
      }
      if (user) {
        setIsLogged(true);
        console.log(user);
      }
    };

    isUserLogged();
  }, []);

  const { pathname } = useLocation();

  return (
    <>
      <CareAppView isLogged={isLogged} />
      {pathname === "/care" ? <main className="care-app"></main> : null}
    </>
  );
}
