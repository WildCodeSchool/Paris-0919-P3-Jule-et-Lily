import React from 'react'
import {Link} from 'react-router-dom'
import '../../../assets/css/admin/global.css'
import '../../../assets/css/admin/LoginBar.css'

const LoginBar = (props) => {

  return (

    <div className="dropdown no-arrow border-0 right gray loginBar"> 
      
      {props.children}
      <div className="loginItems">
      <button type="button" class="btn btn-mg btn-link-light border-right-5 align-baseline justify-content-end "><Link to='/login'>Se deconnecter</Link></button>
      <span className=' text-decoration-none text-muted mr-2 align-baseline '> | Admin</span>
      <a className="list-item dropdown-toggle" href="" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
        <i className="fas fa-user-circle gray"></i>
      </a>
      <div className="dropdown-menu dropdown-menu-right " aria-labelledby="userDropdown">
        <a className="dropdown-item" href="">
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Profil
</a>
        <a className="dropdown-item" href="">
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Paramètres du profil
</a>


      </div>
      </div>
    </div>




  )
}

export default LoginBar;