import React, { useState, useEffect } from 'react'
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'
import {
    Encarts,
    ReturnButton,
} from "../../common";

function CollectionViewArticle(props) {

    const CollectionModify = props.donneesProducts
    return (
        <>
            <Encarts title="Fiche Collection">
                <div className="media-text text-center mx-auto ">
                    <h1 className="card-title text-center middlepurple "> {CollectionModify.collection_name} </h1>
                </div>

                <div className="text-center" style={{ width: "100%" }} >

                    <div className="text-center">
                    <h5 className="card-text gray mt-2 mb-1"> Image de la collection</h5>
                        <img className="mx-auto mt-2" src={CollectionModify.image_url} alt="cover collection" style={{ width: "250px", height: "250px", }} />
                    </div>
                    <h5 className="card-text gray mt-2 mb-1"> Image de couverture</h5>
                    <img className="mx-auto mt-2" src={CollectionModify.collection_cover_image_url} alt="cover picture" style={{ width: "250px", height: "250px", }} />

                 
                    <p className="card-text gray mt-2"> Nombre d'articles actuel dans la collection " {CollectionModify.collection_name} "  : {CollectionModify.nb_items}</p>
                </div>
                
            </Encarts>
        </>
    )
}

export default CollectionViewArticle
