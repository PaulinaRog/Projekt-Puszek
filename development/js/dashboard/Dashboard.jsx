import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../contexts/supabaseClient";
import HomeRoutLogo from "../landing_page/nav/HomeRoutLogo";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  const [profileLinks, setProfileLinks] = useState({
    display: "none",
  });
  // const [isLogged, setIsLogged] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const isUserLogged = async () => {
  //     const {
  //       data: { user },
  //       error,
  //     } = await supabase.auth.getUser();

  //     if (error) {
  //       console.log(error);
  //     }
  //     if (!user) {
  //       navigate("/signup");
  //     }

  //     setIsLogged(true);
  //   };

  //   isUserLogged();
  // }, []);

  return (
    // <>
    //   {isLogged && (
    <>
      <div className="dashboard">
        <HomeRoutLogo />

        <NavLink to="" className="dashboard-navlink">
          POWIADOMIENIA
        </NavLink>

        <NavLink to="messages" className="dashboard-navlink">
          WIADOMOŚCI
        </NavLink>

        <NavLink to="favourites" className="dashboard-navlink">
          ULUBIONE
        </NavLink>

        <span
          className="dashboard-navlink"
          onClick={() => setProfileLinks({ display: "block" })}
        >
          PROFIL
        </span>

        <NavLink
          to="/profile/edit"
          style={profileLinks}
          className="dashboard-navlink-profile"
        >
          EDYTUJ PROFIL
        </NavLink>

        <NavLink
          to="/profile/view"
          style={profileLinks}
          className="dashboard-navlink-profile"
        >
          WYŚWIETL PROFIL
        </NavLink>
      </div>
    </>
    //   )}
    // </>
  );
}
