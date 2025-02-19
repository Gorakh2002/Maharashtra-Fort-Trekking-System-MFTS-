import axios from "axios";
import { useEffect, useState } from "react";
import backgroundImage from "../assests/admin-bg.png"; // Ensure the image is stored in the `assets` folder

function AllGuides() {
    const [guides, setGuide] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8272/api/guide")
            .then(resp => {
                setGuide(resp.data.data);
            })
            .catch(error => console.log("Error fetching guides:", error));
    }, []);

    const deleteGuide = (id) => {
        let response = window.confirm("Are you sure you want to delete this guide?");
        if (response) {
            axios.delete(`http://localhost:8272/api/guide/${id}`)
                .then(() => {
                    return axios.get("http://localhost:8272/api/guide");
                })
                .then(resp => {
                    setGuide(resp.data.data);
                })
                .catch(error => console.log("Error deleting guide:", error));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-white"
            style={{
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <div className="container bg-dark bg-opacity-75 p-4 rounded shadow-lg">
            <div className="card-header bg-primary text-white text-center">
                                <h4>All Guides</h4>
                            </div>

                <div className="table-responsive">
                    <table className="table table-hover table-bordered table-dark text-center mt-3">
                        <thead className="table-success">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Phone</th>
                                <th>User ID</th>
                                {/* <th>Password</th> */}
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {guides.length > 0 ? (
                                guides.map((guide) => (
                                    <tr key={guide.id}>
                                        <td>{guide.id}</td>
                                        <td>{guide.name}</td>
                                        <td>{guide.city}</td>
                                        <td>{guide.phone}</td>
                                        <td>{guide.userid}</td>
                                        {/* <td>{guide.pwd}</td> */}
                                        {/* <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteGuide(guide.id)}
                                            >
                                                Delete
                                            </button>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No guides available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllGuides;
