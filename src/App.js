import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
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
import NotFound from './pages/NotFound.js';

export const UserContext = createContext();

function App() {

  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  


  useEffect(() => {
    const username = cookies.get('user');
    Axios.get(`http://localhost:5000/loggedin/${username}`
        ).then((response) => {
          if (response.data){
            setUser(response.data);
          } 
        })
  },[])

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/search/:SearchResult' element={<Search />}/>
          <Route path='/Product/:ProductID' element={<Product />}/>
          <Route path='/copyright' element={<Copyright />}/>
          <Route path='/aboutus' element={<AboutUs />}/>

          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/forgotpassword' element={<ForgotPassword />}/>

          
          <Route path='/Profile' element={<Profile />}/>
         
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
    )

}


export default App;

