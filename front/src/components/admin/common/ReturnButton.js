import React, {useEffect, useState} from 'react'
import '../../../assets/css/admin/global.css'

 const ReturnButton = (props) => {
    return (
        <div>
            <button type="button" className="btn btn-link gray">&laquo; retour {props.returnPage}</button>
        </div>
    )
}

export default ReturnButton