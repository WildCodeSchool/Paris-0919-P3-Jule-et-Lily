import React from "react";
import "./sb-admin-2.min.css";
import "../../../assets/css/admin/global.css";
import "../../../assets/css/admin/ButtonsActions.css";
import See from "../../../assets/icons/IconSee.svg";
import Modify from "../../../assets/icons/IconModify.svg";
import Delete from "../../../assets/icons/IconDelete.svg";



const ButtonsActions = () => {
  return (
    <>
      <a href="#" className="btn bg-grey btn-lg btn-See">
      <img className="btn-icon" src = {See} alt="icon"/>
      </a>
      <a href="#" className="btn bg-grey btn-lg btn-Modify">
      <img className="btn-icon" src = {Modify} alt="icon"/>
      </a>
      <a href="#" className="btn bg-grey btn-lg btn-Delete">
      <img className="btn-icon" src = {Delete} alt="icon"/>
      </a>
    </>
  );
};

export default ButtonsActions;
