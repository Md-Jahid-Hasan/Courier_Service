import React, {useReducer, createContext, useEffect} from 'react'
import { reducer } from '../reducer/reducer'
import App from "../App"
import Cookies from 'js-cookie'

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
        isAuthenticated: false,
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
        localStorage.setItem("authUser", JSON.stringify(data))
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

    const loginRedirect = () => {
        let data = JSON.parse(localStorage.getItem("authUser"))
        console.log(data)
        return dispatch({
            type:'LOGIN_INFO',
            payload:data
        })
    }

    const logOutUser = () => {
        return dispatch({
            type:'LOGOUT_USER',
        })
    }
    
    
    useEffect(() => {
        if(Cookies.get('jwtoken')){
            loginRedirect()
        }
    }, [])

    return (
        <GlobalContext.Provider value={{...state,storeLoginData,setAlertData, clearAlertData,updateUser, loginRedirect,
        logOutUser}}>
            <App/>
        </GlobalContext.Provider>
    )
}

export default ProjectContext
