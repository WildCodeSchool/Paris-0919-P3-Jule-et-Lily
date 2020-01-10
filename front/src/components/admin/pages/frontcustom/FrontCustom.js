import React, { useState, useEffect } from "react";
import axios from "axios";


// import img from "http://localhost:4000/public/Diapo-Disco-Lady-1.jpg"
import EncartCollection from "./EncartCollection";
import FormColorCustom from "./FormColorCustom";
import UploadImage from "./UploadImage";

import {
  ButtonConfirm,
  ButtonModify,
  ButtonCancel,
  Encarts,
} from "../../common";




const FrontCustom = () => {
  const [data, setData] = useState([]);
  const [formDisplay, setFormDisplay] = useState(false);
  const [encartDisplay, setEncartDisplay] = useState({
    id:"",
    backgroundColor: "",
    title: "",
    url: "",
    titleColor: "",
  });
  const [ColorPickerTitleDisplay, setColorPickerTitleDisplay] = useState(false);
  const [ColorPickerBackgroundDisplay, setColorPickerBackgroundDisplay] = useState(false);
  const [dataImage, setDataImage] = useState([]);


  ////////////////////////// Database Request Data HEADER COLLECTION//////////////////////////

  const fetchDataCollection = () => {
    axios
      .get("/header-collection/all")
      .then(res => (console.log("dataencarts", res.data), setData(res.data)));
  };

  const fetchDataImage = () => {
    axios
      .get("/image-slider/all")
      .then(res => (console.log("imageslider", res.data), setDataImage(res.data)));
  };

  
  const fetchData = () => {
    fetchDataCollection()
    fetchDataImage()
  }
  
  useEffect(() => {
    fetchData()
  },[]);





   ////////////////////////// Database Request Data IMAGES SLIDER//////////////////////////

  
  // useEffect(() => {
  //   fetchDataImage();
  // }, []);

  ////////////////////////// Database Send Data //////////////////////////////////

  //const submitForm = e => {

  // const url = `header-collection/${encartDisplay.id}`;
  // const config = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(encartDisplay),
      
  //   };
  //   {console.log('state brut', encartDisplay)}
  //   {console.log('state jsonifié', JSON.stringify('JSON : ------------',encartDisplay))}

  

  // fetch(url, config)
  //     .then(res => res.json())
  //     .then(res => {
  //         if (res.error) {
  //             alert(res.error);
  //         } else {
  //             alert(`l'encart ${encartDisplay.title} a été ajouté avec succès!`);
  //         }
  //     }).catch(e => {
  //     console.error("erreur lors du fetch", e);
  //     alert("Erreur lors de la modification de l'encart");
  //     });

  // }


  const submitForm = e => {
    e.preventDefault();
    axios
      .put(`header-collection/${encartDisplay.id}`, encartDisplay)
      .then(res => {
        if (res.error) {
            alert("Erreur lors de l'ajout de l'encart", res.error);
        } else {
            alert(`l'encart ${encartDisplay.title} a été ajouté avec succès!`);
        }
    }).catch(e => {console.error(e);});
    setTimeout(() => window.location.reload(), 2000);
  };




////////////////////////// Encart //////////////////////////
  const changeEncartDisplay = e => {
    setEncartDisplay({ ...encartDisplay, [e.target.name]: e.target.value });
  };// setState(state => ({ ...state, left: e.pageX, top: e.pageY }))


 ////////////////////////// Form //////////////////////////
  const cancelFormDisplay = () => {
    setFormDisplay(false);
  };


////////////////////////// colorPicker //////////////////////////
  const handleClickColorPickerTitle = () => {
    setColorPickerTitleDisplay(!ColorPickerTitleDisplay);
  };
  const handleClickColorPickerBackground = () => {
    setColorPickerBackgroundDisplay(!ColorPickerBackgroundDisplay);
  };
  const handleCloseColorPicker = () => {
    setColorPickerTitleDisplay(false)
    setColorPickerBackgroundDisplay(false)
  };
  const handleChangeTitleColor = (color) => {
    setEncartDisplay({ ...encartDisplay, titleColor: color.hex });
  };
  const handleChangeBackgroundColor = (color) => {
    setEncartDisplay({ ...encartDisplay, backgroundColor: color.hex });
  };




  return (
    <>
      <div>
        <Encarts title="ENCARTS COLLECTION">
          <h6 className="blue font-weight-bold">Modifier les encarts :</h6>

          <div className="EncartsCollectionSection">
            {data &&
              data.map(encart => (
                <div className="EncartCollectionBlock">
                  <EncartCollection
                    id={encart.collection_menu_id}
                    backgroundColor={encart.collection_menu_background_color}
                    title={encart.collection_menu_title}
                    url={encart.collection_menu_url}
                    titleColor={encart.collection_menu_title_color}
                  />
                  <ButtonModify
                    id={encart.collection_menu_id}
                    backgroundColor={encart.collection_menu_background_color}
                    title={encart.collection_menu_title}
                    url={encart.collection_menu_url}
                    titleColor={encart.collection_menu_title_color}
                    onClick={() =>
                      setEncartDisplay(
                        {
                          id :encart.collection_menu_id,
                          backgroundColor: encart.collection_menu_background_color,
                          title: encart.collection_menu_title,
                          url: encart.collection_menu_url,
                          titleColor: encart.collection_menu_title_color,
                        },
                        setFormDisplay(true)
                      )
                    }
                  />
                </div>
              ))}
          </div>

          {formDisplay ? (
            <div className="FormCustomColor border">
              <FormColorCustom
                id={encartDisplay.id}
                title={encartDisplay.title}
                titleColor={encartDisplay.titleColor}
                backgroundColor={encartDisplay.backgroundColor}
                url={encartDisplay.url}
                onChangeForm={changeEncartDisplay}
                stateColorPickerTitleDisplay={ColorPickerTitleDisplay}
                stateColorPickerBackgroundDisplay={ColorPickerBackgroundDisplay}
                onClickColorTitle={handleClickColorPickerTitle}
                onClickColorBackground={handleClickColorPickerBackground}
                onClickClose={handleCloseColorPicker}
                onChangeTitleColor={handleChangeTitleColor}
                onChangeBackgroundColor={handleChangeBackgroundColor} 
              >
                <EncartCollection
                  title={encartDisplay.title}
                  titleColor={encartDisplay.titleColor}
                  backgroundColor={encartDisplay.backgroundColor}
                  url={encartDisplay.url}
                />
              </FormColorCustom>

              <div className="ButtonsGroup">
                <ButtonCancel color="#234eb7" onClick={cancelFormDisplay} />
                <ButtonConfirm color="#234eb7" onClick={submitForm}/>
              </div>
            </div>
          ) : (
            ""
          )}

        </Encarts>
      </div>

      <div>
        <Encarts title="IMAGES DU SLIDER">
          <h6 className="blue font-weight-bold">Modifier les images :</h6>
          <div >
            {dataImage &&
              dataImage.map(item => (
                <img
                className="image"
                src={item.image_url}
                alt={item.name}
              ></img>))}
          </div>
          <img src = {"http://localhost:4000/public/Diapo-Disco-Lady-1.jpg"}/>
          <div className="container my-5">
            <UploadImage/>
          </div>
          {/* <div>
            <ButtonCancel color="#234eb7" />
            <ButtonConfirm color="#234eb7" type="submit" value="Envoyer" />
          </div> */}
        </Encarts>
      </div>
    </>
  );
};

export default FrontCustom