import React from "react"

const FlashMsg = (props) => {
    return (
        <div className={`alert alert-${props.type}`} visibility={props.visibility}>
            <span className="close" onClick={props.close}><strong>X</strong></span>
            <p className="px-3">{props.message}</p>
        </div>
    );
  };
  

export default FlashMsg