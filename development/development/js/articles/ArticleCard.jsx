import React, { useState } from "react";
import supabase from "../contexts/supabaseClient";

export default function ArticleCard({
  article: { id, category, title },
  src,
  onDataChange,
}) {
  const [styles, setStyle] = useState({
    display: "none",
  });

  const [articleData, setArticleData] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();

    const getSingleArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, author, article, likes")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error.error_description);
        console.log(error.message);
      }

      if (data) {
        setArticleData(data);
        onDataChange(articleData);
      }
    };
    getSingleArticle();
  };

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <div
        className="card-text-area"
        onMouseOver={() => setStyle({ display: "block" })}
        onMouseLeave={() => setStyle({ display: "none" })}
      >
        <div className="card-text-container">
          <span className="card-category">{category}</span>
          <h1 className="card-title">{title}</h1>
        </div>
        <button className="card-button" style={styles} onClick={handleClick}>
          CZYTAJ
        </button>
      </div>
      <img src={src} className="card-photo" />
    </div>
  );
}
