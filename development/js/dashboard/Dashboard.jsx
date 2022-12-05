import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../contexts/supabaseClient";
import HomeRoutLogo from "../landing_page/nav/HomeRoutLogo";
import { NavLink } from "react-router-dom";
import ViewProfile from "./profile/ViewProfile";
import Messages from "./Messages";

export default function Dashboard() {
  const [profileLinks, setProfileLinks] = useState({
    display: "none",
  });
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const isUserLogged = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
      }
      if (!user) {
        navigate("/signup");
      }
      if (user) {
        setIsLogged(true);
        setUserInfo(user);
      }
    };

    isUserLogged();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    const logOut = async () => {
      let { error } = await supabase.auth.signOut();

      if (error) {
        console.log(error);
      }
      setIsLogged(false);
      console.log("wylogowano");
      window.location.reload(false);
      navigate("/signup");
    };
    logOut();
  };

  return (
    <>
      {isLogged && (
        <>
          <div className="dashboard">
            <HomeRoutLogo />

            <NavLink to="" className="dashboard-navlink">
              POWIADOMIENIA
            </NavLink>

            <NavLink to="messages" className="dashboard-navlink">
              WIADOMOŚCI
            </NavLink>

            <NavLink to="/care" className="care-app-navlink care-nav">
              PRZEGLĄDAJ
            </NavLink>

            <h3
              className="dashboard-navlink"
              onClick={() => setProfileLinks({ display: "block" })}
            >
              PROFIL
            </h3>
            {pathname.includes("msg") && (
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

            <NavLink
              to="viewprofile"
              style={profileLinks}
              className="dashboard-navlink-profile"
            >
              WYŚWIETL PROFIL
            </NavLink>
            <NavLink
              to="pfp"
              style={profileLinks}
              className="dashboard-navlink-profile"
            >
              ZDJĘCIE PROFILOWE
            </NavLink>
            <NavLink
              to="deletepf"
              style={profileLinks}
              className="dashboard-navlink-profile"
            >
              USUŃ PROFIL
            </NavLink>

            <span
              className="dashboard-logout"
              style={{
                position: "absolute",
                bottom: 0,
                padding: "1em",
                fontWeight: 600,
                fontSize: 23,
              }}
              onClick={handleClick}
            >
              WYLOGUJ
            </span>
          </div>
          {pathname === "/dashboard" ? (
            <main className="dashboard-bg"></main>
          ) : null}
          {pathname.includes("view") ? <ViewProfile id={userInfo.id} /> : null}
          {pathname.includes("messages") && <Messages id={userInfo.id} />}
        </>
      )}
    </>
  );
}
