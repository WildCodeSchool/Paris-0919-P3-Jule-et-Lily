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


      <form className='form-group text-center '>
          <div className="form-group">
            <label htmlFor="promo_name">Désignation</label>
            <input
            disabled
              name='promo_name'
              type="text"
              className="form-control text-center"
              id="designationid"
              placeholder={promoModify.code_promo_name}
              value={promoModify.code_promo_name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="promo_value">Valeur</label>
            <input
            disabled
              name="promo_value"
              type="text"
              step="0.01"
              className="form-control text-center"
              id="imageid"
              placeholder={promoModify.code_promo_value}
              value={promoModify.code_promo_value}
            />
          </div>

          

          <div className="form-group">
            <label htmlFor="image">Date de début</label>
            <input
            disabled
              name="code_promo_date_start"
              type="text"
              className="form-control text-center"
              id="imageid"
              placeholder={start_date.toLocaleDateString()}
              value={start_date.toLocaleDateString()}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Date de fin</label>
            <input
            disabled
              name="promo_sticker_id"
              type="text"
              className="form-control text-center"
              id="imageid"
              placeholder={end_date.toLocaleDateString()}
              value={end_date.toLocaleDateString()}
            />
          </div>
          </form>
      </Encarts>
    </>
  );
}