const router = require("express").Router()

const Booking = require("../models/Booking")

const User = require("../models/User")

const Listing = require("../models/Listing")

/* GET  TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
    try {
        // Extracting the userId from the request parameters
        const { userId } = req.params
        // Finding all bookings associated with the provided customerId (userId)
        // Populating the customerId, hostId, and listingId fields with their respective document data
        const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId")
        res.status(202).json(trips)
    } catch (err) {
        res.status(404).json({ message: "Impossible de trouver les listes de voyages", error: err.message})
    }
})

/* ADD LISTING TO WISH LIST */
// Route to add or remove a listing from a user's wish list
router.patch("/:userId/:listingId", async (req,res) => {
    try {

        // Extracting user ID and listing ID from request parameters
        const { userId, listingId } = req.params

         // Finding the user and listing by their IDs
        const user = await User.findById(userId)
        const listing = await Listing.findById(listingId).populate("creator")

        // Checking if the listing is already in the user's wish list
        const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

        // If the listing is already in the wish list, remove it; otherwise, add it
        if(favoriteListing) {
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
            await user.save()
            res.status(200).json({ message: "L'annonce est supprimée de la liste de souhaits", wishList: user.wishList})
        } else {
            user.wishList.push(listing)
            await user.save()
            res.status(200).json({ message: "L'annonce est ajoutée de la liste de souhaits",  wishList: user.wishList})
        }

    } catch (err) {
        console.log(err);
        res.status(404).json({ error: err.message })
    }
})

module.exports = router