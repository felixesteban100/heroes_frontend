import React from 'react'
import {Carousel} from '3d-react-carousal';
import "./index.css";

function Carousel3d(props) {
    let comics = props.comics.map((img, index) => {
        return(
            <div key={index} className='carousel--container'>
              <img className='carousel--img' alt="" src={img} />
            </div>
        )
    })
  return (
    <div>
        <Carousel slides={comics} autoplay={true} interval={5000}/>
    </div>
  )
}

export default Carousel3d