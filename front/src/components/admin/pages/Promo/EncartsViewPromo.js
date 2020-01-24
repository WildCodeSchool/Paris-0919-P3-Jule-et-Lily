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

        <div className="media" style={{ width: "100%" }}>
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
            <p>
              { promoModify.promo_sticker_text != 'NULL' ?
              <b className={`sticker-promo`} style={{backgroundColor:promoModify.promo_sticker_color}}>{promoModify.promo_sticker_text}
              </b>
                 :
                 'pas de sticker'
              }</p>
          </div>
        </div>
      </Encarts>
    </>
  );
};
