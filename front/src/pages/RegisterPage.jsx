import React, { useState } from 'react'
import { IoCloudUpload } from "react-icons/io5";


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password:"",
    confirmPassword:"",
    profileImage: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value
    })
  }

  console.log(formData);

  return (
    <div className='register'>
        <div className='register_content'>
            <form>
              <input 
                type="text"
                placeholder='Nom'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                required 
              />
              <input 
                type="text"
                placeholder='Prénom'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
              <input 
                type="email"
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <input 
                type="password"
                placeholder='Mot de passe'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <input 
                type="password"
                placeholder='Confirmez le mot de passe'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
              <input 
                type="file" 
                name="profileImage"
                onChange={handleChange}
                id="image" 
                accept='image/*' 
                style={{ display: "none" }}
                required
              />
              <label htmlFor='image'>
                <IoCloudUpload />
                <p>Téléchargez votre photo</p>
              </label>
              {formData.profileImage && (
                <img 
                  src={URL.createObjectURL(formData.profileImage)} 
                  alt='profile'
                  style={{ maxWidth: "80px"}}
                />
              )}
              <button type='submit'>S'inscrire</button>
            </form>
            <a href='/login'>Vous avez déjà un compte ? Connectez-vous ici</a>
        </div>
    </div>
  )
}

export default RegisterPage