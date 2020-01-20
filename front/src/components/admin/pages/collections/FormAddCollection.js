import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
export default function FormProducts(props) {


    const [newCollection, setnewCollection] = useState(
        {
            collection_name: '',
            collection_cover_image_url: 1,
           
        })

    // modification de la hooks NewProduct entière
    const validateNewCollection = (e) => {
        setnewCollection({ ...newCollection, [e.target.name]: e.target.value })
    }
  
    let handleSubmitProduct = e => {
        e.preventDefault();
        const collectionPut = newCollection
        delete collectionPut.image_url

        console.log('newCollection', newCollection);
        axios     // envoi ds la bdd
            .post(`collection/`, newCollection)
            .then(res => {
                if (res.err) {
                    alert(res.err);
                } else {
                    alert(`${newCollection.collection_name} a été ajouté avec succès!`);
                    props.reloadAdd();
                }
            })

    }

    return (
        <>

            <ReturnButton onClickSee={props.onClick} />
            <Encarts title="Ajouter une collection">

                <form className='form-group text-center'>

                    <div className="form-group">
                        <label htmlFor="designation"> Nom de la collection</label>
                        <input
                            name='collection_name'
                            onChange={validateNewCollection}
                            type="text"
                            className="form-control text-center"
                            id="designationid"
                            placeholder="Ajouter le nom de la collection"
                            value={newCollection.collection_name}
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
