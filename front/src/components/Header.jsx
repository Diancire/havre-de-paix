import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { IoSearchSharp, IoMenuSharp, IoPersonSharp  } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux"
import { setLogout } from '../redux/state';


const Header = () => {
    // State to manage dropdown menu visibility
    const [dropdownMenu, setDropdownMenu] = useState(false);
    // Redux selector to get user state /
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search !== "") { // Check if search query is not empty
            navigate(`/properties/search/${search}`);
        }
    }

    return (
        <header className='header_container'>
            {/* Logo */}
            <a href="/" className='logo'>
                Havre de Paix
            </a>
            {/* Search bar */}
            <form onSubmit={handleSubmit} className='header_search'>
                <input 
                    type="text"
                    placeholder='Recherche...' 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <IoSearchSharp 
                    onClick={() => { 
                        if (search !== "") { 
                            navigate(`/properties/search/${search}`) 
                        }
                    }}
                />
            </form>
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