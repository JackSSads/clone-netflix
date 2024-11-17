import { Routes, Route, Navigate } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";

import { Home, DetailsMovie, Login } from "../pages";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />

            <Route path="/login" element={<Login />} />

            <Route path={"/:movie_type/:movie_id"} element={
                <PrivateRoute>
                    <DetailsMovie />
                </PrivateRoute>
            } />

            <Route path="*" element={
                <PrivateRoute>
                    <Navigate to={"/"} />
                </PrivateRoute>
            } />
        </Routes>
    );
};