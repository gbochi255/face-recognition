import React from "react";
import Tilt from "react-parallax-tilt";

const Logo = () => {
    return (
        <div className="ma4 mt0" >
        <Tilt className="Tilt br2 shadow-2">
        <div style={{ height: '200px', width: '200px', backgroundColor: 'lightblue' }}>
            <h1>Brain Power</h1>
            
        </div>
        </Tilt>
        </div>
    )
}
export default Logo; 