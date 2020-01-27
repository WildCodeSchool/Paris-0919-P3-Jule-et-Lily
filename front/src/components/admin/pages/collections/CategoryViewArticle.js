import React, { useState, useEffect } from 'react'
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'
import {
    Encarts,
    ReturnButton,
} from "../../common";

function CategoryViewArticle(props) {

    const donneesCategory = props.donneesCategory
    // console.log('props.donneesCategory', props.donneesCategory);

    return (
        <>
            <Encarts title="Fiche Catégorie">
                <div className="media-text text-center mx-auto ">
                    <h1 className="card-title text-center middlepurple "> {donneesCategory.category_name} </h1>
                    <p className="card-text gray mt-2"> Nombre d'articles actuel dans la Catégorie" {donneesCategory.category_name} "  : {donneesCategory.nb_items}</p>
                </div>
              
            </Encarts>
        </>
    )
}

export default CategoryViewArticle
