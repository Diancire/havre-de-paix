import React from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className='footer'>
        <div className='footer_top'>
            <div className='footer_top-left'>
                <a href="/" className='logo'>
                    Havre de Paix
                </a>
            </div>
            <div className='footer_top-center'>
                <h3>Information</h3>
                <ul>
                    <li><a href="/#">À propos</a></li>
                    <li><a href="/#">Mentions légales</a></li>
                    <li><a href="/#">Conditions générales d'utilisation</a></li>
                </ul>
            </div>
            <div className='footer_top-right'>
                <h3>Contact</h3>
                <ul>
                    <li>
                        <FaPhoneAlt/>
                        06 06 06 XX XX
                    </li>
                    <li>
                        <FaEnvelope/>
                        havre-de-paix@@contact.com
                    </li>
                </ul>

            </div>
        </div>
        <div className='footer_bottom'>
            <p>© 2024 Havre de Paix - Tous droits réservés.</p>
        </div>
    </footer>
  )
}

export default Footer