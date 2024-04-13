import React from 'react'
import Header from '../components/Header'
import { categories, types } from '../data'

function CreateListing() {
  return (
    <div>
        <Header/>
        <div className='create_listing_container'>
            <h1>Publiez votre annonce</h1>
            <form action="">
                <div className='create_listing-step-1'>
                    <h2>Étape 1 : Décrivez votre logement</h2>
                    <h3>Parmi ces catégories, laquelle décrit le mieux votre logement ?</h3>
                    <div className='create_listing-step-1-category-list'>
                        {categories?.map((category, index) => (
                            <div className='create_listing-step-1-category-item' key={index}>
                                <div className='create_listing-step-1-category-item-icon'>{category.icon}</div>
                                <p>{category.label}</p>
                            </div>
                        ))}

                    </div>
                    <h3>Quel type de logement les invités auront-ils ?</h3>
                    <div className='create_listing-step-1-type-list'>
                        {types?.map((type, index) =>(
                            <div className='create_listing-step-1-type-item'>
                                <div className='create_listing-step-1-type-item-text'>
                                    <h4>{type.name}</h4>
                                    <p>{type.description}</p>
                                </div>
                                <div>{type.icon}</div>
                            </div>
                        ))}
                    </div>
                    <h3>Où se trouve votre logement ?</h3>
                    <div className='create_listing-step-1-place'>
                        <div className='create_listing-step-1-place-full'>
                            <div className='create_listing-step-1-place-location'>
                                <p>Rue/Boulevard</p>
                                <input 
                                    type="text" 
                                    placeholder='Rue/Boulevard' 
                                    name='streetAdress' 
                                    required
                                />
                            </div>
                        </div>
                        <div className='create_listing-step-1-place-half'>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateListing