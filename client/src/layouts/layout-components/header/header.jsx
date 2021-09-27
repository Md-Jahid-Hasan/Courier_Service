import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom'
import {
    Nav,
    NavItem,
    Navbar,
    NavbarBrand,
    Collapse,
    DropdownItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

import logodarkicon from '../../../assets/images/logo-icon.png';
import logodarktext from '../../../assets/images/logo-text.png';
import profilephoto from '../../../assets/images/users/1.jpg';
import { GlobalContext } from '../../../context/ProjectContext';

const Header = () => {
    const {logOutUser, auth} = useContext(GlobalContext)

    /*--------------------------------------------------------------------------------*/
    /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
    /*--------------------------------------------------------------------------------*/
    const showMobilemenu = () => {
        document.getElementById('main-wrapper').classList.toggle('show-sidebar');
    }

    return (
        <header className="topbar navbarbg" data-navbarbg="skin1">
            <Navbar className="top-navbar" dark expand="md">
                <div className="navbar-header" id="logobg" data-logobg="skin6">
                    
                    <NavbarBrand href="/">
                        <b className="logo-icon">
                            <img src={logodarkicon} alt="homepage" className="dark-logo" />
                        </b>
                        <span className="logo-text">
                            <img src={logodarktext} alt="homepage" className="dark-logo" />
                        </span>
                    </NavbarBrand>
                   
                    <button className="btn btn-link nav-toggler d-block d-md-none" onClick={() => showMobilemenu()}>
                        <i className="fas fa-bars" />
                    </button>
                </div>

                {auth.isAuthenticated && <Collapse className="navbarbg" navbar data-navbarbg="skin1" >
                    <Nav className="ml-auto float-right" navbar>
                        
                        
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="pro-pic">
                                <img
                                    src={profilephoto}
                                    alt="user"
                                    className="rounded-circle"
                                    width="31"
                                />
                            </DropdownToggle>
                            <DropdownMenu right className="user-dd">
                                <DropdownItem>
                                <NavLink className="nav-link" to="/updateProfile">
                                    
                                    <span className="ti-email hide-menu "style={{color:"black"}}>My Account</span>
                                    </NavLink>
                  </DropdownItem>
                                
                                {auth.isAuthenticated || <DropdownItem>
                                    
                                    <NavLink className="nav-link" to="/loggedin">
                                    
                                    <span className="ti-email hide-menu "style={{color:"black"}}>Login</span>
                                    </NavLink>
                                 
                  </DropdownItem>}
                                
                                <DropdownItem divider />
                                { auth && <DropdownItem  onClick={() => logOutUser()}>
                                    <i className="fa fa-power-off mr-1 ml-1"/> Logout
                  </DropdownItem>}
                                {/* <DropdownItem divider />
                                <Button
                                    color="success"
                                    className="btn-rounded ml-3 mb-2 mt-2"
                                >
                                    View Profile
                  </Button> */}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                       
                    </Nav>
                </Collapse>}
            </Navbar>
        </header>
    );
}
export default Header;
