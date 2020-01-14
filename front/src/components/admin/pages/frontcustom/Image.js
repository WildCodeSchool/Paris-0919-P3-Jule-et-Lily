import React, { useState, useEffect } from "react";

const Image = (props) => {
    return (  
      <>
        <img
        className="sliderImage mr-5"
        src= {props.src}
        alt= {props.alt} />
        <input
        type="button"
        value="X"
        className="sup"
        onClick={() => props.onClick(props.id)}
        />
      </>
    );
}
 
export default Image;