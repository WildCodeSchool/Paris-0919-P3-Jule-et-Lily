import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
export default function FormProducts(props) {



  const [CollectionModify, setProductModify] = useState(props.donneesCollection)


  // modification de la hooks stock en fonction des changements du form 
  const validateNewCollection = (e) => {
    setProductModify({ ...CollectionModify, [e.target.name]: (e.target.value) })
  }

  ////////////////////////      submitNewProduct   ////////////////////////
  // fonction pour envoyer les informations du form à jours
  let handleSubmitCollection = e => {
    e.preventDefault();
    const newValueCollection = CollectionModify
    delete newValueCollection.image_name
    delete newValueCollection.nb_items
    axios     // envoi ds la bdd
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

  // console.log('CollectionModify', CollectionModify)
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

          <div className="form-group">
            <label htmlFor="image_url"> Images de la collection</label>

            <div className="media-left">
              <img className="m-1" src={props.donneesCollection.image_url} alt="cover" style={{ width: "80px", height: "80px", }} />
            </div>

            <input
              onChange={validateNewCollection}
              name='image_url'
              type="text"
              className="form-control text-center"
              id="image_url"
              placeholder={props.donneesCollection.image_url}
            />
          </div>

          <div className="form-group">
            <label htmlFor="designation"> Image de couverture</label>

            <div className="media-left">
              <img className="m-1" src={props.donneesCollection.collection_cover_image_url} alt="cover" style={{ width: "80px", height: "80px", }} />
            </div>

            <input
              onChange={validateNewCollection}
              name='collection_cover_image_url'
              type="text"
              className="form-control text-center"
              id="designationid"
              placeholder={props.donneesCollection.collection_cover_image_url}
            />
          </div>

          <p className="card-text gray mt-2"> Nombre d'articles associés à " {props.donneesCollection.collection_name} "  : {props.donneesCollection.nb_items}</p>
          <div className='text-left'>
            <ButtonCancel onClick={props.onClickSee} color='#234eb7' />
            <ButtonConfirm onClick={handleSubmitCollection} color='#234eb7' />
          </div>
        </form>

      </Encarts>

    </>

  );
}
