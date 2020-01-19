import React, { useState, useEffect } from 'react';
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'
import {
  Encarts,
  ReturnButton,
} from "../../common";
export default (props) => {

  console.log('ici la data dans le encart view', props.donneesProducts);


  const productModify = props.donneesProducts


  let Iscustom = (bool) => {
    if (bool == 1) {
      return `Le produit est personnalisable`
    }
    else {
      return `Le produit n'est pas personnalisable`
    }
  }
  let valueCustom = Iscustom(productModify.product_custom)

  useEffect(() => {
  }, [valueCustom])

  return (
    <>
      <ReturnButton onClickSee={props.onClickSee} />
      <Encarts title="Fiche produit">

        <div className="media-text">
          <h1 className="card-title text-center middlepurple "> {productModify.product_name} </h1>
          <p className="card-text gray"> Stock: {productModify.product_stock}</p>
        </div>

        <div class="media" style={{ width: "100%" }} >

          <div className="media-left">
            <img className="m-3" src={productModify.image_url} alt="cover" style={{ width: "250px", height: "250px", }} />
          </div>

          <div className="media-body ml-4 mt-2 mx-auto ">

            <h3 className="card-title text-center gray"> Description</h3>

            <p className="text-center gray"> {productModify.product_description}</p>
            <div className="text-center">
              <h5 className="card-title text-center gray"> Prix : {productModify.product_price} €</h5>
              <p className="gray">  Catégorie : {productModify.category_name} </p>
              <p className="gray"> Collection : {productModify.collection_name}</p>
              <p className="gray">  {valueCustom !== '' ? valueCustom : ''}</p>
            </div>

          </div>
        </div>

      </Encarts>

    </>
  );
}