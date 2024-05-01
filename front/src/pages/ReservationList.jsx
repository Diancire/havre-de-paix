import React, { useEffect, useState, useCallback } from 'react'
import Loader from '../components/Loader'
import Header from '../components/Header'
import ListingCard from '../components/ListingCard'
import { useDispatch, useSelector } from 'react-redux'
import { setReservationList } from '../redux/state'
import Footer from '../components/Footer'

function ReservationList() {
    const [loading, setLoading] = useState(true)
    // Retrieving user ID from Redux state
    const userId = useSelector((state) => state.user._id)
    // Retrieving reservation list from Redux state
    const reservationList = useSelector((state) => state.user.reservationList)

    const dispatch = useDispatch();

    // Callback function to fetch reservation list data from the server
    const getReservationList = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}/reservations`, {
              method: "GET"
            });
            const data = await response.json()
            // Dispatching action to update reservation list in Redux state
            dispatch(setReservationList(data))
            setLoading(false)
        } catch (err) {
          console.log("Échec de la récupération de la liste des réservations", err.message);
        }
    }, [dispatch, userId]); // Dependency array for useCallback hook

    useEffect(() => {
      getReservationList(); // Calling getReservationList function when the component mounts or when userId changes
    }, [getReservationList])

  return loading ? (
    <Loader/> 
    ): (
    <>
        <Header/>
        <div className='reservation-list_container'>
          <h1 >Votre liste de réservations</h1>
          {reservationList.length === 0 ? (
            <p className='text-center'>Vous n'avez aucune liste de réservations pour le moment.</p>
          ):(
            <div className='reservation-list_element'>
                {reservationList?.map(({listingId, hostId, startDate, endDate, totalPrice, booking=true}) => (
                <ListingCard 
                    key={listingId._id}
                    listingId={listingId._id} 
                    creator={hostId._id}
                    listingPhotoPaths={listingId.listingPhotoPaths} 
                    city={listingId.city} 
                    region={listingId.region} 
                    country={listingId.country} 
                    category={listingId.category} 
                    startDate={startDate} 
                    endDate={endDate} 
                    totalPrice={totalPrice}
                    booking={booking}
                />
                ))}

            </div>
          )}
        </div>
        <Footer/>
    </>
  )
}

export default ReservationList