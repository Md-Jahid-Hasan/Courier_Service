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
        _id:"",
        Username:"",
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
        isAuthenticated: true,
        isLoading: false,
    },
    notification: {
        message:"",
        code:""
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

    const setAlertData = (data) => {
        return dispatch({
            type: 'NOTIFICATION ADD',
            payload: data
        })
    }

    const clearAlertData = () => {
        return dispatch({
            type: 'NOTIFICATION CLEAR',
        })
    }

    const updateUser =(data)=>{
        return dispatch({
            type: 'UPDATE_USER',
            payload:data
        })
    }
    
    return (
        <GlobalContext.Provider value={{...state,storeLoginData,setAlertData, clearAlertData,updateUser}}>
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
