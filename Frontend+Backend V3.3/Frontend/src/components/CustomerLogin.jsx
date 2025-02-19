import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../loginvalidation";
import ReCAPTCHA from "react-google-recaptcha";
import backgroundImage from "../assests/admin-bg.png"; // Use your local image

function CustomerLogin() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState({
        userid: "",
        pwd: ""
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [verified, setVerified] = useState(false);

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
            axios.post("http://localhost:8272/api/customers/validate", user)
                .then(resp => {
                    let result = resp.data.data;
                    sessionStorage.setItem("userid", result.id);
                    sessionStorage.setItem("uname", result.name);
                    sessionStorage.setItem("role", "Customer");
                    sessionStorage.setItem("id", result.id);
                    dispatch({ type: "IsLoggedIn" });
                    history.push("/");
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Invalid username or password");
                });
        }
    }, [errors]);

    function onChange(value) {
        setVerified(true);
    }

    return (
        <div 
            className="d-flex align-items-center justify-content-center" 
            style={{ 
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height:"700px"
            }}
        >
            <div className="col-md-5">
                <div className="card shadow-lg rounded p-2">
                <div className="card-header bg-primary text-white text-center">
                                <h4>Customer Login</h4>
                            </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="font-weight-bold">Email Id</label>
                            <input 
                                type="text" 
                                name="userid" 
                                placeholder="name@example.com" 
                                value={user.userid} 
                                onChange={handleInput} 
                                className="form-control" 
                            />
                            {errors.userid && <small className="text-danger">{errors.userid}</small>}
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Password</label>
                            <input 
                                type="password" 
                                name="pwd" 
                                placeholder="Password" 
                                value={user.pwd} 
                                onChange={handleInput} 
                                className="form-control" 
                            />
                            {errors.pwd && <small className="text-danger">{errors.pwd}</small>}
                        </div>

                        <div className="d-flex justify-content-center my-3">
                            <ReCAPTCHA 
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
                                onChange={onChange} 
                            />
                        </div>

                        <button 
                            className="btn btn-primary btn-block font-weight-bold" 
                            disabled={!verified}
                        >
                            Login Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CustomerLogin;
