import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
export default function FormProducts(props) {

    const [dataCollection, setDataCollection] = useState()
    const [dataCategories, setDataCategories] = useState()
    const [productStockModify, setProductStockModify] = useState([]) // changement state stock pour le produit
    return (
        <>

            <ReturnButton onClickSee={props.onClick} />
            <Encarts title="Ajouter / Modifier les informations">

                <form className='form-group text-center'>
                    <div className="form-group">
                        <label htmlFor="designation"> Désignation</label>
                        <input
                            name='product_name'
                          
                            type="text"
                            className="form-control text-center"
                            id="designationid"
                            placeholder="Description du produit"
                            value=""

                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="prix">Prix</label>
                        <input
                          
                            type="text"
                            className="form-control text-center"
                            id="examprixid"
                            name='product_price'
                           
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock_quantity">Stock</label>
                        <input
                        
                            type="text"
                            className="form-control text-center"
                            id="examprixid"
                            name='stock_quantity'
                            placeholder=""
                            value=""
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Description">Description</label>
                        <textarea rows="15" cols="33"
                            name='product_description'
                            type="text"
                            className="form-control text-center"
                            id="exampleInputEmail1"
                            value=""
                            placeholder=""
                        />
                    </div>

                    <div className="form-group ">
                        <label htmlFor="collection_name">Catégorie</label>
                        <select className="custom-select  text-center" name='category_name' id="inputGroupSelect01">
                            <option selected></option>
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
                        <select className="custom-select  text-center" name='collection_name' id="inputGroupSelect02">
                            <option selected> </option>
                            {dataCollection &&
                                dataCollection.map((data) => {
                                    return (
                                        <option ></option>
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
                            placeholder=""
                        />
                    </div>

                    <div className='text-left'>
                        <ButtonCancel color='#234eb7' />
                        <ButtonConfirm color='#234eb7'  />
                    </div>
                </form>


            </Encarts>

        </>

    );
}
