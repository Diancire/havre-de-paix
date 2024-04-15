const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }, 
        category: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        adress: {
            type: String,
            required: true
        },
        postalCode: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        guestCount: {
            type: Number,
            required: true
        },
        bedroomCount: {
            type: Number,
            required: true
        },
        bedCount: {
            type: Number,
            required: true
        },
        bathroomCount: {
            type: Number,
            required: true
        },
        amenities: {
            type: Array,
            default: [{}]
        },
        listingPhotoPaths: [{ type: String}],
        title: {
            type:String,
            required:true
        },
        description: {
            type:String,
            required:true
        }, 
        price: {
            type: Number,
            required: true
        }
    },
    {timestamps: true}
)

const Listing = mongoose.model("Listing", ListingSchema)
module.exports = Listing