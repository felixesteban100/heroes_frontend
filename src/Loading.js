import React from 'react'
import {ProgressBar} from "react-loader-spinner";
import './index.css'

function Loading() {
  return (
    <div className='loading-container'>
        {/* <ColorRing
            visible={true}
            height="150"
            width="150"
            ariaLabel="blocks-loading"
            colors={['rgb(29, 240, 240)', 'rgb(26, 214, 151)', 'rgb(47, 70, 187)', 'rgb(26, 54, 214)', 'rgb(18, 22, 41)']}
        /> */}
        <ProgressBar
            height="180"
            width="180"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor = '#FFFFFF'
            barColor = 'rgb(57, 189, 255)'
        />
    </div>
  )
}

export default Loading