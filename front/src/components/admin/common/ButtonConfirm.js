import React from 'react';

export default (props) => {
  return (
    <>
      <button type="button" className="btn btn-success" onClick={props.fetchData}>Confirmer</button>
    </>
  );
}