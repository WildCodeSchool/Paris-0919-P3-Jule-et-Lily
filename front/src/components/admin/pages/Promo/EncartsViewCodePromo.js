import React, { useState, useEffect } from 'react';
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'
import {
  Encarts,
  ReturnButton,
} from "../../common";
export default (props) => {

const promoModify = props.donneesPromo
const start_date = new Date(promoModify.code_promo_date_start);
const end_date = new Date(promoModify.code_promo_date_end);

  return (
    <>
      <ReturnButton onClickSee={props.onClickSee} />
      <Encarts title="Fiche code-promo">

      <div className="media-text">
          <h1 className="card-title text-center middlepurple "> {promoModify.code_promo_name}</h1>
        </div>

        <div className="media" style={{ width: "100%" }} >

          <div className="media-body ml-4 mt-2 mx-auto ">

            <h3 className="card-title text-center gray">Valeur : {promoModify.code_promo_value} %</h3>

            <h3 className="card-title text-center gray">Date de début : {start_date.toLocaleDateString()} </h3>

            <h3 className="card-title text-center gray">Date de fin : {end_date.toLocaleDateString()} </h3>

          </div>
        </div>
      </Encarts>
    </>
  );
}