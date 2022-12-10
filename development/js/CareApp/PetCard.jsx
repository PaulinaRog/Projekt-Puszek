import React from "react";
import supabase from "../contexts/supabaseClient";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PetCard({ petName, uuid, character, city }) {
  const [src, setSrc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPhoto = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(`petpf/${uuid}`);
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
    };
    getPhoto();

    const urls = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrls([`petpf/${uuid}`], 60);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data[0].signedUrl);
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

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("owner_form")
      .select("*")
      .eq("uuid", uuid)
      .single();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  return (
    <>
      <div
        className="pet-usercard"
        onClick={(e) => {
          e.preventDefault();
          fetchProfile();
          navigate(`/care/petpf/${uuid}`);
        }}
      >
        <img src={src && src} className="pet-usercard-photo" style={hideImg} />
        <h1 className="pet-usercard-name">{petName}</h1>
        <p style={hideImg}>{city}</p>
        <p className="pet-usercard-character" style={showInfo}>
          {character.substring(0, 120) + "..."}
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
