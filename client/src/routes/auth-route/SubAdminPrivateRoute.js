import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import { GlobalContext } from "../../context/ProjectContext";


const SubAdminPrivateRoute = ({component: Component, ...rest}) => {
    const {auth, user} = useContext(GlobalContext)
    return (
    <div>
        <Route {...rest} render={
            props => {
                if (auth.isLoading){
                    return <h2>Loading..</h2>
                }else if(!auth.isAuthenticated || !user.isSubAdmin){
                    if(!user.isAdmin)
                        return <Redirect to="/"/>
                    else return <Component {...props}/>
                }else{
                    return <Component {...props}/>
                }
            }
        }/>
    </div>
    )
}

export default SubAdminPrivateRoute