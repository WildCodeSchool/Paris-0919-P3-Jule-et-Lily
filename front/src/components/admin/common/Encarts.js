import React from 'react';
import '../../../assets/css/admin/global.css'
import '../../../assets/css/admin/cards.css'

export default (props) => {

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-center bg-lightgray">
          <h6 className="font-weight-bold text-uppercase gray">Statistiques des ventes</h6>
        </div>
        <div className="card-body">
          <div className="column encartContent">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}