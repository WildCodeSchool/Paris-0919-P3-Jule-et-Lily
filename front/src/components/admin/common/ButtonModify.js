import React, { useState } from "react";
import "../../../assets/css/admin/buttons-actions.css";


const ButtonModify = (props) => {

  return (
    <>
      <div className="btn" onClick={()=>props.onClick(props.index)} >
        <i className="bg-gray btn-sm btn-action">
          <i class="fas fa-pen"></i>
        </i>
      </div>

    </>
  );
};

export default ButtonModify;
