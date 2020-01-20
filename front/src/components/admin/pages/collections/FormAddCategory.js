import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
export default function FormAddCategory(props) {


    const [newCollection, setnewCollection] = useState(
        {
            collection_name: '',
            collection_cover_image_url: 'https://juleetlily.com/wp-content/uploads/2019/09/Nineties-08.jpg',
            collection_image_id: 1,
           
        })

    return (
        <>

            <ReturnButton onClickSee={props.onClick} />
            <Encarts title="Ajouter une collection">

                <form className='form-group text-center'>

                    <div className="form-group">
                        <label htmlFor="collection_name"> Nom de la categorie</label>
                        <input
                            name='collection_name'
                            
                            type="text"
                            className="form-control text-center"
                            id="designationid"
                            placeholder="Ajouter le nom de la collection"
                           
                        />
                    </div>

                    <div className='text-left'>
                        <ButtonCancel onClick={props.onClick} color='#234eb7' />
                        <ButtonConfirm color='#234eb7' />
                    </div>
                </form>


            </Encarts>

        </>

    );
}
