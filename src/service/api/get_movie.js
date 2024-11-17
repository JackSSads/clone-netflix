import { API } from "./axiosConfig";

const getAll = async () => {
    try {
        const req = await API.get("/");
        return req.data;
    } catch (error) {
        return error;
    };
};

const getMovieInfo = async (movie_type, movie_id) => {
    try {
        const req = await API.get(`/movie_info/${movie_type}/${movie_id}`);

        return req.data;
    } catch (error) {
        return error;
    };
};

export const GetMovieService = {
    getAll,
    getMovieInfo
};