import React from 'react'
import '../../../assets/css/admin/cards.css'

export default (props) => {
  return (
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-card h-100 py-2 bg-lightgray bg-iconorders">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="font-weight-bold text-center text-uppercase blue3">{props.title}</div>
                <div className="font-weight-bold card-text-important-3 text-center text-uppercase">{props.stats}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}