import React from 'react'
import './DogLoading.css'
import Loading from "../images/DogLoading.gif";

const DogLoading = () => {
  return (
    <div className="DogLoading">
       <img
          src= {Loading}
          alt="Loading"
          className="Loading"
        />
    </div>
  )
}

export default DogLoading