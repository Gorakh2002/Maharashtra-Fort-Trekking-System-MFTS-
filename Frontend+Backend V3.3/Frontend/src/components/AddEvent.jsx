import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import eventvalidation from "./eventvalidation";

function AddEvent() {
    const guideid = sessionStorage.getItem("id");
    const [event, setEvent] = useState({
        "eventname": "",
        "location": "",
        "eventcat": "",
        "price": "",
        "date": "",
        "description": "",
        "guideid": guideid
    });
    const [errors, setErrors] = useState({});
    const [selectedPhoto1, setSelectedPhoto1] = useState(null);
    const [selectedPhoto2, setSelectedPhoto2] = useState(null);
    const [selectedPhoto3, setSelectedPhoto3] = useState(null);
  
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();

    const handleInput = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleFileInput1 = (e) => {
        setSelectedPhoto1(e.target.files[0]);
    };
    const handleFileInput2 = (e) => {
        setSelectedPhoto2(e.target.files[0]);
    };
    const handleFileInput3 = (e) => {
        setSelectedPhoto3(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(eventvalidation(event));    
        setSubmitted(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted) {
            const formData = new FormData();
            formData.append("eventname", event.eventname);
            formData.append("location", event.location);
            formData.append("eventcat", event.eventcat);
            formData.append("price", event.price);
            formData.append("description", event.description);
            formData.append("noofdays", event.noofdays);
            formData.append("date", event.date);
            formData.append("dailywiseschedule", event.dailywiseschedule);
            formData.append("thingstocarry", event.thingstocarry);
            formData.append("pickupanddroplocation", event.pickupanddroplocation);
            formData.append("pic1", selectedPhoto1);
            formData.append("pic2", selectedPhoto2);
            formData.append("pic3", selectedPhoto3);
            formData.append("guideId", guideid);
            
            axios.post("http://localhost:8272/api/events", formData)
                .then(resp => {
                    alert("Event Saved Successfully");
                    history.push("/myproducts");
                })
                .catch(error => {
                    alert("Error Saving Event");
                });
        }
    }, [errors]);

    return (
        <div className="container py-5" style={{marginTop:"60px", backgroundImage: `url(" ")`, backgroundSize: "cover" }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h4 className="text-center mb-4">Add Event</h4>
                    <form onSubmit={handleSubmit} className="shadow-lg p-4 bg-light rounded">
                        <div className="form-group">
                            <label htmlFor="eventname" className="font-weight-bold">Event Name</label>
                            <input
                                type="text"
                                id="eventname"
                                name="eventname"
                                value={event.eventname}
                                onChange={handleInput}
                                className={`form-control ${errors.eventname ? 'is-invalid' : ''}`}
                                placeholder="Enter Event Name"
                                required
                            />
                            {errors.eventname && <div className="invalid-feedback text-danger">{errors.eventname}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventcat" className="font-weight-bold">Category</label>
                            <select
                                name="eventcat"
                                id="eventcat"
                                value={event.eventcat}
                                onChange={handleInput}
                                className={`form-control ${errors.eventcat ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Category</option>
                                <option>Himalyan Treks</option>
                                <option>Jungle Safari</option>
                                <option>Local Treks</option>
                                <option>Biking</option>
                                <option>Winter Treks</option>
                                <option>Adventure Sports</option>
                            </select>
                            {errors.eventcat && <div className="invalid-feedback">{errors.eventcat}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="location" className="font-weight-bold">Location</label>
                            <select
                                name="location"
                                id="location"
                                value={event.location}
                                onChange={handleInput}
                                className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                            >
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
                                {/* Add other states */}
                            </select>
                            {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="price" className="font-weight-bold">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={event.price}
                                onChange={handleInput}
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                placeholder="Enter Price"
                                required
                            />
                            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="font-weight-bold">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={event.description}
                                onChange={handleInput}
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                rows="4"
                                placeholder="Enter Description"
                                required
                            />
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="date" className="font-weight-bold">Event Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={event.date}
                                onChange={handleInput}
                                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="noofdays" className="font-weight-bold">Number of Days</label>
                            <input
                                type="number"
                                id="noofdays"
                                name="noofdays"
                                value={event.noofdays}
                                onChange={handleInput}
                                className={`form-control ${errors.noofdays ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.noofdays && <div className="invalid-feedback">{errors.noofdays}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="dailywiseschedule" className="font-weight-bold">Daily Schedule</label>
                            <textarea
                                id="dailywiseschedule"
                                name="dailywiseschedule"
                                value={event.dailywiseschedule}
                                onChange={handleInput}
                                className={`form-control ${errors.dailywiseschedule ? 'is-invalid' : ''}`}
                                rows="4"
                                placeholder="Enter Schedule"
                                required
                            />
                            {errors.dailywiseschedule && <div className="invalid-feedback">{errors.dailywiseschedule}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="thingstocarry" className="font-weight-bold">Things to Carry</label>
                            <textarea
                                id="thingstocarry"
                                name="thingstocarry"
                                value={event.thingstocarry}
                                onChange={handleInput}
                                className={`form-control ${errors.thingstocarry ? 'is-invalid' : ''}`}
                                rows="4"
                                placeholder="Things to carry"
                                required
                            />
                            {errors.thingstocarry && <div className="invalid-feedback">{errors.thingstocarry}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="pickupanddroplocation" className="font-weight-bold">Pickup and Drop Location</label>
                            <select
                                name="pickupanddroplocation"
                                id="pickupanddroplocation"
                                value={event.pickupanddroplocation}
                                onChange={handleInput}
                                className={`form-control ${errors.pickupanddroplocation ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Location</option>
                                <option>Pune to Pune</option>
                                <option>Mumbai to Mumbai</option>
                                <option>Delhi to Delhi</option>
                            </select>
                            {errors.pickupanddroplocation && <div className="invalid-feedback">{errors.pickupanddroplocation}</div>}
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Upload Photos</label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    name="photo1"
                                    onChange={handleFileInput1}
                                    className="custom-file-input"
                                    required
                                />
                                <label className="custom-file-label">Choose Photo 1</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    name="photo2"
                                    onChange={handleFileInput2}
                                    className="custom-file-input"
                                    required
                                />
                                <label className="custom-file-label">Choose Photo 2</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    name="photo3"
                                    onChange={handleFileInput3}
                                    className="custom-file-input"
                                    required
                                />
                                <label className="custom-file-label">Choose Photo 3</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-4">Add Event</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEvent;
