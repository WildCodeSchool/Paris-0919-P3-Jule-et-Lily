import React, { useEffect, useState } from 'react';
import '../../../assets/css/admin/sb-admin-2.min.css'
import '../../../assets/css/admin/global.css'

export default (props) => {

  const divStyle = {
    position: 'absolute',
    transform: 'translate3d(-156px, 19px, 0px)',
    top: '0px',
    left: '0px'
  }

  return (
    <>
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Dropdown Card Example</h6>
          <div class="dropdown no-arrow">
            <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink" x-placement="bottom-end" style={divStyle}>
              <div class="dropdown-header">Dropdown Header:</div>
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}