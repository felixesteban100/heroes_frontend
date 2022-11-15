import React from 'react'

function Header() {
  return (
    <div>
        <div className='header'>
          {/* <h2 className='header--text'>Characters </h2> */}
            <img className='header--logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png" alt="" /> 
            <h2>  &nbsp;&nbsp; &  &nbsp; &nbsp; </h2>
            <img className='header--logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/1200px-DC_Comics_logo.svg.png" alt="" /> 
            <h2 className='header--text'>and more</h2>
        </div>
    </div>
  )
}

export default Header