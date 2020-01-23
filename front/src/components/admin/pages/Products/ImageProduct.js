import React from "react";

const Image = (props) => {
    return (  
      <div className="sliderImage mr-auto ml-auto mb-4 mt-4">
        <input
        type="button"
        value="X"
        style={props.onClick == null ? {display : 'none'} : {display : 'block'}}
        className='bg-gray btn-sm btn-action DeleteImageBtn'
        onClick={() => props.onClick(props.id)}
        />
        <img
        src= {props.src}
        alt= {props.alt}/>
        {/* <button onClick={() => props.onChoose(props.id)} className="btn textCover"  style={ props.onClick == null ? {display : 'none'} : {display : 'block'}}>Choisir comme image de couverture</button>
        {props.onClick == null ? <p>Image de Couverture</p> : <p>Image Courante</p>} */}
        
      </div>
    );
}
 
export default Image;