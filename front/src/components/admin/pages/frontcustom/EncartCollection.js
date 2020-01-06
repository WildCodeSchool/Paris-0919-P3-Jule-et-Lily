import React, {useState, useEffect} from "react";

const EncartCollection = (props) => {
    return (  
         <div style={{BackgroundColor : props.backgroundColor}}>
            <h5 style={{color:props.titleColor}}>{props.title}</h5>
         </div>
    );
}
 
export default EncartCollection;