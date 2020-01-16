import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
export default function FormProducts(props) {

    const [dataCollection, setDataCollection] = useState()
    const [dataCategories, setDataCategories] = useState()
    const [productStockModify, setProductStockModify] = useState(
        {
            stock_quantity: 5,
            stock_min: 1,
        }

    )
    const [newProduct, setNewProduct] = useState(
        {
            product_name: 'kjkj',
            product_price: 0,
            product_category_id: 1,
            product_collection_id: 4,
            product_description: 'description du produit',
            product_custom: '0',
            // collection_name: 'ajouter votre collection',
            // product_image_id: 1,
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
    // récupération des id de stocks
    const fetchStock = () => {
        axios.get(`/product/stock/${newProduct.product_id}`)
            .then(res => setProductStockModify(res.data));
    }
    // modification de la hooks stock en fonction des changements du form 
    const validateNewDataStock = (e) => {
        setProductStockModify({ ...productStockModify, [e.target.name]: parseInt(e.target.value) })
    }
    // modification de la hooks NewProduct entière
    const validateNewData = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }
    // modification de la hooks collection avec traitement de la donnée
    const validateNewDataCollection = (e) => {
        // création d'une variable qui vas filtrer datacollection pour transformer collection name en collection id
        let newCollection = dataCollection.filter(collection => collection.collection_name.toUpperCase() == e.target.value.toUpperCase())
        let newCollectionId = newCollection[0].collection_id
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
        setNewProduct({ ...newProduct, product_collection_id: newCollectionId })
    }

    // modification de la hooks categorie avec traitement de la donnée
    const validateNewDataCategory = (e) => {
        // création d'une variable qui vas filtrer datacollection pour transformer collection name en collection id
        let newCategorie = dataCategories.filter(categorie => categorie.category_name.toUpperCase() == e.target.value.toUpperCase())
        let newCategorieId = newCategorie[0].category_id
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
        setNewProduct({ ...newProduct, product_category_id: newCategorieId })
    }
    // modification de la hooks en fonction des changements du form où la donnée ne doit ps être retraitée
    const validateNewDatacustom = (e) => {
        // pour le custom product
        const checkedElement = document.getElementById('product_custom')
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
        if (checkedElement.checked === true) {
            setNewProduct({ ...newProduct, product_custom: 1 })
        }
        else {
            setNewProduct({ ...newProduct, product_custom: 0 })
        }
    }
    ////////////////////////      submitNewProduct   ////////////////////////
    // fonction pour envoyer les informations du form à jours
    let handleSubmitProduct = e => {
        e.preventDefault();
        const productPut = newProduct
        delete productPut.product_stock
        delete productPut.category_name
        delete productPut.stock_quantity
        delete productPut.collection_name
        console.log('productput', productPut);
        axios     // envoi ds la bdd
            .post(`product/`, productPut)
            .then(res => {
                if (res.err) {
                    alert(res.err);
                } else {
                    alert(`${newProduct.product_name} a été ajouté avec succès!`);
                    axios // modifier le stock
                        .post(`/product/stock/${productStockModify.stock_quantity}/and/${productStockModify.stock_min}`, productStockModify)
                        .then(res => {
                            if (res.err) {
                                alert(`Le stock n'a pas été modifié`);
                            } else {
                                alert(` Le stock a bien été modifié`);
                            }
                        }
                        )
                    setTimeout(() => window.location.reload(), 2000);
                }
            })

    }

    useEffect(() => {
        fetchCollection()
        fetchCategories()
        fetchStock()

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
                            onChange={validateNewDataStock}
                            type="number"
                            className="form-control text-center"
                            id="examprixid"
                            placeholder="Ajouter la quantité de produit en stock"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock_min">Stock min</label>
                        <input
                            name='stock_min'
                            onChange={validateNewDataStock}
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

                    <div className="form-group">
                        <label htmlFor="product_custom">Personalisable ?</label>
                        <input onChange={validateNewDatacustom}
                            name='product_custom'
                            type="checkbox"
                            id="product_custom"
                        />
                    </div>

                    <div className="form-group ">
                        <label htmlFor="collection_name">Catégorie</label>
                        <select className="custom-select  text-center" name='category_name' id="inputGroupSelect01" onChange={validateNewDataCategory}>
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
                        <select className="custom-select  text-center" name='collection_name' id="inputGroupSelect02" onChange={validateNewDataCollection}>
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
                        <ButtonConfirm onClick={handleSubmitProduct} color='#234eb7' />
                    </div>
                </form>


            </Encarts>

        </>

    );
}
