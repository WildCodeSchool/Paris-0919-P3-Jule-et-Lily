import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
export default function FormProducts(props) {

    const [dataCollection, setDataCollection] = useState()
    const [dataCategories, setDataCategories] = useState()
    // récupération des noms de collections
    const fetchCollection = () => {
        axios.get('/collection/all/asc')
            //  .then(res => console.log(res.data[0]))
            .then(res => setDataCollection(res.data));
    }

    // récupération des noms de catégories
    const fetchCategories = () => {
        axios.get('/category/all/asc')
            .then(res => setDataCategories(res.data));
    }
    useEffect(() => {
        fetchCollection()
        fetchCategories()

    }, [])
    return (
        <>

            <ReturnButton onClickSee={props.onClick} />
            <Encarts title="Ajouter un produit">

                <form className='form-group text-center'>
                    <div className="form-group">
                        <label htmlFor="designation"> Désignation</label>
                        <input
                            name='product_name'

                            type="text"
                            className="form-control text-center"
                            id="designationid"
                            placeholder="Ajouter le nom du produit"
                            value=""

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="prix">Prix</label>
                        <input

                            type="text"
                            className="form-control text-center"
                            placeholder="Ajouter un prix"
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
                            placeholder="Ajouter la quantité de produit en stock"
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
                            placeholder="Ajouter une description au produit"
                        />
                    </div>

                    <div className="form-group ">
                        <label htmlFor="collection_name">Catégorie</label>
                        <select className="custom-select  text-center" name='category_name' id="inputGroupSelect01">
                            <option selected> Selectionner une Catégorie</option>
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
                            <option selected> Selectionner une Collection</option>
                            {dataCollection && dataCollection.map((data) => {
                                return (
                                    <option > {data.collection_name} </option>
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
                        <ButtonCancel onClick={props.onClick} color='#234eb7' />
                        <ButtonConfirm color='#234eb7' />
                    </div>
                </form>


            </Encarts>

        </>

    );
}
