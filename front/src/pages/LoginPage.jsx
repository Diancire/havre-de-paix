import React, { useState } from 'react'
import { setLogin } from '../redux/state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");

  // Initializing useDispatch to dispatch Redux actions
  const dispatch = useDispatch()

  // Initializing useNavigate for navigation
  const navigate = useNavigate()

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Sending request to server for login
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password})
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      /* Get data after fetching */
      const loggedIn = await response.json()

      // If login successful, update Redux state with user data and token
      if(loggedIn) {
        dispatch ( 
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        // Redirecting to home page
        navigate("/")
      }

    } catch(err) {
      console.log("La connexion a échoué", err.message);
      setErrorMessage("Adresse email et/ou mot de passe invalides");
    }
  }

  return (
    <div className='login'>
      <div className='login_content'>
        <form action="" className='login_form' onSubmit={handleSubmit}>
          <input 
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <div className='login_form-control'>
            <input
              type={passwordType}
              placeholder='Mot de passe'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
              {
                passwordType==="password" ? (
                  <span
                    onClick={() => setPasswordType('text')}>
                    <BsEye size={18}/>
                  </span>
                ) : (
                  <span
                    onClick={() => setPasswordType('password')}>
                    <BsEyeSlash size={18}/>
                  </span>
                )
              }
          </div>
          {errorMessage && <p className="form_message-error">{errorMessage}</p>}
          <button type='submit'>Se connecter</button>
        </form>
        <a href="/register">Vous n'avez pas de compte ? S'inscrire</a>
      </div>
    </div>
  )
}
