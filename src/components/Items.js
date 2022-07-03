import React from 'react'
import './Items.css'
import Default from "../images/DefaultImage.jpg";


const Items = ({image,description,dollor,rank,number,productID}) => {

  
  const starPercentage= (rank/5)*100;
  const starPercentageRounded = Math.round(starPercentage / 10) * 10; 
   

  return (
    <a href={`/product/${productID}`}>
      <div className="Items" >
        <img
          src= {image}
          alt="Itemimage"
          className="Items-image"
        />
        <div className="Items-text">
          <span className="Items-description">{description}</span>
          <span className="Items-dollor">${dollor}</span>
          <div className="Items-rankwithnumbers">
          <div className="stars-container">
          <div className="stars-outer">
            <div className="stars-inner" style={{width:`${starPercentageRounded}%`}}></div>
          </div>
          <span className="stars-number">{rank}</span>
          </div>
          <span className="Items-number">({number})</span>
          </div>
        </div>
      </div>
    </a>
  )
}

Items.defaultProps ={
  image: Default,
  description: 'Description',
  dollor: 0,
  rank: 0,
  number: 0,
  productID: 0
}



export default Items