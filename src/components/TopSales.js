import React from 'react';
import './TopSales.css';
import Items from "./Items";

const TopSales=()=>{
    return(
        <div className='TopSales'>
            <div className="title">Top Sales</div>
            <div className='topsales-container'>
                <Items description ="HKCC Dog"/>
                <Items description ="HKCC Dog"/>
                <Items description ="HKCC Dog"/>
                <Items description ="HKCC Dog"/>
            </div>
        </div>
        )
    }

export default TopSales;