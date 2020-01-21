import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
export default function FormModifyCategory(props) {


  const [CategoryModify, setCategoryModify] = useState(props.donneesCategory)

  console.log('CategoryModify', CategoryModify);

  // modification de la hooks stock en fonction des changements du form 
  const validateNewCategory = (e) => {
    setCategoryModify({ ...CategoryModify, [e.target.name]: (e.target.value) })
  }

  ////////////////////////      submitNewProduct   ////////////////////////
  // fonction pour envoyer les informations du form à jours
  let handleSubmitCategory = e => {
    e.preventDefault();
    const newValueCategory = CategoryModify
    delete newValueCategory.nb_items
    axios     // envoi ds la bdd
      .put(`category/${props.donneesCategory.category_id}`, newValueCategory)
      .then(res => {
        if (res.err) {
          alert(res.err);
        } else {
          alert(`${CategoryModify.category_name} a été modifié avec succès!`);
          props.reload();
        }
      })

  }

  return (
    <>
      <Encarts title="Ajouter / Modifier les informations de la catégorie">

        <form className='form-group text-center '>


          <div className="form-group">
            <label htmlFor="category_name"> Nom de la catégorie</label>
            <input
            onChange={validateNewCategory}
              name='category_name'
              type="text"
              className="form-control text-center"
              id="collection_name"
              placeholder={props.donneesCategory.category_name}
              value={CategoryModify.category_name}
            />
          </div>

          <div className='text-left'>
            <ButtonCancel onClick={props.onClickSee} color='#234eb7' />
            <ButtonConfirm onClick={handleSubmitCategory} color='#234eb7' />
          </div>
        </form>

      </Encarts>

    </>

  );
}
