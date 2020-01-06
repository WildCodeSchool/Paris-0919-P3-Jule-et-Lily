import React, { useState } from "react";
import "../../../assets/css/admin/buttons-actions.css";


const ButtonModify = (props) => {

  return (
    <>

      {/* Button Modify */}
      {/* <div className="btn" onClick={() => setClick(!click)} > */}
      <div className="btn" onClick={props.cliquer} >
        <i className="bg-gray btn-sm btn-action">
          <i class="fas fa-pen"></i>
        </i>
      </div>

    </>
  );
};

export default ButtonModify;
