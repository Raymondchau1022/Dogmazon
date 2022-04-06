import React from 'react'
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"


import mazon from "../images/MAZON.png";


import black from "../images/black.jpg"
import React1 from '../images/TechnologyIcon/react.png'
import CSS1 from '../images/TechnologyIcon/css3.png'
import Flask1 from '../images/TechnologyIcon/flask.png'
import Mongodb1 from '../images/TechnologyIcon/mongodb.png'
import technologyImg from '../images/TechnologyIcon/technologyImg.png'


import blackground from "../images/blackground4.jpg"
import Raymond from'../images/ContactUs/Raymond.jpg'
import RUDY from'../images/ContactUs/RUDY.jpg'
import Steven from'../images/ContactUs/Stevendog.png'
import thomas from'../images/ContactUs/thomasdog.png'

import contactusImg from '../images/contactus.png'

import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className='AboutUs'>
      <NavigationBar/>
      <img src= {blackground} alt="Blackground" className='Background'></img>
      <div className="top-topic">ABOUT DOGMAZON</div>
      <div className="intro-dogmazon">Dogmazon is an online shopping website which sells different kinds of products online.</div>
      <div className="feature-container">
        <div className="feature-topic">FEATURE</div>
        <div className="feature-box">
          <div className="feature-item">
            <i className="fas fa-search"></i>
            <div className="feature-item-topic">Search and Filter</div>
            <div className="feature-item-context"> Dogmazon provides a search engine system to search your specified items. We also provide category and sorting product filters for you to search based on your requirements.</div>
          </div>
          <div className="feature-item">
          <i className="far fa-comment-dots"></i>
            <div className="feature-item-topic">Rating and Comments</div>
            <div className="feature-item-context"> Dogmazon cares about users' experience. The rating and Comments option allows you to review and rate the products. You can provide ratings from one to five and also share your suggestions through the comments option. We would love to hear feedback from you!</div>
          </div>
          <div className="feature-item">
          <i className="fas fa-user-shield"></i>
            <div className="feature-item-topic">Security</div>
            <div className="feature-item-context"> Users are always the no.1 concern for Dogamazon. Therefore, we provide a series of security controls. For example, hashing user passwords by strong algorithm, 2-factor authentication system, and forgot password. We ensure users could have a great and safe experience here.</div>
          </div>
          <div className="feature-item">
          <i className="fab fa-angellist"></i>
           <div className="feature-item-topic">Selling your products</div>
          <div className="feature-item-context"> Are you still looking for a platform to sell your products? No worry, we are here to help! Dogmazon is a seller-friendly platform in which you can easily become a seller by uploading a product photo and description. We can't wait to see you joining us!</div>
          </div>
        </div>
      </div>
      <div className="technology-container">
        <div className="technology-topic">TECHNOLOGY</div>
        <div className='technology-image-container'>
           <div className='technology-icon'>
              <img src={React1} alt='React Icon'/> 
            </div>
           <div className='technology-icon'>
             <img src={CSS1} alt='CSS Icon'/>
            </div>
           <div className='technology-icon'>
             <img src={Flask1} alt='Flask Icon'/>
            </div>
           <div className='technology-icon'>
             <img src={Mongodb1} alt='Mongodb Icon'/>
            </div>
        </div>
        <div className='technology-content'>
          <div className='technology-context-txt'>
            Dogmazon is created with a full stack development. We are aimed to become a modern, featured, and user-friendly web application.
            <div className='technology-context-txt2'>
              <div className='technology-context-txt2-topic'>React</div>
              <div className='technology-context-txt2-txt'>-- Fast, Simple, and Modern layout</div>
              <div className='technology-context-txt2-topic'>CSS</div>
              <div className='technology-context-txt2-txt'>-- Styled and Fully Responsive design</div>
              <div className='technology-context-txt2-topic'>Python Flask</div>
              <div className='technology-context-txt2-txt'>-- Logic handling and REST API communication</div>
              <div className='technology-context-txt2-topic'>MongoDB</div>
              <div className='technology-context-txt2-txt'>-- Data handling and CRUD Operation</div>
            </div>
          </div>
          <div className='technology-context-img'>
            <img src={technologyImg} alt='technology Img'/>
          </div>
        </div>
      </div>

      <div className="teams-container">
        <div className="topic">OUR TEAM</div>
          <div className='teams-context-container'>
            <div className='team-pic-container'>
              <img className="teams-pic" src={black} alt ="about us"/>
              <div className="teams-pic-text">(From left to right) Raymond Chau, Rudy Yen, Thomas Chan, Steven Tsui</div>
            </div>
          <div className="teams-content">
            Just a group of Computer Science students.<br/>
            Come And Join Us!
          </div>
        </div>
        <div className='Member-content-container'>
          <div className='Member-content'>
            <img 
              src={Raymond}
              alt="Raymond"
              className='Member-image'
            />
            <div className='Member-name'>Raymond Chau</div>
            <div className='Member-contact'>
              <a href='https://www.linkedin.com/in/raymond-chau-832a28222/' target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
              <a href='mailto:raymondchauofficial@gmail.com'><i className="fas fa-envelope"></i></a>
              <a href='https://github.com/Raymondchau1022' target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            </div>
          </div>
          <div className='Member-content'>
              <img 
                src={RUDY}
                alt="Raymond"
                className='Member-image'
              />
            <div className='Member-name'>Rudy Yen</div>
            <div className='Member-contact'>
              <a href='https://www.linkedin.com/in/rudy-yen-5b3173208/' target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
              <a href='mailto:rudyyen.work@gmail.com'><i className="fas fa-envelope"></i></a>
              <a href='https://github.com/yenloned' target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            </div>
          </div>
          <div className='Member-content'>
            <img 
              src={thomas}
              alt="Raymond"
              className='Member-image'
            />
            <div className='Member-name'>Thomas Chan</div>
            <div className='Member-contact'>
              <a href='' target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
              <a href='mailto:thomaschan2357@gmail.com'><i className="fas fa-envelope"></i></a>
              <a href='' target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            </div>
          </div>
          <div className='Member-content'>
            <img 
              src={Steven}
              alt="Raymond"
              className='Member-image'
            />
            <div className='Member-name'>Steven Tsui</div>
            <div className='Member-contact'>
              <a href='https://www.linkedin.com/in/steven-tsui-95b489224/' target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
              <a href='mailto:steventsui23@gmail.com'><i className="fas fa-envelope"></i></a>
              <a href='' target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className='Contact-us-container'>
        <div className="topic" id='Contact-us'>Contact us</div>
        <div className="Contact-us-comment-container">
          <div className='Contact-us-comment-Img'>
                <img src={contactusImg} alt='contactus Img'/>
          </div>
          <form className='Contact-us-comment'>
              <a>Name</a>
              <div className='Contact-us-name'>
                <div className='Contact-us-Firstname'>
                  <input type="text"  name="Contact-us-name" id='Contact-us-Firstname' ></input>
                  <a>First name</a>
                </div>
                <div className='Contact-us-Lastname'>
                  <input type="text"  name="Contact-us-name" id='Contact-us-Lastname' required></input>
                  <a>Last name</a>
                </div>
              </div><br/>
              
              <a>Email Address</a>
              <input type="text" id="Contact-us-email" name="Contact-us-email" required></input><br/>
              <a>Comments</a>
              <textarea id="Contact-us-comment" name="Contact-us-comment:" required></textarea><br/>
              <input id="Contact-us-submit" type="submit" value="Submit"></input>
          </form> 
        </div>
        <div className='Contact-us-content-container'>
          <div className='Contact-us-content'>
            <i className="fab fa-whatsapp"></i>
            <a className='Contact-us-title'>WHATSAPP</a>
            <a>If you are interested in our team, please feel free to contact us at WhatsApp:</a>
            <a className='Contact-us-number' href="https://wa.me/85254218295" target="_blank">+852 5421 8295</a>
          </div>
          <div className='Contact-us-content'>
            <i className="fas fa-envelope"></i>
            <a className='Contact-us-title'>EMAIL</a>
            <a>Any questions, please feel free to contact Dogmazon's Email Address at:</a> 
            <a className="Contact-us-email" href='mailto:dogmazon.noreply@gmail.com'>dogmazon.noreply@gmail.com</a>
          </div>
        </div>
       
      </div>
      <Footer/>
    </div>
  )
}

export default AboutUs 