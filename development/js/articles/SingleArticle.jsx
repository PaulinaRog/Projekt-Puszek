import React, { useState } from "react";
import supabase from "../contexts/supabaseClient";
import Likes from "./Likes";

export default function ReadArticle({ sendData }) {
  const { title, article, author, likes, id } = sendData;
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
          {sendData && <Likes likes={likes} id={id} />}
        </main>
      </article>
    </>
  );
}
