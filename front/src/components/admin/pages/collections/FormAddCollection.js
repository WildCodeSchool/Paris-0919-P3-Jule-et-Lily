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
            collection_cover_image_url: 'https://juleetlily.com/wp-content/uploads/2019/09/Nineties-08.jpg',
           
        })

    // modification de la hooks NewProduct entière
    const validateNewCollection = (e) => {
        setnewCollection({ ...newCollection, [e.target.name]: e.target.value })
        // console.log('newCollection', newCollection);
    }
  
    let handleSubmitCollection = e => {
        e.preventDefault();
        const collectionPut = newCollection
        delete collectionPut.collection_cover_image_url
        delete collectionPut.collection_image_id
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
            .catch(e => {
                // console.error(e);
                alert(`Erreur lors l'ajout de la collection ${newCollection.collection_name}`)
              });

    }

    return (
        <>

            <ReturnButton onClickSee={props.onClick} />
            <Encarts title="Ajouter une collection">

                <form className='form-group text-center'>

                    <div className="form-group">
                        <label htmlFor="collection_name"> Nom de la collection</label>
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

                    <div className="form-group">
                        <label htmlFor="collection_cover_image_url"> URL de l'image de couverture de la collection</label>
                        <input
                            name='collection_cover_image_url'
                            onChange={validateNewCollection}
                            type="text"
                            className="form-control text-center"
                            id="designationid"
                            placeholder="Ajouter le nom de la collection"
                            value={newCollection.collection_cover_image_url}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="collection_image_id"> image de la collection</label>
                        <input
                            name="collection_image_id"
                            onChange={validateNewCollection}
                            type="text"
                            className="form-control text-center"
                            id="designationid"
                            placeholder="Ajouter le nom de la collection"
                            value={newCollection.collection_image_id}
                        />
                    </div>

                    <div className='text-left'>
                        <ButtonCancel onClick={props.onClick} color='#234eb7' />
                        <ButtonConfirm onClick={handleSubmitCollection} color='#234eb7' />
                    </div>
                </form>

            </Encarts>

        </>

    );
}
