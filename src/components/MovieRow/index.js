import { useState } from "react";
import "./MovieRow.css";

// import dos icones de navegação
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function MovieRow({ title, items }) {

    const [scrollX, setScrollX] = useState(0);


    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);

        if (x > 0) {
            x = 0;
        };

        setScrollX(x);
    };

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        };

        setScrollX(x);
    };

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left">
                <NavigateBeforeIcon style={{ fontSize: 50 }} onClick={handleLeftArrow} />
            </div>
            <div className="movieRow--right">
                <NavigateNextIcon style={{ fontSize: 50 }} onClick={handleRightArrow} />
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            <a href={`/movie/${item.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                    alt={`${item.original_title}`} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};