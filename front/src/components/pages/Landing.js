import React from "react";
import './Landing.css'
import img from "./imgs/atena.png"


const Landing = () => {
  return (
    <div className='wrapper'>
      <div className="titulo">
        <img className= "atena" src={img}/>
      </div>
    </div>
  )
}


export default Landing;