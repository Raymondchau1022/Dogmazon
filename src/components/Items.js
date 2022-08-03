import React from 'react'
import './Items.css'
import {Image} from 'cloudinary-react'


const Items = ({description,dollor,rank,number,productID,imageID}) => {

  
  const starPercentage= (rank/5)*100;
  const starPercentageRounded = Math.round(starPercentage / 10) * 10; 

  let length=description.length;
  
   

  return (
    <a href={`/product/${productID}`}>
      <div className="Items" >
        <Image cloudName="dogmazon" publicId={imageID} className="Items-image">
        </Image>
        <div className="Items-text">
          <span className={(length>20)?"Items-descriptionMore":"Items-descriptionLess"}>{description}</span>
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
  description: 'Description',
  dollor: 0,
  rank: 0,
  number: 0,
  productID: 0,
  imageID:"https://res.cloudinary.com/dogmazon/image/upload/v1658731417/ybfjtslkd57bzlshfxop.jpg"
}



export default Items