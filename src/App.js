import { useEffect, useState } from "react";

// import do css
import "./App.css"

// import da chamada dos dados
import Tmdb from "./tmdb/Tmdb";

// imports dos componentes
import Header from "./components/Header";
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovie";

import Loading from "./assets/loading.gif"

function App() {

  const [list, setList] = useState([]);
  const [featuredDada, setFeaturedData] = useState();
  const [colorHeader, setColorHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {

      // Lista total
      let list = await Tmdb.getHomeList();
      setList(list);

      // Featured
      let originals = list.filter(i => i.slug === "originals");
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      console.log(chosenInfo);
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setColorHeader(true);
      }
      else {
        setColorHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">
      <Header color={colorHeader} />
      {featuredDada && <FeatureMovie item={featuredDada} />}
      <section className="lists">
        {
          list.map((item, index) => (
            <MovieRow title={item.title} items={item.items} key={index} />
          ))
        }
      </section>
      <footer>
        Feito por<span role={`img`} aria-label="Coração"></span> Jackson Souza
      </footer>

      {list.length <= 0 &&
        <div className="loading">
          <img src={Loading} alt="Carregando" />
        </div>
      }
    </div>
  );
}

export default App;
