import React from 'react';
import '../../../assets/css/admin/buttons-actions.css';

export default (props) => {
  return (
    <>
      {/* Button Add */}
      <div className="btn" onClick={props.onClick}>
        <a href="#" className="bg-gray btn-sm btn-action">
          <i class="fas fa-plus"></i>
        </a>
      </div>
    </>
  )
}