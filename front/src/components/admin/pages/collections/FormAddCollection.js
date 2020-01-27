import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
import ImageCollection from './ImageCollection'
import FakeUploadImageCollection from './FakeUploadImageCollection'

export default function FormAddCollection(props) {


    const [newCollection, setnewCollection] = useState(
        {
            collection_name: '',
            // collection_cover_image_url: 'https://juleetlily.com/wp-content/uploads/2019/09/Nineties-08.jpg',
        })

        const [fakeDataImage, setFakeDataImage] = useState([]);
        const [fakeDataCoverImage, setFakeDataCoverImage] = useState([]);

    // modification de la hooks NewCollection entière
    const validateNewCollection = (e) => {
        setnewCollection({ ...newCollection, [e.target.name]: e.target.value })
        // console.log('newCollection', newCollection);
    }
  
    let handleSubmitCollection = e => {
        e.preventDefault();
        const collectionPut = newCollection
        delete collectionPut.collection_cover_image_url
        delete collectionPut.collection_image_id

        let NewTableImage=[];
        fakeDataImage.map(item => 
        NewTableImage.push(item.file))
    
        let NewTableCoverImage=[];
        fakeDataCoverImage.map(item => 
        NewTableCoverImage.push(item.file))
    
        let NewTableFiles = NewTableCoverImage.concat(NewTableImage)
    
        const formFiles = new FormData();
        for (const key of Object.keys(NewTableFiles)) { 
            formFiles.append('file', NewTableFiles[key])
        }
    
        axios     // envoi ds la bdd
            .post(`collection/`, newCollection)
            .then(res => {
                if (res.err) {
                    alert(res.err);
                } else {
                    alert(`${newCollection.collection_name} a été ajouté avec succès!`);
                    axios // ajouter les images 
                    .post(`/collection/add/image/`, formFiles)
                    .then(res3 => {
                    console.log('res img',res3)
                    if (res3.err) {
                        alert("Erreur lors de l'upload de l'image", res.error);
                    } else {
                        alert(`l'image a été ajoutée avec succès!`);
                      
                    }
                })
                }
                props.reloadAdd();
            })

    }

    const handleDelete = (i) => {
        const temporaryDataImage = [...fakeDataImage]
        temporaryDataImage.splice(i,1)
        setFakeDataImage(temporaryDataImage)
      };

    const chooseCoverImage = (i) => {

        if (fakeDataCoverImage.length === 0) {
          setFakeDataCoverImage([fakeDataImage[i]])
          const temporaryDataImage = [...fakeDataImage]// nécessaire de destructurer pour mettre dans une constante sinon c un lien vers le tableau d'origine 
          temporaryDataImage.splice(i,1) // enlever l'image d'index i
          setFakeDataImage(temporaryDataImage)
        } else {
          const temporaryDataCoverImage = [...fakeDataCoverImage] // constante pour stocker le state coverimage
          const temporaryDataImage2 = [...fakeDataImage]
          temporaryDataImage2.push(...temporaryDataCoverImage)
          temporaryDataImage2.splice(i,1) // enlever l'image d'index i
          setFakeDataImage(temporaryDataImage2) // remettre l'image dans le state image
          setFakeDataCoverImage([fakeDataImage[i]])// mettre l'image dans le state coverimage
        }
    
      };

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

                    <div className="form m-auto">
            <label htmlFor="image">Choix des Images</label>
            <div className="sliderBlock m-auto sliderBlockResponsive uploadForm">
              <div className="m-auto bg-middlegray coverImageBlock w-100">
                <p className="text-center">Image de Couverture</p>
                {fakeDataCoverImage[0] ? (
                  <ImageCollection
                    src={fakeDataCoverImage[0].link}
                    alt={fakeDataCoverImage[0].file.image_name}
                    onClick={null}
                  /> 
                ) : ("")}
              </div>
              <div className="ml-auto mr-auto mt-5 w-100 row">
                {fakeDataImage.length > 0 ?
                  (fakeDataImage.map((item,i) => (
                    <ImageCollection
                      src={item.link}
                      alt={item.file.image_name}
                      key={item.file.image_id}
                      id={i}
                      onClick={() => handleDelete(i)}
                      onChoose={() => chooseCoverImage(i)}
                    />
                  ))) : (<p className="text-center m-auto">en attente d'images du produit</p>)}
              </div>
              <div className="container ">
                <FakeUploadImageCollection
                setFakeDataImage ={setFakeDataImage}
                fakeDataImage ={fakeDataImage}
                fakeDataCoverImage ={fakeDataCoverImage}
                />
              </div>
            </div>
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
