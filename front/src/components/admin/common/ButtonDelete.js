import React from "react";
import "../../../assets/css/admin/buttons-actions.css";

const ButtonDelete = (props) => {

  const handleClick = () => {
    props.deleteData(props.id)
  }

  return (
    <>
  
    {/* Button Delete */}
    <div className="btn">
    <a onClick={handleClick} className="bg-gray btn-sm btn-action">
      <i class="fas fa-trash-alt"></i>
      </a>
    </div>
      
    </>
  );
};

export default ButtonDelete;
