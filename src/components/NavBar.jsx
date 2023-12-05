/*import { NavLink } from "react-router-dom"
import "./NavBar.css";
import { useAuthentication } from "../hooks/useAuthentication";

import {useAuthValue}  from '../context/AuthContext'
//ícones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";



import {
    Menu,
    MenuHandler,
    Button,
    Avatar
} from "@material-tailwind/react";

const profilemenuitens = [
    {
        label: "Meu Perfil"
    },
    {
        label: "Sobre"
    }
]

function ProfileMenu(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);
}


const NavBar = () => {
    const {user} = useAuthValue();
    const {logout} = useAuthentication();   


    return (
        <div>
        <Menu open={isMenuOpen} handler={setIsMenuOpen}>
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                    variant="circular"
                    size="sm"
                    alt="tania andrew"
                    className="border border-gray-900 p-0.5"
                    src="fundo.png"
                    ></Avatar>
                </Button>
            </MenuHandler>
        </Menu>

    <nav className={"navbar"}>
        <div className="brand">
        <span>Travel Vibe</span>
        </div>
        <ul className="links_list">
            <li>
                <a href="/"  className="nav-link" >
                    Home
                </a>
            </li>
            <li>
                <NavLink to="/post"  className="nav-link" >
                    +
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" className="nav-link">
                    Sobre
                </NavLink>
            </li>
            <li>
                <NavLink to="/" className="nav-link"  >
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px'}}/> 
                     Perfil
                </NavLink>
            </li>
            {user && (
                <li>
                    <button onClick={logout}>Sair</button>
                </li>
            )}
        </ul>
    </nav>
    </div>
    )}

export default NavBar*/