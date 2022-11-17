import React from 'react'
import { Carousel } from 'react-carousel3'
import "./index.css";

function CarouselC(props) {
    const images = props.comics.map((current, index) => {
        return {
            id: index,
            alt: "",
            name: "",
            url: current
        }
    })

    /* height={460} width={700} */
  
    return (
        <div 
            className='carousel'
        >
            <Carousel height={460} width={680} yOrigin={42} yRadius={48} autoPlay={true}>
                {
                    images.map((img) => {
                        return(
                            <div key={img.id} className='carousel-img-container'>
                                <img className='carousel--img' alt="" src={img.url} />
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default CarouselC