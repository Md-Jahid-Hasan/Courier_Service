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
    //const {logOutUser} = useContext(GlobalContext)

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
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
                    {/*--------------------------------------------------------------------------------*/}
                    <NavbarBrand href="/">
                        <b className="logo-icon">
                            <img src={logodarkicon} alt="homepage" className="dark-logo" />
                        </b>
                        <span className="logo-text">
                            <img src={logodarktext} alt="homepage" className="dark-logo" />
                        </span>
                    </NavbarBrand>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Mobile View Toggler  [visible only after 768px screen]                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    <button className="btn btn-link nav-toggler d-block d-md-none" onClick={() => showMobilemenu()}>
                        <i className="fas fa-bars" />
                    </button>
                </div>
                <Collapse className="navbarbg" navbar data-navbarbg="skin1" >
                    <Nav className="ml-auto float-right" navbar>
                        <NavItem>
                            <a href="link" className="btn btn-danger mr-2" style={{ marginTop: '15px' }}>Upgrade to Pro</a>
                        </NavItem>
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Profile Dropdown                                                         */}
                        {/*--------------------------------------------------------------------------------*/}
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
                                    {/* <i className="ti-email mr-1 ml-1" /> Login */}
                                    <span className="ti-email hide-menu "style={{color:"black"}}>My Account</span>
                                    </NavLink>
                  </DropdownItem>
                                <DropdownItem>
                                    <i className="ti-wallet mr-1 ml-1" /> My Balance
                  </DropdownItem>
                                <DropdownItem>
                                    {/* <i className="ti-email mr-1 ml-1" /> Login */}
                                    <NavLink className="nav-link" to="/loggedin">
                                    {/* <i className="ti-email mr-1 ml-1" /> Login */}
                                    <span className="ti-email hide-menu "style={{color:"black"}}>Login</span>
                                    </NavLink>
                                 
                  </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <i className="ti-settings mr-1 ml-1" /> Account Settings
                  </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem >
                                    <i className="fa fa-power-off mr-1 ml-1"/> Logout
                  </DropdownItem>
                                <DropdownItem divider />
                                <Button
                                    color="success"
                                    className="btn-rounded ml-3 mb-2 mt-2"
                                >
                                    View Profile
                  </Button>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/*--------------------------------------------------------------------------------*/}
                        {/* End Profile Dropdown                                                           */}
                        {/*--------------------------------------------------------------------------------*/}
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}
export default Header;
