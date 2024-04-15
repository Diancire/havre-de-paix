const router = require("express").Router()
const multer = require("multer")

const Listing = require("../models/Listing")
const User = require("../models/User")


/* Configuration Multer for file upload */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/listing") // Store uploaded files in the 'uploads folder
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Use the original file name
    }
})

const upload = multer({ storage })

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try{
        const { 
            creator, 
            category, 
            type, 
            adress, 
            postalCode, 
            city, 
            region, 
            country, 
            guestCount, 
            bedroomCount, 
            bedCount, 
            bathroomCount, 
            amenities, 
            listingPhotoPaths, 
            title, 
            description, 
            price 
        } = req.body;

        const user = await User.findById(userId)

        const listingPhotos = req.files
        if(!listingPhotos) {
            return res.status(400).send("Aucun fichier téléchargé.")
        }

        const listinPhotoPaths = listingPhotos.map((file) => file.path)

        const newListing = new Listing({
            creator,
            firstName: user.firstName,
            category, 
            type,
            adress, 
            postalCode, 
            city, 
            region, 
            country, 
            guestCount, 
            bedroomCount, 
            bedCount, 
            bathroomCount, 
            amenities, 
            listingPhotoPaths, 
            title, 
            description, 
            price 
        })

        await newListing.save()

        res.status(200).json(newListing)
    } catch (err){
        res.status(409).json({ message: "Echec de la création d'annonce", error: err.message})
        console.log(err);
    }
})

/* GET LISTINGS */
router.get("/", async (req, res) => {
    const qCategory = req.query.category
    try {
        let listings
        if(qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator")
        } else {
            listings = await Listing.find()
        }

        res.status(200).json(listings)

    } catch (err) {
        res.status(404).json({ message: "Impossible de récupérer les annonces", error: err.message})
        console.log(err);
    }
})

module.exports = router