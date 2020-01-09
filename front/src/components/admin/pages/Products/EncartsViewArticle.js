import React from 'react';
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'
import {
  ButtonAdd,
  ButtonConfirm,
  ButtonDelete,
  ButtonModify,
  ButtonSee,
  ButtonCancel,
  Cards,
  Encarts,
  Pagination,
  SearchBar,
  Tables,
  Form,
  FormProducts,
  ReturnButton,
} from "../../common";
export default (props) => {

console.log('ici la data dans le encart view',props.donneesProducts);

  return (
    <>
    
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-center bg-lightgray">
          <h6 className="font-weight-bold text-uppercase gray" > {props.title}</h6>
        </div>
        <div className="card-body">
          <div className="column encartContent">
            {props.children}
      
          </div>
          <ReturnButton onClickSee={props.onClickSee} />
        </div>
      </div>
    </>
  );
}