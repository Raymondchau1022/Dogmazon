import React from 'react'
import './Footer.css'

const footer = () => {
  return (
    <div>
    <div className = "footer">
      <div className='footer-content'> 
        <div className='statement'>
          <div className='Title'>Statement</div>
          <a href="/Copyright#Copyright">Copyright</a><br></br>
          <a href="/Copyright#Privacy-Policy">Privacy Policy</a><br></br>
          <a href="/Copyright#Conditions-of-use">Conditions of use</a><br></br>
          <a href="/Copyright#Legal">Legal</a><br></br>
        </div>
        <div className='Customer Service'>
          <div className='Title'>Customer Service</div>
          <a href="/Support">Support</a><br></br>
          <a href="/AboutUs#Contact-us">Contact</a>
        </div>
        <div className='About-us'>
          <div className='Title'>About us</div>
          <a href="/AboutUs">Our story</a><br></br>
          <a href="/">News</a>
        </div>
        <div className='Follow-us'>
          <div className='Title'>Follow Us</div>
          <a className='logo' target="_blank"href="https://reurl.cc/Np23Ek">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter-square"></i>
          </a>
        </div>
      </div>
      <div className='Warning'>
        © 2022 Dogmazon Limited, All Rights Reserved.<br></br>
        Under the law of Hong Kong, intoxicating liquor must not be sold or supplied to a minor in the course of business.<br></br>
        WARNING: THIS ARTICLE CONTAINS MATERIAL WHICH MAY OFFEND AND MAY NOT BE DISTRIBUTED , CIRCULATED , SOLD, HIRED , GIVEN , LENT , SHOWN , PLAYED OR PROJECTED TO A PERSON UNDER THE AGE OF 18 YEARS .
      </div>
    </div>
    </div>
  )
}

export default footer