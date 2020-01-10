import React, {useEffect, useState} from 'react'

 const ReturnButton = (props) => {
    return (
        <div>
            <button type="button" className="btn btn-link gray" onClick={props.onClickSee} >&laquo; retour {props.returnPage}</button>
        </div>
    )
}

export default ReturnButton