import React from 'react'
import { categories } from '../data'
import { Link } from "react-router-dom"

function Categories() {
  return (
    <div className='categories_container'>
      <h1>Découvrez les catégories à explorer.</h1>
      <p>Explorez notre vaste sélection de locations saisonnières adaptées à tous les profils de voyageurs. Plongez-vous dans la culture locale, profitez du confort de la maison, et forgez des souvenirs mémorables dans votre destination idéale.</p>
      <div className='categories_list'>
        {/* Mapping through categories to display them */}
        {categories?.slice(1,7).map((category, index) => (
          <Link to="">
            <div className='categories_list-item' key={index}>
              <img src={category.img} alt={category.label} />
              <div className='categories_list-item-overlay'></div>
              <div className='categories_list-item-text'>
                <div className='categories_list-item-text-icon'>{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories