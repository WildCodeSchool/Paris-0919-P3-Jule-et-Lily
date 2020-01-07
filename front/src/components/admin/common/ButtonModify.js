 import React from "react";
import "../../../assets/css/admin/buttons-actions.css";



const ButtonModify = (props) => {
  return (
    <>
    <div className="btn" onClick={props.onClick}>
    <a href="#" className="bg-gray btn-sm btn-action">
      <i class="fas fa-pen"></i>
      </a>
    </div>
      
    </>
  );
};

export default ButtonModify;
