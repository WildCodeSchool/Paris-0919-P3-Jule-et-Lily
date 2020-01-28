import React from "react";


const EncartCollection = props => {
  return (
    <>
      <a
        className="EncartCollection"
        href={props.url}
        style={{ backgroundColor: props.backgroundColor }}
        target="_blank"
      >
        <h5 style={{ color: props.titleColor }}>{props.title}</h5>
      </a>

    </>
  );
};

export default EncartCollection;
