import React,{useContext} from 'react';
import { useParams } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';
import Button from '../FormElements/Button';

const NavLinks = props =>{
    const auth = useContext(AuthContext);
    const userId = auth.userId;
    console.log("nav",auth);
    return (
        <ul className="nav-links">
            <li>
                <NavLink to='/' exact>ALL USERS</NavLink>
            </li>
            {auth.isLoggedIn && (<li>
                <NavLink to={"/" + userId + "/places"}>MY PLACES</NavLink>
            </li>)}
            <li>
                <NavLink to='/places/new'>ADD PLACE</NavLink>
            </li>
            {!auth.isLoggedIn && (<li>
                <NavLink to='/auth'>AUTHENTICATE</NavLink>
            </li>)}
            { auth.isLoggedIn && (<li>
                <Button onClick={auth.logout}>LOGOUT</Button>
            </li>) }
        </ul>
    );
}

export default NavLinks ;