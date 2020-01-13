
import React from 'react'; export default (props) => {
  return (
    <>
      <button onClick={props.onClick} type={props.type} className="btn" value={props.value} style={{backgroundColor : props.color, color:'white'}}>Confirmer</button>
    </>
  );
}