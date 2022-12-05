import React from "react";
import { useEffect, useState } from "react";
import supabase from "../contexts/supabaseClient";

export default function Likes({ id }) {
  const [isClicked, setIsClicked] = useState(false);
  const [likesValue, setLikesValue] = useState(null);

  useEffect(() => {
    const getLikes = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("likes")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setLikesValue(data.likes);
      }
    };
    getLikes();
  }, [id]);

  const updateLikes = async () => {
    const { data, error } = await supabase
      .from("articles")
      .update({ likes: likesValue })
      .eq("id", id);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  const clickedStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    boxShadow: "-3px -3px 5px rgba(0, 0, 0, 0.611)",
    color: "#ffff00",
  };
  return (
    <>
      <div className="single-article-likes-box">
        <span className="single-article-likes">
          <i className="fa-solid fa-paw"></i>
          {likesValue && likesValue}
        </span>
        <button
          className="single-article-button"
          onClick={(e) => {
            e.preventDefault();
            setIsClicked(!isClicked);
            updateLikes();
            !isClicked
              ? setLikesValue(likesValue + 1)
              : setLikesValue(likesValue - 1);
          }}
          id={id}
          value={isClicked}
          style={isClicked ? clickedStyle : null}
        >
          LUBIĘ TO
        </button>
      </div>
    </>
  );
}
