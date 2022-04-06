import React from 'react'
import './RangeSlider.css'

const RangeSlider = ({max}) => {
  
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
                }else{
                    rangeInput[1].value = maxPrice;
                    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
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
                    rangeInput[0].value = maxVal - priceGap
                }else{
                    rangeInput[1].value = minVal + priceGap;
                }
            }else{
                priceInput[0].value = minVal;
                priceInput[1].value = maxVal;
                range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
                range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        });
    });


  return (
    <div className='RangeSlider'>
        <div className="wrapper">
            <div className='RangeSlider-text'>Use slider or enter min and max price</div>
            <div className="price-input">
                <div className="field">
                <span>Min</span>
                <input type="number" className="input-min" defaultValue="0"/>
                </div>
                <div className="separator">-</div>
                <div className="field">
                <span>Max</span>
                <input type="number" className="input-max" defaultValue={max}/>
                </div>
            </div>
            <div className="slider">
                <div className="progress"></div>
            </div>
            <div className="range-input">
                <input type="range" className="range-min" min="0" max={max} defaultValue="0" step={max/100}/>
                <input type="range" className="range-max" min="0" max={max} defaultValue={max} step={max/100}/>
            </div>
        </div>
    </div>
  )
}

RangeSlider.defaultProps ={
    max: 10000,
  }


export default RangeSlider