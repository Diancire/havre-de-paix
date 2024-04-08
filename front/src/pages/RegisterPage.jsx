import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { IoCloudUpload, IoRadioButtonOff } from "react-icons/io5";
import { BsEye, BsEyeSlash, BsCheck2Circle  } from "react-icons/bs";
import { toast } from 'react-toastify';


const RegisterPage = () => {
  // State declarations
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password:"",
    confirmPassword:"",
    profileImage: null,
  })

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [photoSelected, setPhotoSelected] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  
  
  // Side effects
  useEffect(() => {
    // Password validation logic
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
    setLengthValidated(formData.password.length >= 12);
    setNumberValidated(/\d/.test(formData.password));
    setUpperValidated(/[A-Z]/.test(formData.password));
    setLowerValidated(/[a-z]/.test(formData.password));
    setSpecialValidated(/[-+!*$@%_#]/.test(formData.password));
  }, [formData.password, formData.confirmPassword])

  // Navigation hook
  const navigate = useNavigate()

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    setFormSubmitted(true);

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
        toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        navigate("/login")
      }
     } catch (err) {
      console.log("L'inscription a échoué", err.message);
     }
  }

  // Form input change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "profileImage" && files.length > 0) {
      setPhotoSelected(true);
    }
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value
    })
  }
  
  return (
    <div className='register'>
        <div className='register_content'>
            <form onSubmit={handleSubmit} className='register_form'>
              {/* input fields */}
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
              {/* form controls */}
              <div className='register_form-control'>
                <input 
                  type={passwordType}
                  placeholder='Mot de passe'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
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
              <div className='register_form-control'>
                <input 
                  type={confirmPasswordType}
                  placeholder='Confirmez le mot de passe'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
                {
                  confirmPasswordType==="password" ? (
                    <span
                      onClick={() => setConfirmPasswordType('text')}>
                      <BsEye size={18}/>
                    </span>
                  ) : (
                    <span
                      onClick={() => setConfirmPasswordType('password')}>
                      <BsEyeSlash size={18}/>
                    </span>
                  )
                }
              </div>
              {(!passwordMatch && formSubmitted) && (
                <p className='form_message-error'>Les mots de passe ne correspondent pas.</p>
              )}
              {((!lengthValidated || !numberValidated || !upperValidated || !lowerValidated || !specialValidated) && formSubmitted) && (
                <p className='form_message-error'>Le mot de passe ne respecte pas les critères de sécurité.</p>
              )}
              {/* password validation messages */}
              <div className='register_form_content-validation-mdp'>
                <p>Votre mot de passe doit contenir:</p>
                <ul>
                  <li className={lengthValidated ? 'validated' : ''}>
                    {lengthValidated ? < BsCheck2Circle /> : <IoRadioButtonOff />}
                    <span>12 caractères minimum</span>
                  </li>
                  <li className={numberValidated ? 'validated' : ''}>
                    {numberValidated ? < BsCheck2Circle /> : <IoRadioButtonOff />}
                    <span>Un chiffre (0...9)</span>
                  </li>
                  <li className={upperValidated ? 'validated' : ''}>
                    {upperValidated ? < BsCheck2Circle /> : <IoRadioButtonOff />}
                    <span>Une lettre majuscule (A...Z)</span>
                  </li>
                  <li className={lowerValidated ? 'validated' : ''}>
                    {lowerValidated ? < BsCheck2Circle /> : <IoRadioButtonOff />}
                    <span>Une lettre minuscule (a...z)</span>
                  </li>
                  <li className={specialValidated ? 'validated' : ''}>
                    {specialValidated ? < BsCheck2Circle /> : <IoRadioButtonOff />}
                    <span>Un caractère spécial: -+!*$@%_#)</span>
                  </li>
                </ul>
              </div>
              {/* file upload for profile picture */}
              <input 
                type="file" 
                name="profileImage"
                onChange={handleChange}
                id="image" 
                accept='image/*' 
                style={{ display: "none" }}
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
              {(!photoSelected && formSubmitted) && (
                <p className='form_message-error'>Veuillez ajouter une photo.</p>
              )}
              <button type='submit' disabled={!passwordMatch}>S'inscrire</button>
            </form>
            {/* link to login */}
            <a href='/login'>Vous avez déjà un compte ? Connectez-vous ici</a>
        </div>
    </div>
  )
}

export default RegisterPage