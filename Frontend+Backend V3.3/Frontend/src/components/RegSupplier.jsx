import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import uservalidation from "../uservalidation";
import backgroundImage from "../assests/admin-bg.png"; // Local image

function RegSupplier() {
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState({
        name: "",
        city: "",
        userid: "",
        pwd: "",
        cpwd: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(uservalidation(user));
        setSubmitted(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted) {
            axios.post("http://localhost:8272/api/guide", user)
                .then((resp) => {
                    alert("Guide registered successfully");
                    history.push("/slogin");
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Guide registration failed");
                });
        }
    }, [errors]);

    return (
        <div 
            className="d-flex align-items-center justify-content-center vh-100" 
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="col-md-5">
                <div className="card shadow-lg p-2 rounded">
                <div className="card-header bg-primary text-white text-center">
                                <h4>Guide Registration</h4>
                            </div>
                    <form onSubmit={handleSubmit} className="needs-validation">
                        <div className="form-group">
                            <label className="font-weight-bold">Guide Name</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Enter Guide Name"
                                minLength="2"
                                maxLength="60"
                                required
                            />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">City</label>
                            <input
                                type="text"
                                name="city"
                                value={user.city}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Enter City"
                                minLength="2"
                                maxLength="40"
                                required
                            />
                            {errors.city && <small className="text-danger">{errors.city}</small>}
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Email ID</label>
                            <input
                                type="email"
                                name="userid"
                                value={user.userid}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="example@gmail.com"
                                required
                            />
                            {errors.userid && <small className="text-danger">{errors.userid}</small>}
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Phone</label>
                            <input
                                type="tel"
                                maxLength="10"
                                name="phone"
                                value={user.phone}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Enter Phone Number"
                                pattern="[0-9]+"
                                required
                            />
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Password</label>
                            <input
                                type="password"
                                name="pwd"
                                value={user.pwd}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Enter Password"
                                minLength="8"
                                required
                            />
                            {errors.pwd && <small className="text-danger">{errors.pwd}</small>}
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Confirm Password</label>
                            <input
                                type="password"
                                name="cpwd"
                                value={user.cpwd}
                                onChange={handleInput}
                                className="form-control"
                                placeholder="Confirm Password"
                                minLength="8"
                                required
                            />
                            {errors.cpwd && <small className="text-danger">{errors.cpwd}</small>}
                        </div>

                        <button className="btn btn-primary btn-block font-weight-bold">
                            Register Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegSupplier;

