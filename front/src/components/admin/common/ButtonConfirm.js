
import React from 'react'; export default (props) => {
  return (
    <>
      <button type="button" className="btn" onClick={props.fetchData} style={{ backgroundColor: props.color, color: 'white' }}>Confirmer</button>
    </>
  );
}