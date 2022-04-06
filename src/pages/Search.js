import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import RangeSlider from "../components/RangeSlider" 
import Items from "../components/Items";
import './Search.css'



const Search = () => {

 

  const {SearchResult} = useParams();

  const [ProductType, setProductType] = useState(false);
  function ChangeProductType (){
    setProductType(!ProductType)
  }

  const [Rating, setRating] = useState(false);
  function ChangeRating (){
    setRating(!Rating)
  }

  const [Price, setPrice] = useState(false);
  function ChangePrice (){
    setPrice(!Price)
  }
  
  


  return (
    <div className='Search'>
        <NavigationBar/>
        <div className='Search-container'>
            <div className='filter-left'>
              <div className='ProductType'>
                <div className='ProductType-button' onClick={ChangeProductType}>
                    ProductType<div className='Search-arrow'><i className={ProductType?"fas fa-angle-up":"fas fa-angle-down"}></i></div>
                  </div>
                <div className={ProductType?'collapse-show':'collapse'}>
                  <ul className='list'>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option1" /> &emsp;Electronic</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option2" /> &emsp;Fashion</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option3" /> &emsp;Toys</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option4" /> &emsp;Foods</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option5" /> &emsp;Sports</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option6" /> &emsp;Books</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option7" /> &emsp;Others</li> 
                    </ul>           
                </div>
              </div>
              <div className='Rating'>
                <div className='Rating-button' onClick={ChangeRating}>
                  Rating<div className='Search-arrow'><i className={Rating?"fas fa-angle-up":"fas fa-angle-down"}></i></div>
                </div>
                <div className={Rating?'collapse-show':'collapse'}>
                  <ul className='list'>
                    <li className='item' id=''><input type="radio" name="Rating-option" id="Rating-option1" /> 4 stars and up</li>
                    <li className='item' id=''><input type="radio" name="Rating-option" id="Rating-option2" /> 3 stars and up</li>
                    <li className='item' id=''><input type="radio" name="Rating-option" id="Rating-option3" /> 2 stars and up</li>
                    <li className='item' id=''><input type="radio" name="Rating-option" id="Rating-option4" /> 1 stars and up</li>
                  </ul>
                </div>
              </div>
              <div className='Price'>
                <div className='Price-button' onClick={ChangePrice}>
                  Price<div className='Search-arrow'><i className={Price?"fas fa-angle-up":"fas fa-angle-down"}></i></div>
                </div>
                <div className={Price?'collapse-show':'collapse'}>
                  <RangeSlider/>
                </div>
              </div>
            </div>
            <div className='Search-content'>
              <div className='filter-right'>
                <div className='Search-result'>
                  All Product <i className="fas fa-caret-right"></i> {SearchResult}
                </div>
                <div className="SortingBy">
                    <div className="SortingBy-Button">Sorting By <div className='sortingby-arrow'><i className="fas fa-angle-down"></i></div></div>
                    <div className="dropdown-content">
                      <a>Price: low to high</a>
                      <a>Price: high to low</a>
                      <a>Product: lastest to oldest</a>
                      <a>Product: oldest to latest</a>
                    </div>
                </div>
              </div> 
              <div className='Search-content-items'>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
                <Items description ="Space Dog"/>
              </div> 
            </div>  
        </div>
    <Footer/>
    </div>
  )
}

Search.defaultProps={
  SearchResult : "Dog",

}

export default Search