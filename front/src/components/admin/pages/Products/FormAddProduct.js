import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonConfirm from "../../common/ButtonConfirm";
import ButtonCancel from "../../common/ButtonCancel";
import Encarts from "../../common/Encarts";
import ReturnButton from "../../common/ReturnButton";
import FakeUploadImageProduct from "./FakeUploadImageProduct";
import ImageProduct from "./ImageProduct";

export default function FormProducts(props) {
  const [dataCollection, setDataCollection] = useState();
  const [dataCategories, setDataCategories] = useState();
  const [productStockModify, setProductStockModify] = useState({
    stock_quantity: 5,
    stock_min: 1
  });
  const [newProduct, setNewProduct] = useState({
    product_name: "nom du produit",
    product_price: 0,
    product_category_id: 1,
    product_collection_id: 4,
    product_description: "description du produit",
    product_custom: "0"
    // collection_name: 'ajouter votre collection',
    // product_image_id: 1,
  });

  const [fakeDataImage, setFakeDataImage] = useState([]);
  const [fakeDataCoverImage, setfakeDataCoverImage] = useState([]);

  ////////////////// récupération des données ////////////////////
  // récupération des noms de collections
  const fetchCollection = () => {
    axios
      .get("/collection/all/asc")
      //  .then(res => console.log(res.data[0]))
      .then(res => setDataCollection(res.data));
  };

  // récupération des noms de catégories
  const fetchCategories = () => {
    axios.get("/category/all/asc").then(res => setDataCategories(res.data));
  };


  // récupération des id de stocks
  const fetchStock = () => {
    axios
      .get(`/product/stock/${newProduct.product_id}`)
      .then(res => setProductStockModify(res.data));
  };
  // modification de la hooks stock en fonction des changements du form
  const validateNewDataStock = e => {
    setProductStockModify({
      ...productStockModify,
      [e.target.name]: parseInt(e.target.value)
    });
  };
  // modification de la hooks NewProduct entière
  const validateNewData = e => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  // modification de la hooks collection avec traitement de la donnée
  const validateNewDataCollection = e => {
    // création d'une variable qui vas filtrer datacollection pour transformer collection name en collection id
    let newCollection = dataCollection.filter(
      collection => collection.collection_name == e.target.value
    );
    let newCollectionId = newCollection[0].collection_id;
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    setNewProduct({ ...newProduct, product_collection_id: newCollectionId });
  };

  // modification de la hooks categorie avec traitement de la donnée
  const validateNewDataCategory = e => {
    // création d'une variable qui vas filtrer datacollection pour transformer collection name en collection id
    let newCategorie = dataCategories.filter(
      categorie => categorie.category_name == e.target.value
    );
    let newCategorieId = newCategorie[0].category_id;
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    setNewProduct({ ...newProduct, product_category_id: newCategorieId });
  };
  // modification de la hooks en fonction des changements du form où la donnée ne doit ps être retraitée
  const validateNewDatacustom = e => {
    // pour le custom product
    const checkedElement = document.getElementById("product_custom");
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    if (checkedElement.checked === true) {
      setNewProduct({ ...newProduct, product_custom: 1 });
    } else {
      setNewProduct({ ...newProduct, product_custom: 0 });
    }
  };
  ////////////////////////      submitNewProduct   ////////////////////////
  // fonction pour envoyer les informations du form à jours
  let handleSubmitProduct = e => {
    e.preventDefault();
    const productPut = newProduct;
    delete productPut.product_stock;
    delete productPut.category_name;
    delete productPut.stock_quantity;
    delete productPut.collection_name;

    delete productPut.collection_name;
    console.log("productput", productPut);
    axios // envoi ds la bdd
      .post(`product/`, productPut)
      .then(res => {
        if (res.err) {
          alert(res.err);
        } else {
          alert(`${newProduct.product_name} a été ajouté avec succès!`);
          axios // modifier le stock
            .post(
              `/product/stock/${productStockModify.stock_quantity}/and/${productStockModify.stock_min}`,
              productStockModify
            )
            .then(res => {
              if (res.err) {
                alert(`Le stock n'a pas été modifié`);
              } else {
                alert(` Le stock a bien été modifié`);
              }
            });
          props.reloadAdd();
        }
      });
  };

  // envoi de l'image choisie en couverture

  const chooseCoverImage = id => {
  };

  ////////////////////////// deleteImage //////////////////////////

  const handleDelete = id => {
      //supprimer image dans le state
  };

  useEffect(() => {
    fetchCollection();
    fetchCategories();
    fetchStock();
  }, []);
  return (
    <>
      <ReturnButton onClickSee={props.onClick} />
      <Encarts title="Ajouter un produit">
        <form className="form-group text-center">
          <div className="form-group">
            <label htmlFor="designation"> Désignation</label>
            <input
              name="product_name"
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
              name="product_price"
              onChange={validateNewData}
              type="number"
              step="0.01"
              className="form-control text-center"
              placeholder="Ajouter un prix"
              id="examprixid"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock_quantity">Stock</label>
            <input
              name="stock_quantity"
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
              name="stock_min"
              onChange={validateNewDataStock}
              type="number"
              className="form-control text-center"
              id="examprixid"
              placeholder="Ajouter la quantité de produit en stock"
            />
          </div>

          <div className="form-group">
            <label htmlFor="product_description">Description</label>
            <textarea
              rows="15"
              cols="33"
              name="product_description"
              onChange={validateNewData}
              type="text"
              className="form-control text-center"
              id="exampleInputEmail1"
              placeholder="Ajouter une description au produit"
            />
          </div>

          <div className="form-group">
            <label htmlFor="product_custom">Personalisable ?</label>
            <input
              onChange={validateNewDatacustom}
              name="product_custom"
              type="checkbox"
              id="product_custom"
            />
          </div>

          <div className="form-group text-center ">
            <label htmlFor="collection_name">Catégorie</label>
            <select
              className="custom-select text-center"
              name="category_name"
              id="inputGroupSelect01"
              onChange={validateNewDataCategory}
            >
              <option selected> Selectionner une Catégorie</option>
              {dataCategories &&
                dataCategories.map(data => {
                  return <option>{data.category_name} </option>;
                })}
            </select>
          </div>

          <div className="form-group ">
            <label htmlFor="collection_name">Collection</label>
            <select
              className="custom-select  text-center"
              name="collection_name"
              id="inputGroupSelect02"
              onChange={validateNewDataCollection}
            >
              <option selected> Selectionner une Collection</option>
              {dataCollection &&
                dataCollection.map(data => {
                  return <option> {data.collection_name} </option>;
                })}
            </select>
          </div>

          <div className="form m-auto">
            <label htmlFor="image">Choix des Images</label>
            <div className="sliderBlock m-auto sliderBlockResponsive uploadForm">
              <div className="m-auto bg-middlegray coverImageBlock w-100">
                <p className="text-center">Image de Couverture</p>
                {fakeDataCoverImage[0] ? (
                  <ImageProduct
                    src={fakeDataCoverImage[0].image_name}
                    alt={fakeDataCoverImage[0].image_name}
                    key={fakeDataCoverImage[0].image_id}
                    id={fakeDataCoverImage[0].image_id}
                    onClick={null}
                  /> 
                ) : (<p className="text-center m-auto">en attente d'une image de couverture</p>)}
              </div>
              <div className="ml-auto mr-auto mt-5 w-100 row">
                {fakeDataImage[0] ?
                  (fakeDataImage.map(item => (
                    <ImageProduct
                      src={item.image_name}
                      alt={item.image_name}
                      key={item.image_id}
                      id={item.image_id}
                      onClick={() => handleDelete(item.image_id)}
                      onChoose={() => chooseCoverImage(item.image_id)}
                    />
                  ))) : (<p className="text-center m-auto">en attente d'images du produit</p>)}
              </div>
              <div className="container ">
                <FakeUploadImageProduct
                //   ProductId={null}
                setFakeDataImage ={setFakeDataImage}
                
                />
              </div>
            </div>
          </div>
          <div className="ButtonsGroup text-right">
            <ButtonCancel onClick={props.onClick} color="#234eb7" />
            <ButtonConfirm color="#234eb7" onClick={handleSubmitProduct} />
          </div>
        </form>
      </Encarts>
    </>
  );
}
