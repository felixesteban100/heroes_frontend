import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function Carousel3d(props) {

  let comics = props.comics.map((img, index) => {
      return(
        <div key={index} className="carousel--container">
            <img src={img} />
            <p className="legend">{props.name}</p>
        </div>
      )
  })

  return (
    <div>
      <div id='character--withInfo-comics' className='character--withInfo-comics'>
        <p className='character--withInfo--title'>Comics</p>
        <br />
        <br />
        <Carousel>
          {comics}
        </Carousel>
      </div>
    </div>
  )
}

export default Carousel3d

{/* <div key={index} className='carousel--container'>
          <img className='carousel--img' alt="" src={img} />
          <p className="legend">{props.name}</p>
        </div> */}