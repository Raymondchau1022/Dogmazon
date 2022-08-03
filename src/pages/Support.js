import React from 'react'
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import './Support.css'

const Support = () => {
  return (
    <div className='Support'>
        <NavigationBar/>
        <div className='Support-container'>
          <div className='title'>Q and A Part</div>

          <div className='Support-box'>
            <div className='Support-question'>
              <div className='Support-question-icon'>
                <i class="fas fa-question-circle"></i>
              </div>
              <div className='Support-question-text'>
                XXXXXXXXXXXXXXXXXXXXXXXXXX
              </div>
            </div>
            <div className='Support-answer'>
              <div className='Support-answer-icon'>
                <i class="fas fa-dog"></i>
              </div>
              <div className='Support-answer-text'>
                XXXXXXXXXXXXXXXXXXXXXXXXXX
                XXXXXXXXXXXXXXXXXXXXXXXXXX
                XXXXXXXXXXXXXXXXXXXXXXXXXX
              </div>
            </div>
          </div>

          <div className='Support-box'>
            <div className='Support-question'>
              <div className='Support-question-icon'>
                <i class="fas fa-question-circle"></i>
              </div>
              <div className='Support-question-text'>
                XXXXXXXXXXXXXXXXXXXXXXXXXX
              </div>
            </div>
            <div className='Support-answer'>
              <div className='Support-answer-icon'>
                <i class="fas fa-dog"></i>
              </div>
              <div className='Support-answer-text'>
                XXXXXXXXXXXXXXXXXXXXXXXXXX
                XXXXXXXXXXXXXXXXXXXXXXXXXX
                XXXXXXXXXXXXXXXXXXXXXXXXXX
              </div>
            </div>
          </div>

          <div className='Support-box'>
            <div className='Support-question'>
              <div className='Support-question-icon'>
                <i class="fas fa-question-circle"></i>
              </div>
              <div className='Support-question-text'>
                XXXXXXXXXXXXXXXXXXXXXXXXXX
              </div>
            </div>
            <div className='Support-answer'>
              <div className='Support-answer-icon'>
                <i class="fas fa-dog"></i>
              </div>
              <div className='Support-answer-text'>
                XXXXXXXXXXXXXXXXXXXXXXXXXX
                XXXXXXXXXXXXXXXXXXXXXXXXXX
                XXXXXXXXXXXXXXXXXXXXXXXXXX
              </div>
            </div>
          </div>



        </div>
        <Footer/>
    </div>
  )
}

export default Support