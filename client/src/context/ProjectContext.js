import React, {useReducer, createContext} from 'react'
import { reducer } from '../reducer/reducer'
import indexRoutes from '../routes';
import {  Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

export const GlobalContext = createContext()

// let initialState = {
//         Email:"",
//         IsAdmin:Boolean,
//         IsSuperadmin:Boolean,
//         branch:{
//             branch:"",
//             contact:"",
//             id:""
//         }
// }

let initialState = {
    authenticateUser: {
        Email:"",
        IsAdmin:Boolean,
        IsSuperadmin:Boolean,
        branch:{
            branch:"",
            contact:"",
            id:""
        }
    },
    auth: {
        isAuthenticated: false,
        isLoading: false,
    }
}

const ProjectContext = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const storeLoginData =(data)=>{
        return dispatch({
            type:'LOGIN_INFO',
            payload:data
        })
    }
    return (
        <GlobalContext.Provider value={{...state,storeLoginData}}>
            <BrowserRouter>
                <Switch>
                    {indexRoutes.map((prop, key) => {
                        return <Route path={prop.path} key={key} component={prop.component} />;
                    })}
                </Switch>
            </BrowserRouter>
        </GlobalContext.Provider>
    )
}

export default ProjectContext
