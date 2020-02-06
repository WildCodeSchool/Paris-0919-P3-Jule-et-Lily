import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import UploadImageCollections from './UploadImageCollections'
import ImageCollection from './ImageCollection'
export default function FormProducts(props) {



  const [CollectionModify, setProductModify] = useState(props.donneesCollection)
  const [dataImage, setDataImage] = useState([]);
  const [dataCoverImage, setDataCoverImage] = useState([]);

  // modification de la hooks stock en fonction des changements du form 
  const validateNewCollection = (e) => {
    setProductModify({ ...CollectionModify, [e.target.name]: (e.target.value) })
  }


   // récupération des images
   const fetchDataImage = () => {
     console.log('donneesCollection', props.donneesCollection);
     
    axios
      .get(`/collection/image/${props.donneesCollection.collection_id}`)
      .then(
        res => (setDataImage(res.data))
      );
  };

  // récupération de l'image de couverture
  const fetchDataCoverImage = () => {
    axios
      .get(`/collection/image-cover/${props.donneesCollection.collection_id}`)
      .then(
        res => (setDataCoverImage(res.data))
      );
  };

  const handleDelete = id => {
    if (dataImage.length+dataCoverImage.length > 1) {
    axios
      .delete(`/collection/image/${id}`)
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

const chooseCoverImage = (id) => {
  axios
  .put(`/collection/image-cover/${id}/${props.donneesCollection.collection_id}`)
  .then(res => {
    if (res.err) {
      alert(res.err);
    } else {
      alert(`l'image de couverture de ${CollectionModify.collection_name} a été modifié avec succès!`)
      fetchDataCoverImage()
      fetchDataImage()
    }
  })
  .catch(e => {
    console.error(e);
    alert(`Erreur lors de la modification de ${CollectionModify.collection_name}`)
  });
}

useEffect(() => {
    fetchDataImage()
    fetchDataCoverImage()
  }, [])

  ////////////////////////      submitNewcollection  ////////////////////////
  // fonction pour envoyer les informations du form à jours
  let handleSubmitCollection = e => {
    e.preventDefault();
    const newValueCollection = CollectionModify
    delete newValueCollection.image_name
    delete newValueCollection.nb_items
    delete newValueCollection.collection_cover_image_id
    axios     // envoi dans la bdd
      .put(`collection/${props.donneesCollection.collection_id}`, newValueCollection)
      .then(res => {
        if (res.err) {
          alert(res.err);
        } else {
          alert(`${CollectionModify.collection_name} a été modifié avec succès!`);
          props.reload();
        }
      })

  }

  return (
    <>
      <Encarts title="Ajouter / Modifier les informations">

        <form className='form-group text-center '>
          <div className="form-group">
            <label htmlFor="designation"> Nom de la collection</label>
            <input
              onChange={validateNewCollection}
              name='collection_name'
              type="text"
              className="form-control text-center"
              id="collection_name"
              placeholder={props.donneesCollection.collection_name}
              value={CollectionModify.collection_name}
            />
          </div>

        
          <p className="card-text gray mt-2"> Nombre d'articles associés à " {props.donneesCollection.collection_name} "  : {props.donneesCollection.nb_items}</p>


  {/* /////////////upload d'image */}
  <div className="form m-auto">
            <label htmlFor="image">Choix des Images</label>
            <div className="sliderBlock m-auto sliderBlockResponsive uploadForm">
            <div className="m-auto bg-middlegray coverImageBlock w-100">
              <p className="text-center">Image de Couverture</p>
              {dataCoverImage[0] &&
                  <ImageCollection
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
                  <ImageCollection
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
                <UploadImageCollections collectionId = {props.donneesCollection.collection_id} fetchDataImage={fetchDataImage}/>
              </div>
              </div>    
            </div>

            <div className="ButtonsGroup text-right">
            <ButtonCancel onClick={props.onClickSee} color='#234eb7' />
            <ButtonConfirm onClick={handleSubmitCollection} color='#234eb7' />
          </div>
        </form>

      </Encarts>

    </>

  );
}
