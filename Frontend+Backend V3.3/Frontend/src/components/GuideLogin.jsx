import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../loginvalidation";
import ReCAPTCHA from "react-google-recaptcha";
import backgroundImage from "../assests/admin-bg.png"; // Use your local image

function GuideLogin() {
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
            axios.post("http://localhost:8272/api/guide/validate", user)
                .then(resp => {
                    let result = resp.data.data;
                    sessionStorage.setItem("id", result.id);
                    sessionStorage.setItem("userid", result.userid);
                    sessionStorage.setItem("uname", result.name);
                    sessionStorage.setItem("role", "Guide");
                    dispatch({ type: "IsLoggedIn" });
                    history.push("/sprofile");
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
                <div className="card shadow-lg p-2 rounded">
                <div className="card-header bg-primary text-white text-center">
                                <h4>Guide Login</h4>
                            </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="font-weight-bold">Email Id</label>
                            <input 
                                type="text" 
                                name="userid" 
                                placeholder="Please enter your email ID" 
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
                                placeholder="Please enter your password" 
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

export default GuideLogin;
