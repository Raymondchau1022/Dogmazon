import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Axios from 'axios'

import './App.css'

import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import ForgotPassword from './pages/ForgotPassword.js';
import Search from './pages/Search.js';
import Copyright from './pages/Copyright.js';
import AboutUs from './pages/AboutUs.js';
import Profile from './pages/Profile.js';
import Product from './pages/Product.js';
import Support from './pages/Support.js';
import Cart from './pages/Cart.js';
import NotFound from './pages/NotFound.js';


export const UserContext = createContext();
const cartFromLocal = JSON.parse(localStorage.getItem("cart") || "[]")

function App() {

  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(cartFromLocal)
 
  useEffect(() => {
   
    const checkUser = () =>{
      const username = cookies.get('user');
      if (username){
        Axios.get(`http://localhost:5000/loggedin/${username}`
          ).then((response) => {
            if (response.data){
              setUser(response.data);
            } else {
              setUser(null)
            }
          })
      }
    }

    checkUser();

  },[cookies])

  

  return (
  
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, cartItems,setCartItems}}>
          <Routes>
            <Route path='/' element={<Home />} exact />

            <Route path='/search/:SearchResult/:Type' element={<Search />}/>
            <Route path='/search/:SearchResult/' element={<Search />}/>
            <Route path='/search/' element={ <Navigate replace to="/search/All" /> }/>

            <Route path='/Product/:ProductID' element={<Product />}/>

            <Route path='/copyright' element={<Copyright />}/>
            <Route path='/aboutus' element={<AboutUs />}/>
            <Route path='/Support' element={<Support />}/>

            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/forgotpassword' element={<ForgotPassword />}/>

            <Route path='/checkout' element={<Cart />}/>

            <Route path='/Profile' element={<Profile />}/>
          
            <Route path='*' element={<NotFound />}/>
          </Routes>
      </UserContext.Provider>
    </BrowserRouter>
    
    )

}


export default App;

