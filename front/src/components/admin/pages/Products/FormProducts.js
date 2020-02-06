import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
import UploadImageProduct from './UploadImageProduct'
import ImageProduct from './ImageProduct'

export default function FormProducts(props) {
  const [productModify, setProductModify] = useState(props.donneesProducts)
  const [dataCollection, setDataCollection] = useState()
  const [dataCategories, setDataCategories] = useState()
  const [dataImage, setDataImage] = useState([]);
  const [dataCoverImage, setDataCoverImage] = useState([]);
  const [dataPromo, setDataPromo] = useState()
  const [productStockModify, setProductStockModify] = useState({}) // changement state stock pour le produit

  // récupération des noms de collections
  const fetchCollection = () => {
    axios.get('/collection/all/asc')
      .then(res => setDataCollection(res.data));
  }

  // récupération des noms de catégories
  const fetchCategories = () => {
    axios.get('/category/all/asc')
      .then(res => setDataCategories(res.data));
  }

  // récupération des images
  const fetchDataImage = () => {
    axios
      .get(`/product/image/${props.donneesProducts.product_id}`)
      .then(
        res => (setDataImage(res.data))
      );
  };

  // récupération de l'image de couverture
  const fetchDataCoverImage = () => {
    axios
      .get(`/product/image-cover/${props.donneesProducts.product_id}`)
      .then(
        res => (setDataCoverImage(res.data))
      );
  };


  // const reloadUpload = () => {
  //   fetchDataImage();
  // }

  // récupération des id de stocks
  const fetchStock = () => {
    axios.get(`/product/stock/${props.donneesProducts.product_id}`)
      .then(res => setProductStockModify(...res.data));
  }
  const fetchPromo = () => {
    axios.get('/promo/all')
      .then(res => setDataPromo(res.data));
  }
  // modification de la hooks stock en fonction des changements du form 
  const validateNewDataStock = (e) => {
    setProductStockModify({ ...productStockModify[0], [e.target.name]: parseInt(e.target.value) })
  }

  // modification de la hooks en fonction des changements du form où la donnée ne doit ps être retraitée
  const validateNewData = (e) => {
    setProductModify({ ...productModify, [e.target.name]: e.target.value })
  }

  // modification de la hooks en fonction des changements du form où la donnée ne doit ps être retraitée
  const validateNewDatacustom = (e) => {
    // pour le custom product
    const checkedElement = document.getElementById('product_custom')
    setProductModify({ ...productModify, [e.target.name]: e.target.value })
    if (checkedElement.checked === true) {
      setProductModify({ ...productModify, product_custom: 1 })
    }
    else {
      setProductModify({ ...productModify, product_custom: 0 })
    }
  }
  // modification de la hooks collection avec traitement de la donnée
  const validateNewDataCollection = (e) => {
    // création d'une variable qui vas filtrer datacollection pour transformer collection name en collection id
    let newCollection = dataCollection.filter(collection => collection.collection_name.toUpperCase() === e.target.value.toUpperCase())
    let newCollectionId = newCollection[0].collection_id
    setProductModify({ ...productModify, [e.target.name]: e.target.value })
    setProductModify({ ...productModify, product_collection_id: newCollectionId })
  }


  // modification de la hooks categorie avec traitement de la donnée
  const validateNewDataCategory = (e) => {
    // création d'une variable qui vas filtrer datacollection pour transformer collection name en collection id
    let newCategorie = dataCategories.filter(categorie => categorie.category_name.toUpperCase() === e.target.value.toUpperCase())
    let newCategorieId = newCategorie[0].category_id
    setProductModify({ ...productModify, [e.target.name]: e.target.value })
    setProductModify({ ...productModify, product_category_id: newCategorieId })
  }




  // fonction pour envoyer les informations du form à jour
  let handleSubmit = e => {
    e.preventDefault();
    const productPut = productModify
    delete productPut.product_stock
    delete productPut.category_name
    delete productPut.collection_name
    delete productPut.product_cover_image_id
    delete productPut.image_name
    delete productPut.product_stock_min
    axios     // récupération des données produit et envoi ds la bdd
      .put(`product/${productModify.product_id}`, productPut)
      .then(res => {
        if (res.err) {
          alert(res.err);
        } else {
          alert(` ${productModify.product_name} a été modifié avec succès!`)
        }
      }).catch(e => {
        alert(`Erreur lors de la modification de ${productModify.product_name}`)
      });
    axios // modifier le stock
      .put(`/product/stock/${props.donneesProducts.product_id}`, productStockModify)
      .then(res => {
        if (res.err) {
          alert(`Le stock n'a pas été modifié`);
        } else {
          alert(` Le stock a bien été modifié`);
          props.reload(); // au lieu de recharger complètement la page on execute la fonction reload du composant parent
        }
      })
  }


   // envoi de l'image choisie en couverture

   const chooseCoverImage = (id) => {
    axios
    .put(`/product/image-cover/${id}/${props.donneesProducts.product_id}`)
    .then(res => {
      if (res.err) {
        alert(res.err);
      } else {
        alert(`l'image de couverture de ${productModify.product_name} a été modifié avec succès!`)
        fetchDataCoverImage()
        fetchDataImage()
      }
    })
    .catch(e => {
      alert(`Erreur lors de la modification de ${productModify.product_name}`)
    });
  }



  ////////////////////////// deleteImage //////////////////////////

  const handleDelete = id => {
    if (dataImage.length+dataCoverImage.length > 1) {
    axios
      .delete(`/product/image/${id}`)
      .then(res => {
        if (res.error) {
          alert("Erreur lors de la suppression de l'image du produit", res.error);
        } else {
          alert(`l'image du produit a été supprimée avec succès!`);
          fetchDataImage()
        }
      })
  } else {
    alert ("Attention il faut garder au moins une image par produit");
  }
}

  useEffect(() => {
    fetchCollection()
    fetchCategories()
    fetchStock()
    fetchDataImage()
    fetchDataCoverImage()
    fetchPromo()
  }, [] )

  return (
    <>

      <ReturnButton onClickSee={props.onClick} />
      <Encarts title="Ajouter / Modifier les informations">
        <form className="form-group text-center ">
          <div className="form-group">
            <label htmlFor="designation"> Désignation</label>
            <input
              name="product_name"
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
              type="number"
              step="0.01"
              className="form-control text-center"
              id="examprixid"
              name="product_price"
              placeholder={productModify.product_price}
              value={productModify.product_price}
            />
          </div>


          <div className="form-group">
            <label htmlFor="promo">Promo</label>
            <select className="custom-select  text-center" name='product_promo_id' id="inputGroupSelect02" onChange={validateNewData}>
              {dataPromo &&
                dataPromo.map((data) => {
                 return( productModify.product_promo_id === data.promo_id 
                    ?     
                  <option selected value={data.promo_id}> {data.promo_name}</option> 
                  :             
                    <option value={data.promo_id} >{data.promo_name}</option>
                )})}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="stock_quantity">Stock</label>
            <input
              onChange={validateNewDataStock}
              required
              type="number"
              className="form-control text-center"
              id="examprixid"
              name="stock_quantity"
              placeholder={productModify.product_stock}
              value={productStockModify.stock_quantity}
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock_min">Stock min </label>
            <input
              onChange={validateNewDataStock}
              required
              type="number"
              className="form-control text-center"
              id="examprixid"
              name="stock_min"
              placeholder={productModify.stock_min}
              value={productStockModify.stock_min}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              rows="8"
              cols="33"
              onChange={validateNewData}
              name="product_description"
              type="text"
              className="form-control text-center"
              id="exampleInputEmail1"
              value={productModify.product_description}
              placeholder={productModify.product_description}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="product_custom">Personnalisable ?</label>
            <input
              onChange={validateNewDatacustom}
              className=" form ml-3 "
              name="product_custom"
              type="checkbox"
              id="product_custom"
            />
          </div>

          <div className="form-group ">
            <label htmlFor="category_name">Catégorie</label>
            <select
              className="custom-select  text-center"
              name="category_name"
              id="inputGroupSelect01"
              onChange={validateNewDataCategory}
            >
              <option selected>
                {productModify.category_name} {productModify.category_id}
              </option>
              {dataCategories &&
                dataCategories.map(data => {
                  return <option>{data.category_name} </option>;
                })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="collection_name">Collection</label>
            <select
              className="custom-select  text-center"
              name="collection_name"
              id="inputGroupSelect02"
              onChange={validateNewDataCollection}
            >
              <option selected> {productModify.collection_name}</option>
              {dataCollection &&
                dataCollection.map(data => {
                  return <option> {data.collection_name}</option>;
                })}
            </select>
          </div>
{/* /////////////upload d'image */}
          <div className="form m-auto">
            <label htmlFor="image">Choix des Images</label>
            <div className="sliderBlock m-auto sliderBlockResponsive uploadForm">
            <div className="m-auto bg-middlegray coverImageBlock w-100">
              <p className="text-center">Image de Couverture</p>
              {dataCoverImage[0] &&
                  <ImageProduct
                    src={dataCoverImage[0].image_name}
                    alt={dataCoverImage[0].image_name}
                    key={dataCoverImage[0].image_id}
                    id={dataCoverImage[0].image_id}
                    onClick={null}
                    />
                  }
              </div>
              <div className="ml-auto mr-auto mt-5 w-100 row">
              {dataImage &&
                dataImage.map(item => (
                  <ImageProduct
                    src={item.image_name}
                    alt={item.image_name}
                    key={item.image_id}
                    id={item.image_id}
                    onClick={() => handleDelete(item.image_id)}
                    onChoose={() => chooseCoverImage(item.image_id)}
                  />
                ))}
              </div>
              <div className="container ">
                <UploadImageProduct ProductId = {props.donneesProducts.product_id} fetchDataImage={fetchDataImage}/>
              </div>
              </div>    
            </div>

            <div className="ButtonsGroup text-right">
            <ButtonCancel onClick={props.onClick} color='#234eb7' />
            <ButtonConfirm color='#234eb7' onClick={handleSubmit} />
          </div>
        </form>
      </Encarts>
    </>
  );
}
