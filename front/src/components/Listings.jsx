import React, { useEffect, useState } from 'react'
import { categories } from '../data'
import ListingCard from './ListingCard'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setListings } from '../redux/state'

function Listings() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const [selectedCategory, setSelectedCategory] = useState("Tout")

    const listings = useSelector((state) => state.listings)

    // Effect to fetch listings based on selected category
    useEffect(() => {
        // Defining async function to fetch listings
        const getFeedListings = async () => {
            try {
                const response = await fetch(
                    selectedCategory !== "Tout" ?
                    `http://localhost:3001/properties?category=${selectedCategory}` : "http://localhost:3001/properties",
                    {
                        method: "GET",

                    }
                    );
                    const data = await response.json()
                    dispatch(setListings({ listings: data }))
                    setLoading(false)
                } catch (err) {
                console.log("Échec de la récupération des annonces", err.message);
            }
        };
        // Calling function to fetch listings
        getFeedListings();
    }, [selectedCategory, dispatch]); // Dependencies for effect execution: selected category and Redux dispatcher


  return (
    <>
        <div className='listings_container'>
            <div className='listings_category'>
                {categories?.map((item, index) => (
                    <div 
                        className={`listings_category-item ${item.label === selectedCategory ? "selected" : ""}`}
                        key={index} 
                        onClick={() => setSelectedCategory(item.label)}
                    >
                        <div className='listings_category-item-icon'>{item.icon}</div>
                        <p className='listings_category-item-text'>{item.label}</p>
                    </div>
                ))}
            </div>
            {loading ? <Loader/> : (
                <div className='listings_content'>
                    {listings.length === 0 && selectedCategory !== "Tout" ? (
                        <p>Aucun résultat trouvé.</p>
                    ):(
                        listings?.map((
                        {_id, 
                        creator, 
                        listingPhotoPaths,
                        city,
                        region,
                        country,
                        category,
                        type,
                        price,
                        booking=false
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
                    ))
                    )}
                </div>
            )}
        </div>
    </>
  )
}

export default Listings