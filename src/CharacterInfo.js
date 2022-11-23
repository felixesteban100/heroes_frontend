import React from 'react'
import 'animate.css';
import Fade from 'react-reveal/Fade'; 
import './index.css';
import Carousel3d from './Carousel3d';

function CharacterInfo({index, current, imageSize, setImageSize, getBack, selectedStat, changeStat}) {
  return (
    <div key={index}>
        <div id='button-back' className='button-back' onClick={() => getBack()}>
            <img className='button-back-img' src="https://cdn-icons-png.flaticon.com/512/5708/5708793.png" alt="" />
        </div>
        {
            <div key={index} className='character--withInfo'>
                {
                    imageSize === false ? 
                    <div className="animate__animated animate__fadeIn character--withInfo--img-container-img">
                        <img id='character--withInfo--img' onClick={() => setImageSize(true)} className={'character--withInfo--img'}  src={current.images.md} alt="logo" />                                                    
                    </div>
                    :
                    <div key={index} id='animate__animated animate__fadeIn character--withInfo--img-container' onClick={() => setImageSize(false)} className='character--withInfo--img-container'>
                        <img id='character--withInfo--img-zoomed' onClick={() => setImageSize(false)} className='character--withInfo--img-zoomed'  src={current.images.md} alt="logo" />
                    </div>
                }
                <div className='animate__animated animate__fadeIn animate__delay-1s character--withInfo--n-f-a'>
                    <p className='character--withInfo--name'>Name: {current.name}</p>
                    <p className='character--withInfo--fullname'>Full Name: {current.biography.fullName}</p>
                    <div className='character--withInfo--alignment'>
                        {current.biography.alignment==="good" &&
                            <p className='character--alignment'>Aligment: SuperHero</p>
                        }
                        {
                            current.biography.alignment==="bad" &&
                            <p className='character--alignment'>Aligment: Super Villian</p>
                        }
                        {
                            current.biography.alignment==="neutral" &&
                            <p className='character--alignment'>Aligment: Anti-hero</p>
                        }
                        
                    </div>
                    <p className='character--withInfo--publisher'>Publisher: {current.biography.publisher}</p>
                </div>
            </div>
        }
        
        
            
        <Fade bottom cascade>
            <section id='character--withInfo--info' className='character--withInfo--info'>
                    
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
        </Fade>

        <Fade bottom cascade>
            <Carousel3d 
                comics={current.comics}
            />
        </Fade>
    </div>
  )
}

export default CharacterInfo