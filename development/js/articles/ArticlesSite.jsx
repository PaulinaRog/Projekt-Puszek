import React, { useState, useEffect } from "react";
import NavButtons from "../landing_page/nav/NavButtons";
import supabase from "../contexts/supabaseClient";
import ArticleCard from "./ArticleCard";
import ReadArticle from "./SingleArticle";

export default function ArticlesSite() {
  const [articlesData, setArticlesData] = useState(null);
  const [dataFromArticle, setDataFromArticle] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(`id, category, title`);

      if (error) {
        console.log(error.error_description);
        console.log(error.message);
      }

      if (data) {
        setArticlesData(data);
      }
    };
    getArticles();
  }, []);

  const getData = (values) => {
    setDataFromArticle(values);
  };

  return (
    <>
      <div className="articles-background">
        <div className="articles-nav-buttons-bg">
          <NavButtons />
        </div>
        <section className="articles-container">
          {articlesData &&
            articlesData.map((article) => {
              return (
                <ArticleCard
                  key={article.id}
                  article={article}
                  src={`https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/articles/photos/${article.id}`}
                  onDataChange={getData}
                />
              );
            })}
        </section>
        {dataFromArticle && <ReadArticle sendData={dataFromArticle} />}
      </div>
    </>
  );
}
