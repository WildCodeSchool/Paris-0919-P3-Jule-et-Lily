import React, { useState } from 'react'
import IconJL from '../../../assets/icons/LogoJuleetLily.svg'
import IconCollections from '../../../assets/icons/IconsCollections.svg'
import IconDash from '../../../assets/icons/IconDashboard.svg'
import IconHome from '../../../assets/icons/IconFrontHome.svg'
import IconOrders from '../../../assets/icons/IconOrders.svg'
import IconProducts from '../../../assets/icons/IconProducts.svg'
import IconPromos from '../../../assets/icons/IconPromos.svg'
import IconUsers from '../../../assets/icons/IconUsers.svg'
// import { Link } from 'react-router-dom'   !!!! replace a by Link after !!!!
import '../../../assets/css/admin/global.css'
import '../../../assets/css/admin/Navbar.css'


const Navbar = () => {
        return (
            <div>
                <ul className="navbar-nav bg-gradient-purple sidebar cssNavbar sidebar-dark accordion" id="accordionSidebar">

                    <a className="sidebar-brand d-flex align-items-center justify-content-center">
                            <img className='logoJuleLily' src={IconJL} alt='Jule + Lily' />
                    </a>

                    <li className="nav-item active">
                        <a className="nav-link">
                            <img className='icons mr-2' src={IconDash} alt='' />
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Boutique</div>
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <img className='icons mr-2' src={IconOrders} alt='' />
                            <span>Commandes</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons mr-2' src={IconUsers} alt='' />
                            <span className='align-bottom'>Clients</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons mr-2' src={IconProducts} alt='' />
                            <span>Produits</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a class="nav-link collapsed" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons mr-2' src={IconCollections} alt='' />
                            <span>Collections + Catégories</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons mr-2' src={IconPromos} alt='' />
                            <span>Promos + Codes promo</span>
                        </a>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Site</div>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                            <img className='icons mr-2' src={IconHome} alt='' />
                            <span className='align-bottom'>Page d'Accueil</span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    
}
                    
export default Navbar