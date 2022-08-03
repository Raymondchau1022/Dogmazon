import React, { useState, useEffect, useRef } from 'react';
import { NewsData } from './NewsData';
import './NewsSlider.css'

const NewsSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  function nextSlide() {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  function prevSlide() {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const autoPlayRef = useRef()

  useEffect(() => {
    autoPlayRef.current = nextSlide
  })

  useEffect(() => {

    const play = () => {
        autoPlayRef.current();
    }

    const interval = setInterval(play, 15000)
    return () => clearInterval(interval)
  }, [])
  
  
  


  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='NewsSlider'>
      <div className='left-arrow' onClick={prevSlide}><i className="fas fa-angle-left"></i></div> 
      <div className='right-arrow' onClick={nextSlide}><i className="fas fa-angle-right"></i></div> 
      {NewsData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt='travelImage' className='image' />
            )}
          </div>
        );
      })}
    </section>
    
  );
};

export default NewsSlider;