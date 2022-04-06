import React from 'react'
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import blackground from "../images/blackground3.jpg"

import './forgotpassword.css'

const ForgotPassword= () => {


    return (
        
        <div className='ForgotPassword'>
           <NavigationBar/>
           <img src= {blackground} alt="loginBlackground" className='loginBackground'></img>

           <div className='forgotContainer'>
                <div className='forgotForm'>  
                    <form id="forgotForm">
                        <div className='title'>Forgot Password? 
                            <div className='resetTxt'>We will send you an email to reset your password </div>
                        </div>
                        <input type="text" placeholder="Email Address" className='loginEmailField2'/>
                        <button className='submitLogin'>Submit <i className="fas fa-paw"></i></button>
                        <div className='loginBottom'>
                            <a className='goregister' href='/login'>Return Login Page</a>
                        </div>   
                    </form>
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
        )

}

export default ForgotPassword;