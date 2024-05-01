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
// Create a new listing
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
            title, 
            description, 
            price 
        } = req.body;

        // Check if any files were uploaded
        const listingPhotos = req.files
        if(!listingPhotos) {
            return res.status(400).send("Aucun fichier téléchargé.")
        }

        // Extract file paths from the uploaded files
        const listingPhotoPaths = listingPhotos.map((file) => file.path)

        // Create a new listing with the provided data
        const newListing = new Listing({
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
        })

        // Save the new listing to the database
        await newListing.save()

        // Respond with the newly created listing
        res.status(200).json(newListing)
    } catch (err){
        res.status(409).json({ message: "Echec de la création d'annonce", error: err.message})
        console.log(err);
    }
})

/* GET LISTINGS BY CATEGORY */
// Retrieve all listings or those of a specific category
router.get("/", async (req, res) => {
    const qCategory = req.query.category
    try {
        let listings
        if(qCategory) {
            // If a category query parameter is provided, retrieve listings of that category
            listings = await Listing.find({ category: qCategory }).populate("creator")
        } else {
            // Otherwise, retrieve all listings
            listings = await Listing.find().populate("creator")
        }

        // Respond with the retrieved listings
        res.status(200).json(listings)

    } catch (err) {
        res.status(404).json({ message: "Impossible de récupérer les annonces", error: err.message})
        console.log(err);
    }
})

/* GET LISTING BY SEARCH */
router.get("/search/:search", async (req, res) => {
    const { search } = req.params

    try {
        let listings = []
        
        if(search === "all") {
            // If search term is "all", retrieve all listings and populate creator field
            listings = await Listing.find().populate("creator")
        } else {
            // If search term is specific, perform a search based on category or title
            listings = await Listing.find({
                $or: [
                    { category: {$regex: search, $options: "i"}},
                    { title: {$regex: search, $options: "i"}},
                ]
            }).populate("creator")
        }
        // Send response with the retrieved listings
        res.status(200).json(listings)
    } catch (err) {
        res.status(404).json({ message: "Impossible de récupérer les annonces", error: err.message})
        console.log(err);
    }
})

/* LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
    try {
        const { listingId } = req.params
        const listing = await Listing.findById(listingId).populate("creator")
        res.status(202).json(listing)
    } catch (err) {
        res.status(404).json({ message: "La liste est introuvable", error: err.message})
    }
})

module.exports = router