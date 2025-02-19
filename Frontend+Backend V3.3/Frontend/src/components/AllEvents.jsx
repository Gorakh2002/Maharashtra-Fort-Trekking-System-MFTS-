import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Event from "./Event";
import queryString from "query-string";
import Carousel from "./Carousel";

function AllEvents() {
    const [events, setEvents] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const state = useSelector((state) => state);
    const location = useLocation();
    const [item, setItem] = useState({});
    const [qty, setQty] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [showDialog, setShowDialog] = useState(false);

    const showModal = (event) => {
        setShowDialog(true);
        setItem(event);
    };

    const checkItem = (eventid) => {
        return state.cart.findIndex(x => x.eventid === eventid) < 0;
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    const loadDataFromServer = (page = 0, pagesize = 8) => {
        axios.get(`http://localhost:8272/api/events/paginated?page=${page}&pagesize=${pagesize}`)
            .then(resp => {
                setEvents(resp.data.data.eventlist);
                setTotalPage(Math.ceil(resp.data.data.total / pagesize));
            });
    };

    useEffect(() => {
        let eventcat = queryString.parse(location.search);
        if (eventcat.cat !== undefined) {
            axios.get(`http://localhost:8272/api/events?cat=${eventcat.cat}`)
                .then(resp => {
                    setEvents(resp.data.data);
                });
        } else {
            loadDataFromServer();
        }
    }, [location]);

    const addToCart = (item) => {
        if (!sessionStorage.getItem("userid")) {
            alert("Please login first to book event");
            history.push("/clogin");
        } else if (sessionStorage.getItem("role") !== "Customer") {
            alert("Only customers can book events");
        } else {
            if (checkItem(item.eventid)) {
                setShowDialog(false);
                if (qty !== "") {
                    item.qty = qty;
                    dispatch({ type: 'AddItem', payload: item });
                    alert("Item added to cart successfully");
                } else {
                    alert("Enter a valid number of persons!");
                }
            } else {
                alert("Item already in cart");
            }
        }
    };

    const handlePageClick = ({ selected: selectedPage }) => {
        loadDataFromServer(selectedPage);
    };

    return (
        <>
             <div style={{ marginTop: "80px" }}>
                <Carousel />     
            </div>
            <div className="container-fluid" style={{ width: "100%", marginTop: "10px" }}>
                <h3 className="text-center text-dark">Our Popular Treks</h3>
                <div className="row mt-3">
                    {events?.map(x => (
                        <Event key={x.eventid} x={x} showModal={showModal} />
                    ))}
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <ReactPaginate 
                        previousLabel={"🢀"}
                        nextLabel={"🢂"}
                        containerClassName={"pagination"}
                        pageCount={totalPage}
                        onPageChange={handlePageClick}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"} 
                    />
                </div>
            </div>

            {/* Modal */}
      {showDialog && (
        <div className="modal fade show d-block" style={{ zIndex: "1050" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title">Book This Event</h5>
                <button type="button" className="close" onClick={closeDialog}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img src={`http://localhost:8272/${item.photo1}`} className="img-fluid rounded" alt="Event" />
                  </div>
                  <div className="col-md-6">
                    <h4 className="text-warning">{item.eventname}</h4>
                    <p><strong>Category:</strong> {item.eventcat}</p>
                    <p><strong>Guide:</strong> {item.guideName}</p>
                    <p><strong>Price:</strong> ₹{item.price}</p>
                    <p><strong>No of Days:</strong> {item.noofdays}</p>
                    <label>Enter Number Of Persons</label>
                    
                    <input type="number" className="form-control" value={qty} onChange={(e) => {
                      const reg = /^$|^[1-9]+$/;
                      if (reg.test(e.target.value)) {
                        setQty(e.target.value);
                      }
                    }} required />
                    <p className="mt-2"><strong>Total Bill: ₹{item.price * qty}</strong></p>
                    <div className="modal-footer">
                <button className="btn btn-danger" onClick={closeDialog}>Cancel</button>
                <button className="btn btn-success" onClick={() => addToCart(item)}>Book Now</button>
              </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
            )}
        </>
    );
}

export default AllEvents;