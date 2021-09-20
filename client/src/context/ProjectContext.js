import React, {useReducer, createContext} from 'react'
import { reducer } from '../reducer/reducer'
import indexRoutes from '../routes';
import {  Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

export const GlobalContext = createContext()

let initialState = {
    user: {
        name: "jahid",
        isAdmin: false,
        isSubAdmin: true,
    },
    auth: {
        isAuthenticated: true,
        isLoading: false,
    }
}

const ProjectContext = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <GlobalContext.Provider value={{...state}}>
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
