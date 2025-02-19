import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoleNavbar from "./RoleNavbar";
import logo from "../assests/Logo.png";

function NavBar() {
    const state = useSelector((state) => state);

    return (
        <nav className="navbar navbar-expand-lg fixed-top shadow-lg px-3 py-2" 
            style={{
                backdropFilter: "blur(10px)", 
                backgroundColor: "#5271ff", 
                borderBottom: "2px solid rgba(255, 255, 255, 0.2)"
            }}>
            <div className="container-fluid">
                
                {/* Left Side: Logo & Site Title */}
                <div className="d-flex align-items-center">
                    <img src={logo} alt="Logo" style={{ height: "60px", marginRight: "10px" }} />
                    <Link className="navbar-brand fw-bold fs-3 text-white" to="/">
                        Maharashtra Fort Trek
                    </Link>
                </div>

                {/* Mobile Toggle Button */}
                <button 
                    className="navbar-toggler text-white border-0" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavDropdown"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Items */}
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mx-auto">
                        {/* Categories Dropdown */}
                        <li className="nav-item dropdown">
                            <Link 
                                className="nav-link dropdown-toggle text-white fw-semibold fs-5" 
                                to="#" 
                                id="navbarDropdownMenuLink" 
                                role="button" 
                                data-bs-toggle="dropdown"
                            >
                                Categories
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark animate-dropdown">
                                <li><Link className="dropdown-item" to="/cats?cat=Himalyan Treks">🏔️ Himalyan Treks</Link></li>
                                <li><Link className="dropdown-item" to="/cats?cat=Jungle Safari">🌿 Jungle Safari</Link></li>
                                <li><Link className="dropdown-item" to="/cats?cat=Local Treks">🌍 Local Treks</Link></li>
                                <li><Link className="dropdown-item" to="/cats?cat=Biking">🚴‍♂️ Biking</Link></li>
                                <li><Link className="dropdown-item" to="/cats?cat=Winter Treks">❄️ Winter Treks</Link></li>
                                <li><Link className="dropdown-item" to="/cats?cat=Adventure Sports">🎢 Adventure Sports</Link></li>
                            </ul>
                        </li>

                    </ul>

                    {/* Right Side: User Info & Role Navbar */}
                    <div className="d-flex align-items-center">
                        {state.loggedin.IsLoggedIn && (
                            <div className="text-white text-end me-3">
                                <h6 className="fw-bold mb-0">👤 {state.loggedin.Username}</h6>
                                <small>Role: {state.loggedin.Role}</small>
                            </div>
                        )}
                        <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
