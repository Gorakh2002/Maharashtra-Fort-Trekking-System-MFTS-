import axios from "axios";
import { useEffect, useState } from "react";
import backgroundImage from "../assests/admin-bg.png"; // Ensure the image is stored in the `assets` folder

function AllCustomers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8272/api/customers")
            .then(resp => {
                setCustomers(resp.data.data);
            })
            .catch(error => console.log("Error fetching customers:", error));
    }, []);

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
                                <h4>All Customer</h4>
                            </div>

                <div className="table-responsive">
                    <table className="table table-hover table-bordered table-dark text-center mt-3">
                        <thead className="table-warning">
                            <tr>
                                <th>Name</th>
                                <th>City</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>User ID</th>
                                {/* <th>Password</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.city}</td>
                                        <td>{customer.gender}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.userid}</td>
                                        {/* <td>{customer.pwd}</td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No customers available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllCustomers;
