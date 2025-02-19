import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import backgroundImage from "../assests/admin-bg1.png"; // Ensure you have the correct path

function MyEvents() {
    const guideid = sessionStorage.getItem("id");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8272/api/events?guideid=${guideid}`)
            .then((resp) => {
                setEvents(resp.data.data);
            });
    }, [guideid]); 

    const deleteEvent = (eventid) => {
        let confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8272/api/events/${eventid}`)
                .then(() => {
                    alert("Event deleted successfully");
                    axios.get(`http://localhost:8272/api/events?guideid=${guideid}`)
                        .then((resp) => {
                            setEvents(resp.data.data);
                        });
                });
        }
    };

    return (
        <div 
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container bg-light shadow-lg rounded p-4">
                <h2 className="text-center text-dark mb-4">My Events</h2>
                
                <div className="table-responsive">
                    <table className="table table-hover table-bordered text-center">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Event Date</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <tr key={event.eventid}>
                                        <td>
                                            <img 
                                                src={`http://localhost:8272/${event.photo1}`} 
                                                alt="event" 
                                                className="img-thumbnail" 
                                                width="100"
                                            />
                                        </td>
                                        <td className="align-middle">{event.eventname}</td>
                                        <td className="align-middle">{event.eventcat}</td>
                                        <td className="align-middle">
                                            <Moment format="ddd, DD-MMM-YYYY">{event.date}</Moment>
                                        </td>
                                        <td className="align-middle">{event.location}</td>
                                        <td className="align-middle">${event.price}</td>
                                        <td className="align-middle">
                                            <Link to={`/edit/${event.eventid}`} className="btn btn-sm btn-primary me-2">
                                                <i className="bi bi-pencil-square"></i> Edit
                                            </Link>
                                            <button 
                                                onClick={() => deleteEvent(event.eventid)} 
                                                className="btn btn-sm btn-danger"
                                            >
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted">
                                        No events found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MyEvents;
