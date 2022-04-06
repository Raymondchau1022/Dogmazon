import React from 'react'
import { Link } from 'react-router-dom';
import PagesNotFound from "../images/PagesNotFound.jpg"

import './NotFound.css'

const NotFound = () => {


    return (
        <div className='Notfoundpage'>
            <div className='Notfoundpage-container'>
                <img src={PagesNotFound} alt='nofoundpage'/>
                <a>Huh? Look like the page you looking for is not available.</a>
                <Link to="/">Back to Home Page</Link>
                <a>Any problem? <Link to="/support">Go to Support Page</Link></a>
            </div>
            
        </div>
        )

}

export default NotFound;