import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'
import {
    Encarts,
    ReturnButton,
} from "../../common";



function CollectionViewArticle(props) {
    const CollectionModify = props.donneesCollection
    const [imagesCollection, setImagesCollection] = useState([])
    const fetchImages = () => {
        axios
          .get(`/collection/image/${CollectionModify.collection_id}`)
          .then(res => {
            setImagesCollection(res.data)
          })
      }
    useEffect(() => {
        fetchImages();
      }, [])
      console.log(imagesCollection)
    return (
        <>
            <Encarts title="Fiche Collection">
                <div className="media-text text-center mx-auto ">
                    <h1 className="card-title text-center middlepurple "> {CollectionModify.collection_name} </h1>
                </div>

                <div className="text-center" style={{ width: "100%" }} >

                    <div className="text-center">
                    <h5 className="card-text gray mt-2 mb-1"> Image de couverture</h5>

                    <img className="mx-auto mt-2" src={CollectionModify.image_name} alt="cover picture" style={{ width: "200px", height: "200px", }} />
                    <h5 className="card-text gray mt-2 mb-1"> Images de la collection</h5>


                    {imagesCollection &&
                  imagesCollection.map((data) => {
                    return (
                      <img className="m-1" src={data.image_name} key={data.image_id} alt="image of the article" style={{ width: "100px", height: "100px", }} />
                    )
                  })}
                     
                    <p className="card-text gray mt-2"> Nombre d'articles actuel dans la collection " {CollectionModify.collection_name} "  : {CollectionModify.nb_items}</p>

                </div>
                </div>
                
            </Encarts>
        </>
    )
}

export default CollectionViewArticle
