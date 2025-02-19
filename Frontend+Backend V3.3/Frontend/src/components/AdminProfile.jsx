import axios from "axios";
import { useState } from "react";
import backgroundImage from "../assests/admin-bg1.png"; // Ensure the image is stored in the `assets` folder

function AdminProfile() {
    const userid = sessionStorage.getItem("userid");
    const uname = sessionStorage.getItem("uname");

    const [user, setUser] = useState({
        Uname: uname, // ✅ Match backend DTO case
        Userid: userid,
        Pwd: "",
    });

    const [message, setMessage] = useState("");

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:9274/api/admin", user, {
            headers: { "Content-Type": "application/json" } // ✅ Added headers
        })
        .then((resp) => {
            console.log(resp);
            setMessage("✅ Profile updated successfully!");
            sessionStorage.setItem("uname", user.Uname); // ✅ Update sessionStorage
        })
        .catch((error) => {
            console.error("Error:", error);
            setMessage("❌ Error updating profile. Try again!");
        });
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 text-white"
            style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center" 
            }}
        >
            <div className="card shadow-lg p-4" style={{ width: "400px", backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "15px" }}>
                <h4 className="text-center border-bottom pb-2 text-success">Admin Profile</h4>
                <h5 className="text-center my-3">Welcome, {user.Uname}!</h5>
                
                {message && <p className={`alert ${message.includes("Error") ? "alert-danger" : "alert-success"} text-center`}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" name="Uname" value={user.Uname} onChange={handleInput} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="Userid" value={user.Userid} disabled />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-control" name="Pwd" onChange={handleInput} />
                    </div>

                    <button type="submit" className="btn btn-success w-100">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default AdminProfile;
