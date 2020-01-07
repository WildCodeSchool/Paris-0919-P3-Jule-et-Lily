import React from "react";
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'



const FormColorCustom = (props) => {

  const styles = reactCSS({
    'default': {
      colorTitle: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        backgroundColor: `${props.titleColor}`,
      },
      colorBackground: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        backgroundColor: `${props.backgroundColor}`,
      },
      swatch: {
        padding: '5px',
        backgroundColor: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div className="d-flex" >
      <form className="w-50 mr-5">
        {/* INPUT TITRE */}
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder= {props.title}
            onChange = {props.onChange}
            value={props.title}
          />
        </div>
          {/* INPUT TITRE COLOR */}
        <div className="form-group">
          <label htmlFor="titleColor">Couleur du Titre</label>
          <input
            type="text"
            className="form-control"
            id="titleColor"
            name="titleColor"
            placeholder={props.titleColor}
            value={props.titleColor}
            onChange = {props.onChangeForm}
          /> 
          <div>   
            <div style={styles.swatch} onClick={props.onClickColorTitle}>
              <div style={styles.colorTitle} />
            </div>
            { props.stateColorPickerTitleDisplay ? <div style={styles.popover}>
              <div style={styles.cover} onClick={props.onClickClose}/>
              <ChromePicker color={props.titleColor} onChange={props.onChangeTitleColor} />
            </div> : null }
          </div>    
        </div>

        {/* INPUT BACKGROUND COLOR */}
        <div className="form-group">
          <label htmlFor="backgroundColor">Couleur du Fond</label>
          <input
            type="text"
            className="form-control"
            id="backgroundColor"
            name="backgroundColor"
            placeholder={props.backgroundColor}
            value={props.backgroundColor}
            onChange = {props.onChangeForm}
          />
          <div>   
            <div style={styles.swatch} onClick={props.onClickColorBackground}>
              <div style={styles.colorBackground} />
            </div>
            { props.stateColorPickerBackgroundDisplay ? <div style={styles.popover}>
              <div style={styles.cover} onClick={props.onClickClose}/>
              <ChromePicker color={props.backgroundColor} onChange={props.onChangeBackgroundColor} />
            </div> : null }
          </div> 
        </div>
        <div className="form-group">
          <label htmlFor="url">Adresse de la collection</label>
          <input
            type="text"
            className="form-control"
            id="url"
            name="url"
            placeholder={props.url}
            value={props.url}
            onChange = {props.onChange}
          />
        </div>
      </form>
   <div style={{minHeight:'200px', width:"100%"}}>{props.children}</div>
    </div>
  );
}

export default FormColorCustom;