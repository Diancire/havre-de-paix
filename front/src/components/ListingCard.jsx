import React, { useState } from 'react'
import { IoIosArrowDropleft, IoIosArrowDropright, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setWishList } from '../redux/state'
import { toast } from 'react-toastify';

const ListingCard = ({
    listingId, 
    creator, 
    listingPhotoPaths,
    city,
    region,
    country,
    category,
    type,
    price, 
    startDate, 
    endDate, 
    totalPrice,
    booking
}) =>{

    // Slider for images
    const [currentIndex, setCurrentIndex] = useState(0)

    // Functions to navigate through images
    const goToPrevSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length)
    }
    const goToNextSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
    }
    // Navigation hook to redirect to listing details
    const navigate = useNavigate();

    // Function to format dates in French with the first letter of the month in uppercase
    const formatDateFrench = (dateString) => {
        // Options for formatting the date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // Creating a Date object from the provided date string
        const date = new Date(dateString);
        // Getting the full name of the month in French and capitalizing the first letter
        const month = date.toLocaleDateString('fr-FR', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase());
        // Formatting the date with the specified options
        const formattedDate = date.toLocaleDateString('fr-FR', options);
        // Replacing the month in the formatted date with the capitalized month
        return formattedDate.replace(date.toLocaleDateString('fr-FR', { month: 'long' }), month);
    };

    // Add to wishlist

    const dispatch = useDispatch(); 

    // Select the user state from the Redux store
    const user = useSelector((state) => state.user)

    // Extract the user's wishlist from the user state, or initialize an empty array if it doesn't exist
    const wishList = user?.wishList || [];

    // Check if the current item is present in the user's wishlist
    const isLiked = wishList?.find((item) => item?._id === listingId);

    // Asynchronous function to update the wishlist on the server and in the Redux store
    const patchWishList = async () => {
        // Check if the current user is different from the creator of the listing
        if(user?._id !== creator._id) {
            const response = await fetch(`http://localhost:3001/users/${user?._id}/${listingId}`,
            {
                method:"PATCH",
                header: {
                    "Content-Type": "application/json"
                }
            }
            );
            const data = await response.json();

            // Dispatch a Redux action to update the wishlist in the Redux store with the updated data from the server
            dispatch(setWishList(data.wishList))
        } else {
            toast.error('Vous ne pouvez pas ajouter votre propre annonce à votre liste de souhaits');
            return
        }
    }


  return (
    <div className='listings_card' onClick={() => {navigate(`/properties/${listingId}`)}}>
        <div className='listings_card-slider-container'>
            <div className='listings_card-slider-content' style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
                {listingPhotoPaths && listingPhotoPaths.length > 0 ? (
                    listingPhotoPaths.map((photo, index) => (
                        <div className='listings_card-slider-content-item' key={index}>
                            <img src={`http://localhost:3001/${photo.replace("public", "")}`} alt={`listing ${index + 1}`} />
                            <div className='listings_card-slider-content-item-prev-button' onClick={(e) => {goToPrevSlide(e)}}>
                                <IoIosArrowDropleft/>
                            </div>
                            <div className='listings_card-slider-content-item-next-button'onClick={(e) => {goToNextSlide(e)}}>
                                <IoIosArrowDropright/>
                            </div>
                        </div>
                    ))
                ): (
                    <div className='listings_card-slider-content-item'>
                        <img src="/assets/no-photo.png" alt="not available" />
                    </div>

                )}
            </div>
        </div>
        <h3>{city}, {region}, {country}</h3>
        <p>{category}</p>
        {!booking ? (<>        
            <p>{type}</p>
            <p><span>{price}€</span> par nuit</p>
        </>):(<>
            <p>{formatDateFrench(startDate)} - {formatDateFrench(endDate)}</p>
            <p><span>{totalPrice}€</span></p>
        </>)}
        <button 
            className={`listings_card-favorite ${isLiked ? 'listings_card-favorite-red' : ''}`}
            onClick={(e) => {
                e.stopPropagation(); 
                patchWishList();
            }} 
            disabled={!user}
        >
            {isLiked ? (
                <IoMdHeart/>
                ):(
                <IoMdHeartEmpty/>
            )}
        </button>
    </div>
  )
}

export default ListingCard