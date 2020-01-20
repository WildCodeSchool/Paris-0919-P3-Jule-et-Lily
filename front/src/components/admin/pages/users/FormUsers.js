import React, { useState, useEffect } from 'react'
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'

export default function FormUsers (props){
    return (
        <>
          <ReturnButton onClickSee={props.onClick} />
          <Encarts title="Ajouter / Modifier les informations">
    
            <form className='form-group text-center '>
              <div className="form-group">
                <label htmlFor="lastname"> Nom</label>
                <input
                  name='user_lastname'
                  type="text"
                  className="form-control text-center"
                  id="lastname"
                  placeholder='nom'
                  // value={productModify.product_name}
                />
              </div>
    
    
              <div className="form-group">
                <label htmlFor="fisrtname">Prénom</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="designationid"
                  name='user_firstname'
                  placeholder='firstname'
                  // value={productModify.product_price}
                />
              </div>
    
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="email"
                  name='user_email'
                  placeholder='user_email'
                  // value={productStockModify.stock_quantity}
                />
              </div>
    
              <div className='text-left'>
                <ButtonCancel  color='#234eb7' />
                <ButtonConfirm color='#234eb7'  />
              </div>
            </form>
    
    
          </Encarts>
    
        </>
    
      );
}