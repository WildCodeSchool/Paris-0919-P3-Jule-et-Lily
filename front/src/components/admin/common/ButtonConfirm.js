import React from 'react';

export default (props) => {
  return (
    <>
      <button type={props.type} className="btn" value={props.value} style={{backgroundColor : props.color, color:'white'}}>Confirmer</button>
    </>
  );
}