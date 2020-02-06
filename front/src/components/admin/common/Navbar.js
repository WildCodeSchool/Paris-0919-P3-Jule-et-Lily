import React, { useState, useEffect } from 'react'
import axios from 'axios'
import IconJL from '../../../assets/icons/LogoJuleetLily.svg'
import IconCollections from '../../../assets/icons/IconsCollections.svg'
import IconDash from '../../../assets/icons/IconDashboard.svg'
import IconHome from '../../../assets/icons/IconFrontHome.svg'
import IconOrders from '../../../assets/icons/IconOrders.svg'
import IconProducts from '../../../assets/icons/IconProducts.svg'
import IconPromos from '../../../assets/icons/IconPromos.svg'
import IconUsers from '../../../assets/icons/IconUsers.svg'
import '../../../assets/css/admin/global.css'
import '../../../assets/css/admin/Navbar.css'
import { NavLink, withRouter } from 'react-router-dom';


const Navbar = props => {

    const[lowStock, setLowStock] = useState(0)
    const {pathname} = props.location; // la route de la page active

    useEffect(() => {
        axios
        .get("/product/lowstock/") // liste les stock faible
        .then(res => {
            setLowStock(res.data[0].count)
        })
    },[pathname,])
    
        return (
            <div>
                <ul className="navbar-nav bg-gradient-purple sidebar cssNavbar sidebar-dark accordion" id="accordionSidebar">

                    <a href="/#" className="sidebar-brand d-flex align-items-center justify-content-center">
                            <img className='logoJuleLily' src={IconJL} alt='Jule + Lily' />
                    </a>

                    <li className="nav-item">
                        {/* si le chemin de la page active est  '/' on ajoute un background au navLink  et une classe active-page pour lui donner plus de styles*/}
                        <NavLink to="/" className={pathname=='/' ? "nav-link bg-gradient-purple active-page" : "nav-link"}> 
                            <img className='icons mr-2' src={IconDash} alt='' />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/profile" className={pathname=='/profile' ? "nav-link bg-gradient-purple active-page" : "nav-link"}>
                        <img className='icons mr-2' src={IconUsers} alt='' />
                            <span>Profil</span>
                        </NavLink>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Boutique</div>
                    <li className="nav-item">
                        <NavLink to="/orders" className={pathname=='/orders' ? "nav-link bg-gradient-purple active-page collapsed" : "nav-link collapsed"}  data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <img className='icons mr-2' src={IconOrders} alt='' />
                            <span>Commandes</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/users"  className={pathname=='/users' ? "nav-link bg-gradient-purple active-page collapsed" : "nav-link collapsed"}  data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons mr-2' src={IconUsers} alt='' />
                            <span className='align-bottom'>Clients</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/products"  className={pathname=='/products' ? "nav-link bg-gradient-purple active-page collapsed" : "nav-link collapsed"}  data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons mr-2' src={IconProducts} alt='' />
        <span>Produits {lowStock > 0 ? <span style={{backgroundColor: 'red', color:'white', borderRadius:'50%', height:'20px', width:'20px',display: 'inline-block',paddingLeft:'6px', fontWeight:'bold'}}>{lowStock}</span> : null}</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/collections" className={pathname=='/collections' ? "nav-link bg-gradient-purple active-page collapsed" : "nav-link collapsed"}  data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons mr-2' src={IconCollections} alt='' />
                            <span>Collections + Catégories</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/promo"  className={pathname=='/promo' ? "nav-link bg-gradient-purple active-page collapsed" : "nav-link collapsed"}  data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <img className='icons mr-2' src={IconPromos} alt='' />
                            <span>Promos + Codes promo</span>
                        </NavLink>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Site</div>

                    <li className="nav-item">
                        <NavLink to="/frontcustom"  className={pathname=='/frontcustom' ? "nav-link bg-gradient-purple active-page collapsed" : "nav-link collapsed"}  data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                            <img className='icons mr-2' src={IconHome} alt='' />
                            <span className='align-bottom'>Page d'Accueil</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    
}
                    
export default withRouter(Navbar); // withRouter permet d'acceder à des props comme la route active