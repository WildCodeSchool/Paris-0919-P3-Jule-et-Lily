import React from 'react'
import '../../../assets/css/admin/cards.css'
import { ReactComponent as Icon } from '../../../assets/icons/IconOrdersPink.svg'

export default (props) => {

  const divStyle = {
    width: '7em',
    display: 'block',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
  };

  return (
    <div>
      <div className=" h-100 py-2">
        <div className="card-body">
          <div className="row">
            <div className="font-weight-bold pink card-text-important m-auto ml-auto">
              {props.stats}
            </div>
            <div style={divStyle}>
              <Icon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}