import React, {useState, useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom';
import DogLoading from "../components/DogLoading"
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import Items from "../components/Items";
import Axios from 'axios'
import './Search.css'



const Search = () => {
  

  const [Loading, setLoading] = useState(false);
  const [Product, setProduct] = useState([]);
  const [Query, setQuery] = useState("");
  const [QueryData, setQueryData] = useState({
    rating: 0,
    priceStart: 0,
    priceEnd: 10000,
    Electronics:false,
    Fashion:false,
    Toys:false,
    Foods:false,
    Sports:false,
    Books:false,
    Others:false,
    range:false,
  });


  const {SearchResult} = useParams();
  const {Type} = useParams();

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
  
  const check_existed_account = (order) =>{
    Axios.get(`http://localhost:5000/price/${order}`
    ).then((response) => {
        console.log(response.data)
    })

 }

 //Rangeslider
 const rangeInput = document.querySelectorAll(".range-input input"),
 priceInput = document.querySelectorAll(".price-input input"),
 range = document.querySelector(".slider .progress");
 let priceGap = 1;
 
 priceInput.forEach(input =>{
     input.addEventListener("input", e =>{
         let minPrice = parseInt(priceInput[0].value),
         maxPrice = parseInt(priceInput[1].value);
         
         if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
             if(e.target.className === "input-min"){
                 rangeInput[0].value = minPrice;
                 range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
                 QueryData.priceStart = minPrice;
             }else{
                 rangeInput[1].value = maxPrice;
                 range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                 QueryData.priceEnd = maxPrice;
             }
         }
     });
 });

 rangeInput.forEach(input =>{
     input.addEventListener("input", e =>{
         let minVal = parseInt(rangeInput[0].value),
         maxVal = parseInt(rangeInput[1].value);
         if((maxVal - minVal) < priceGap){
             if(e.target.className === "range-min"){
                 rangeInput[0].value = maxVal - priceGap;
                 
             }else{
                 rangeInput[1].value = minVal + priceGap;
                 
             }
         }else{
             priceInput[0].value = minVal;
             priceInput[1].value = maxVal;
             range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
             range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
         }
         QueryData.priceStart =  rangeInput[0].value;
         QueryData.priceEnd = rangeInput[1].value;
     });
 });



 useEffect(() => {
  
  const getProductData = async () =>{

    let x =""

    if(QueryData.Electronics||QueryData.Fashion ||QueryData.Toys||QueryData.Foods||QueryData.Sports||QueryData.Books||QueryData.Others){
      x += "+type="
    
      if (QueryData.Electronics){
        x += "-Electronics"
      }
      if (QueryData.Fashion){
        x += "-Fashion"
      }
      if (QueryData.Toys){
        x += "-Toys"
      }
      if (QueryData.Foods){
        x += "-Foods"
      }
      if (QueryData.Sports){
        x += "-Sports"
      }
      if (QueryData.Books){
        x += "-Books"
      }
      if (QueryData.Others){
        x += "-Others"
      } 

    } else if (Type){
      x += "+type=" + Type
    }

    if (QueryData.rating != 0){
      x += "+rating=" + QueryData.rating
    }

    if (!(QueryData.priceStart== 0 && QueryData.priceEnd==10000)){
      x += "+price=" + QueryData.priceStart + "-" + QueryData.priceEnd
    }

    setQuery(x)
    console.log(x)
    
    await Axios.get(`http://localhost:5000/search/${SearchResult}/${Query}`
        ).then((response) => {
          if (response.data){
            setProduct([])
            for(let i = 0;i < response.data.length; i++){
              setProduct(Product => [...Product,{
                  id: i,
                  productname: response.data[i].productname,
                  price: response.data[i].price,
                  ratingCount: response.data[i]["rating count"],
                  ratingMean: response.data[i]["rating mean"],
                  productID: response.data[i]["productID"],
                  imageID: response.data[i]["imageID"]
              }])
            }
          }
          setLoading(false)
        })
  }

  setLoading(true)
  getProductData()
},[QueryData,Query])



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
                    <li className='item' id=''><input type="checkbox" id="ProductType-option1" onClick={() => {setQueryData({...QueryData, Electronics: !QueryData.Electronics});}}/> &emsp;Electronic</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option2" onClick={() => {setQueryData({...QueryData, Fashion: !QueryData.Fashion});}}/> &emsp;Fashion</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option3" onClick={() => {setQueryData({...QueryData, Toys: !QueryData.Toys});}}/> &emsp;Toys</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option4" onClick={() => {setQueryData({...QueryData, Foods: !QueryData.Foods});}}/> &emsp;Foods</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option5" onClick={() => {setQueryData({...QueryData, Sports: !QueryData.Sports});}}/> &emsp;Sports</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option6" onClick={() => {setQueryData({...QueryData, Books: !QueryData.Books});}}/> &emsp;Books</li>
                    <li className='item' id=''><input type="checkbox" id="ProductType-option7" onClick={() => {setQueryData({...QueryData, Others: !QueryData.Others});}}/> &emsp;Others</li> 
                    </ul>           
                </div>
              </div>
              <div className='Rating'>
                <div className='Rating-button' onClick={ChangeRating}>
                  Rating<div className='Search-arrow'><i className={Rating?"fas fa-angle-up":"fas fa-angle-down"}></i></div>
                </div>
                <div className={Rating?'collapse-show':'collapse'}>
                  <ul className='list'>
                    <li className='item' id=''><input type="radio" name="Rating-option" id="Rating-option1" onClick={() => {setQueryData({...QueryData, rating:"4"});}}/> 4 stars and up</li>
                    <li className='item' id=''><input type="radio" name="Rating-option" id="Rating-option2" onClick={() => {setQueryData({...QueryData, rating:"3"});}}/> 3 stars and up</li>
                    <li className='item' id=''><input type="radio" name="Rating-option" id="Rating-option3" onClick={() => {setQueryData({...QueryData, rating:"2"});}}/> 2 stars and up</li>
                    <li className='item' id=''><input type="radio" name="Rating-option" id="Rating-option4" onClick={() => {setQueryData({...QueryData, rating:"1"});}}/> 1 stars and up</li>
                  </ul>
                </div>
              </div>
              <div className='Price'>
                <div className='Price-button' onClick={ChangePrice}>
                  Price<div className='Search-arrow'><i className={Price?"fas fa-angle-up":"fas fa-angle-down"}></i></div>
                </div>
                <div className={Price?'collapse-show':'collapse'}>
                  <div className='RangeSlider' >
                      <div className="wrapper">
                          <div className='RangeSlider-text'>Use slider or enter min and max price</div>
                          <div className="price-input" onChange={() => {setQueryData({...QueryData, range: true});}}>
                              <div className="field">
                              <span>Min</span>
                              <input type="number" className="input-min" defaultValue="0"/>
                              </div>
                              <div className="separator">-</div>
                              <div className="field">
                              <span>Max</span>
                              <input type="number" className="input-max" defaultValue="10000"/>
                              </div>
                          </div>
                          <div className="slider">
                              <div className="progress"></div>
                          </div>
                          <div className="range-input" onTouchEnd={() => {setQueryData({...QueryData, range: true});}}>
                              <input type="range" className="range-min" min="0" max="10000" defaultValue="0" step={10000/100}/>
                              <input type="range" className="range-max" min="0" max="10000" defaultValue="10000" step={10000/100}/>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            {Loading?
              <DogLoading />
            :
            <div className='Search-content'>
              <div className='filter-right'>
                <div className='Search-result'>
                  All Product <i className="fas fa-caret-right"></i> {SearchResult}
                </div>
                <div className="SortingBy">
                    <div className="SortingBy-Button">Sorting By <div className='sortingby-arrow'><i className="fas fa-angle-down"></i></div></div>
                    <div className="dropdown-content">
                      {/* <a onClick={check_existed_account(1)} >Price: low to high</a> */}
                      {/* <a onClick={check_existed_account(-1)} >Price: high to low</a> */}
                      <a>Product: lastest to oldest</a>
                      <a>Product: oldest to latest</a>
                    </div>
                </div>
              </div> 
              <div className='Search-content-items'>
                  {Product.map((Product) => {
                        return (
                            <div key={Product.id}>
                                <Items description ={Product.productname}
                                dollor = {Product.price}
                                number = {Product.ratingCount}
                                rank = {Product.ratingMean}
                                productID = {Product.productID}
                                imageID = {Product.imageID}
                                />
                            </div>
                        )
                    })}
              </div> 
            </div>  
            }
        </div>
        
    <Footer/>
    </div>
  )
}

Search.defaultProps={
  SearchResult : "All",
}

export default Search