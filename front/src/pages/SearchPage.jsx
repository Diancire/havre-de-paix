import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setListings } from '../redux/state'
import Loader from '../components/Loader'
import Header from '../components/Header'
import ListingCard from '../components/ListingCard'
import Footer from '../components/Footer'


function SearchPage() {
    const [loading, setLoading] = useState(true)
    const { search } = useParams()
    const listings = useSelector((state) => state.listings)

    const dispatch = useDispatch()

    // Function to fetch search listings
    const getSearchListings = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/properties/search/${search}`, {
                method:"GET"
            })
            const data = await response.json()
            dispatch(setListings({listings: data}))
            setLoading(false)
        } catch (err) {
            console.log("Échec de la récupération de la liste", err.message);
        }
    }, [dispatch, search])

    useEffect(() => {
        // Call getSearchListings function on component mount
        getSearchListings()
    }, [getSearchListings])

    return loading ? (
        <Loader/>
    ):(
        <>
            <Header/>
            <div className='wish-list_container'>
              <h1>{search}</h1>
              {listings.length === 0 ? (
                <p className='text-center'>Aucun résultat trouvé.</p>
              ):(
                <div className='wish-list_element'>
                  {listings?.map(({ 
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
                    key={_id} 
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

export default SearchPage