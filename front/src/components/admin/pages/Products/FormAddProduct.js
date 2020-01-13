import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
export default function FormProducts(props) {


  return (
    <>

      <ReturnButton onClickSee={props.onClick} />
      <Encarts title="Ajouter / Modifier les informations">

        <form className='form-group text-center'>
          <div className="form-group">
            <label htmlFor="designation"> Désignation</label>
            <input
              name='product_name'
              onChange={validateNewData}
              type="text"
              className="form-control text-center"
              id="designationid"
              placeholder=''
              value={productModify.product_name}

            />
          </div>


          <div className="form-group">
            <label htmlFor="prix">Prix</label>
            <input
              onChange={validateNewData}
              type="text"
              className="form-control text-center"
              id="examprixid"
              name='product_price'
              placeholder={productModify.product_price}
              value={productModify.product_price}
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock_quantity">Stock</label>
            <input
              onChange={validateNewDataStock}
              type="text"
              className="form-control text-center"
              id="examprixid"
              name='stock_quantity'
              placeholder={productModify.product_stock}
              value={productStockModify.stock_quantity}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea rows="15" cols="33" onChange={validateNewData}
              name='product_description'
              type="text"
              className="form-control text-center"
              id="exampleInputEmail1"
              value={productModify.product_description}
              placeholder={productModify.product_description}
            />
          </div>

          <div className="form-group ">
            <label htmlFor="collection_name">Catégorie</label>
            <select className="custom-select  text-center" name='category_name' id="inputGroupSelect01" onChange={validateNewDataCategory}>
              <option selected>{productModify.category_name} {productModify.category_id}</option>
              {dataCategories &&
                dataCategories.map((data) => {
                  return (
                    <option >{data.category_name} </option>
                  )
                })}
            </select>
          </div>

          <div className="form-group ">
            <label htmlFor="collection_name">Collection</label>
            <select className="custom-select  text-center" name='collection_name' id="inputGroupSelect02" onChange={validateNewDataCollection}>
              <option selected> {productModify.collection_name}</option>
              {dataCollection &&
                dataCollection.map((data) => {
                  return (
                    <option > {data.collection_name}</option>
                  )
                })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              className="form-control text-center"
              id="imageid"
              placeholder={productModify.product_image_id}
            />
          </div>

          <div className='text-left'>
            <ButtonCancel onClick={props.onClick} color='#234eb7' />
            <ButtonConfirm color='#234eb7' onClick={handleSubmit} />
          </div>
        </form>


      </Encarts>

    </>

  );
}
