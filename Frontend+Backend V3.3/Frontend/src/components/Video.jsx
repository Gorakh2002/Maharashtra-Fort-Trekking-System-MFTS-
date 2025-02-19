import React from "react";
import video2 from "../components/video2.mp4"


const Video = () =>{
    return(
        <div className="main bg-white">
        <video src={video2} autoPlay loop muted/>
        <div className="content">
        <h1>The Mountains Are Calling...</h1>
        </div>
        </div>
    )
}

export default Video