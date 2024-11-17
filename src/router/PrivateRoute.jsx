import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { firebaseConfig } from "../service/firebase";

import { Loader } from "../components/Loader";

export const PrivateRoute = ({ children }) => {
    const auth = getAuth(firebaseConfig);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        return unsubscribe;
    }, [auth]);

    if (isAuthenticated === null) {
        return <Loader />;
    };

    return isAuthenticated ? children : <Navigate to="/login" />;
};