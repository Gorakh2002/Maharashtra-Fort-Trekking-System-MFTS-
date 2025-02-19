import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";

function Bookings() {
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8272/api/orders")
            .then(resp => {
                setOrders(resp.data.data);
            })
            .catch(error => console.log("Error fetching orders:", error));
    }, []);

    const showDetails = (orderid) => {
        axios.get(`http://localhost:8272/api/orders/${orderid}`)
            .then(resp => {
                setDetails(resp.data.data.details);
                setShow(true);
            })
            .catch(error => console.log("Error fetching order details:", error));
    };

    return (
        <div className="container-fluid py-4" style={{marginTop:"80px"}}>
            <div className="row">
                
                {/* Booking Summary Section */}
                <div className="col-lg-7">
                    <div className="card bg-dark text-white shadow-lg">
                        <div className="card-header text-warning text-center">
                            <h4>Booking Summary</h4>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-hover table-bordered text-center table-dark table-striped">
                                <thead className="table-warning text-dark">
                                    <tr>
                                        <th>Id</th>
                                        <th>Booking Date</th>
                                        <th>Amount</th>
                                        <th>Customer</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length > 0 ? (
                                        orders.map((x) => (
                                            <tr key={x.orderid}>
                                                <td>{x.orderid}</td>
                                                <td><Moment format="ddd, DD-MMM-YYYY">{x.orderDate}</Moment></td>
                                                <td>&#8377; {x.payment.amount}</td>
                                                <td>{x.customer.name}</td>
                                                <td>
                                                    <button 
                                                        onClick={() => showDetails(x.orderid)} 
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        Show Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center text-danger">No bookings found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Booking Details Section */}
                <div className="col-lg-5">
                    {show && (
                        <div className="card bg-dark text-white shadow-lg">
                            <div className="card-header text-info text-center">
                                <h4>Booking Details</h4>
                            </div>
                            <div className="card-body table-responsive">
                                <table className="table table-hover table-bordered text-center table-dark table-striped">
                                    <thead className="table-info text-dark">
                                        <tr>
                                            <th>Id</th>
                                            <th>Event</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {details.map((x) => (
                                            <tr key={x.event.eventid}>
                                                <td>{x.event.eventid}</td>
                                                <td>
                                                    <img 
                                                        className="rounded img-thumbnail me-2" 
                                                        src={`http://localhost:8272/${x.event.photo1}`} 
                                                        width="80" 
                                                        alt="Event"
                                                    />
                                                    <div>
                                                        <strong>{x.event.eventname}</strong>
                                                        <br />
                                                        <small className="text-muted">{x.event.cat}</small>
                                                    </div>
                                                </td>
                                                <td>&#8377; {x.event.price}</td>
                                                <td>{x.qty}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Bookings;
