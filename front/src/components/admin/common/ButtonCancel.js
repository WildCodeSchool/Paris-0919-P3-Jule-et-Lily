import React from 'react';

export default (props) => {
  return (
    <>
      <button type="button" className = 'btn btn-outline-m-2 mr-3' style={{border : `solid 2px ${props.color}`, color:props.color}} onClick={props.onClick}> Annuler</button>
    </>
  );
}
