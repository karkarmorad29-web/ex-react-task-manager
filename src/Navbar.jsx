import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/features">Features</NavLink>
        </nav>
    );
};

export default Navbar;
