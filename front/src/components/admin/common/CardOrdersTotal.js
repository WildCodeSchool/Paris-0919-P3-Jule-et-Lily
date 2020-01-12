import React from 'react'
import '../../../assets/css/admin/cards.css'

export default (props) => {
  return (
    <div className={"col-xl-6 col-md-6 mb-12" + " " + props.border}>
      <div className=" h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
            <div className="card-title-2 font-weight-bold gray text-center text-uppercase">{props.title}</div>
              <div className="font-weight-bold pink card-text-important-2 m-auto ml-auto text-center text-uppercase">{props.stats}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}