import React, { useEffect, useState, useCallback } from 'react'
import Loader from '../components/Loader'
import Header from '../components/Header'
import ListingCard from '../components/ListingCard'
import { useDispatch, useSelector } from 'react-redux'
import { setTripList } from '../redux/state'
import Footer from '../components/Footer'

function TripList() {
    const [loading, setLoading] = useState(true)
    // Retrieving user ID from Redux state
    const userId = useSelector((state) => state.user._id)
    // Retrieving trip list from Redux state
    const tripList = useSelector((state) => state.user.tripList)

    const dispatch = useDispatch();

    // Callback function to fetch trip list data from the server
    const getTripList = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}/trips`, {
              method: "GET"
            });
            const data = await response.json()
            // Dispatching action to update trip list in Redux state
            dispatch(setTripList(data))
            setLoading(false)
        } catch (err) {
          console.log("Échec de la récupération de la liste des voyages", err.message);
        }
    }, [dispatch, userId]); // Dependency array for useCallback hook

    console.log(getTripList);

    useEffect(() => {
      getTripList(); // Calling getTripList function when the component mounts or when userId changes
    }, [getTripList])

  return loading ? (
    <Loader/> 
    ): (
    <>
        <Header/>
        <div className='trip-list_container'>
          <h1 >Votre liste de voyages</h1>
          {tripList.length === 0 ? (
            <p className='text-center'>Vous n'avez aucune liste de voyages pour le moment.</p>
          ):(
            <div className='trip-list_element'>
              {tripList?.map(({listingId, hostId, startDate, endDate, totalPrice, booking=true}) => (
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

export default TripList