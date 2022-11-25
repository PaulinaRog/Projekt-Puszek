import React, { useState, useEffect } from "react";
import NavButtons from "../landing_page/nav/NavButtons";
import supabase from "../contexts/supabaseClient";
import ArticleCard from "./ArticleCard";
import ReadArticle from "./SingleArticle";

const cats = [
  "../development/assets/british-cat.jpg",
  "../development/assets/cat-and-a-book.jpg",
  "../development/assets/ginger-cat.jpg",
  "../development/assets/kitten.jpg",
];

const dogs = [
  "../development/assets/bullie-in-flowers.jpg",
  "../development/assets/dog-peekaboo.jpg",
  "../development/assets/doggie-in-winter.jpg",
  "../development/assets/frenchie-smiling.jpg",
];

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

  let i = 0;
  let j = 0;

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
                  src={article.category === "PSY" ? dogs[i++] : cats[j++]}
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
