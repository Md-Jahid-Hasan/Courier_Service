import React, {useState, useEffect, useContext} from 'react';
import Employee from "./Employee"
import Admin from './Admin';
import { GlobalContext } from '../../context/ProjectContext';

const Starter = () => {
    const {authenticateUser} = useContext(GlobalContext)

    return (
        <div>
            <Employee/>
            {!(authenticateUser.IsAdmin || authenticateUser.IsSuperadmin) && <Employee/>}
            {(authenticateUser.IsAdmin || authenticateUser.IsSuperadmin) && <Admin/>}
        </div>
    );
}

export default Starter;
