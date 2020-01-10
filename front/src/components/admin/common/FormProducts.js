import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from './ButtonConfirm'
import ButtonCancel from './ButtonCancel'
import Encarts from './Encarts'
import ReturnButton from '../common/ReturnButton'
export default function FormProducts(props) {

  const [productModify, setProductModify] = useState(props.donneesProducts)
  const [dataCollection, setDataCollection] = useState()
  const [dataCategories, setDataCategories] = useState()
  console.log('props de donnes products', props.donneesProducts);
  console.log('datacollection', dataCollection);


  // récupération des noms de collections
  const fetchCollection = () => {
    axios.get('/collection/all/asc')
      //  .then(res => console.log(res.data[0]))
      .then(res => setDataCollection(res.data));
  }

  // récupération des noms de catégories
  const fetchCategories = () => {
    axios.get('/category/all/asc')
      //  .then(res => console.log(res.data[0]))
      .then(res => setDataCategories(res.data));
  }

  // modification de la hooks en fonction des changements du form où la donnée ne doit ps être retraitée
  const validateNewData = (e) => {

    setProductModify({ ...productModify, [e.target.name]: e.target.value })
  }
  // modification de la hooks collection avec traitement de la donnée
  const validateNewDataCollection = (e) => {
    // création d'une variable qui vas filtrer datacollection pour transformer collection name en collection id
    let newCollection = dataCollection.filter(collection => collection.collection_name.toUpperCase() == e.target.value.toUpperCase())
    let newCollectionId = newCollection[0].collection_id
    setProductModify({ ...productModify, [e.target.name]: e.target.value })
    console.log('newcollection', newCollection);
    console.log('-------');
    console.log('e target', e.target.value);
    console.log('newcollectionid', newCollectionId);
    setProductModify({ ...productModify, product_collection_id: newCollectionId })
  }


  // fetch ds un hooks pour maper les noms des catégories etc ...

  // fonction pour envoyer les informations du form à jours
  let handleSubmit = e => {
    e.preventDefault();
    const productPut = productModify
    delete productPut.product_stock
    delete productPut.category_name
    delete productPut.collection_name

    console.log('productput', productPut);

    axios
      .put(`product/${productModify.product_id}`, productPut)
      .then(res => {
        if (res.err) {
          alert(res.err);
        } else {
          alert(` ${productModify.product_name} a été ajouté avec succès!`);
        }
      }).catch(e => {
        console.error(e);
        alert(`Erreur lors de la modification de ${productModify.product_name}`);
      });
    setTimeout(() => window.location.reload(), 2000);
  }

  useEffect(() => {
    fetchCollection()
    fetchCategories()

  }, [])
  return (
    <>


      <Encarts title="Ajouter / Modifier les informations">
        <ReturnButton onClickSee={props.onClick} />
        <form className='form-group text-center'>
          <div className="form-group">
            <label htmlFor="designation"> Désignation</label>
            <input
              name='product_name'
              onChange={validateNewData}
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
            <select className="custom-select  text-center" name='category_name' id="inputGroupSelect01" onChange={validateNewData}>
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
