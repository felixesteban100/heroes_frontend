import React from 'react'
import '../index.css'

function Error({error}) {
  return (
    <div className='error-container'>
        <h1 className='error-text'>{error}</h1>
    </div>
  )
}

export default Error