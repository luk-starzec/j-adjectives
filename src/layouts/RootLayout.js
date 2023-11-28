import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import CopyrightInfo from "../components/CopyrightInfo";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <ScrollRestoration />
            <header>
                <nav>
                    <img src="../logo192.png" className="logo" alt="logo" />
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="opposite">Opposite</NavLink>
                    <NavLink to="quiz">Quiz</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <CopyrightInfo />
            </footer>
        </div>
    )
}
