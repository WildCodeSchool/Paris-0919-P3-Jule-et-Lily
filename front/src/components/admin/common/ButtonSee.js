import React from "react";
import "../../../assets/css/admin/buttons-actions.css";



const ButtonSee = (props) => {
  return (
    <>
  
    {/* Button See */}
    <div className="btn" onClick={()=>props.onClickSee(props.index)} >
       <a href="#" className="bg-gray btn-sm btn-action">
         <i class="fas fa-eye fa-fw" ></i>
      </a>
    </div>
      
    </>
  );
};

export default ButtonSee;
