import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ViewCart() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const RAZORPAY_KEY = "rzp_test_9C5DF9gbJINYTA";

    const [address, setAddress] = useState({
        city: "",
        state: "Maharashtra",
        zip: "411038",
        country: "India",
    });
    
    const [payment, setPayment] = useState({
        cardno: "1212444433336666",
        nameoncard: "Test Name",
        cvv: "123",
        amount: state.cart.reduce(myfun, 0),
    });

    const deleteItem = (item) => {
        let resp = window.confirm("Are you sure to delete this item ?");
        if (resp) {
            dispatch({ type: "RemoveItem", payload: item });
        }
    };

    const handleAddressInput = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        let amount = state.cart.reduce(myfun, 0);
        setPayment({ ...payment, amount: amount });
    }, [state.cart]);

    function myfun(total, num) {
        return total + num.price * parseInt(num.qty);
    }

    const handlePayment = () => {
        const options = {
            key: RAZORPAY_KEY,
            amount: payment.amount * 100,
            currency: "INR",
            name: "Adventure Bookings",
            description: "Purchase your event",
            handler: function (response) {
                console.log("Payment Success: ", response);
                completeOrder(response);
            },
            prefill: {
                name: payment.nameoncard,
                email: "test@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };
        
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const completeOrder = (paymentResponse) => {
        let data = {
            cart: state.cart,
            payment: { ...payment, transactionId: paymentResponse.razorpay_payment_id },
            address: address,
            customerid: sessionStorage.getItem("id"),
        };
        
        axios.post("http://localhost:8272/api/orders", data)
            .then((resp) => {
                alert("Order placed successfully!");
                dispatch({ type: "Clear" });
                history.push("/myorders");
            })
            .catch((error) => {
                console.error("Order Error: ", error);
                alert("Order placement failed!");
            });
    };

    return (
        <div className="container"style={{marginTop:"120px"}}>
            {state.cart.length > 0 ? (
                <div className="row">
                    <div className="col-md-7">
                        <h4>Cart View</h4>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Event Name</th>
                                    <th>Price</th>
                                    <th>No of person</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.cart.map((item) => (
                                    <tr key={item.eventid}>
                                        <td>{item.eventid}</td>
                                        <td>
                                            <img src={"http://localhost:8272/" + item.photo1} width="100" alt="" />
                                            {item.eventname}
                                        </td>
                                        <td>&#8377; {item.price}</td>
                                        <td>{item.qty}</td>
                                        <td>&#8377; {item.qty * item.price}</td>
                                        <td><button onClick={() => deleteItem(item)} className="btn btn-danger">Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="4">Total Amount</th>
                                    <th>&#8377; {state.cart.reduce(myfun, 0)}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <div className="col-md-5">
                        <h4>Address Information</h4>
                        <input type="text" name="city" value={address.city} onChange={handleAddressInput} placeholder="City" className="form-control mb-2" />
                        <input type="text" name="state" value={address.state} onChange={handleAddressInput} className="form-control mb-2" />
                        <input type="text" name="zip" value={address.zip} onChange={handleAddressInput} className="form-control mb-2" />
                        <input type="text" name="country" value={address.country} onChange={handleAddressInput} className="form-control mb-2" />
                        
                        <h5>Payment Information</h5>
                        <input type="text" name="cardno" value={payment.cardno} onChange={(e) => setPayment({ ...payment, cardno: e.target.value })} className="form-control mb-2" maxLength="16" />
                        <input type="text" name="nameoncard" value={payment.nameoncard} onChange={(e) => setPayment({ ...payment, nameoncard: e.target.value })} className="form-control mb-2" />
                        <input type="text" maxLength="3" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} className="form-control mb-2" />
                        
                        <button className="btn btn-primary mt-3" onClick={handlePayment}>Pay with Razorpay</button>
                    </div>
                </div>
            ) : (
                <h1 className="text-center">No Bookings Available</h1>
            )}
        </div>
    );
}

export default ViewCart;
