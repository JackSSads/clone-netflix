import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetMovieService } from "../../service/api/get_movie";
import { Loader } from "../../components/Loader";

import "./Details.css"

export const DetailsMovie = () => {
    const navigate = useNavigate();
    const { movie_id, movie_type } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        get_movie();
    }, []);

    const get_movie = useCallback(() => {
        GetMovieService.getMovieInfo(movie_type, movie_id)
            .then(res => {
                if (res.name === "AxiosError") {
                    return navigate("/");
                };
                setMovie(res);
            });
    }, []);

    return (
        <>{movie ? (
            <session className="featured"
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}>
                <div className="featured--vertical">
                    <div className="featured--horizontal">
                        <div className="featured--name">{movie.title || movie.original_title}</div>
                        <div className="featured--info">
                            <div className="featured--points">{movie.vote_average} pontos</div>
                            <div className="featured--seasons">{movie.number_of_seasons} temporada{movie.number_of_seasons !== 1 ? 's' : ''}</div>
                        </div>
                        <div className="featured--description">{movie.overview}</div>
                        <div className="featured--genres"><strong>Gênero:</strong> </div>
                    </div>
                </div>
            </session>
        ) : (
            <Loader />
        )}
        </>
    );
};