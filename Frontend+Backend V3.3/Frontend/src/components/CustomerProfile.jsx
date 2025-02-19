import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// Assuming you have a separate CSS file

function CustomerProfile() {
  const [uname, setUname] = useState(sessionStorage.getItem("uname"));
  const id = sessionStorage.getItem("id");

  const [user, setUser] = useState({
    id: sessionStorage.getItem("id"),
    name: "",
    city: "",
    userid: "",
    pwd: "",
    phone: "",
    gender: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:8272/api/customers/${id}`).then((resp) => {
      setUser(resp.data.data);
    });
  }, [id]);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8272/api/customers/${id}`, user).then(() => {
      alert("Profile updated successfully");
      setUname(user.name);
    });
  };

  return (
    <div className="profile-container" style={{ backgroundImage: "url(/images/profile-bg.jpg)" }}>
      <div className="card shadow-lg p-4 bg-white rounded mx-auto" style={{ maxWidth: "600px" , marginTop:"100px"}}>
        <h4 className="text-center text-primary border-bottom pb-2">Customer Profile</h4>
       

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label>Customer Name</label>
            <input type="text" name="name" className="form-control" value={user.name} onChange={handleInput} placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" className="form-control" value={user.city} onChange={handleInput} placeholder="Enter your city" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" className="form-control" value={user.gender} onChange={handleInput} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Email Id</label>
            <input type="text" name="userid" className="form-control" value={user.userid} readOnly />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="number" name="phone" className="form-control" value={user.phone} onChange={handleInput} placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="pwd" className="form-control" value={user.pwd} onChange={handleInput} />
          </div>
          <button className="btn btn-primary btn-block mt-3">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default CustomerProfile;