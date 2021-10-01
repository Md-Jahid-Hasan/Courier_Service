import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './layout-components/header/header.jsx';
import Sidebar from './layout-components/sidebar/sidebar.jsx';
import Footer from './layout-components/footer/footer.jsx';
import ThemeRoutes from '../routes/routing.jsx';
import Starter from '../views/starter/starter.jsx';
import Notification from '../views/ui-components/Notification.jsx';
import Cookies from 'js-cookie'
import { GlobalContext } from '../context/ProjectContext.js';

import { 
    AdminPrivateRoute, SubAdminPrivateRoute,
     PrivateRoute, LoginPrivateRoute } from '../routes/auth-route/index.js';
import Updateprofile from '../authentication/Updateprofile.js';
import Login from "../authentication/Login"
import Alerts from '../views/ui-components/alert.jsx';
import Badges from '../views/ui-components/badge.jsx';
import Buttons from '../views/ui-components/button.jsx';
import Cards from '../views/ui-components/cards.jsx';
import LayoutComponent from '../views/ui-components/layout.jsx';
import UpdateUser from '../views/ui-components/user_form.jsx';
import PaginationComponent from '../views/ui-components/pagination.jsx';
import PopoverComponent from '../views/ui-components/product_details.jsx';
import TooltipComponent from '../views/ui-components/tooltip.jsx';
import BranchList from '../views/ui-components/branch_list.jsx';
import UpdateBranch from '../views/ui-components/update-branch.jsx';
import ParcelTrack from "../views/ui-components/parcel_track";



const Fulllayout = (props) => {
    /*--------------------------------------------------------------------------------*/
    /*Change the layout settings [HEADER,SIDEBAR && DARK LAYOUT] from here            */
    /*--------------------------------------------------------------------------------*/
    const [width, setWidth] = useState(window.innerWidth);
    const {auth} = useContext(GlobalContext)

    props.history.listen((location, action) => {
        if (
            window.innerWidth < 767 &&
            document
                .getElementById('main-wrapper')
                .className.indexOf('show-sidebar') !== -1
        ) {
            document
                .getElementById('main-wrapper')
                .classList.toggle('show-sidebar');
        }
    });

    /*--------------------------------------------------------------------------------*/
    /*Function that handles sidebar, changes when resizing App                        */
    /*--------------------------------------------------------------------------------*/
    useEffect(() => {
        const updateDimensions = () => {
            let element = document.getElementById('main-wrapper');
            setWidth(window.innerWidth)
            if (width < 1170) {
                element.setAttribute("data-sidebartype", "mini-sidebar");
                element.classList.add("mini-sidebar");
            } else {
                element.setAttribute("data-sidebartype", "full");
                element.classList.remove("mini-sidebar");
            }
        }
        if (document.readyState === "complete") {
            updateDimensions();
        }
        window.addEventListener("resize", updateDimensions.bind(this));
        window.addEventListener("load", updateDimensions.bind(this));
        return () => {
            window.removeEventListener("load", updateDimensions.bind(this));
            window.removeEventListener("resize", updateDimensions.bind(this));
        };
    }, [width]);

    


    /*--------------------------------------------------------------------------------*/
    /* Theme Setting && Layout Options wiil be Change From Here                       */
    /*--------------------------------------------------------------------------------*/
    return (
        <div
            id="main-wrapper"
            data-theme="light"
            data-layout="vertical"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
            data-boxed-layout="full"
        >
            {/*--------------------------------------------------------------------------------*/}
            {/* Header                                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <Header />
            {/*--------------------------------------------------------------------------------*/}
            {/* Sidebar                                                                        */}
            {/*--------------------------------------------------------------------------------*/}
           { auth.isAuthenticated && <Sidebar {...props} routes={ThemeRoutes} />}
            {/*--------------------------------------------------------------------------------*/}
            {/* Page Main-Content                                                              */}
            {/*--------------------------------------------------------------------------------*/}
            <div className="page-wrapper d-block">
                <div className="page-content container-fluid">
                    <Notification/>
                    <Switch>
                        <PrivateRoute exact path="/(|dashboard)" component={Starter}/>
                        {/* <Route exact path="/loggedin" component={Login}/> */}
                        <LoginPrivateRoute exact path="/(login|loggedin)" component={Login}/>
                        <PrivateRoute exact path="/updateProfile" component={Updateprofile}/>
                        <PrivateRoute exact path="/branch-data" component={Alerts}/>
                        <PrivateRoute exact path="/create-branch" component={Badges}/>
                        <PrivateRoute exact path="/employees" component={Buttons}/>
                        <PrivateRoute exact path="/branch" component={BranchList}/>
                        <PrivateRoute exact path="/create-employee" component={LayoutComponent}/>
                        <PrivateRoute exact path="/update-employee/:uid" component={UpdateUser}/>
                        <PrivateRoute exact path="/create-percel" component={PaginationComponent}/>
                        <PrivateRoute exact path="/product-details/:uid" component={PopoverComponent}/>
                        <PrivateRoute exact path="/parcel-list" component={TooltipComponent}/>
                        <Route exact path="/track-parcel/:pid" component={ParcelTrack}/>
                       
                    </Switch>
                </div>
                <Footer />
            </div>
        </div>
    );
}
export default Fulllayout;
