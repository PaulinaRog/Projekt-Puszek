import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../contexts/supabaseClient";
import HomeRoutLogo from "../landing_page/nav/HomeRoutLogo";
import { NavLink } from "react-router-dom";
import ViewProfile from "./profile/ViewProfile";
import Messages from "./Messages";
import ProfilePhoto from "./profile/ProfilePhoto";
import Notify from "./Notify";
import DeleteProfile from "./profile/DeleteProfile";

export default function Dashboard() {
  const [profileLinks, setProfileLinks] = useState({
    display: "none",
  });
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [notify, setNotify] = useState(null);

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

    if (userInfo) {
      const listenToMessages = () => {
        supabase
          .channel("messages")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "*",
              table: "messages",
              filter: `receiverid=eq.${userInfo.id}`,
            },
            (payload) => {
              console.log("Change received!", payload);
              setNotify(payload);
            }
          )
          .subscribe();
      };
      listenToMessages();
    }
  }, [isLogged]);

  const handleClick = (e) => {
    e.preventDefault();

    const logOut = async () => {
      let { error } = await supabase.auth.signOut();

      if (error) {
        console.log(error);
      }
      setIsLogged(false);
      window.location.reload(false);
      navigate("/signup");
    };
    logOut();
  };

  const updateState = (val) => {
    setNotify(val);
  };

  return (
    <>
      {userInfo && (
        <>
          {isLogged && (
            <>
              <div className="dashboard">
                <HomeRoutLogo />

                <NavLink to="" className="dashboard-navlink">
                  POWIADOMIENIA{" "}
                  {notify ? (
                    <i
                      style={{ color: "#ffff00" }}
                      className="fa-solid fa-message"
                    ></i>
                  ) : null}
                </NavLink>

                <NavLink to="messages" className="dashboard-navlink">
                  WIADOMOŚCI
                </NavLink>

                <NavLink to="/care/sitters" className="dashboard-navlink">
                  PRZEGLĄDAJ
                </NavLink>

                <h3
                  className="dashboard-navlink"
                  onClick={() => setProfileLinks({ display: "block" })}
                >
                  PROFIL
                </h3>

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
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                  WYLOGUJ
                </span>
              </div>
              {pathname === "/dashboard" ? (
                <main className="dashboard-bg">
                  <div className="view-profile-card">
                    {notify ? (
                      <Notify onRead={updateState} notify={notify} />
                    ) : (
                      <p>Nie masz nowych powiadomień</p>
                    )}
                  </div>
                </main>
              ) : null}
              {pathname.includes("view") ? (
                <ViewProfile id={userInfo.id} />
              ) : null}
              {pathname.includes("messages") && <Messages id={userInfo.id} />}
              {pathname.includes("pfp") && <ProfilePhoto />}
              {pathname.includes("deletepf") && (
                <DeleteProfile id={userInfo.id} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
