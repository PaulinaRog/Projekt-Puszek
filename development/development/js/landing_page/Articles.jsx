import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { NavLink } from "react-router-dom";

function ArticleCards({ title, img, text }) {
  const [styles, setStyle] = useState({
    display: "none",
  });

  return (
    <div
      className="article-card"
      onMouseOver={() => setStyle({ display: "block" })}
      onMouseLeave={() => setStyle({ display: "none" })}
    >
      <img className="article-card-img" src={img} />
      <h3 className="article-card-title">{title}</h3>
      <p className="article-card-paragraph">{text} </p>
      <button className="article-card-btn" style={styles}>
        CZYTAJ
      </button>
    </div>
  );
}

export default function Articles() {
  return (
    <>
      <section className="articles">
        <div className="articles-background-element"></div>
        <SectionHeader title="ARTYKUŁY" />
        <article className="articles-cards-container">
          <ArticleCards
            img="../development/assets/bulldog-on-a-chair.jpg"
            title="LOREM IPSUM DOLOR SIT"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
          <ArticleCards
            img="../development/assets/main-coon.jpg"
            title="LOREM IPSUM DOLOR SIT"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
          <ArticleCards
            img="../development/assets/tricolor-cat.jpg"
            title="LOREM IPSUM DOLOR SIT"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
        </article>

        <NavLink to="articles">
          <button className="articles-button">PRZEJDZ DO ARTYKUŁÓW</button>
        </NavLink>
      </section>
    </>
  );
}
