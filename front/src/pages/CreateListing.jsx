import React, { useState } from 'react'
import Header from '../components/Header'
import { categories, types, equipments } from '../data'
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline, IoIosImages, IoIosTrash} from "react-icons/io"
import { DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import { useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'

function CreateListing() {

    const [category, setCategory] = useState("")
    const [type, setType] = useState("")

    // Location 
    const [formLocation, setFormLocation] = useState({
        adress: "",
        postalCode: "", 
        city: "", 
        region: "", 
        country: "", 

    })
    const handleChangeLocation = (e) => {
        const { name, value } = e.target
        setFormLocation({
            ...formLocation,
            [name]: value
        });
    };

    // Basic counts
    const [guestCount, setGuestCount] = useState(1)
    const [bedroomCount, setBedroomCount] = useState(1)
    const [bedCount, setBedCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)

    // Equipments
    const [amenities, setAmenities] = useState([]);

    const handleSelectAmenities = (equipment) => {
        if(amenities.includes(equipment)) {
            setAmenities((prevAmenities) => prevAmenities.filter((option) => option !== equipment))
        } else {
            setAmenities((prev) => [...prev, equipment])
        }
    }

    // Upload, Drag & Drop, Remove photos
    const [photos, setPhotos] = useState([])

    const handleUploadPhotos = (e) => {
        const newPhotos = e.target.files;
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    }

    const handleDragPhoto = (result) => {
        if (!result.destination) return

        const items = Array.from(photos)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setPhotos(items);
    }

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) => 
            prevPhotos.filter((_, index) => index !== indexToRemove)
        );
    };

    const [formDescription, setFormDescritpion] = useState({
        title: "",
        description:"",
        price: 0,
    })

    const handleChangeDescription = (e) => {
        const { name, value } = e.target
        setFormDescritpion({
            ...formDescription,
            [name]: value,
        })
    }

    const creatorId = useSelector((state) => state.user._id)

    const navigate = useNavigate()

    const handlePost = async (e) => {
        e.preventDefault()

        try {
            /* Create a new formData object to handle file uploads */
            const listingForm = new FormData()
            listingForm.append("creator", creatorId)
            listingForm.append("category", category)
            listingForm.append("type", type)
            listingForm.append("adress", formLocation.adress)
            listingForm.append("postalCode", formLocation.postalCode)
            listingForm.append("city", formLocation.city)
            listingForm.append("region", formLocation.region)
            listingForm.append("country", formLocation.country)
            listingForm.append("guestCount", guestCount)
            listingForm.append("bedroomCount", bedroomCount)
            listingForm.append("bedCount", bedCount)
            listingForm.append("bathroomCount", bathroomCount)
            listingForm.append("amenities", amenities)
            listingForm.append("title", formDescription.title)
            listingForm.append("description", formDescription.description)
            listingForm.append("price", formDescription.price)

            /* Append each selected photos to the FormData object */
            photos.forEach((photo) => {
                listingForm.append("listingPhotos", photo)
            })

            /* Send a POST request to server */
            const response = await fetch("http://localhost:3001/properties/create", {
                method: "POST",
                body: listingForm
            })
            if(response.ok) {
                navigate("/")
            }
        } catch (err) {
            console.log("Publish listing failed", err.message);
        }
    }

  return (
    <>
        <Header/>
        <div className='create_listing_container'>
            <h1>Publiez votre annonce</h1>
            <form onSubmit={handlePost}>
                <div className='create_listing-step-1'>
                    <h2>Étape 1 : Décrivez votre logement</h2>
                    <h3>Parmi ces catégories, laquelle décrit le mieux votre logement ?</h3>
                    <div className='create_listing-step-1-category-list'>
                        {categories?.map((item, index) => (
                            <div 
                                className={`create_listing-step-1-category-item ${category === item.label ? "selected" : ""}`} 
                                key={index} 
                                onClick={() => setCategory(item.label)}
                            >
                                <div className='create_listing-step-1-category-item-icon'>{item.icon}</div>
                                <p>{item.label}</p>
                            </div>
                        ))}

                    </div>
                    <h3>Quel type de logement les invités auront-ils ?</h3>
                    <div className='create_listing-step-1-type-list'>
                        {types?.map((item, index) =>(
                            <div 
                                className={`create_listing-step-1-type-item ${type === item.name ? "selected" : ""}`}
                                key={index} 
                                onClick={() => setType(item.name)}
                            >
                                <div className='create_listing-step-1-type-item-text'>
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                </div>
                                <div className='create_listing-step-1-type-item-icon'>{item.icon}</div>
                            </div>
                        ))}
                    </div>
                    <h3>Où se trouve votre logement ?</h3>
                    <div className='create_listing-step-1-place'>
                        <div className='create_listing-step-1-place-full'>
                            <div className='create_listing-step-1-place-location'>
                                <p>Adresse</p>
                                <input 
                                    type="text" 
                                    placeholder='Adresse' 
                                    name='adress' 
                                    value={formLocation.adress}
                                    onChange={handleChangeLocation}
                                    required
                                />
                            </div>
                        </div>
                        <div className='create_listing-step-1-place-half'>
                            <div className='create_listing-step-1-place-location'>
                                <p>Code postale</p>
                                <input 
                                    type="number" 
                                    placeholder='Code postale'
                                    name='postalCode'
                                    value={formLocation.postalCode}
                                    onChange={handleChangeLocation}
                                    required
                                />
                            </div>
                            <div className='create_listing-step-1-place-location'>
                                <p>Ville</p>
                                <input 
                                    type="text" 
                                    placeholder='Ville'
                                    name='city'
                                    value={formLocation.city}
                                    onChange={handleChangeLocation}
                                    required
                                />
                            </div>
                        </div>
                        <div className='create_listing-step-1-place-half'>
                            <div className='create_listing-step-1-place-location'>
                                <p>Region</p>
                                <input 
                                    type="text" 
                                    placeholder='Région'
                                    name='region'
                                    value={formLocation.region}
                                    onChange={handleChangeLocation}
                                    required
                                />
                            </div>
                            <div className='create_listing-step-1-place-location'>
                                <p>Pays</p>
                                <input 
                                    type="text" 
                                    placeholder='Pays'
                                    name='country'
                                    value={formLocation.country}
                                    onChange={handleChangeLocation}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <h3>Partagez quelques informations de base sur votre logement</h3>
                    <div className='create_listing-step-1-basics'>
                        <div className='create_listing-step-1-basics-item'>
                            <p>Invités</p>
                            <div className='create_listing-step-1-basics-item-count'>
                                <IoMdRemoveCircleOutline 
                                    onClick={() => {guestCount > 1 && setGuestCount(guestCount - 1)}}
                                />
                                <p>{guestCount}</p>
                                <IoMdAddCircleOutline 
                                    onClick={() => {setGuestCount(guestCount + 1)}}
                                />
                            </div>
                        </div>
                        <div className='create_listing-step-1-basics-item'>
                            <p>Chambres</p>
                            <div className='create_listing-step-1-basics-item-count'>
                                <IoMdRemoveCircleOutline 
                                    onClick={() => {bedroomCount > 1 && setBedroomCount(bedroomCount - 1)}}
                                />
                                <p>{bedroomCount}</p>
                                <IoMdAddCircleOutline 
                                    onClick={() => {setBedroomCount(bedroomCount + 1)}}
                                />
                            </div>
                        </div>
                        <div className='create_listing-step-1-basics-item'>
                            <p>Lits</p>
                            <div className='create_listing-step-1-basics-item-count'>
                                <IoMdRemoveCircleOutline
                                    onClick={() => {bedCount > 1 && setBedCount(bedCount - 1)}}
                                />
                                <p>{bedCount}</p>
                                <IoMdAddCircleOutline 
                                    onClick={() => {setBedCount(bedCount + 1)}}
                                />
                            </div>
                        </div>
                        <div className='create_listing-step-1-basics-item'>
                            <p>Salle de bains</p>
                            <div className='create_listing-step-1-basics-item-count'>
                                <IoMdRemoveCircleOutline 
                                    onClick={() => {bathroomCount > 1 && setBathroomCount(bathroomCount - 1)}}
                                />
                                <p>{bathroomCount}</p>
                                <IoMdAddCircleOutline 
                                    onClick={() => {setBathroomCount(bathroomCount + 1)}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='create_listing-step-2'>
                    <h2>Étape 2: Rendez votre lieu remarquable.</h2>
                    <h3>Bien informez les invités sur ce que votre lieu a à offrir.</h3>
                    <div className='create_listing-step-2-equipments'>
                        {equipments?.map((item, index) => (
                            <div 
                                className={`create_listing-step-2-equipments-item ${amenities.includes(item.name) ? "selected" : ""}`}
                                key={index}
                                onClick={() => handleSelectAmenities(item.name)}
                            >
                                <div className='create_listing-step-2-equipments-item-icon'>{item.icon}</div>
                                <p className='create_listing-step-2-equipments-item-text'>{item.name}</p>
                            </div>
                        ))}
                    </div>
                    <h3>Ajoutez quelques photos de votre logement</h3>
                    <DragDropContext onDragEnd={handleDragPhoto}>
                        <Droppable droppableId="photos" direction="horizontal">
                            {(provided) => (
                                <div 
                                    className='create_listing-step-2-photos' 
                                    {...provided.draggableProps} 
                                    ref={provided.innerRef}
                                >
                                    {photos.length < 1 && (
                                    <>
                                        <input 
                                            id='image' 
                                            type='file' 
                                            accept='image/*' 
                                            onChange={handleUploadPhotos} 
                                            multiple
                                        />
                                        <label htmlFor="image">
                                            <div className='icon'>
                                                <IoIosImages />
                                            </div>
                                            <p>Télécharger</p>
                                        </label>
                                    </>
                                    )}
                                    {photos.length >= 1 && (
                                        <>
                                            {photos.map((photo, index) => {
                                                return (
                                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                                        {(provided) => (
                                                            <div 
                                                                className='create_listing-step-2-photos-item' 
                                                                ref={provided.innerRef} 
                                                                {...provided.draggableProps} 
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <img src={URL.createObjectURL(photo)} alt="place" />
                                                                <button type='button' onClick={() => handleRemovePhoto(index)}>
                                                                    <IoIosTrash/>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            <input id='image' type='file' accept='image/*' onChange={handleUploadPhotos} multiple/>
                                            <label htmlFor="image">
                                                <IoIosImages />
                                                <p>Télécharger</p>
                                            </label>
                                        </>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <h3>Quels atouts rendent votre lieu à la fois séduisant et captivant ?</h3>
                    <div className='create_listing-step-2-description'>
                        <p>Titre</p>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder='Titre'
                            value={formDescription.value}
                            onChange={handleChangeDescription}
                            required
                        />
                        <p>Description</p>
                        <textarea
                            name="description" 
                            placeholder='Description' 
                            value={formDescription.description}
                            onChange={handleChangeDescription}
                            required
                        />
                        <p>Prix / €</p>
                        <input 
                            type="number"
                            placeholder='100' 
                            name='price'
                            value={formDescription.price}
                            onChange={handleChangeDescription}
                            required
                        />
                    </div>
                </div>
                <button className='submit_btn' type='submit'>
                    Créez votre annonce
                </button>
            </form>
        </div>
    </>
  )
}

export default CreateListing