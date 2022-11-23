import React from 'react'
import {Carousel} from '3d-react-carousal';
import "./index.css";
import { useState } from 'react';

function Carousel3d(props) {
  const [autoPlay, setAutoPlay] = useState(true)

  let comics = props.comics.map((img, index) => {
      return(
        <div key={index} className='carousel--container'>
          <img className='carousel--img' alt="" src={img} />
        </div>
      )
  })

  return (
    <div>
      <div id='character--withInfo-comics' className='character--withInfo-comics'>
        <p className='character--withInfo--title'>Comics</p>
        <br />
        <button className='character--withInfo-comics-button' onClick={() => setAutoPlay(prev => !prev)}>
          {autoPlay ? "Stop Autoplay" : "Begin AutoPlay"}
        </button>
        <br />
        <Carousel slides={comics} autoplay={autoPlay} interval={2000}/>
      </div>
    </div>
  )
}

export default Carousel3d