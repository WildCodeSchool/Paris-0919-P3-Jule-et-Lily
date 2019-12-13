import React from 'react'
import '../../../assets/css/admin/sb-admin-2.min.css'
import '../../../assets/css/admin/sb-admin-2.css'

const LoginBar = () => {

  return (
    <nav className='nav'>

      <li className="list-group-item dropdown no-arrow border-0 right">

        <button type="button" class="btn btn-mg btn-link-light border-right-5 align-baseline ">Se deconnecter  </button>
        <span className=' text-decoration-none text-muted mr-2 align-baseline '> | Admin</span>
        <a className="list-item dropdown-toggle" href="" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          <img className="img-profile rounded-circle border-left" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
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

      </li>
    </nav>


  )
}

export default LoginBar;