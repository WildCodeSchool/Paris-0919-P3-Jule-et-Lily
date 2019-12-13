import React from "react";
// import "../../../assets/css/sb-admin-2.min.css";
import "../../../assets/css/admin/global.css";
import "../../../assets/css/admin/buttons-actions.css";



const ButtonsActions = () => {
  return (
    <>
    {/* Buttons see/modify/delete  */}

    <div>
    <a href="#" className="btn bg-gray btn-sm btn-action">
      <i class="fas fa-eye fa-fw"></i>
      </a>

      <a href="#" className="btn bg-gray btn-sm btn-action">
      <i class="fas fa-pen"></i>
      </a>

      <a href="#" className="btn bg-gray btn-sm btn-action">
      <i class="fas fa-trash-alt"></i>
      </a>
    </div>

    {/* Button Add */}
    <div>
    <a href="#" className="btn bg-gray btn-sm btn-action">
      <i class="fas fa-plus"></i>
      </a>
    </div>
      
    </>
  );
};

export default ButtonsActions;
