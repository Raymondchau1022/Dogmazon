import React from 'react'
import './Items.css'
import Default from "../images/DefaultImage.jpg";


const Items = ({image,description,dollor,rank,number}) => {
  return (
      <div className="Items">
        <img
          src= {image}
          alt="Itemimage"
          className="Items-image"
        />
        <div className="Items-text">
          <span className="Items-description">{description}</span>
          <span className="Items-dollor">${dollor}</span>
          <div className="Items-rankwithnumbers">
            <span className="Items-rank">{rank}</span>
            <span className="Items-number">({number})</span>
          </div>
        </div>
      </div>
  )
}

Items.defaultProps ={
  image: Default,
  description: 'Description',
  dollor: 87,
  rank: <i className='fas fa-star'></i>,
  number: 64,
}



export default Items