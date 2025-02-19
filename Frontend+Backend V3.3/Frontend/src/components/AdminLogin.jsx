import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../loginvalidation";
import backgroundImage from "../assests/admin-bg.png"; // Importing local background image

function AdminLogin() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState({
        userid: "",
        pwd: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [errmsg, setErrmsg] = useState("");

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(loginvalidation(user));
        setSubmitted(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted) {
            axios.post("http://localhost:9274/api/admin/validate", {
                UserId: user.userid,  // ✅ Fixed JSON property names
                Pwd: user.pwd
            }, {
                headers: { "Content-Type": "application/json" } // ✅ Added headers
            })
            .then(resp => {
                let result = resp.data;
                sessionStorage.setItem("userid", result.userid);
                sessionStorage.setItem("uname", result.uname);
                sessionStorage.setItem("role", "Admin");
                dispatch({ type: 'IsLoggedIn' });
                history.push("/aprofile");
            })
            .catch(error => {
                setErrmsg("❌ Invalid username or password!");
            });
        }
    }, [errors]);

    return (
        <div className=" d-flex justify-content-center align-items-center" style={{height:"600px",
            background: `url(${backgroundImage}) no-repeat center center/cover`
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card shadow-lg rounded">
                            <div className="card-header bg-primary text-white text-center">
                                <h4>Admin Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Email ID</label>
                                        <input
                                            type="text"
                                            name="userid"
                                            value={user.userid}
                                            onChange={handleInput}
                                            className="form-control shadow-sm"
                                            placeholder="Enter your email"
                                        />
                                        {errors.userid && <small className="text-danger">{errors.userid}</small>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Password</label>
                                        <input
                                            type="password"
                                            name="pwd"
                                            value={user.pwd}
                                            onChange={handleInput}
                                            className="form-control shadow-sm"
                                            placeholder="Enter your password"
                                        />
                                        {errors.pwd && <small className="text-danger">{errors.pwd}</small>}
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Login Now</button>
                                </form>
                                {errmsg && <p className="alert alert-danger mt-3 text-center">{errmsg}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
