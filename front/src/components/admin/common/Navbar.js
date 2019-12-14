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
import './sb-admin-2.css'
import './sb-admin-2.min.css'
import './Navbar.css'

const Navbar = () => {
        return (
            <div>
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                    <a className="sidebar-brand d-flex align-items-center justify-content-center">
                            <img className='logoJuleLily' src={IconJL} alt='Jule + Lily' />
                    </a>

                    <li className="nav-item active">
                        <a className="nav-link">
                            <img className='icons' src={IconDash} alt='' />
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Boutique</div>
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <img className='icons' src={IconOrders} alt='' />
                            <span>Commandes</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons' src={IconUsers} alt='' />
                            <span>Clients</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons' src={IconProducts} alt='' />
                            <span>Produits</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a class="nav-link collapsed" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons' src={IconCollections} alt='' />
                            <span>Collections + catégories</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons' src={IconPromos} alt='' />
                            <span>Promos + codes promo</span>
                        </a>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Site</div>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                            <img className='icons' src={IconHome} alt='' />
                            <span>Page d'accueil</span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    
}
                    
export default Navbar