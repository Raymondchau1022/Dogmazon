import React, {useContext} from 'react'
import './ProductTypes.css'
import Default from "../images/DefaultImage.jpg";


const ProductTypes = ({image,type}) => {


  return (
    <a href={`/search/All/${type}`}>
      <div className="ProductTypes" >
        <img
          src={image}
          alt="TypesImages"
          className="ProductTypes-image"
        />
        <span className="ProductTypes-text">{type}</span>
      </div>
    </a>
  )
}

ProductTypes.defaultProps ={
    image: Default,
    type: 'Default',
  }


export default ProductTypes