import React,{useState,useContext,useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import { UserContext } from "../App";


import "./NavigationBar.css";
import mazon from "../images/MAZON.png";
import LoadingGIF from "../images/Loading.gif";
import ProductTypes from "./ProductTypes";

import Electronics from "../images/ProductTypes/Electronics.jpg";
import Fashion from "../images/ProductTypes/Fashion.jpg";
import Toys from "../images/ProductTypes/Toys.jpg";
import Foods from "../images/ProductTypes/Foods.jpg";
import Sports from "../images/ProductTypes/Sports.jpg";
import Books from "../images/ProductTypes/Books.jpg";
import Others from "../images/ProductTypes/Others.gif";


const NavigationBar = ({cart}) => {

  const navigate = useNavigate();
  const { cartItems,setCartItems,user } = useContext(UserContext);
 

  const [Loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true)
    setTimeout(()=>{setLoading(false)}, 500)
  },[])

 


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

  const [isOpen,setIsOpen]=useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

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
              <ProductTypes type='Electronics' image={Electronics}/>
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
        {user?
          <a className='profile' href="/profile">Profile<i className="fas fa-user-circle"></i></a> 
          :
          Loading?
          <div className='loading'>
            <img src={LoadingGIF} alt="Loading"/>
          </div>
          :
            <a className='signIn' href="/login">Sign In<i className="fas fa-sign-in-alt"/></a>
          }
        <a className='cart' onClick={openCart} href="/checkout">
          Cart
          <i className="fas fa-shopping-cart" style={{position:"relative"}}>
             <div className={(cartItems.length===0 || cart)?"CartNumFalse":"CartNum"}>
            {cartItems.length}
            </div>
          </i>
        </a>
      </div>
      
      {/* <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas> */}





    </div>
  )
}

NavigationBar.defaultProps ={
  cart: false,
}

export default NavigationBar;