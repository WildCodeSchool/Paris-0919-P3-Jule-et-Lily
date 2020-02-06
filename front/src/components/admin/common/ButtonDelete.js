import React from "react";
import "../../../assets/css/admin/buttons-actions.css";

const ButtonDelete = (props) => {

  const handleClick = () => {
    props.deleteData(props.id)
  }

  return (
    <>
    <div className="btn">
    <i onClick={handleClick} className="bg-gray btn-sm btn-action">
      <i className="fas fa-trash-alt"></i>
      </i>
    </div>
      
    </>
  );
};

export default ButtonDelete;
