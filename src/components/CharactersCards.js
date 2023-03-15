import React from "react";

export function CharactersCards({ currentCharacters, findByNameClick }) {
    return (
        <div className='characters--container'>
            {
                currentCharacters.map((current, index) => 
                <div 
                    key={index} 
                    className={`animate__animated animate__fadeIn character`} 
                    onClick={() => findByNameClick(current.id)}
                >
                    <div className='character--img--container'>
                        <img className='character--img' src={current.images.md} alt="logo" />
                    </div>
                    <p className='character--name'>{current.name}</p>
                </div> 
            )}
        </div>
    );
}
