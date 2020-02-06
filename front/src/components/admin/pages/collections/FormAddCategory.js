import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
export default function FormAddCategory(props) {


    const [newCategory, setnewCategory] = useState(
        {
            category_name: '',
        }
        )

    const validateNewCategory = (e) => {
        setnewCategory({...newCategory, [e.target.name]: e.target.value })
    }
  
    let handleSubmitCategory = e => {
        e.preventDefault();
        axios     // envoi dans la bdd
            .post(`category/`, newCategory)
            .then(res => {
                if (res.err) {
                    alert(res.err);
                } else {
                    alert(`${newCategory.category_name} a été ajouté avec succès!`);
                    props.reloadAdd2();
                    
                }
            })

    }
    return (
        <>
            <ReturnButton onClickSee={props.onClick} />
            <Encarts title="Ajouter une catégorie">

                <form className='form-group text-center'>

                    <div className="form-group">
                        <label htmlFor="category_name"> Nom de la catégorie</label>
                        <input
                            onChange={validateNewCategory}
                            name='category_name'
                            type="text"
                            className="form-control text-center"
                            id="designationid"
                            placeholder="Ajouter le nom de la catégorie"
                            value={newCategory.category_name}
                           
                        />
                    </div>

                    <div className='text-left'>
                        <ButtonCancel onClick={props.onClick} color='#234eb7' />
                        <ButtonConfirm onClick={handleSubmitCategory} color='#234eb7' />
                    </div>
                </form>


            </Encarts>

        </>

    );
}
