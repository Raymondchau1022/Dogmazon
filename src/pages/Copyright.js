import React, {useState} from 'react'
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"

const Copyright = () => {

    return (
        <div className='Copyright'>
            <NavigationBar/>
            <div id="Copyright"><br/></div>
            <div id="Privacy"></div>
            <div id="Conditions-of-use"></div>
            <div id="Legal"></div>
            
            <Footer/>
        </div>
        ) 

}

export default Copyright;