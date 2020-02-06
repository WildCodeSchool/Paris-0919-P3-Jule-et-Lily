import React from "react";
import "../../../assets/css/admin/buttons-actions.css";



const ButtonSee = (props) => {
  return (
    <>

    <div className="btn" onClick={()=>props.onClickSee(props.index)} >
       <i className="bg-gray btn-sm btn-action">
         <i className="fas fa-eye fa-fw" ></i>
      </i>
    </div>
      
    </>
  );
};

export default ButtonSee;
