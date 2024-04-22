const router = require("express").Router()

const Booking = require("../models/Booking")

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

module.exports = router