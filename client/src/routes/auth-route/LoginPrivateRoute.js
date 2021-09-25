import React, {useContext, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import {GlobalContext} from '../../context/ProjectContext';

const LoginPrivateRoute = ({component: Component, ...rest}) => {
    const {auth} = useContext(GlobalContext)
    
    console.log("login")


    return (
    <div>
        <Route {...rest} render={
            props => {
                if (auth.isLoading){
                    return <h2>Loading..</h2>
                }else if(auth.isAuthenticated){
                    return <Redirect to="/"/>
                }else{
                    return <Component {...props}/>
                }
            }
        }/>
    </div>
    )
}

export default LoginPrivateRoute