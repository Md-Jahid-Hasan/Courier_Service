import React, {useState, useEffect, useContext} from 'react';
import Employee from "./Employee"
import Admin from './Admin';
import SuperAdmin from "./SuperAdmin"
import { GlobalContext } from '../../context/ProjectContext';

const Starter = () => {
    const {authenticateUser} = useContext(GlobalContext)
    console.log(authenticateUser)
    return (
        <div>
            {authenticateUser.Email && (authenticateUser.IsAdmin ? <Admin/> : authenticateUser.IsSuperadmin ? <SuperAdmin/> : <Employee/>)}
            
        </div>
    );
}

export default Starter;
