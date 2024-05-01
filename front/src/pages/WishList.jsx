import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import ListingCard from '../components/ListingCard'
import Footer from '../components/Footer'

function WishList() {
    // Retrieve the wishlist from the Redux store using the useSelector hook
    const wishList = useSelector((state) => state.user.wishList)
  return (
    <>
        <Header/>
        <div className='wish-list_container'>
          <h1>Votre liste de souhait</h1>
          {wishList.length === 0 ? (
            <p className='text-center'>Vous n'avez aucune liste de souhaits pour le moment.</p>
          ):(
            <div className='wish-list_element'>
              {wishList?.map(({ 
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

export default WishList