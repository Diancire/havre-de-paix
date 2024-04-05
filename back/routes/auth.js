const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")


const User = require("../models/User")

/* Configuration Multer for file upload */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/") // Store uploaded files in the 'uploads folder
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Use the original file name
    }
})

const upload = multer({ storage })

/* USER REGISTER */
router.post("/register", upload.single('profileImage'), async (req, res) => {
    try {
        /* Take all information from the form*/
        const { firstName, lastName, email, password } =  req.body
        /* The uploaded file is available as req.file  */
        const profileImage = req.file

        if(!profileImage) {
            return res.status(400).send("No file uploaded")
        }

        /* path to the uploaded profile photo  */
        const profileImagePath = profileImage.path

        /* Check if user exists */
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "L'utilisateur existe déjà"})
        }

        /* hass the password */
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        /* Create a new User */
        const newUser = new User ({
            firstName, 
            lastName, 
            email, 
            password: hashPassword,
            profileImagePath,
        });

        /* Save the new User */
        await newUser.save()

        /* Send a successful message */
        res.status(200).json({ message: "user registered successfully", user: newUser })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "registration failed", error: err.message})
    }
})

module.exports = router