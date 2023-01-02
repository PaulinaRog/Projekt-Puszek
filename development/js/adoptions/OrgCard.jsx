import React from "react";
import supabase from "../contexts/supabaseClient";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OrgCard({ name, type, uuid, city, shortDesc }) {
  const [src, setSrc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urls = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrls([`organisationpf/${uuid}`], 60);

      if (error) {
        console.log(error);
      }
      if (data) {
        setSrc(data[0].signedUrl);
      }
    };
    urls();
  }, []);

  const style = {
    position: "absolute",
    bottom: 10,
    right: -8,
  };

  const [hideImg, setHideImg] = useState({
    display: "block",
  });
  const [showInfo, setShowInfo] = useState({
    display: "none",
  });

  const handleMouseOver = () => {
    setHideImg({ display: "none" });
    setShowInfo({ display: "block" });
  };
  const handleMouseLeave = () => {
    setHideImg({ display: "block" });
    setShowInfo({ display: "none" });
  };

  return (
    <>
      <div
        className="usercard"
        onClick={(e) => {
          e.preventDefault();
          // fetchProfile();
          navigate(`/care/orgpf/${uuid}`);
        }}
      >
        <img src={src && src} className="usercard-photo" style={hideImg} />
        <h1
          className="usercard-name"
          style={{ fontSize: 20, textAlign: "center" }}
        >{`${type} ${name}`}</h1>
        <p style={hideImg}>{city}</p>
        <p className="usercard-character" style={showInfo}>
          {shortDesc.substring(0, 120) + "..."}
        </p>
        <i
          className="fa-solid fa-eye"
          style={style}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        ></i>
      </div>
    </>
  );
}
