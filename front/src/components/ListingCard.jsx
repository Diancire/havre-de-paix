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
    price
}) =>{

    // Slider for images
    const [currentIndex, setCurrentIndex] = useState(0)

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length)
    }
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
    }
    const navigate = useNavigate();

  return (
    <div className='listings_card' onClick={() => {navigate(`/properties/${listingId}`)}}>
        <div className='listings_card-slider-container'>
            <div className='listings_card-slider-content' style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
                {listingPhotoPaths && listingPhotoPaths.length > 0 ? (
                    listingPhotoPaths.map((photo, index) => (
                        <div className='listings_card-slider-content-item' key={index}>
                            <img src={`http://localhost:3001/${photo.replace("public", "")}`} alt={`photo listing ${index + 1}`} />
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
                        <img src="/assets/no-photo.png" alt="no photo" />
                    </div>

                )}
            </div>
        </div>
        <h3>{city}, {region}, {country}</h3>
        <p>{category}</p>
        <p>{type}</p>
        <p><span>{price}€</span> par nuit</p>
    </div>
  )
}

export default ListingCard