import React, {useState, useContext , useEffect} from 'react'
import Axios from 'axios'
import {Image} from 'cloudinary-react'
import { UserContext } from "../App";


import './Cart.css'
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
const Cart = () => {

  const { cartItems, setCartItems,user } = useContext(UserContext);
  const [product, setProduct] = useState([])
  const [total, setTotal] = useState(0)
  const [cartItemsLocal, setCartItemsLocal] = useState(cartItems)
  

  useEffect(()=>{
    if(cartItems){
        setProduct([])
        for(let i = 0;i < cartItems.length; i++){
            Axios.get(`http://localhost:5000/ProductID/${cartItems[i]["productID"]}`
        ).then((response) => {
            if (response.data){
                setProduct(product => [...product,{
                    productname: response.data.productname,
                    price: response.data.price,
                    imageID: response.data.imageID,
                    quantity: cartItems[i]["quantity"]
                }])
            }
        })
        }
        
    }

    localStorage.setItem("cart",JSON.stringify(cartItems))

  },[cartItems])

  useEffect(()=>{

    localStorage.setItem("cart",JSON.stringify(cartItemsLocal))
    
    onUpdateTotal()

  },[cartItemsLocal])

  useEffect(()=>{

    onUpdateTotal()

  },[product])

  function onUpdateTotal(){
    setTotal(0)
    for (let i = 0; i < product.length; i++){
        setTotal(total=>(total + product[i].quantity * product[i].price))
    }
    
  }



  const addQuantity = (index) =>{
    let list =  [...product]
    list[index].quantity += 1
    setProduct(list)
    list  = [...cartItemsLocal]
    list[index].quantity += 1
    setCartItemsLocal(list)
  }

  const decreaseQuantity = (index) =>{
    let list =  [...product]
    if (list[index].quantity > 1){
        list[index].quantity -= 1
        setProduct(list)
        list =  [...cartItemsLocal]
        list[index].quantity -= 1
        setCartItemsLocal(list)
    }
   }

   const deleteItems = (index) =>{
    let list = [...product]
    list.splice(index,1)
    setProduct(list)
    list = [...cartItemsLocal]
    list.splice(index,1)
    setCartItemsLocal(list)
  }

  const checkouts = () =>{
    let cartLocal = JSON.parse(localStorage.getItem("cart") || "[]")
    if (cartLocal.length === 0){
        alert("The cart is empty")
        console.log("Empty")
    } else if (user){
        Axios.post("http://localhost:5000/checkouts",{
            "userID": user,
            "cartItems": cartLocal
        }).then((response) => {
            setCartItems([]); 
            setProduct([])
            setTotal(0);
            console.log("Bought")
        })
    }  else {
        console.log("Login first")
    }
        
  }


  return (
    <div className="Cart">
        <NavigationBar cart={true}/>
        <div className="CartContainer">
        <div className="CartLeft"> 
            <div className="CartTitle">Check Out</div>
            <div className="CartShippingContainer">
                <div><TextField id="standard-basic" label="ADRRESS 1" variant="standard" required sx={{width:"90%",height:"10%",margin:"0 30px"}}/></div>
                <div><TextField id="standard-basic" label="ADRRESS 2" variant="standard" required sx={{width:"90%",height:"10%",margin:"0 30px"}}/></div>
                <div><TextField id="standard-basic" label="ADRRESS 3" variant="standard" required sx={{width:"90%",height:"10%",margin:"0 30px"}}/></div>
                <div style={{display:"flex",flexDirection:"row",margin:"0 30px"}}>
                <div><TextField id="standard-basic" label="Recipient Name" variant="outlined" required  sx={{width:"14vw",height:"10%"}}/></div>
                <div><TextField id="standard-basic" label="Phone Number" variant="outlined" required sx={{width:"14vw",height:"10%",margin:"0 50px"}}/></div>
                </div>
                <div><TextField id="standard-basic" label="Email Address" variant="outlined" required sx={{margin:"0 30px",height:"10%",width:"90%"}}/></div>
            </div>
            <div className="CartPaymentTitleContainer"><PaidIcon sx={{width:"1vw",height:"1.5vh",margin:"0 20px 0 0"}}/><div className="CartPaymentTitle">PAYMENT METHOD</div></div>
            <div className="CartPaymentContainer">
                <div style={{display:"flex"}}><div className="CartPaymentMethodTitle">VISA/MASTERCARD</div><CreditCardIcon sx={{width:"1vw",height:"1.5vh"}}/></div>
                <div><TextField id="outlined-basic" label="Enter Card Number" variant="outlined" required sx={{margin:"0 30px",width:"25vw"}}/></div>
                <div style={{display:"flex",flexDirection:"row"}}>
                <div><TextField id="outlined-basic" label="MM/YYYY" variant="outlined" required sx={{width:"7vw",margin:"0 30px",height:"4vh"}}/></div>
                <div><TextField id="outlined-basic" label="CVV" variant="outlined" required sx={{width:"7vw",margin:"0 30px",height:"4vh"}}/></div>
                <div><Button onClick={()=>{checkouts()}} sx={{width:"5vw",height:"4vh"}}>Proceed <ShoppingCartCheckoutIcon/></Button></div>
                </div>
                <div className="CartPaymentInfo">*Your card details would be securely saved for faster payments. Your CVV will not be stored.</div>
            </div>
        </div>

        <div className="CartRight">
            <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}> 
                <div className="CartOrderTitle">Your Order <span>({cartItemsLocal.length})</span></div>
                <div style={{width:"40%",textAlign:"right",margin:"0 20px 0 0"}}><Button onClick={()=>{setCartItems([]); setTotal(0);setProduct([]);}}><RemoveShoppingCartIcon/></Button></div>
            </div>
            
            <div style={{margin:"0 20px",opacity:".5"}}><hr/></div>
            
            <div style={{height:"600px",margin:"0 20px",display:"flex",flexDirection:"column"}}>
                {product.map((product,index) => {
                        return (
                            <div key={index} style={{display:"flex",flexDirection:"column",width:"100%"}}>
                                <div style={{display:"flex", flexDirection:"row",width:"auto"}}>
                                    <Image cloudName="dogmazon" publicId={product.imageID} className="" style={{height:"120px",width:"120px",margin:"0 30px"}}/>
                                    <div style={{margin:"0 0 0 60px",display:"flex",flexDirection:"column",width:"80%"}}>
                                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",margin:"10px 0",width:"100%"}}>
                                            <div style={{display:"flex", flexDirection:"row",width:"50%"}}>
                                                {/* <div style={{}}>${product.price}</div> */}
                                                <div style={{margin:"0 15px",whiteSpace: "nowrap", minWidth:"auto",width:"auto",fontSize:"1rem"}}> {product.productname}</div>
                                                <div style={{fontWeight:"bold"}}>X{product.quantity}</div>
                                            </div>
                                            <div style={{width:"20%"}}>${product.price * product.quantity}</div>   
                                        </div> 
                                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",margin:"10px 0",width:"100%"}}>
                                            <div style={{width:"30%"}}><Button onClick={()=>{addQuantity(index)}}><AddOutlinedIcon/></Button></div>
                                            <div style={{width:"30%"}}><Button onClick={()=>{decreaseQuantity(index)}}><RemoveOutlinedIcon/></Button></div>
                                        </div>
                                        <div style={{textAlign:"right"}}><Button onClick={()=>{deleteItems(index)}}><DeleteIcon/></Button></div>
                                    </div>
                                </div>
                                <div><hr/></div> 
                            </div>
                        )
                    })}
            </div>
           
            
            
            
            <div style={{display:"flex", backgroundColor: "#F1F1F1",height:"180px",justifyContent:"space-between",alignItems:"center",borderRadius: "10px",width:"94.5%",margin:"10px 15px"}}>
                <div style={{margin:"0 20px",fontSize:"3rem",fontFamily: "Times New Roman, Times, serif"}}>Total</div>
                <div style={{margin:"0 20px",fontSize:"3rem",fontFamily: "Times New Roman, Times, serif"}}>${total}</div>
            </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Cart