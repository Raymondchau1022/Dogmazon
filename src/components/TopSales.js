import React, {useState, useEffect } from 'react'
import './TopSales.css';
import Items from "./Items";
import Axios from 'axios'

const TopSales=()=>{

    const [Product, setProduct] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5000/topsales`
                ).then((response) => {
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
                    
                })
      },[])

    return(
        <div className='TopSales'>
            <div className="title">Top Sales</div>
            <div className='topsales-container'>
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
                    );
                })}

            </div>
        </div>
        )
    }

export default TopSales;