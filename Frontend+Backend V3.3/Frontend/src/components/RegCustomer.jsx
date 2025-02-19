import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import uservalidation from "../uservalidation";
import ReCAPTCHA from "react-google-recaptcha";
import backgroundImage from "../assests/admin-bg.png"; // Local background image

function RegCustomer() {
    const [user, setUser] = useState({
        name: "",
        city: "",
        userid: "",
        pwd: "",
        cpwd: "",
        phone: "",
        gender: ""
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [verified, setVerified] = useState(false);

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = uservalidation(user);
        if (!user.gender) {
            validationErrors.gender = "Gender is required";
        }
        setErrors(validationErrors);
        setSubmitted(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted) {
            axios.post("http://localhost:8272/api/customers", user)
                .then(resp => {
                    alert("Customer registered successfully");
                    history.push("/clogin");
                })
                .catch(error => {
                    alert("This Email is already Registered. Try using another Email id");
                });
        }
    }, [errors]);

    

    return (
        <div className="d-flex align-items-center justify-content-center vh-100" 
            style={{ backgroundImage: `url(${backgroundImage})`, marginTop:"80px",backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="col-md-5">
                <div className="card shadow-lg p-2 rounded">
                <div className="card-header bg-primary text-white text-center">
                                <h4>Customer Registration</h4>
                            </div>
                    <form onSubmit={handleSubmit} className="needs-validation">
                        <div className="form-group">
                            <label className="font-weight-bold">Customer Name</label>
                            <input type="text" name="name" placeholder="Enter Name" value={user.name} onChange={handleInput} className="form-control" required />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">City</label>
                            <input type="text" name="city" placeholder="Enter City" value={user.city} onChange={handleInput} className="form-control" required />
                            {errors.city && <small className="text-danger">{errors.city}</small>}
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Gender</label>
                            <select name="gender" value={user.gender} onChange={handleInput} className="form-control">
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            {errors.gender && <small className="text-danger">{errors.gender}</small>}
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Email ID</label>
                            <input type="email" name="userid" placeholder="example@gmail.com" value={user.userid} onChange={handleInput} className="form-control" required />
                            {errors.userid && <small className="text-danger">{errors.userid}</small>}
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Mobile No</label>
                            <input type="text" name="phone" placeholder="Enter Mobile Number" value={user.phone} onChange={handleInput} className="form-control" required />
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Password</label>
                            <input type="password" name="pwd" placeholder="Enter Password" value={user.pwd} onChange={handleInput} className="form-control" required />
                            {errors.pwd && <small className="text-danger">{errors.pwd}</small>}
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Confirm Password</label>
                            <input type="password" name="cpwd" placeholder="Confirm Password" value={user.cpwd} onChange={handleInput} className="form-control" required />
                            {errors.cpwd && <small className="text-danger">{errors.cpwd}</small>}
                        </div>
                        
                        <button className="btn btn-primary btn-block font-weight-bold" >Register Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegCustomer;

