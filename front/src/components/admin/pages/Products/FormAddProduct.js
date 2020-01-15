import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
export default function FormProducts(props) {

    const [dataCollection, setDataCollection] = useState()
    const [dataCategories, setDataCategories] = useState()
    const [newProduct, setNewProduct] = useState(
        {
            product_name: 'kjkj',
            product_price: 0,
            // stock_quantity: 0,
            product_category_id: 1,
            product_collection_id: 4,
            product_description: 'description du produit',
            product_custom: '0',
            // collection_name: 'ajouter votre collection',
            // product_image_id: 1,
            // product_stock: 5,
        })

    ////////////////// récupération des données ////////////////////

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

    // modification de la hooks 
    const validateNewData = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }
    ////////////////////////        submitNewProduct    ////////////////////////
    // fonction pour envoyer les informations du form à jours
    let handleSubmit = e => {
        e.preventDefault();
        // const productPut= newProduct
        // delete productPut.product_stock
        // delete productPut.category_name
        // delete productPut.stock_quantity
        // delete productPut.collection_name
        // delete productPut.category_id
        // delete productPut.product_collection_id
        console.log('productput',newProduct);
        axios     // récupération des données produit et envoi ds la bdd
            .post(`product/`, newProduct)
            .then(res => {
                if (res.err) {
                    alert(res.err);
                } else {
                    alert(`${newProduct.product_name} a été ajouté avec succès!`);
                }
            })
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
                            onChange={validateNewData}
                            type="text"
                            className="form-control text-center"
                            id="designationid"
                            placeholder="Ajouter le nom du produit"
                            value={setNewProduct.product_name}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_price">Prix</label>
                        <input
                            name='product_price'
                            onChange={validateNewData}
                            type="number"
                            className="form-control text-center"
                            placeholder="Ajouter un prix"
                            id="examprixid"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock_quantity">Stock</label>
                        <input
                            name='stock_quantity'
                            onChange={validateNewData}
                            type="number"
                            className="form-control text-center"
                            id="examprixid"
                            placeholder="Ajouter la quantité de produit en stock"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_description">Description</label>
                        <textarea rows="15" cols="33"
                            name='product_description'
                            onChange={validateNewData}
                            type="text"
                            className="form-control text-center"
                            id="exampleInputEmail1"
                            placeholder="Ajouter une description au produit"
                        />
                    </div>

                    <div className="form-group ">
                        <label htmlFor="collection_name">Catégorie</label>
                        <select className="custom-select  text-center" name='category_name' id="inputGroupSelect01" onChange={validateNewData}>
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
                        <select className="custom-select  text-center" name='collection_name' id="inputGroupSelect02" onChange={validateNewData}>
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
                            name='product_image_id'
                            type="text"
                            onChange={validateNewData}
                            className="form-control text-center"
                            id="imageid"
                            placeholder=""
                        />
                    </div>

                    <div className='text-left'>
                        <ButtonCancel onClick={props.onClick} color='#234eb7' />
                        <ButtonConfirm onClick={handleSubmit} color='#234eb7' />
                    </div>
                </form>


            </Encarts>

        </>

    );
}
