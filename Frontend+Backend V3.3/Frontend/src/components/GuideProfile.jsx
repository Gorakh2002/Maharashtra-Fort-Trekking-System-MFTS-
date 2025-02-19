import axios from "axios";
import { useState, useEffect } from "react";
import backgroundImage from "../assests/admin-bg.png"; // Ensure the image is stored in the `assets` folder

function GuideProfile() {
    const id = sessionStorage.getItem("id");

    const [user, setUser] = useState({
        id: id,
        name: "",
        city: "",
        userid: "",
        pwd: "",
        phone: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:8272/api/guide/${id}`)
            .then(resp => {
                setUser(resp.data.data);
            })
            .catch(error => console.log("Error fetching guide data", error));
    }, [id]);

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8272/api/guide/${id}`, user)
            .then(resp => {
                alert("Profile updated successfully!");
                console.log(resp);
            })
            .catch(error => console.log("Error updating profile", error));
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 text-white"
            style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center" 
            }}
        >
            <div className="card shadow-lg p-2" style={{ width: "400px", backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "15px" }}>
            <div className="card-header bg-primary text-white text-center">
                                <h4>Guide Profile</h4>
                            </div>
                <h5 className="text-center my-3">Welcome, {user.name}!</h5>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" value={user.name} onChange={handleInput} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">City</label>
                        <input type="text" className="form-control" name="city" value={user.city} onChange={handleInput} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="userid" value={user.userid} disabled />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contact No</label>
                        <input type="text" className="form-control" name="phone" value={user.phone} onChange={handleInput} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-control" name="pwd" onChange={handleInput} />
                    </div>

                    <button type="submit" className="btn btn-success w-100">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default GuideProfile;

