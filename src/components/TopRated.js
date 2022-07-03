import React, {useState, useEffect } from 'react'
import './TopRated.css';
import Items from "./Items";
import Axios from 'axios'

const TopRated=()=>{

    const [Product, setProduct] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5000/toprated`
                ).then((response) => {
                    for(let i = 0;i < response.data.length; i++){
                        setProduct(Product => [...Product,{
                            id: i,
                            productname: response.data[i].productname,
                            price: response.data[i].price,
                            ratingCount: response.data[i]["rating count"],
                            ratingMean: response.data[i]["rating mean"],
                            productID: response.data[i]["productID"]
                        }])
                    }
                    
                })
      },[])

    return(
        <div className='TopRated'>
            <div className="title">Top Rated</div>
            <div className='toprated-container'>
                {Product.map((Product) => {
                    return (
                        <div key={Product.id}>
                            <Items description ={Product.productname}
                            dollor = {Product.price}
                            number = {Product.ratingCount}
                            rank = {Product.ratingMean}
                            productID = {Product.productID}
                            />
                        </div>
                    );
                })}

            </div>
        </div>
        )
    }

export default TopRated;