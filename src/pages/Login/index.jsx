import { useState } from "react";

import {
    getAuth, signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup,
    createUserWithEmailAndPassword,
} from "firebase/auth";

import { firebaseConfig } from "../../service/firebase"
import { useNavigate } from "react-router-dom";

import bg_netflix from "../../assets/bg_netflix.jpg"
import "./Login.css";

export const Login = () => {
    const auth = getAuth(firebaseConfig);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [screen, setScreen] = useState(true);

    const navigate = useNavigate();

    const handleLogin = async (screen) => {
        if (!email || !password || password.length < 6) {
            return alert("Preencha os campos corretamente");
        };

        if (screen) {
            // true = login
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/");
            } catch (error) {
                if (error.message === "Firebase: Error (auth/invalid-credential).") {
                    return alert("E-mail ou senha inválidos");
                };
                alert("Erro ao fazer login: " + error.message);
            };
        } else {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                navigate("/");
            } catch (error) {
                if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                  return alert("E-mail já cadastrado");
                };
                alert("Erro ao criar conta");
            };
        };
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            alert("Erro ao fazer login com Google: " + error.message);
        };
    };

    return (
        <div className="login--container"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${bg_netflix})`,
            }}>
            <div className="login--content">
                <h2>{screen? "Entrar" : "Crie sua conta"}</h2>
                <div className="login--input">
                    <label htmlFor="email">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-mail ou número de telefone"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>

                <button className="login--button" onClick={() => handleLogin(screen)}>{screen ? "Entrar" : " Criar conta"}</button>

                <div className="login--remember">
                    <label htmlFor="remember">
                        <input type="checkbox" />
                        Lembre-se de mim
                    </label>

                    <button onClick={() => setScreen(prev => !prev)}>{screen? "Criar conta" : "Já tem uma conta?"}</button>
                </div>

                <div className="login--signup">
                    <button onClick={handleGoogleLogin} >Conecte com o Google</button>
                </div>
            </div>
        </div>
    );
};