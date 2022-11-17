import React from 'react'
import {Carousel} from '3d-react-carousal';
import "./index.css";

function Carousel3d(props) {
    let comics = props.comics.map((img) => {
        return(
            <img className='carousel--img' alt="" src={img} />
        )
    })
  return (
    <div>
        <Carousel slides={comics} autoplay={true} interval={5000}/>
    </div>
  )
}

export default Carousel3d