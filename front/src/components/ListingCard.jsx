import React, { useState } from 'react'
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

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
    </div>
  )
}

export default ListingCard