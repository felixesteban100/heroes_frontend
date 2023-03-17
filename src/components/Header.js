import React from 'react'

function Header({ getCharacters }) {
  return (
    <div>
        <div className='header'>
          {/* <h2 className='header--text'>Characters </h2> */}
            <img className='header--logo' onClick={() => getCharacters("marvel", null)} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png" alt="" /> 
            <h2 className='header--text'>  &nbsp;&nbsp;&&nbsp; &nbsp; </h2>
            <img className='header--logo' onClick={() => getCharacters("dc", null)} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/1200px-DC_Comics_logo.svg.png" alt="" /> 
            <h2 className='header--text'>and more</h2>
            {/* <a href="#character--withInfo--info">iNFO CHARACTER</a>
            <a href="#character--withInfo-comics">COMICS CHARACTER</a> */}
        </div>
    </div>
  )
}

export default Header