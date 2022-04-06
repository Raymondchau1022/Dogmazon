import React,{useState,useContext} from 'react';
import {useNavigate } from 'react-router-dom';
import { UserContext } from "../App";

import "./NavigationBar.css";
import mazon from "../images/MAZON.png";
import ProductTypes from "./ProductTypes";

import Electronics from "../images/ProductTypes/Electronics.jpg";
import Fashion from "../images/ProductTypes/Fashion.jpg";
import Toys from "../images/ProductTypes/Toys.jpg";
import Foods from "../images/ProductTypes/Foods.jpg";
import Sports from "../images/ProductTypes/Sports.jpg";
import Books from "../images/ProductTypes/Books.jpg";
import Others from "../images/ProductTypes/Others.gif";


const NavigationBar = () => {

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);


  const [formData, updateFormData] = useState({
    SearchResult:"All"
  });
  
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    window.open(`/search/${formData.SearchResult}`,"_self");
    //navigate(`/search/${formData.SearchResult}`);
  };

  return (
  <div className='navigationBar' >
    <div className='navLeft'>
      <a className="dogmazonlogo" href="/"><img src={mazon} alt = "logo"/></a>
    </div>

    <div className='navCenter'>
      <form id="homesearch" onSubmit={handleSubmit}>
      <input type="text" className='productSearch' placeholder='Search Here...'  name='SearchResult' onChange={handleChange}/>
      <button className="searchButton" type="submit">Search</button>
      </form>

      <div className="product">
        <div className='productButton'>Products <i className="fas fa-angle-down"></i> </div>
          <div className='product-container'>
            <div className='product-space'></div>
            <div className="product-content" >
              <ProductTypes type='Electronics' image={Electronics} />
              <ProductTypes type='Fashion' image={Fashion} />
              <ProductTypes type='Toys' image={Toys}/>
              <ProductTypes type='Foods' image={Foods}/>
              <ProductTypes type='Sports' image={Sports}/>
              <ProductTypes type='Books' image={Books}/>
              <ProductTypes type='Others' image={Others}/>
            </div>
        </div>
      </div>
    </div>



      <div className='navRight'>
        <a className='about' href="/aboutus">About<i className="fas fa-dog"></i></a>
        <a className='support' href="/support">Support <i className="fas fa-headset"></i></a>
        {user?<a className='profile' href="/profile">Profile<i className="fas fa-user-circle"></i></a> :
        <a className='signIn' href="/login">Sign In<i className="fas fa-sign-in-alt"/></a>}
        <div className='Cart'>Cart<i className="fas fa-shopping-cart"/></div>
      </div>

    

    </div>

    
  )
}

export default NavigationBar;