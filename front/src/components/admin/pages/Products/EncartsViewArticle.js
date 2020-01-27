import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'
import '../../../../assets/css/admin/EncartsViewArticle.css'
import {
  Encarts,
  ReturnButton,
} from "../../common";
export default (props) => {

  console.log('ici la data dans le encart view', props.donneesProducts);


  const productModify = props.donneesProducts
  const [promo, setPromo] = useState([])
  const [imagesArticle, setimagesArticle] = useState([])


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
  const fetchImages = () => {
    axios
      .get(`/product/image/${props.donneesProducts.product_id}`)
      .then(res => {
        setimagesArticle(res.data)
      })
  }

  useEffect(() => {
    fetchPromo();
    fetchImages();
  }, [valueCustom])



  return (
    <>
      <ReturnButton onClickSee={props.onClickSee} />
      <Encarts title="Fiche produit">
      <div class="container">
      <div className="row mx-auto">
      <h1 className="middlepurple mx-auto "> {productModify.product_name} </h1>
      </div>
        <div className="row">


            <div className='col-md-6 col-xs-9'>
              <h5 className='text-center gray'> Images associés au produit</h5>

              <div className='bigImage text-center '>
                <img className="" src={productModify.image_name} alt="cover" style={{ width: "200px", height: "200px", }} />
              </div>

              <div className='otherImages text-center mt-3'>
                {imagesArticle &&
                  imagesArticle.map((data) => {
                    return (
                      <img className="" src={data.image_name} alt="cover" style={{ width: "100px", height: "100px", }} />
                    )
                  })}
              </div>

            </div>
            
            <div className='col-md-6 col-xs-3'>   
            <h3 className="card-title text-center gray mt-3 " > Description</h3>
            <p className="text-justify gray "> {productModify.product_description}</p>
            <div className="text-center">
              <h5 className="card-title text-center gray"> Prix : {productModify.product_price} €</h5>
              <p className="gray"> Catégorie : {productModify.category_name} </p>
              <p className="gray"> Collection : {productModify.collection_name}</p>
              <p className="gray">  {valueCustom !== '' ? valueCustom : ''}</p>
              <p className="card-text gray"> Stock: {productModify.product_stock}</p>
              <p className="gray">  Promotion du produit : {promo[0] && promo[0].promo_id !== 1 ? <span>{promo[0].promo_name}, {promo[0].promo_value}%  , sticker : <b className={`sticker-promo`} style={{ backgroundColor: promo[0].promo_sticker_color }}>{promo[0].promo_sticker_text}</b></span> : 'pas de promotion'} </p>
            </div>
          </div>
          


      </div>
      
      </div>

      </Encarts>

    </>
  );
}