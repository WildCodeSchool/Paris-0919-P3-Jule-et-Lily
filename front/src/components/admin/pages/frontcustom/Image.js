import React from "react";

const Image = (props) => {
    return (  
      <div className="sliderImage mr-5 mb-5">
        <img
        src= {props.src}
        alt= {props.alt}/>
        <input
        type="button"
        value="X"
        className="bg-gray btn-sm btn-action DeleteImageBtn"
        onClick={() => props.onClick(props.id)}
        />

      </div>
    );
}
 
export default Image;