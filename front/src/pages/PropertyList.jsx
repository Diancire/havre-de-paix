import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import ListingCard from '../components/ListingCard'
import { setPropertyList } from '../redux/state'
import Loader from '../components/Loader'
import Footer from '../components/Footer'

function PropertyList() {

    // State to manage loading state
    const [loading, setLoading] = useState(true)

    // Selecting user state from Redux store
    const user = useSelector((state) => state.user)

    // Retrieve the property list from the Redux store using the useSelector hook
    const propertyList = user?.propertyList

    const dispatch = useDispatch()

    // Function to fetch property list from server
    const getPropertyList = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${user._id}/properties`,
            {
                method:"GET"
            })

            const data = await response.json()

            // Updating Redux store with fetched property list
            dispatch(setPropertyList(data))
            setLoading(false)
        } catch (err) {
            console.log("Échec de la récupération de la liste des propriétés");
        }
    }, [dispatch, user._id])

    // Fetch property list when component mounts
    useEffect(() => {
        getPropertyList()
    }, [getPropertyList])

  return loading ? (
        <Loader/>
    ) : (
        <>
            <Header/>
            <div className='property-list_container'>
            <h1>Votre liste de propriétés</h1>
            {propertyList.length === 0 ? (
                <p className='text-center'>Vous n'avez aucune liste de propriétés pour le moment.</p>
            ):(
                <div className='property-list_element'>
                {propertyList?.map(({ 
                    _id,
                    creator,
                    listingPhotoPaths, 
                    city, 
                    region, 
                    country, 
                    category, 
                    type, 
                    price, 
                    booking = false 
                }) => (
                    <ListingCard 
                    listingId={_id}
                    creator={creator}
                    listingPhotoPaths={listingPhotoPaths}
                    city={city}
                    region={region}
                    country={country}
                    category={category}
                    type={type}
                    price={price}
                    booking={booking}
                    />
                    )
                )}
                </div>
            )}
            </div>
            <Footer/>
        </>
  )
}

export default PropertyList