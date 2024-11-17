import { useEffect, useState } from "react";

import { Header } from "../components"

export const LayoutBase = ({ children }) => {
    const [colorHeader, setColorHeader] = useState(false);

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setColorHeader(true);
            } else {
                setColorHeader(false);
            };
        };

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, []);

    return (
        <>
            <Header color={colorHeader} />
            {children}
        </>
    );
};