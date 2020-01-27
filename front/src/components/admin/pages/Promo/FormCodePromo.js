import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'

export default function FormPromo(props) {
  const [promoModify, setPromoModify] = useState(props.donneesPromo)
  // console.log('props.donneesPromo',props.donneesPromo)

  const start_date = new Date(promoModify.code_promo_date_start);
  const end_date = new Date(promoModify.code_promo_date_end);

  let start_month = '';
  let start_day = ''
  if (start_date.getUTCMonth() < 10 ) {
    start_month = `0${start_date.getUTCMonth()+1}`
  }
  else {start_month = start_date.getUTCMonth()+1}
  if (start_date.getDate() < 10 ) {
    start_day = `0${start_date.getDate()}`
  }
  else {start_day = start_date.getDate()}
  
  let end_month = '';
  let end_day = ''
  if (end_date.getUTCMonth() < 10 ) {
    end_month = `0${end_date.getUTCMonth()+1}`
  }
  else {end_month = end_date.getUTCMonth()+1}
  if (end_date.getDate() < 10 ) {
    end_day = `0${end_date.getDate()}`
  }
  else {end_day = end_date.getDate()}

  // modification de la hooks en fonction des changements du form où la donnée ne doit ps être retraitée
  const validateNewData = (e) => {
    // console.log('e.target.value', e.target.value, 'e.taget.name',e.target.name)
    setPromoModify({ ...promoModify, [e.target.name]: e.target.value })
    
  }

  // fonction pour envoyer les informations du form à jours
  let handleSubmit = e => {
    e.preventDefault();
    const promoPut = promoModify

    // console.log('promoput', promoPut);
    axios   
      .put(`code-promo/${promoModify.code_promo_id}`, promoPut)
      .then(res => {
        if (res.err) {
          alert(res.err);
        } else {
          alert(`${promoModify.code_promo_name} a été modifié avec succès!`)
          props.reload(); // au lieu de recharger complètement la page on execute la fonction reload du composant parent
        }
      }).catch(e => {
        // console.error(e);
        alert(`Erreur lors de la modification de ${promoModify.code_promo_name}`)
      })
    }

    useEffect(() => {
      
      }, [] )
  

  return (
    <>
      <ReturnButton onClickSee={props.onClick} />
      <Encarts title="Ajouter / Modifier les informations">

        <form className='form-group text-center '>
          <div className="form-group">
            <label htmlFor="promo_name">Désignation</label>
            <input
              name='code_promo_name'
              onChange={validateNewData}
              type="text"
              className="form-control text-center"
              id="designationid"
              placeholder={promoModify.code_promo_name}
              value={promoModify.code_promo_name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="promo_value">Valeur</label>
            <input
              onChange={validateNewData}
              name="code_promo_value"
              type="text"
              step="0.01"
              className="form-control text-center"
              id="imageid"
              placeholder={promoModify.code_promo_value}
              value={promoModify.code_promo_value}
            />
          </div>

          

          <div className="form-group">
            <label htmlFor="image">Date de début</label>
            <input
             onChange={validateNewData}
              name="code_promo_date_start"
              type="date"
              className="form-control text-center"
              id="imageid"
              // placeholder={`${date_start.getUTCFullYear()}/${date_start.getUTCMonth()+1}/${date_start.getDate()}`}
              value={`${start_date.getUTCFullYear()}-${start_month}-${start_day}`}
            />
          </div>
        
          <div className="form-group">
            <label htmlFor="image">Date de fin</label>
            <input
              onChange={validateNewData}
              name="code_promo_date_end"
              type="date"
              className="form-control text-center"
              id="imageid"
              
              value={`${end_date.getUTCFullYear()}-${end_month}-${end_day}`}
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
