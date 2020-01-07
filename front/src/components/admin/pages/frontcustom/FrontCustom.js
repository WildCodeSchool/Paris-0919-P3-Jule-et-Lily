import React, { useState, useEffect } from "react";
import axios from "axios";

import EncartCollection from "./EncartCollection";
import {
  ButtonConfirm,
  ButtonModify,
  ButtonCancel,
  Encarts,
  FormColorCustom
} from "../../common";




const FrontCustom = () => {
  const [data, setData] = useState([]);
  const [formDisplay, setFormDisplay] = useState(false);
  const [encartDisplay, setEncartDisplay] = useState({
    title: "",
    titleColor: "",
    backgroundColor: ""
  });
  const [ColorPickerTitleDisplay, setColorPickerTitleDisplay] = useState(false);
  const [ColorPickerBackgroundDisplay, setColorPickerBackgroundDisplay] = useState(false);


  /////// Database Request///////////
  const fetchData = () => {
    axios
      .get("/header-collection/all")
      .then(res => (console.log("dataencarts", res.data), setData(res.data)));
  };
  useEffect(() => {
    fetchData();
  }, []);


  //////// Encart /////////////
  const changeEncartDisplay = e => {
    setEncartDisplay({ ...encartDisplay, [e.target.name]: e.target.value });
  };// setState(state => ({ ...state, left: e.pageX, top: e.pageY }))


  ///////// Form ///////////
  const cancelFormDisplay = () => {
    setFormDisplay(false);
  };


  ///////// colorPicker ///////////
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
                    title={encart.collection_menu_title}
                    titleColor={encart.collection_menu_title_color}
                    backgroundColor={encart.collection_menu_background_color}
                    url={encart.collection_menu_url}
                    id={encart.collection_menu_id}
                  />
                  <ButtonModify
                    id={encart.collection_menu_id}
                    title={encart.collection_menu_title}
                    titleColor={encart.collection_menu_title_color}
                    backgroundColor={encart.collection_menu_background_color}
                    url={encart.collection_menu_url}
                    onClick={() =>
                      setEncartDisplay(
                        {
                          title: encart.collection_menu_title,
                          titleColor: encart.collection_menu_title_color,
                          backgroundColor:
                          encart.collection_menu_background_color,
                          url: encart.collection_menu_url
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
                <ButtonConfirm color="#234eb7" />
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
          <div>
            <ButtonCancel color="#234eb7" />
            <ButtonConfirm color="#234eb7" type="submit" value="Envoyer" />
          </div>
        </Encarts>
      </div>
    </>
  );
};

export default FrontCustom;
