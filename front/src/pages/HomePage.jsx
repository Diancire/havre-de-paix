import React from 'react'
import Header from '../components/Header'
import Slide from '../components/Slide'
import Categories from '../components/Categories'
import Listings from '../components/Listings'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div>
      <Header/>
      <Slide/>
      <Categories/>
      <Listings/>
      <Footer/>
    </div>
  )
}

export default HomePage