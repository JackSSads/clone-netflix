import Netflix from "../../assets/netflix.png"
import Avatar from "../../assets/avatar.png"

import "./Herdaer.css";

export default function Header({color}) {
    return (
        <header className={`${color ? 'color' : ''}`}>
            <div className="header--logo ">
                <a href="/">
                    <img src={Netflix} alt="Netflix"></img>
                </a>
            </div>
            <div className="header--user ">
                <a href="/">
                    <img src={Avatar} alt="Usuário"></img>
                </a>
            </div>
        </header>
    );
};