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

        <form className='form-group text-center'>
          <div className="form-group">
            <label htmlFor="designation"> Désignation</label>
            <input
              disabled
              name='product_name'
              type="text"
              className="form-control text-center"
              id="designationid"
              placeholder={productModify.product_name}
              value={productModify.product_name}

            />
          </div>


          <div className="form-group">
            <label htmlFor="prix">Prix</label>
            <input
              disabled
              type="text"
              className="form-control text-center"
              id="examprixid"
              name='product_price'
              placeholder={productModify.product_price}
              value={productModify.product_price}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea rows="10" 
              disabled
              name='product_description'
              type="text"
              className="form-control text-center"
              id="exampleInputEmail1"
              value={productModify.product_description}
              placeholder={productModify.product_description}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product_custom">Personnalisable ?</label>
            <input
              disabled
              className="form-control text-center"
              type="text"
              value={valueCustom != '' ? valueCustom : ''}
            />
          </div>

          <div className="form-group ">
            <label htmlFor="category">Catégorie</label>
            <input disabled name='category' className="form-control text-center" value={productModify.category_name} />

          </div>

          <div className="form-group ">
            <label htmlFor="category">Collection</label>
            <input disabled name='category' className="form-control text-center" value={productModify.collection_name} />

          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              disabled
              type="text"
              className="form-control text-center"
              id="imageid"
              placeholder={productModify.product_image_id}
            />
          </div>
        </form>
      </Encarts>

    </>
  );
}