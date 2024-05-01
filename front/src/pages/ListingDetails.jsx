import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { equipments } from '../data'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange} from 'react-date-range'
import Loader from '../components/Loader'
import Header from '../components/Header'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';

function ListingDetails() {
  const [loading, setLoading] = useState(true)

  const { listingId } = useParams()

  const [listing, setListing] = useState(null)

  // Fetch listing details based on listingId
  const getListingDetails = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/${listingId}`,
      {
        method:"GET"
      })
      const data = await response.json()
      setListing(data)
      setLoading(false)
    } catch (err){
      console.log("Échec de la récupération des détails de l'annonce", err.message);
    }
  }, [listingId]);

  // Fetch listing details when component mounts
  useEffect(() => {
    getListingDetails();
  }, [getListingDetails])


  // Booking calendar
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])

  // Handle date selection
  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection])
  }

  // Calculate total days for booking
  const start = new Date(dateRange[0].startDate)
  const end = new Date(dateRange[0].endDate)
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24) // Calculate the difference in day unit

  // Submit booking
  // Retrieving the customer ID from Redux state
  const customerId = useSelector((state) => state?.user?._id)

  const navigate = useNavigate()

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Creating a booking form object with required data
      const bookingForm = {
        customerId, 
        hostId: listing.creator._id, 
        listingId, 
        startDate: dateRange[0].startDate.toDateString(), 
        endDate: dateRange[0].endDate.toDateString(), 
        totalPrice: listing.price * dayCount,
      }
      // Sending a POST request to create a new booking
      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        }, 
        body: JSON.stringify(bookingForm) // Converting bookingForm to JSON string
      })
      if (response.ok) {
        toast.success('Réservation réussie !');
        navigate(`/${customerId}/trips`)
      }
    } catch (err) {
      console.log("Échec de l'envoi de la réservation.", err.message);
    }
  }

  return loading ? (
    <Loader/>
    ) : (
    <>
      <Header/>
      <div className='listing_details_container'>
        <div className='listing_details-title'>
            <h1>{listing.title}</h1>
            <div></div>
        </div>
        <div className='listing_details-photos'>
        {listing.listingPhotoPaths && listing.listingPhotoPaths.length > 0 ? (
          listing.listingPhotoPaths.map((photo, index) => (
            <img src={`http://localhost:3001/${photo.replace("public", "")}`} alt="listing" key={index} />
          ))
        ) : (
          <img src="/assets/no-photo.png" alt="not available" />
        )}
        </div>
        <hr />
        <h2>{listing.type} à {listing.city}, {listing.region}, {listing.country}</h2>
        <p>{listing.guestCount} invités - {listing.bredroomCount} chambre(s) - {listing.bedCount} lit(s) - {listing.bathroomCount} salle de bain(s)</p>
        <hr />
        <div className='listing_details-profile'>
            <img src={`http://localhost:3001/${listing.creator.profileImagePath && listing.creator.profileImagePath.replace("public", "")}`} alt="" />
            <h3>Propriétaire: {listing.creator.firstName} {listing.creator.lastName}</h3>
        </div>
        <hr />
        <div className='listing_details-description'>
            <h3>Description</h3>
            <p>{listing.description}</p>
        </div>
        <hr />
        <div className='listing_details-booking'>
          <div>
            <h2>Que propose ce lieu ?</h2>
            <div className='listing_details-equipment'>
                {listing.amenities[0].split(",").map((item, index) => (
                  <div className='listing_details-equipment-item' key={index}>
                    <div className='listing_details-equipment-item-icon'>
                      {equipments.find((equipment) => equipment.name === item )?.icon}
                    </div>
                    <div className='listing_details-equipment-item-text'>
                      {item}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='listing_details-date'>
            <h2>Combien de temps souhaitez-vous rester ?</h2>
            <div className='listing_details-date-calendar'>
              <DateRange ranges={dateRange} onChange={handleSelect}/>
              {dayCount > 1 ? (
                <h2>{listing.price} € x {dayCount} nuits</h2>
                ):(
                <h2>{listing.price} € x {dayCount} nuit</h2>
              )}
              <h2>Prix total: {listing.price * dayCount} €</h2>
              <p>Date de début: {dateRange[0].startDate.toLocaleDateString('fr-FR', {weekday: 'long'}).charAt(0).toUpperCase() + dateRange[0].startDate.toLocaleDateString('fr-FR', {weekday: 'long'}).slice(1)}, {dateRange[0].startDate.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}).replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</p>
              <p>Date de fin: {dateRange[0].endDate.toLocaleDateString('fr-FR', {weekday: 'long'}).charAt(0).toUpperCase() + dateRange[0].endDate.toLocaleDateString('fr-FR', {weekday: 'long'}).slice(1)}, {dateRange[0].endDate.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}).replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</p>
              <button className='btn btn_filled_yellow' type='submit' onClick={handleSubmit}>Réserver</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default ListingDetails