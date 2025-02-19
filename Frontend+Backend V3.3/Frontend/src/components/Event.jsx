import { Link } from "react-router-dom";
import Moment from "react-moment";

function Event(props){
    const {x,showModal}=props
    return (
        <div className="col-sm-3" key={x.eventid}>
            <div className="card  text-dark mb-3 bg-grey" style={{boxShadow:"0 0 3px 3px white"}}>

            <img style={{width:"100%",height:"250px",marginBottom:"10px"}} src={"http://localhost:8272/"+x.photo1} className="img-thumnail" alt=""/>
                
                <div className="card-body py-1">
                <div className="card-header p-1 border-bottom border-dark">
                    <h5 className="card-title">{x.eventname}</h5>
                </div>
                <p className="">
                {x.location}</p>                
                <h6 className="">Price: &#8377; {x.price}</h6>    
                <h6 className="">Event date: <Moment format="ddd, DD-MMM-YYYY">{x.date}</Moment></h6>                       
                </div>
                <div className="card-footer p-1">
                     
                    <button onClick={e=>showModal(x)} className="btn btn-info btn-md float-right mr-2">Detail</button>
                </div>
            </div>
        </div>
    )
}

export default Event;