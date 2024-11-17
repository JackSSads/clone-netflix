import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../../service/firebase";

import Netflix from "../../assets/netflix.png"
import Avatar from "../../assets/avatar.png"

import "./Herdaer.css";

export const Header = ({ color }) => {
    const navigate = useNavigate();

    const auth = getAuth(firebaseConfig);
    const [user, setUser] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [handleLogout, setHandleLogout] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setUser(user.displayName || "Usuário");
            setPhotoURL(user.photoURL || Avatar);
        });

        return () => unsubscribe();
    }, [auth]);

    return (
        <header className={`${color ? 'color' : ''}`}>
            <div className="header--logo ">
                <a onClick={() => navigate("/")}>
                    <img src={Netflix} alt="Netflix"></img>
                </a>
            </div>
            <div className="header--user">
                {handleLogout && (<div className="header--user--logout">
                    <p>{user}</p>
                    <button onClick={() => { auth.signOut(); setHandleLogout(false) }}>Logout</button>
                </div>)}

                {isAuthenticated && (
                    <a onClick={() => setHandleLogout(prev => !prev)}>
                        <img src={photoURL ? photoURL : Avatar} alt="Usuário"></img>
                    </a>
                )}
            </div>
        </header>
    );
};