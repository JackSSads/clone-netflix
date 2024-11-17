import { useCallback, useEffect, useState } from "react";

import { FeatureMovie, MovieRow } from "../../components";
import { GetMovieService } from "../../service/api/get_movie";
import { Loader } from "../../components/Loader";

import "./Home.css"

export const Home = () => {
  const [list, setList] = useState([]);
  const [featuredDada, setFeaturedData] = useState();

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = useCallback( async () => {
    // Lista total
    let list = await GetMovieService.getAll()
    setList(list);

    // Featured
    let originals = list.filter(i => i.slug === "originals");
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await GetMovieService.getMovieInfo('tv', chosen.id);

    setFeaturedData(chosenInfo);
  }, []);

  return (
    <div className="page">
      {featuredDada && <FeatureMovie item={featuredDada} />}
      <section className="lists">
        {list.map((item, index) => (
          <MovieRow title={item.title} items={item.items} key={index} />
        ))}
      </section>
      <footer>
        Feito por<span role={`img`} aria-label="Coração"></span> Jackson Souza
      </footer>

      {list.length <= 0 &&
        <div className="loading">
          <Loader />
        </div>
      }
    </div>
  );
};
