import React, { useState, useEffect } from "react";


const EncartCollection = props => {
  return (
    <>
      <a
        className="EncartCollection"
        href={props.url}
        style={{ backgroundColor: props.backgroundColor }}
      >
        <h5 style={{ color: props.titleColor }}>{props.title}</h5>
      </a>

    </>
  );
};

export default EncartCollection;
