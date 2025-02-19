import { useSelector } from "react-redux";
import logo from "../assests/Logo.png";

function Header() {
    const state = useSelector((state) => state);
    console.log("Header ", state.loggedin.Username);

    return (
        <div className="p-4 text-light text-center shadow" 
            style={{
                background: "linear-gradient(135deg, #5271ff, #3742fa)",
                marginTop: "80px",  // Ensures navbar doesn't overlap
                borderBottom: "4px solid rgba(255, 255, 255, 0.2)"
            }}>
            <div className="d-flex justify-content-between align-items-center">
                
                {/* Logo */}
                <img src={logo} alt="Logo" style={{ height: "80px", width: "180px" }} />

                {/* User Info (Only if logged in) */}
                {state.loggedin.IsLoggedIn && (
                    <div className="text-end">
                        <h5 className="fw-bold">Username: {state.loggedin.Username}</h5>
                        <p className="m-0">Role: {state.loggedin.Role}</p>
                    </div>
                )}
            </div>

            {/* Title */}
            <h2 className="mt-3 fw-bold text-uppercase">Welcome to Maharashtra Fort Trek</h2>
        </div>
    );
}

export default Header;
