import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import "./style.css";
import { Article } from "./Article";
import { Periode } from "./Periode";
import { Menu } from "./menu/Menu.jsx";
import { getURLStart } from "./getUrl.js";
import { ParamsContext } from "./ParamsContext";

let MAX_PAGES = 10;

const URL_START = getURLStart();

const Loader = () => {
  return <div className="loader"></div>;
};

function App() {
  const [params, setParams] = useState({ mode: 0, param: "" });
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(0);

  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (pages < MAX_PAGES) {
            getArticles(pages);
            setPages((pages) => pages + 1);
          } else {
            setHasMore(false);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    setHasMore(true);
    getArticles(0, params);
    setPages(1);
  }, [params]);

  const getFetchURL = (page, params) => {
    switch (params.mode) {
      case 0:
        return `${URL_START}/api/articles/?page=${page}&size=4`;
      case 1: // artiste
        return `${URL_START}/api/articles/byartiste?artiste=${params.param}&page=${page}&size=4`;
      case 2: // zone
        return `${URL_START}/api/articles/byzone?zone=${params.param}&page=${page}&size=4`;
      case 3: // musique
        return `${URL_START}/api/articles/bymusique?musique=${params.param}&page=${page}&size=4`;
      default:
        break;
    }
  };

  const setArtisteFromCard = (artiste) => {
    setParametreFromCard(1, artiste);
  };

  const setZoneFromCard = (zone) => {
    setParametreFromCard(2, zone);
  };

  const setMusiqueFromCard = (musique) => {
    setParametreFromCard(3, musique);
  };

  const setParametreFromCard = (m, p) => {
    setParams({ mode: m, param: p }); // useEffect
  };

  const getArticles = async (page, params) => {
    setIsLoading(true);
    const urlToFetch = getFetchURL(page, params);
    await fetch(urlToFetch)
      .then((res) => res.json())
      .then((res) => {
        MAX_PAGES = +res.totalPages;
        if (+res.totalPages === +res.currentPage + 1) {
          setHasMore(false);
        }
        if (page === 0) {
          //reload all
          setArticles(res.articles);
        } else {
          setArticles([...articles, ...res.articles]);
        }
        setIsLoading(false);
      });
  };

  let first = true;
  let currentI = 0;
  let listSections = Object.values(
    articles.reduce((acc, item) => {
      acc[item.i] = [...(acc[item.i] || []), item];
      return acc;
    }, {})
  );

  return (
    <>
      <ParamsContext.Provider value={{ params, setParams }}>
        <Menu />
      </ParamsContext.Provider>
      {listSections.map((section, indexSection) => {
        // article.i croissant quand il change, nouvelle section
        let lastSection = indexSection + 1 === listSections.length;
        const keySection = "section" + indexSection;
        return (
          <section className="cards" key={keySection}>
            {section.map((article, indexArticle) => {
              let lastArticle = indexArticle + 1 === section.length;
              let nouvelleSection = false;
              const keyArticle = keySection + "Article" + indexArticle;
              if (first) {
                first = false;
                currentI = article.i;
                nouvelleSection = true;
              } else {
                if (article.i > currentI) {
                  currentI = article.i;
                  nouvelleSection = true;
                }
              }
              if (hasMore && lastSection && lastArticle) {
                if (nouvelleSection) {
                  return (
                    <>
                      <Periode date={getDate(article)} />
                      <Article
                        reference={lastItemRef}
                        article={article}
                        key={keyArticle}
                        setArtisteFromCard={setArtisteFromCard}
                        setZoneFromCard={setZoneFromCard}
                        setMusiqueFromCard={setMusiqueFromCard}
                      />
                    </>
                  );
                } else {
                  return (
                    <Article
                      reference={lastItemRef}
                      article={article}
                      key={keyArticle}
                      setArtisteFromCard={setArtisteFromCard}
                      setZoneFromCard={setZoneFromCard}
                      setMusiqueFromCard={setMusiqueFromCard}
                    />
                  );
                }
              } else {
                if (nouvelleSection) {
                  return (
                    <>
                      <Periode date={getDate(article)} />
                      <Article
                        article={article}
                        key={keyArticle}
                        setArtisteFromCard={setArtisteFromCard}
                        setZoneFromCard={setZoneFromCard}
                        setMusiqueFromCard={setMusiqueFromCard}
                      />
                    </>
                  );
                } else {
                  return (
                    <Article
                      article={article}
                      key={keyArticle}
                      setArtisteFromCard={setArtisteFromCard}
                      setZoneFromCard={setZoneFromCard}
                      setMusiqueFromCard={setMusiqueFromCard}
                    />
                  );
                }
              }
            })}
          </section>
        );
      })}
      {isLoading && <Loader />}
    </>
  );
}

const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
const getMonth = (m) => {
  return monthNames[m - 1];
};
const getDate = (item) => {
  return `${item.d} ${getMonth(item.m)} ${item.a}`;
};

export default App;
