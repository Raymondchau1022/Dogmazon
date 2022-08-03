import React, {useState, useContext, useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';
import {Image} from 'cloudinary-react'
import Axios from 'axios'
import Cookies from "universal-cookie";

import './Product.css'
import { UserContext } from "../App";
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import DogLoading from "../components/DogLoading"
import Sorry from "../images/dogSorry.png"

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Grid from '@mui/material/Grid';

const Product = () => {


  const cookies = new Cookies();
  
  const {ProductID} = useParams(); 
  const { cartItems,setCartItems } = useContext(UserContext);
  const [ProductExist, setProductExist] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Product, setProduct] = useState({
    productname:"",
    price:"",
    producttype:"",
    description:"",
    rank:"",
    ratingNumber:"",
    soldNumber:"",
    imageID:""
    });
    const [quantity, setQuantity] = useState(1);

    

  useEffect(() => {
    setLoading(true)
    const getProductData = async () =>{
      await Axios.get(`http://localhost:5000/ProductID/${ProductID}`
          ).then((response) => {
            if (response.data){
              setProductExist(true);
              setProduct({
                  productname: response.data.productname,
                  price: response.data.price,
                  producttype: response.data.producttype,
                  description: response.data.description,
                  rank: response.data["rating mean"],
                  ratingNumber: response.data["rating count"],
                  soldNumber: response.data["sold number"],
                  imageID: response.data.imageID
              })
            }
            setLoading(false)
          })
    }
    getProductData()
  },[ProductID])

  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cartItems))
  },[cartItems])

  

  const starPercentage= (Product.rank/5)*100;
  const starPercentageRounded = Math.round(starPercentage / 10) * 10;

  const AddToCart = () =>{
    let list = [...cartItems]
    let repected = false
    for (let i = 0;i < list.length; i++ ){
      if (list[i]["productID"] === ProductID){
       
        list[i]["quantity"] += quantity
        repected = true
      }
      
    }
    if (repected){
      setCartItems(list)
    } else {
      setCartItems(cartItems => [...cartItems,{
        productID: ProductID,
        quantity : quantity
      }])
    }
    
  }

  return (
    <div className="Product">
        <NavigationBar />
          {Loading?
            <DogLoading />
            :
            (ProductExist === true)? 
            <div className="ProductTrue">
                <Image cloudName="dogmazon" publicId={Product.imageID} className="ProductPhoto"></Image>
              <div className='Product-Right'>
                <div className='Product-Title'>{Product.productname}</div>
                <div className='Product-Rating-Container'>
                <div className="stars-outer">
                <div className="stars-inner" style={{width:`${starPercentageRounded}%`}}></div>
                </div>
                  <div className='Product-Ranking'>{Product.rank} out of 5</div>
                  <div className='Product-RatingNum'>({Product.ratingNumber} ratings)</div>
                  <div className="Speration">|</div>
                  <div className='Product-producttype'>{Product.producttype}</div>
                </div>
                <div className='Hr'><hr/></div>
                <div className='Product-Price-container'>
                <div className='Product-Pricetitle'>Price:</div>
                <div className='Product-Price'>${Product.price}</div>
                </div>
                <div className='Product-Sold-container'>
                <div className='Product-soldtitle'>Already sold for {Product.soldNumber} items!</div>
                {/* <div className='Product-soldNumber'></div> */}
                </div>
                
                <div className='Hr'><hr/></div>
                <div className='Product-description-container'>
                  <div className='Product-About'>About this product</div>
                  <li className='Product-description'>{Product.description}</li>
                </div>

 
                  <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly","margin":"3% 3%","width":"15vw"}}>
                    <Button onClick={()=>{setQuantity(quantity+1)}}><AddOutlinedIcon/></Button>
                    <div>{quantity}</div>
                    <Button onClick={()=>{quantity>1?setQuantity(quantity-1):(setQuantity(1))}}><RemoveOutlinedIcon/></Button>
                  </div>
                  
                  <div style={{"display":"flex","flexDirection":"row",alignItems:"center","width":"15vw","margin":"3% 3%",justifyContent:"space-evenly"}}>
                    <Button variant="contained" color="info" sx={{"margin":"0 0 0 0",width:100,"fontSize":"10px","whiteSpace": "nowrap", "minWidth": "auto"}} onClick={()=>{AddToCart()}}>Add to cart</Button>
                    <Button variant="contained" color="primary"sx={{width: 100,"fontSize":"10px","whiteSpace": "nowrap", "minWidth": "auto",}} onClick={()=>{AddToCart();}} href="/checkout">Buy now</Button>
                  </div>
 

                {/* <div className='Product-buy'>    
                <div style={{"display":"flex","flex-direction":"row","justify-content":"space-around","width":"10vw","margin":"0 3%"}}>
                <div style={{}}><Button><RemoveOutlinedIcon/></Button></div>
                <div style={{"font-size":"1.5rem"}}>X</div>
                <div style={{}}><Button><AddOutlinedIcon/></Button></div>
                </div>

                <div style={{"display":"flex","flex-direction":"row","justify-content":"center","width":"15vw","margin":"3% 3%"}}>
                  <div style={{"margin":"0 20px 0 0","width":"7vw"}}><Button variant="contained" color="info">Add to cart</Button></div>
                  <div style={{}}><Button variant="contained" color="primary">Buy now</Button></div>
                </div>
                </div> */}
              </div>
            </div>
            :
            <div className="ProductFalse">
            <img src={Sorry} alt="Sorry" className="SorryPhoto"/>
            <div className="SorryTitle">
                This product is sold out/no longer available for purchase. Please search for other products.
            </div>
            <Link to="/">Back to Home Page</Link>
            </div>
          
          
          }
          <Footer />

    </div>
  )
}

export default Product