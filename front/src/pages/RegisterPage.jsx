import React from 'react'
import { IoCloudUpload } from "react-icons/io5";


const RegisterPage = () => {
  return (
    <div className='register'>
        <div className='register_content'>
            <form>
              <input 
                type="text"
                placeholder='Nom'
                name='firstname'
                required 
              />
              <input 
                type="text"
                placeholder='Prénom'
                name='lastname'
                required 
              />
              <input 
                type="email"
                placeholder='Email'
                name='email'
                required 
              />
              <input 
                type="password"
                placeholder='Mot de passe'
                name='password'
                required 
              />
              <input 
                type="password"
                placeholder='Confirmez le mot de passe'
                name='confirmPassword'
                required 
              />
              <input 
                type="file" 
                name="profileImage" 
                id="image" 
                accept='image/*' 
                style={{ display: "none" }}
                required
              />
              <label htmlFor='image'>
                <IoCloudUpload />
                <p>Téléchargez votre photo</p>
              </label>
              <button type='submit'>S'inscrire</button>
            </form>
            <a href='/login'>Vous avez déjà un compte ? Connectez-vous ici</a>
        </div>
    </div>
  )
}

export default RegisterPage