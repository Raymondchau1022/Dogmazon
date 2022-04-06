import React, {useState} from 'react'
import NavigationBar from "../components/NavigationBar"
import NewsSlider from '../components/NewsSlider'
import {NewsData} from '../components/NewsData'
import Horizontal from "../components/Horizontal"
import TopSales from "../components/TopSales"
import Footer from "../components/Footer"

const Home = () => {

    return (
        <div className='container'>
            <NavigationBar/>
            <NewsSlider slides = {NewsData}/>
            <Horizontal/>
            <TopSales/>
            <Horizontal/>
            <TopSales/>
            <Horizontal/>
            <Footer/>
        </div>
        ) 

}

export default Home;