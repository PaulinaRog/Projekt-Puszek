import React from "react";
import supabase from "../contexts/supabaseClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SitterCard({ name, uuid, description, age, city }) {
  const [src, setSrc] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const urls = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrls([`sitterpf/${uuid}`], 60);

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

  const today = new Date();
  const year = today.getFullYear();

  // FOR TEST
  // const fetchProfile = async () => {
  //   const { data, error } = await supabase
  //     .from("sitter_form")
  //     .select("*")
  //     .eq("uuid", uuid)
  //     .single();
  //   if (error) {
  //     console.log(error);
  //   }
  //   if (data) {
  //     console.log(data);
  //   }
  // };

  return (
    <>
      <div
        className="pet-usercard"
        onClick={(e) => {
          e.preventDefault();
          // fetchProfile();
          navigate(`/care/sitterpf/${uuid}`);
        }}
      >
        <img src={src && src} className="pet-usercard-photo" style={hideImg} />
        <h1 className="pet-usercard-name">{name}</h1>
        <p className="pet-usercard-character" style={showInfo}>
          {description.substring(0, 120) + "..."}
        </p>
        <p style={hideImg}>{city}</p>
        <p style={hideImg}>{year - age}</p>
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
