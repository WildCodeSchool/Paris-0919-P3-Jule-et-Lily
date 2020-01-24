import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'
import {
  Encarts,
  ReturnButton,
} from "../../common";
export default (props) => {

  console.log('ici la data dans le encart view', props.donneesProducts);


  const productModify = props.donneesProducts
  const [promo, setPromo] = useState([])

  let Iscustom = (bool) => {
    if (bool == 1) {
      return `Le produit est personnalisable`
    }
    else {
      return `Le produit n'est pas personnalisable`
    }
  }
  let valueCustom = Iscustom(productModify.product_custom)

  const fetchPromo = () => {
    axios
    .get(`/product/${productModify.product_id}/promo`) //liste les commandes
    .then(res => { 
      setPromo([res.data[0]])
    })
  }

  useEffect(() => {
    fetchPromo();
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
            <img className="m-3" src={productModify.image_name} alt="cover" style={{ width: "250px", height: "250px", }} />
          </div>

          <div className="media-body ml-4 mt-2 mx-auto ">

            <h3 className="card-title text-center gray"> Description</h3>

            <p className="text-center gray"> {productModify.product_description}</p>
            <div className="text-center">
              <h5 className="card-title text-center gray"> Prix : {productModify.product_price} €</h5>
              <p className="gray">  Catégorie : {productModify.category_name} </p>
              <p className="gray"> Collection : {productModify.collection_name}</p>
              <p className="gray">  {valueCustom !== '' ? valueCustom : ''}</p>
              {console.log('promo',promo[0])}
              <p className="gray">  Promotion du produit : {promo[0] && promo[0].promo_id !== 1 ? <span>{promo[0].promo_name}, {promo[0].promo_value}%  , sticker : <b className={`sticker-promo`} style={{backgroundColor: promo[0].promo_sticker_color}}>{ promo[0].promo_sticker_text}</b></span> : 'pas de promotion'} </p>
            </div>
          </div>
        </div>

      </Encarts>

    </>
  );
}