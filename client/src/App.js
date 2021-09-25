import React from 'react'
import indexRoutes from './routes';
import {  Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} key={key} component={prop.component} />;
                })}
            </Switch>
        </BrowserRouter>
    )
}

export default App