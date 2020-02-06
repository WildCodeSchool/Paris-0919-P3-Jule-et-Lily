import React, { useState, useEffect } from "react";
import axios from "axios";

import EncartCollection from "./EncartCollection";
import FormColorCustom from "./FormColorCustom";
import Image from "./Image";
import UploadImageHook from "./UploadImageHook";
import {
  ButtonConfirm,
  ButtonModify,
  ButtonCancel,
  Encarts
} from "../../common";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const FrontCustom = () => {
  const [data, setData] = useState([]);
  const [formDisplay, setFormDisplay] = useState(false);
  const [encartDisplay, setEncartDisplay] = useState({
    id: "",
    backgroundColor: "",
    title: "",
    url: "",
    titleColor: ""
  });
  const [ColorPickerTitleDisplay, setColorPickerTitleDisplay] = useState(false);
  const [ColorPickerBackgroundDisplay, setColorPickerBackgroundDisplay] = useState(false);
  const [dataImage, setDataImage] = useState([]);

  ////////////////////////// Database Request HEADER COLLECTION + SLIDER IMAGE//////////////////////////

  const fetchDataCollection = () => {
    axios
      .get("/header-collection/all")
      .then(res => (setData(res.data)));
  };

  const fetchDataImage = () => {
    axios
      .get("/image-slider/all")
      .then(
        res => (setDataImage(res.data))
      );
  };

  const fetchData = () => {
    fetchDataCollection();
    fetchDataImage();
  };

  useEffect(() => {
    fetchData()
  }, []);

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
      })
      // .catch(e => {
      //   console.error(e);
      // });
    setTimeout(() => window.location.reload(), 2000);
  };

  ////////////////////////// Encart //////////////////////////
  const changeEncartDisplay = e => {
    setEncartDisplay({ ...encartDisplay, [e.target.name]: e.target.value });
  }; // setState(state => ({ ...state, left: e.pageX, top: e.pageY }))

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
    setColorPickerTitleDisplay(false);
    setColorPickerBackgroundDisplay(false);
  };
  const handleChangeTitleColor = color => {
    setEncartDisplay({ ...encartDisplay, titleColor: color.hex })
  };
  const handleChangeBackgroundColor = color => {
    setEncartDisplay({ ...encartDisplay, backgroundColor: color.hex });
  };

  ////////////////////////// deleteImage //////////////////////////

  const handleDelete = id => {
    if (dataImage.length > 1) {
    if (window.confirm("Voulez vous vraiment supprimer l'image ?")) {
    axios
      .delete(`image-slider/${id}`)
      .then(res => {
        if (res.error) {
          alert("Erreur lors de la suppression de l'image", res.error);
        } else {
          alert(`l'image a été supprimée avec succès!`);
        }
      })
    setTimeout(() => window.location.reload(), 2000);
    }
    else {
      alert("Suppression annulée")
    }
  } else {
    alert ("Attention il faut garder au moins une image dans le slider");
  }
}

  return (
    <>
      <div>
        <Encarts title="ENCARTS COLLECTION">
          <h6 className="blue font-weight-bold">Modifier les encarts :</h6>

          <div className="EncartsCollectionSection">
            {data &&
              data.map((encart, key) => (
                <div key={key} className="EncartCollectionBlock">
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
                          id: encart.collection_menu_id,
                          backgroundColor:
                            encart.collection_menu_background_color,
                          title: encart.collection_menu_title,
                          url: encart.collection_menu_url,
                          titleColor: encart.collection_menu_title_color
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
                <ButtonConfirm color="#234eb7" onClick={submitForm} />
              </div>
            </div>
          ) : (
            ""
          )}
        </Encarts>
      </div>

      <div>
        <Encarts title="IMAGES DU SLIDER">
          <h6 className="blue font-weight-bold mb-5">Modifier les images :</h6>
          <div className="sliderBlock m-auto sliderBlockResponsive">
            {dataImage &&
              dataImage.map(item => (
                <Image
                  src={item.image_name}
                  alt={item.image_name}
                  key={item.image_id}
                  id={item.image_id}
                  onClick={() => handleDelete(item.image_id)}
                />
              ))}
          </div>

          <div className="container ">
            <UploadImageHook length={dataImage.length} />
          </div>
          <h6 className="blue font-weight-bold mb-5">Visualiser le slider :</h6>
          <div className="m-auto w-75">
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              {/* <!-- Indicators --> */} 
              <ol className="carousel-indicators">
              {dataImage &&
                dataImage.map((item,i) => (
                 <li className="mr-2" data-target="#myCarousel" data-slide-to={i}></li>
                )
              )} </ol>
              {/* <!-- Wrapper for slides --> */}
              <div className="carousel-inner mb-3">
              {dataImage &&
                dataImage.map((item,i) => (
                  <div className={i == 0 ? "item active CarouselImage" : "item CarouselImage"} key={item.image_id}>

                    <a className="CarouselItem" href={`https://${item.image_url}`} target="_blank"><img className="CarouselItem" src={item.image_name} alt={item.image_name} /></a>
                    <div className="carousel-caption">
                    <p className="legend">{item.image_url}</p>
                    </div>
                  </div>
                )
              )}

                {/* <!-- Left and right controls --> */}
                <a
                  className="left carousel-control"
                  href="#myCarousel"
                  data-slide="prev"
                >
                  <span className="glyphicon glyphicon-chevron-left"><i class="fas fa-chevron-left"></i></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="right carousel-control"
                  href="#myCarousel"
                  data-slide="next"
                >
                  <span className="glyphicon glyphicon-chevron-right"><i class="fas fa-chevron-right"></i></span>
                  <span className="sr-only">Next</span>
                </a>
            </div>
          </div>
          </div>
        </Encarts>
      </div>
    </>
  );
};

export default FrontCustom;
