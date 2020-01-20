import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
export default function FormProducts(props) {
  const [productModify, setProductModify] = useState(props.donneesProducts)
  const [dataCollection, setDataCollection] = useState()
  const [dataCategories, setDataCategories] = useState()
  const [productStockModify, setProductStockModify] = useState({}) // changement state stock pour le produit
  console.log('productStock', productStockModify);
  console.log('dataCategories', dataCategories);



  return (
    <>

      <ReturnButton onClickSee={props.onClick} />
      <Encarts title="Ajouter / Modifier les informations">

        <form className='form-group text-center '>
          <label htmlFor="designation"> Désignation</label>
          <input
            name='product_name'
           
            type="text"
            className="form-control text-center"
            id="designationid"
            placeholder="Ajouter le nom du produit"
           
          />


          <div className='text-left'>
            <ButtonCancel onClick={props.onClick} color='#234eb7' />
            <ButtonConfirm color='#234eb7' />
          </div>
        </form>


      </Encarts>

    </>

  );
}
