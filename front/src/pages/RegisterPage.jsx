import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
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

  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  }, [formData.password, formData.confirmPassword])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(formData.password === formData.confirmPassword) {
      setPasswordMatch(true)
    } else {
      setPasswordMatch(false)
    }

    try {
      const register_form = new FormData()

      for(var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form
      })
      if(response.ok) {
        navigate("/login")
      }
     } catch (err) {
      console.log("L'inscription a échoué", err.message);
     }
  }

  return (
    <div className='register'>
        <div className='register_content'>
            <form onSubmit={handleSubmit}>
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
              {!passwordMatch && (
                <p style={{color: "red"}}>Les mots de passe ne correspondent pas.</p>
              )}
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
              <button type='submit' disabled={!passwordMatch}>S'inscrire</button>
            </form>
            <a href='/login'>Vous avez déjà un compte ? Connectez-vous ici</a>
        </div>
    </div>
  )
}

export default RegisterPage