import React from 'react'
import '../../../assets/css/admin/cards.css'

export default (props) => {

  const divStyle = {
    width: '2em',
    display: 'block',
    margin: 'auto',
  };

  return (
    <div className={"col" + " " + props.border}>
      <div className="h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="font-weight-bold text-center text-uppercase">{props.title}</div>
              <div className={"font-weight-bold card-text-important-3 text-center text-uppercase" + " " + props.color1}>{props.stats}
                <div style={divStyle}>
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}