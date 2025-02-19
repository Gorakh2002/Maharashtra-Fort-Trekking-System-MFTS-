import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import backgroundImage from "../assests/admin-bg1.png";
function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8272/api/orders?custid=" + sessionStorage.getItem("id"))
            .then(resp => {
                console.log(resp.data)
                setOrders(resp.data.data)
            })
    }, []);

    const showDetails = (orderid) => {
        axios.get("http://localhost:8272/api/orders/" + orderid)
            .then(resp => {
                console.log(resp.data)
                setDetails(resp.data.data.details)
            })
        setShow(true)
    }

    return (
        <div className=" d-flex align-items-center justify-content-center"
        style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginTop:"70px"
        }}>
            <div className="container-fluid py-5">
                <div className="row">
                    {/* Left Column: My Orders */}
                    <div className="col-sm-6" style={{ paddingLeft: "30px" }}>
                        <h4 className="text-dark mb-4">My Booking</h4>
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <table className="table table-bordered table-striped table-hover table-dark">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Id</th>
                                            <th>Booking Date</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(x => (
                                            <tr key={x.orderid}>
                                                <td>{x.orderid}</td>
                                                <td><Moment format="ddd, DD-MMM-YYYY">{x.orderDate}</Moment></td>
                                                <td>&#8377; {x.payment.amount}</td>
                                                <td><button onClick={e => showDetails(x.orderid)} className="btn btn-info btn-sm">Show Details</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Details */}
                    <div className="col-sm-6" style={{ paddingRight: "30px" }}>
                        {show && (
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <h4 className="text-white mb-4">Booking Details</h4>
                                    <table className="table table-bordered table-striped table-hover table-dark">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Id</th>
                                                <th>Event</th>
                                                <th>Price</th>
                                                <th>No of Persons</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {details.map(x => (
                                                <tr key={x.event.eventid}>
                                                    <td>{x.event.eventid}</td>
                                                    <td>
                                                        <img className="mr-2" src={"http://localhost:8272/" + x.event.photo1} width="100" alt="event" />
                                                        <div>{x.event.eventname}</div>
                                                        <small>Category: {x.event.eventcat}</small><br />
                                                        <small>Location: {x.event.location}</small>
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
        </div>
    );
}

export default MyOrders;
