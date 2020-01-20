import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import '../../../assets/css/admin/global.css'
import '../../../assets/css/admin/LoginBar.css'

const LoginBar = (props) => {

  const logOut = () => {
    props.dispatch(
      {
        type : "UNSET_SESSION"
      }
    )
  }

  return (

    <div className="dropdown no-arrow border-0 right gray loginBar"> 
      
      {props.children}
      <div className="loginItems">
      <button type="button" class="btn btn-mg btn-link-light border-right-5 align-baseline justify-content-end " onClick={logOut}>Se deconnecter</button>
      <span className=' text-decoration-none text-muted mr-2 align-baseline '> | Admin</span>
      <a className="list-item dropdown-toggle" href="/#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
        <i className="fas fa-user-circle gray"></i>
      </a>
      </div>
    </div>
  )
}

export default LoginBar;
