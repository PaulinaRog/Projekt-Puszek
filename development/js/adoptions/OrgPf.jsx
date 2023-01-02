import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../contexts/supabaseClient";
import SendMessage from "../CareApp/SendMessage";

export default function OrgPf() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const [src, setSrc] = useState(null);
  const [loggedInfo, setLoggedInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  function createMarkup() {
    return { __html: userData ? userData.desc : null };
  }

  useEffect(() => {
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("*")
        .eq("uuid", id)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        setUserData(data);
      }
    };
    getProfile();

    const urls = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrls([`organisationpf/${id}`], 60);

      if (error) {
        console.log(error);
      }
      if (data) {
        setSrc(data[0].signedUrl);
      }
    };
    urls();

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
        setLoggedInfo(user);
      }
    };

    isUserLogged();
  }, []);

  return (
    <>
      {userData && (
        <>
          <div className="view-profile-org">
            <div className="view-profile-card">
              <div className="profile-data-container">
                <div className="view-profile-basic-data-and-photo">
                  <img src={src && src} className="view-usercard-photo" />
                  <div className="view-profile-basic-data">
                    <h1>{`${userData.type} ${userData.name}`}</h1>
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                        fontSize: 25,
                      }}
                    >
                      {userData.city}
                    </span>
                    <span>
                      {userData.identification
                        ? `KRS: ${userData.identification}`
                        : null}
                    </span>
                    <span>
                      {userData.opp === true
                        ? "Organizacja Pożytku Publicznego"
                        : null}
                    </span>
                    <div>
                      {userData.cats ? (
                        <i
                          style={{ fontSize: 30 }}
                          className="fa-solid fa-cat"
                        ></i>
                      ) : null}
                      {userData.dogs ? (
                        <i
                          style={{ fontSize: 30 }}
                          className="fa-solid fa-dog"
                        ></i>
                      ) : null}
                      {userData.birds ? (
                        <i
                          style={{ fontSize: 30 }}
                          className="fa-solid fa-dove"
                        ></i>
                      ) : null}
                      {userData.rodents ? (
                        <i
                          style={{ fontSize: 30 }}
                          className="fa-solid fa-otter"
                        ></i>
                      ) : null}
                      {userData.all ? (
                        <i
                          style={{ fontSize: 30 }}
                          className="fa-solid fa-paw"
                        ></i>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="view-profile-decor"></div>
                <div
                  style={{
                    display: "flex",
                    gap: "7%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div>
                    <h3>
                      {userData.phone || userData.email
                        ? `Dane kontaktowe:`
                        : null}
                    </h3>
                    <p>{userData.phone ? `Tel: ${userData.phone}` : null}</p>
                    <p>{userData.email ? `E-mail: ${userData.email}` : null}</p>
                  </div>
                  <div>
                    <h3>Dane adresowe:</h3>
                    <p>{userData.address}</p>
                    <p>{`${userData.zipCode} ${userData.city}`}</p>
                    <p>{userData.voivodeship}</p>
                  </div>
                  <div>
                    <h3>
                      {userData.facebook || userData.instagram || userData.www
                        ? `Linki:`
                        : null}
                    </h3>
                    <div style={{ display: "flex", gap: 20, fontSize: 30 }}>
                      {userData.facebook ? (
                        <a
                          href={userData.facebook}
                          className="view-profile-links"
                        >
                          <i className="fa-brands fa-square-facebook"></i>
                        </a>
                      ) : null}
                      {userData.instagram ? (
                        <a
                          href={userData.instagram}
                          className="view-profile-links"
                        >
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                      ) : null}
                      {userData.www ? (
                        <a href={userData.www} className="view-profile-links">
                          <i className="fa-solid fa-globe"></i>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div
                  className="view-profile-decor"
                  style={{ marginTop: "3em" }}
                ></div>
                <h3>{`${userData.type} zajmuje się:`}</h3>
                <div>
                  <span>{userData.cats ? "kotami, " : null}</span>
                  <span>{userData.dogs ? "psami, " : null}</span>
                  <span>{userData.birds ? "ptakami, " : null}</span>
                  <span>{userData.rodents ? "gryzoniami, " : null}</span>
                  <span>{userData.all ? "wszystkimi zwierzakami " : null}</span>
                </div>
                <h3 style={{ marginTop: 50 }}>OPIS:</h3>
                <p>{userData.shortDesc}</p>
                <div
                  dangerouslySetInnerHTML={createMarkup()}
                  style={{ marginTop: 50 }}
                ></div>
              </div>
              {isLogged && isLogged ? (
                <SendMessage loggedInfo={loggedInfo} userData={userData} />
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}
