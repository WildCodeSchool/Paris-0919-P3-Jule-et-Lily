import React, {useState, useEffect} from "react";
import axios from 'axios';
import EncartCollection from './EncartCollection'
import {
    ButtonAdd,
    ButtonConfirm,
    ButtonModify,
    ButtonCancel,
    Encarts,
    Tables,
    Form
  } from "../../common";


const FrontCustom = () =>{

    const [data, setData] = useState([]);
    const [isLoaded, switchLoaded] = useState(false);

    const fetchData = () => {
      axios.get('/header-collection/all')
       .then(res => (console.log('dataencarts',res.data), setData({ data: res.data})))
    }  
    
    useEffect(() => {
      fetchData()
    }, [])
  

    return (
      <>
        <div>
          <Encarts
          title = "ENCARTS COLLECTION">
           <h6 className="blue font-weight-bold">Modifier les encarts :</h6>
           <div className="EncartCollection">
          {
            data
              .map((encart, i) => (
                <EncartCollection
                  title={encart.collection_menu_title}
                  titleColor={encart.collection_menu_title_color}
                  backgroundColor={encart.collection_menu_background_color}
                  index={i}
                />
              ))
         }
        </div>
           <div><EncartCollection/></div>
           <div>
            <ButtonCancel 
            color="#234eb7"/>
            <ButtonConfirm
            color="#234eb7" />
           </div>
          </Encarts>
        </div>
        <div>
          <Encarts
          title = "IMAGES DU SLIDER">
           <h6 className="blue font-weight-bold">Modifier les images :</h6>
           <div>
            <ButtonCancel 
            color="#234eb7"/>
            <ButtonConfirm 
            color="#234eb7"/>
           </div>
          </Encarts>
        </div>
        </>
    )
}


export default FrontCustom;
