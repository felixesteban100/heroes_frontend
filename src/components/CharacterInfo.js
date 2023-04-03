import React, { useState } from 'react'
import 'animate.css';
import Carousel3d from './Carousel3d';
import getAverageColor from 'get-average-color'
// import { AnimationOnScroll } from 'react-animation-on-scroll';
import Modal from 'react-modal';


function CharacterInfo({index, current, imageSize, setImageSize, getBack, selectedStat, changeStat}) {
    let [colorsArr, setColorsArr] = useState([{r: 0, g: 0, b: 0}])
    
    function getColors(){
        getAverageColor(current.images.md).then(rgb => {
            setColorsArr(rgb)
        })
    }

    // function controlled3d(event){
    //     const element = event.target

    //     // get mouse position
    //     const x = event.clientX;
    //     const y = event.clientY;

    //     // find the middle of the entire page
    //     const middleX = window.innerWidth / 2;
    //     const middleY = window.innerHeight / 2;

    //     // // find the middle of the container (I guess)
    //     // const middleX = container.innerWidth / 2;
    //     // const middleY = container.innerHeight / 2;

    //     // get offset from middle
    //     const offsetX = ((x - middleX) / middleX) * 100;
    //     const offsetY = ((y - middleY) / middleY) * 100;

    //     console.log(offsetX, offsetY)

    //     element.style.setProperty("--rotateX", -1 * offsetY + "deg")
    //     element.style.setProperty("--rotateY", offsetX + "deg")
    // }

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'transparent',
          border: 'none'
        },
        overlay: {
            backgroundColor: 'rgba(6, 7, 42, 0.805)'
        }
    };
  
    return (
        <div /* key={index} */ onLoad={getColors}>
            <div id='button-back' className='button-back' onClick={() => getBack()}>
                <img className='button-back-img' src="https://cdn-icons-png.flaticon.com/512/5708/5708793.png" alt="" />
            </div>

            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={() => setIsOpen(false)}
            >
                <button 
                    onClick={() => setIsOpen(false)}
                    style={{
                        margin: '0',
                        backgroundColor: 'black',
                        color: 'white',
                        fontSize: '2rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer'
                    }}
                    >
                    X
                </button>
                <div 
                    className={"character--withInfo--img-zoomed-container"} 
                    >
                    <img 
                        className={'animate__animated animate__fadeIn character--withInfo--img-zoomed'} 
                        src={current.images.md} alt="logo" 
                    />                                                
                </div>


            </Modal>

            
            <div className='character--withInfo'>
                {/* <div 
                    className={imageSize === false ? "character--withInfo--img-container-img" : "character--withInfo--img-zoomed-container"} 
                    onMouseDown={() => setImageSize(prev => !prev)}
                    onDoubleClick={openModal}
                    >
                    <img 
                        className={imageSize === false ? 'animate__animated animate__flip animate__delay-1s character--withInfo--img' : 'animate__animated animate__fadeIn character--withInfo--img-zoomed'} 
                        style={imageSize === false ? {boxShadow: `rgb(${colorsArr.r}, ${colorsArr.g}, ${colorsArr.b}) 0px 10px 70px 4px`} : {}} 
                        src={current.images.md} alt="logo" 
                    />                                                
                </div> */}
                <div 
                    className={"character--withInfo--img-container-img"} 
                    // onMouseDown={() => setImageSize(prev => !prev)}
                    onClick={() => setIsOpen(true)}
                    >
                    <img 
                        className={'animate__animated animate__flip animate__delay-1s character--withInfo--img'} 
                        style={{boxShadow: `rgb(${colorsArr.r}, ${colorsArr.g}, ${colorsArr.b}) 0px 10px 70px 4px`}} 
                        src={current.images.md} alt="logo" 
                    />                                                
                </div>
                
                <div className='animate__animated animate__fadeIn animate__delay-3s character--withInfo--n-f-a'>
                    <p className='character--withInfo--name'>Name: {current.name}</p>
                    <p className='character--withInfo--fullname'>Full Name: {current.biography.fullName}</p>
                    <div className='character--withInfo--alignment'>
                        {current.biography.alignment==="good" &&
                            <p className='character--alignment'>Alignment: SuperHero</p>
                        }
                        {
                            current.biography.alignment==="bad" &&
                            <p className='character--alignment'>Alignment: Super Villain</p>
                        }
                        {
                            current.biography.alignment==="neutral" &&
                            <p className='character--alignment'>Alignment: Anti-hero</p>
                        }
                        
                    </div>
                    <p className='character--withInfo--publisher'>Publisher: {current.biography.publisher}</p>
                </div>
            </div>
            
            {/* <AnimationOnScroll initiallyVisible={false} animateIn="animate__fadeInUp" duration={4} animateOut="animate__fadeOut" > */}
                <section id='character--withInfo--info' className='character--withInfo--info character--withInfo--info-transition'>
                        
                        <div className='character--withInfo--statSelectors'>
                            <div id='1' className={selectedStat === "Powerstats" ? 'statSelectors-selected' : 'statSelectors'} onClick={(event) => changeStat(event)} value="Powerstats">Powerstats</div>
                            <div id='1' className={selectedStat === "Biography" ? 'statSelectors-selected' : 'statSelectors'} onClick={(event) => changeStat(event)} value="Biography">Biography</div>
                            <div id='1' className={selectedStat === "Appearance" ? 'statSelectors-selected' : 'statSelectors'} onClick={(event) => changeStat(event)} value="Appearance">Appearance</div>
                        </div>

                        <div className='character--withInfo--infoByStat'>
                            {   selectedStat === "Powerstats" &&
                                <div className='character--withInfo--infoByStat--stat'>
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/1787/1787077.png" alt="" />
                                        <p className='stat--info'>Intelligence: {current.powerstats.intelligence}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/1599/1599755.png" alt="" />
                                        <p className='stat--info'>Strength: {current.powerstats.strength}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/4357/4357645.png" alt="" />
                                        <p className='stat--info'>Speed: {current.powerstats.speed}</p>
                                    </div>
                            
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/2592/2592317.png" alt="" />
                                        <p className='stat--info'>Durability: {current.powerstats.durability}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/3103/3103567.png" alt="" />
                                        <p className='stat--info'>Power: {current.powerstats.power}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/6027/6027161.png" alt="" />
                                        <p className='stat--info'>Combat: {current.powerstats.combat}</p>
                                    </div>
                                </div>
                            }

                            {   selectedStat === "Biography" &&
                                <div className='character--withInfo--infoByStat--stat'>

                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/2555/2555572.png" alt="" />
                                        <p className='stat--info'><strong>Place of birth: </strong>
                                            {   
                                                current.biography.placeOfBirth!== "-" ?
                                                current.biography.placeOfBirth
                                                :
                                                "Unknown"
                                            }
                                        </p>
                                    </div>

                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/3850/3850285.png" alt="" />
                                        <p className='stat--info'><strong>Occupations: </strong> 
                                            {
                                                current.work.occupation[0] === "-" ?
                                                "None"
                                                :
                                                current.work.occupation.map((current2, index) => {
                                                    if (index  === current.work.occupation.length - 1) {
                                                        return (
                                                            ` ${current2}`
                                                        )
                                                    }
                                                    return (
                                                        ` ${current2},`
                                                    )
                                                })
                                            }
                                        </p>
                                    </div>

                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/3037/3037914.png" alt="" />
                                        <p className='stat--info'><strong>Aliases: </strong> 
                                            {
                                                current.biography.aliases[0] === "-" ?
                                                "None"
                                                :
                                                current.biography.aliases.map((current2, index) => {
                                                    if (index  === current.biography.aliases.length - 1) {
                                                        return (
                                                            ` ${current2}`
                                                        )
                                                    }
                                                    return (
                                                        ` ${current2},`
                                                    )
                                                })
                                            }
                                        </p>
                                    </div>

                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/1828/1828413.png" alt="" />
                                        <p className='stat--info'><strong>Alter Egos: </strong> 
                                            {
                                                current.biography.alterEgos[0] === "-" ?
                                                "None"
                                                :
                                                current.biography.alterEgos.map((current2, index) => {
                                                    if (index  === current.biography.alterEgos.length - 1) {
                                                        return (
                                                            ` ${current2}`
                                                        )
                                                    }
                                                    return (
                                                        ` ${current2},`
                                                    )
                                                })
                                            }
                                        </p>
                                    </div>

                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png" alt="" />
                                        <p className='stat--info'><strong>First Appearance: </strong>
                                            {   
                                                current.biography.firstAppearance !== "-" ?
                                                current.biography.firstAppearance
                                                :
                                                "Unknown"
                                            }
                                        </p>
                                    </div>

                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/1534/1534938.png" alt="" />
                                        <p className='stat--info'><strong>Groups affiliation: </strong> 
                                            {
                                                current.connections.groupAffiliation[0] === "-" ?
                                                "Unknown"
                                                :
                                                current.connections.groupAffiliation.map((current2, index) => {
                                                    if (index  === current.connections.groupAffiliation.length - 1) {
                                                        return (
                                                            ` ${current2}`
                                                        )
                                                    }
                                                    return (
                                                        ` ${current2},`
                                                    )
                                                })
                                            }
                                        </p>
                                    </div>

                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/2219/2219867.png" alt="" />
                                        <p className='stat--info'><strong>Relatives: </strong>
                                            {   
                                                current.connections.relatives !== "-" ?
                                                current.connections.relatives
                                                :
                                                "Unknown"
                                            }
                                        </p>
                                    </div>

                                    <div className='stat'>
                                            <p className='stat--info'><strong>Publisher:</strong></p> 
                                    </div>

                                    <div className='stat-publisher'>
                                        <img className='stat-publisher-logo' src={current.publisherIMG} alt="" />
                                    </div>

                                </div>
                            }

                            {   selectedStat === "Appearance" &&
                                <div className='character--withInfo--infoByStat--stat'>                                                
                                    <div className='stat'>                                                
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/2324/2324529.png" alt="" />
                                        <p className='stat--info'>Gender: {current.appearance.gender}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/3090/3090509.png" alt="" />
                                        <p className='stat--info'>Race: {current.appearance.race === null ? "Unknown" : current.appearance.race}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/3209/3209114.png" alt="" />
                                        <p className='stat--info'>Height: {current.appearance.height[0]} / {current.appearance.height[1]}</p>
                                    </div>
                            
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/847/847523.png" alt="" />
                                        <p className='stat--info'>Weight: {current.appearance.weight[0]} / {current.appearance.weight[1]}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/4621/4621975.png" alt="" />
                                        <p className='stat--info'>Eye Color: {current.appearance.eyeColor}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat--logo" src="https://cdn-icons-png.flaticon.com/512/3791/3791210.png" alt="" />
                                        <p className='stat--info'>Hair Color: {current.appearance.hairColor}</p>
                                    </div>
                                </div>
                            }
                        </div>
                </section>
            {/* </AnimationOnScroll> */}

            {/* <AnimationOnScroll initiallyVisible={false} animateIn="animate__fadeInUp" duration={4} animateOut="animate__fadeOut" > */}
                <Carousel3d 
                    comics={current.comics}
                    name={current.name}
                />
            {/* </AnimationOnScroll> */}
        </div>
  )
}

export default CharacterInfo