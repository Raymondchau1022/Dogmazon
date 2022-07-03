import React, {useState, useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';

import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import Axios from 'axios'
import './Product.css'
import Sorry from "../images/dogSorry.png"

const Product = () => {

  const {ProductID} = useParams(); 
  const [ProductExist, setProductExist] = useState(false);
  const [Product, setProduct] = useState({
    productname:"",
    price:"",
    producttype:"",
    description:"",
    rank:"",
    ratingNumber:"",
    soldNumber:""
    });

  useEffect(() => {
    Axios.get(`http://localhost:5000/ProductID/${ProductID}`
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
                soldNumber: response.data["sold number"]
            })
          } 
        })
  },[])

  return (
    <div className="Product">
        <NavigationBar />
            {(ProductExist == true)? 
            <div className="">
                on9
                <button onClick={ () => (console.log(Product))}>on9</button>
            </div>

            :
            <div className="ProductFalse">
            <img src={Sorry} alt="Sorry" className="SorryPhoto"/>
            <div className="SorryTitle">
                This product is sold out/no longer available for purchase. Please search for other products.
            </div>
            <Link to="/">Back to Home Page</Link>
            </div>}
        <Footer />
    </div>
  )
}

export default Product