const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")


const User = require("../models/User")

/* Configuration Multer for file upload */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/profile") // Store uploaded files in the 'uploads folder
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Use the original file name
    }
})

const upload = multer({ storage })

const passwordRegex = {
    minLength: /^(?=.*\S).{12,}$/,
    digit: /^(?=.*\d).+$/,
    uppercase: /^(?=.*[A-Z]).+$/,
    lowercase: /^(?=.*[a-z]).+$/,
    specialChar: /^(?=.*[-+!*$@%_#]).+$/,
}

/* USER REGISTER */
router.post("/register", upload.single('profileImage'), async (req, res) => {
    try {
        /* Take all information from the form*/
        const { firstName, lastName, email, password } =  req.body
        /* The uploaded file is available as req.file  */
        const profileImage = req.file

        if(!profileImage) {
            return res.status(400).send("Aucun fichier téléchargé")
        }

        /* path to the uploaded profile photo  */
        const profileImagePath = profileImage.path

        /* Check if user exists */
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "L'utilisateur existe déjà"})
        }

        /* checking password criteria */
        if(
            !passwordRegex.minLength.test(password) ||
            !passwordRegex.digit.test(password) ||
            !passwordRegex.uppercase.test(password) ||
            !passwordRegex.lowercase.test(password) ||
            !passwordRegex.specialChar.test(password)
        ) {
            return res.status(400).json({
                message:"Le mot de passe ne respecte pas les critères de sécurité."
            });
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
        res.status(200).json({ message: "Inscription réussie", user: newUser })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Échec de l'inscription", error: err.message})
    }
})

/* USER LOGIN */
router.post("/login", async (req, res) => {
    try {
        /* Take the information from the form */
        const { email, password } = req.body
        /* Check if user exists */
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "L'utilisateur n'existe pas"})
        }

        /* Compare the password with the hashed password */
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({message: "Les informations d'identification invalides"})
        }

        /* Generate JWT token */
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({ token, user })
    } catch {
        console.log(err);
        res.status(500).json({ error: err.message})
    }
})

module.exports = router