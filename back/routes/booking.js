const router = require("express").Router()

const Booking = require("../models/Booking")

/* CREATE BOOKING */

router.post("/create", async (req, res) => {
    try {
        // Destructuring data from the request body
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body
        // Creating a new instance of Booking model with provided data
        const newBooking = new Booking({customerId, hostId, listingId, startDate, endDate, totalPrice})
        // Saving the new booking to the database
        await newBooking.save()
        res.status(200).json(newBooking)
    } catch (err) {
        res.status(400).json({ message: "Impossible de créer une nouvelle réservation !", error: err.message})
    }
})

module.exports = router