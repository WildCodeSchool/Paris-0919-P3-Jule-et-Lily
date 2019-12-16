import React from 'react';
import '../../../assets/css/admin/sb-admin-2.min.css'
import '../../../assets/css/admin/global.css'
import '../../../assets/css/admin/cards.css'

export default (props) => {
  return (
    <>
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-primary h-100 py-2 bg-lightgray bg-iconorders">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{props.title}</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{props.benefits}</div>

              </div>
              <div className="col-auto">
                <i className="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}