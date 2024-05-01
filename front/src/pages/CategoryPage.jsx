import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import Header from '../components/Header'
import ListingCard from '../components/ListingCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setListings } from '../redux/state'
import Footer from '../components/Footer'


function CategoryPage() {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { category } = useParams()

    // Retrieving listings of the selected category from the Redux store
    const listings = useSelector((state) => state.listings)

    // Effect to fetch listings based on selected category
    useEffect(() => {
        // Defining async function to fetch listings
        const getFeedListings = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/properties?category=${category}`,
                    {
                        method: "GET",

                    }
                    );
                    const data = await response.json()

                    // Updating the Redux store with the fetched listings
                    dispatch(setListings({ listings: data }))
                    setLoading(false)
                } catch (err) {
                console.log("Échec de la récupération des annonces", err.message);
            }
        };
        // Calling function to fetch listings
        getFeedListings();
    }, [category, dispatch]); // Dependencies for effect execution: selected category and Redux dispatcher


  return loading ? (
    <Loader/>
  ): (
    <>
        <Header/>
        <div className='wish-list_container'>
          <h1>{category}</h1>
          {listings.length === 0 ? (
            <p className='text-center'>Actuellement, il n'y a pas de résultats dans cette catégorie.</p>
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

export default CategoryPage