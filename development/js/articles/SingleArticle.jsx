import React, { useState, useRef } from "react";
import supabase from "../contexts/supabaseClient";

//
// function save storage values => localstorage.setItem("id", id)
// i setitem ("likes", likes) => if values match => setStyle to clicked
//
// zwracanie wartości po patchu -> select, zapisać w useState
// renderowanie warunkowe newLikesValue ? newLikesValue.likes : likes
//
// jak ogarnąć te podwójne kliki?
//

export default function ReadArticle({
  sendData: { title, article, author, likes, id },
}) {
  const [like, setLike] = useState(likes);
  const [isClicked, setIsClicked] = useState(false);
  const [newLikesValue, setNewLikesValue] = useState(null);

  const handleClick = () => {
    isClicked ? setLike(like - 1) : setLike(like + 1);
    setIsClicked(!isClicked);

    const likesUpdate = async () => {
      const { data, error } = await supabase
        .from("articles")
        .update({ likes: like })
        .eq("id", id)
        .select("likes")
        .single();

      if (error) {
        console.log(error.error_description);
        console.log(error.message);
      }

      if (data) {
        console.log(data);
        setNewLikesValue(data);
      }
    };
    likesUpdate();
    console.log(isClicked);
  };

  const clickedStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    boxShadow: "-3px -3px 5px rgba(0, 0, 0, 0.611)",
    color: "#ffff00",
  };

  return (
    <>
      <article className="single-article">
        <aside className="single-article-aside">
          <h1 className="single-article-title">{title}</h1>
          <div className="single-article-decor-elem"></div>
          <h3 className="single-article-author">Autor: {author}</h3>
        </aside>
        <main className="single-article-main-content">
          <p className="single-article-text">{article}</p>
          <div className="single-article-likes-box">
            <span className="single-article-likes">
              <i className="fa-solid fa-paw"></i>
              {newLikesValue ? newLikesValue.likes : likes}
            </span>
            <button
              className="single-article-button"
              onClick={handleClick}
              id={id}
              value={isClicked}
              style={isClicked === true ? clickedStyle : null}
            >
              LUBIĘ TO
            </button>
          </div>
        </main>
      </article>
    </>
  );
}
