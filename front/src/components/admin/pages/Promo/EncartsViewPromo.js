import React, { useState, useEffect } from "react";
import "../../../../assets/css/admin/global.css";
import "../../../../assets/css/admin/cards.css";
import { Encarts, ReturnButton } from "../../common";
export default props => {
  const promoModify = props.donneesPromo;

  return (
    <>
      <ReturnButton onClickSee={props.onClickSee} />
      <Encarts title="Fiche promo">
        <div className="media-text">
          <h1 className="card-title text-center middlepurple ">
            {" "}
            {promoModify.promo_name}
          </h1>
        </div>

        <div class="media" style={{ width: "100%" }}>
          {/* <div className="media-left">
            <img className="m-3" src={promoModify.promo_sticker_id} alt="sticker-promo" style={{ width: "250px", height: "250px", }} />
          </div> */}

          <div className="media-body ml-4 mt-2 mx-auto text-center">
            <h3 className="card-title text-center gray">
              Valeur : {promoModify.promo_value} %
            </h3>
            
            <h3 className="card-title text-center gray">
              Sticker :
            </h3>
            <p><b class={`sticker-promo`} style={{backgroundColor:promoModify.promo_sticker_color}}>{promoModify.promo_sticker_text}</b></p>
          </div>
        </div>

        {/* <form className='form-group text-center '>
          <div className="form-group">
            <label htmlFor="promo_name">Désignation</label>
            <input
            disabled
              name='promo_name'
              type="text"
              className="form-control text-center"
              id="designationid"
              placeholder={promoModify.promo_name}
              value={promoModify.promo_name}
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
              placeholder={promoModify.promo_value}
              value={promoModify.promo_value}
            />
          </div>

          

          <div className="form-group">
            <label htmlFor="image">Sticker</label>
            <input
            disabled
              name="promo_sticker_id"
              type="text"
              className="form-control text-center"
              id="imageid"
              step="0.01"
              placeholder={promoModify.promo_sticker_id}
              value={promoModify.ppromo_sticker_id}
            />
          </div>
          </form> */}
      </Encarts>
    </>
  );
};
