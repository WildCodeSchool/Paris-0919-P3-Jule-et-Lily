import React, { useEffect,useState } from 'react'
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

  //hooks du login
  const [login, setLogin] = useState('admin');


  useEffect(() => {
    fetch(`/profile/1`, { //on récupère les infos de l'admin
      headers: {
        Authorization: "Bearer " + props.token,
        method: 'POST'
      }
    })
      .then(res => res.json())
      .then(res => {
        setLogin(res.user_login) 
      })
    },
  )

  return (
    <div className="dropdown no-arrow border-0 right gray loginBar"> 
      
      {props.children}
      <div className="loginItems">
      <button type="button" className="btn btn-mg btn-link-light border-right-5 align-baseline justify-content-end " onClick={logOut}>Se deconnecter</button>
      <span className=' text-decoration-none text-muted mr-2 align-baseline '>|&nbsp;&nbsp;&nbsp;{login}</span> {/*on affiche le login de l'admin (&nbsp; => pour afficher plusieurs espaces) */}
      <a className="list-item dropdown-toggle" href="/#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
        <i className="fas fa-user-circle gray"></i>
      </a>
      <div className="dropdown-menu dropdown-menu-right " aria-labelledby="userDropdown">
        <a className="dropdown-item" href="/profile">
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Profile
       </a>
    </div>
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return { token: state.auth.token };
}

export default connect(mapStateToProps)(LoginBar);

