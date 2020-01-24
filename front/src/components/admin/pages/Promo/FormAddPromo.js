import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'

export default function FormAddPromo(props) {
    const [newPromo, setNewPromo] = useState(props.donneesPromo)
    
    // modification de la hooks NewPromo entière
    const validateNewData = (e) => {
        setNewPromo({ ...newPromo, [e.target.name]: e.target.value })
    }

    ////////////////////////      submitNewPromo   ////////////////////////
    // fonction pour envoyer les informations du form à jours
    let handleSubmitPromo = e => {
        e.preventDefault();
        const PromoPut = newPromo
        // console.log('Promoput', PromoPut);
        axios     // envoi ds la bdd
            .post(`Promo/`, PromoPut)
            .then(res => {
                if (res.err) {
                    alert(res.err);
                } else {
                    alert(`${newPromo.promo_name} a été ajouté avec succès!`);
                   
                        props.reloadAdd();
                }
            })

    }


    return (
        <>

<ReturnButton onClickSee={props.onClick} />
      <Encarts title="Ajouter / Modifier les informations">

        <form className='form-group text-center '>
          <div className="form-group">
            <label htmlFor="promo_name">Désignation</label>
            <input
              name='promo_name'
              onChange={validateNewData}
              type="text"
              className="form-control text-center"
              id="designationid"
              //placeholder={newPromo.promo_name}
              value={newPromo && newPromo.promo_name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="promo_value">Valeur</label>
            <input
              onChange={validateNewData}
              name="promo_value"
              type="text"
              step="0.01"
              className="form-control text-center"
              id="imageid"
              //placeholder={newPromo.promo_value}
              value={newPromo && newPromo.promo_value}
            />
          </div>

          

          <div className="form-group">
            <label htmlFor="image">Sticker</label>
            <input
             onChange={validateNewData}
              name="promo_sticker_id"
              type="text"
              className="form-control text-center"
              id="imageid"
              step="0.01"
             // placeholder={newPromo.promo_sticker_id}
              value={newPromo && newPromo.promo_sticker_id}
            />
          </div>

          <div className='text-left'>
            <ButtonCancel onClick={props.onClick} color='#234eb7' />
            <ButtonConfirm color='#234eb7' onClick={handleSubmitPromo} />
          </div>
        </form>

            </Encarts>

        </>

    );
}
