import React from "react";

const Image = (props) => {
    return (  
      <div className={props.onClick == null ? 'sliderImageClean mr-auto ml-auto mb-4 mt-4' : 'sliderImage mr-auto ml-auto mb-4 mt-4'}>
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
        <button  onClick={() => props.onChoose(props.id)} className={props.onClick == null ? 'btn' : 'btn textCover'}  type="button" style={ props.onClick == null ? {display : 'none'} : {display : 'inline-block'}}>Choisir comme image de couverture</button>
        
      </div>
    );
}
 
export default Image;