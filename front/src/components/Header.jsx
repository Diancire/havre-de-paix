import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { IoSearchSharp, IoMenuSharp, IoPersonSharp  } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux"
import { setLogout } from '../redux/state';


const Header = () => {
    // State to manage dropdown menu visibility
    const [dropdownMenu, setDropdownMenu] = useState(false);
    // Redux selector to get user state /
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    return (
        <header className='header_container'>
            {/* Logo */}
            <a href="/">
                LOGO
            </a>
            {/* Search bar */}
            <div className='header_search'>
                <input 
                    type="text"
                    placeholder='Recherche...' 
                />
                <IoSearchSharp />
            </div>
            {/* Right side of the navbar */}
            <nav className='header_navbar_right'>
                <button className='header_navbar_right_account' onClick={() => setDropdownMenu(!dropdownMenu)}>
                    <IoMenuSharp/>
                    {/* Conditional rendering of user icon or profile picture */}
                    {!user ?
                        <IoPersonSharp/>
                        : (
                            <img src={`http://localhost:3001/${user.profileImagePath.replace("public", "")}`} alt="profile" />
                        )
                    }
                </button>
                {/* Dropdown menu for no-logged-in users */}
                {dropdownMenu && !user && (
                    <div className='header_navbar_right-accountmenu'>
                        <Link to="/login">Se connecter</Link>
                        <Link to="/register">S'inscrire</Link>
                    </div>
                )}
                {/* Dropdown menu for logged-in users */}
                {dropdownMenu && user && (
                    <div className='header_navbar_right-accountmenu'>
                        <Link to={`/${user._id}/trips`}>Liste de voyages</Link>
                        <Link to={`/${user._id}/wishList`}>Liste de souhaits</Link>
                        <Link to={`/${user._id}/properties`}>Liste de propriétés</Link>
                        <Link to={`/${user._id}/reservations`}>Liste de réservations</Link>
                        <Link to="/create-listing">Publier une annonce</Link>


                        <Link to="/" onClick={() => {dispatch(setLogout())}}>Deconnexion</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header