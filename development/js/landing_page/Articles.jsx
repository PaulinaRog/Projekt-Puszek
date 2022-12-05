import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../contexts/supabaseClient";

function ArticleCards({ articleData: { title, short_desc, id } }) {
  const [styles, setStyle] = useState({
    display: "none",
  });

  return (
    <>
      <div className="article-card">
        <img
          className="article-card-img"
          src={`https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/articles/photos/${id}`}
        />
        <h3 className="article-card-title">{title}</h3>
        <p className="article-card-paragraph">
          {short_desc.substring(0, 200) + " ..."}{" "}
        </p>
      </div>
    </>
  );
}

export default function Articles() {
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, short_desc, category");

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setArticleData(data);
      }
    };
    getArticles();
  }, []);

  return (
    <>
      {articleData && (
        <>
          <section className="articles">
            <div className="articles-background-element"></div>
            <SectionHeader title="ARTYKUŁY" />
            <article className="articles-cards-container">
              <ArticleCards articleData={articleData[3]} />
              <ArticleCards articleData={articleData[2]} />
              <ArticleCards articleData={articleData[1]} />
            </article>
            <NavLink to="articles">
              <button className="articles-button">PRZEJDZ DO ARTYKUŁÓW</button>
            </NavLink>
          </section>
        </>
      )}
    </>
  );
}
