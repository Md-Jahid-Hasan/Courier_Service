import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {GlobalContext} from '../../../context/ProjectContext'

const Sidebar = (props) => {
    const {authenticateUser} = useContext(GlobalContext)

    const expandLogo = () => {
        document.getElementById("logobg").classList.toggle("expand-logo");
    }

    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? 'selected' : '';
    }

    return (
        <aside className="left-sidebar" id="sidebarbg" data-sidebarbg="skin6" onMouseEnter={expandLogo.bind(null)} onMouseLeave={expandLogo.bind(null)}>
            <div className="scroll-sidebar">
                <PerfectScrollbar className="sidebar-nav">

                    <Nav id="sidebarnav">
                        {props.routes.map((prop, key) => {
                            if ((prop.permission === "1") && !(authenticateUser.IsSuperadmin)) {
                                return null;
                            } else if ((prop.permission === "2" && !(authenticateUser.IsSuperadmin || authenticateUser.IsAdmin))) {
                                return null;
                            } else if ((prop.permission === "3") && !(authenticateUser.IsAdmin)) {
                                return null;
                            } else if ((prop.permission === "4") && (authenticateUser.IsSuperadmin)) {
                                return null;
                            } else if ((prop.permission === "5") && (authenticateUser.IsSuperadmin || authenticateUser.IsAdmin)) {
                                return null;
                            }
                            else {
                                return (
                                    
                                    <li className={activeRoute(prop.path) + (prop.pro ? ' active active-pro' : '') + ' sidebar-item'} key={key}>
                                        <NavLink to={prop.path} className="sidebar-link" activeClassName="active">
                                            <i className={prop.icon} />
                                                <span className="hide-menu">
                                                    {prop.name === "Create" ? authenticateUser.IsAdmin ? `${prop.name} Employee`: `${prop.name} Admin` :prop.name}
                                                </span>
                                        </NavLink>
                                    </li>
                                );
                            }
                        })}
                    </Nav>
                </PerfectScrollbar>
            </div>
        </aside>
    );
}
export default Sidebar;
