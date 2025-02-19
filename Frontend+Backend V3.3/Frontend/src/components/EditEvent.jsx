import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import eventvalidation from "./eventvalidation";
import backgroundImage from "../assests/admin-bg1.png"; // Use your local image

function EditEvent() {
    const sellerid = sessionStorage.getItem("id");
    const { prodid } = useParams();
    const history = useHistory();

    const [product, setProduct] = useState({
        eventid: prodid,
        eventname: "",
        eventcat: "",
        photo: "",
        price: "",
        location: "",
        description: "",
        noofdays: "",
        dailywiseschedule: "",
        thingstocarry: "",
        guideId: sellerid,
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8272/api/events/${prodid}`)
            .then((resp) => {
                setProduct(resp.data.data);
            })
            .catch((error) => {
                console.error("Error fetching event data:", error);
            });
    }, [prodid]);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted) {
            axios.put(`http://localhost:8272/api/events/${prodid}`, product)
                .then((resp) => {
                    alert("Event updated successfully!");
                    history.push("/myproducts");
                })
                .catch((error) => {
                    console.error("Error updating event:", error);
                    alert("Error updating event");
                });
        }
    }, [errors, submitted, product, prodid, history]);

    const handleInput = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(eventvalidation(product));
        setSubmitted(true);
    };

    return (
        <div 
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginTop:"100px"
            }}
        >
            <div className="container bg-light shadow-lg rounded p-4">
                <h2 className="text-center text-dark mb-4">Edit Event</h2>

                <form onSubmit={handleSubmit}>

                    {/* Event Name */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Event Name</label>
                        <input 
                            type="text" name="eventname" value={product.eventname} onChange={handleInput} 
                            className="form-control"
                        />
                        {errors.eventname && <small className="text-danger">{errors.eventname}</small>}
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Category</label>
                        <select name="eventcat" value={product.eventcat} onChange={handleInput} className="form-control">
                            <option value="">Select Category</option>
                            <option>Himalayan Trek</option>
                            <option>Jungle Safari</option>
                            <option>Local Treks</option>
                            <option>Biking</option>
                            <option>Winter Treks</option>
                            <option>Adventure Sports</option>
                        </select>
                        {errors.eventcat && <small className="text-danger">{errors.eventcat}</small>}
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Price</label>
                        <input type="number" name="price" value={product.price} onChange={handleInput} className="form-control" />
                        {errors.price && <small className="text-danger">{errors.price}</small>}
                    </div>

                    {/* Location (State) */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Location</label>
                        <select name="location" value={product.location} onChange={handleInput} className="form-control">
                            <option value="">Select State</option>
                            <option>Andhra Pradesh</option>
                            <option>Arunachal Pradesh</option>
                            <option>Assam</option>
                            <option>Bihar</option>
                            <option>Chhattisgarh</option>
                            <option>Goa</option>
                            <option>Gujarat</option>
                            <option>Haryana</option>
                            <option>Himachal Pradesh</option>
                            <option>Jharkhand</option>
                            <option>Karnataka</option>
                            <option>Kerala</option>
                            <option>Madhya Pradesh</option>
                            <option>Maharashtra</option>
                            <option>Manipur</option>
                            <option>Meghalaya</option>
                            <option>Mizoram</option>
                            <option>Nagaland</option>
                            <option>Odisha</option>
                            <option>Punjab</option>
                            <option>Rajasthan</option>
                            <option>Sikkim</option>
                            <option>Tamil Nadu</option>
                            <option>Telangana</option>
                            <option>Tripura</option>
                            <option>Uttar Pradesh</option>
                            <option>Uttarakhand</option>
                            <option>West Bengal</option>
                        </select>
                        {errors.location && <small className="text-danger">{errors.location}</small>}
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea name="description" value={product.description} onChange={handleInput} className="form-control" rows="3"></textarea>
                        {errors.description && <small className="text-danger">{errors.description}</small>}
                    </div>

                    {/* Number of Days */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Number of Days</label>
                        <input type="number" name="noofdays" value={product.noofdays} onChange={handleInput} className="form-control" />
                        {errors.noofdays && <small className="text-danger">{errors.noofdays}</small>}
                    </div>

                    {/* Daily Schedule */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Daily Schedule</label>
                        <textarea name="dailywiseschedule" value={product.dailywiseschedule} onChange={handleInput} className="form-control" rows="3"></textarea>
                        {errors.dailywiseschedule && <small className="text-danger">{errors.dailywiseschedule}</small>}
                    </div>

                    {/* Things to Carry */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Things to Carry</label>
                        <textarea name="thingstocarry" value={product.thingstocarry} onChange={handleInput} className="form-control" rows="3"></textarea>
                        {errors.thingstocarry && <small className="text-danger">{errors.thingstocarry}</small>}
                    </div>

                    {/* Submit Button */}
                    <div className="text-end">
                        <button type="submit" className="btn btn-primary">
                            Update Event
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditEvent;
