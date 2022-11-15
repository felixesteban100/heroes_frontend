import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Character() {

    let [allCharacters, setAllCharacters] = useState([]);
    let [initialCharacters, setInitialCharacters] = useState([])
    let [hiddeChacters, setHiddeCharacters] = useState(false)
    let [hiddeChacter, setHiddeCharacter] = useState(true)
    const [howManyRef, setHowManyRef] = React.useState(6)
    // let [num, setNum] = useState(0)

    let [side, setSide] = useState("All")
    let [universe, setUniverse] = useState("All")
    let [team, setTeam] = useState("All")

    let [selectedStat, setSelectedStat] = useState("Powerstats")

    useEffect(() => {
        axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`)
        .then(res => setAllCharacters(res.data))
    }, [])


    useEffect(() => {
        axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`)
        .then(res => {
            let arr = res.data

            let selectedOnes = []
            let result = []
            if (team !== "All" || universe !== "All") {
                result = arr.filter((current, index) => {
                    if (current.connections.groupAffiliation.includes(team) || current.biography.firstAppearance.includes(team)) {
                        if (side==="All" && universe === "All") {
                            selectedOnes.push(index)
                            return current
                        }else if (side === 'All' && universe !== "All") {
                            if (current.biography.publisher === universe) {
                                selectedOnes.push(index)
                                return current
                            }
                        }else if (side !== 'All' && universe === "All") {
                            if (current.biography.alignment === side) {
                                selectedOnes.push(index)
                                return current
                            }
                        }else {
                            if (current.biography.alignment === side && current.biography.publisher === universe) {
                                selectedOnes.push(index)
                                return current
                            }
                        }
                    }                    
                }) 
            }else{
                result = arr.filter((current, index) => {
                    if (side==="All" && universe === "All") {
                        selectedOnes.push(index)
                        return current
                    }else if (side === 'All' && universe !== "All") {
                        if (current.biography.publisher === universe) {
                            selectedOnes.push(index)
                            return current
                        }
                    }else if (side !== 'All' && universe === "All") {
                        if (current.biography.alignment === side) {
                            selectedOnes.push(index)
                            return current
                        }
                    }else /* if (side !== "All" && universe !== "All" && teams !== "All") */ {
                        if (current.biography.alignment === side && current.biography.publisher === universe) {
                            selectedOnes.push(index)
                            return current
                        }
                    }
                    // return
                })
            }

            // console.log(result)
            
            // console.log("selectedOnes", selectedOnes)
            if (howManyRef > 0 && howManyRef !== "") {
                let finalSelectedIntex = []
                for(let i = 0; i < howManyRef; i++){
                    finalSelectedIntex.push(selectedOnes[Math.floor(Math.random()*selectedOnes.length)])
                } 
                // console.log("finalSelectedIntex", finalSelectedIntex)

                result = arr.filter((current, index) => finalSelectedIntex.includes(index))
            }

            // console.log(howManyRef.current.value)

            if((howManyRef === "" || howManyRef === 0) && team === "All"){
                let finalSelectedIntex = []
                for(let i = 0; i < 6; i++){
                    finalSelectedIntex.push(selectedOnes[Math.floor(Math.random()*selectedOnes.length)])
                } 
                // console.log("finalSelectedIntex", finalSelectedIntex)

                result = arr.filter((current, index) => finalSelectedIntex.includes(index))
            }
            setInitialCharacters(result)
            
        })
    }, [side, universe, team, howManyRef])

    

    function changeBySide(event){
        setSide(event.target.value)
    }

    function changeByUniverse(event){
        setUniverse(event.target.value)
        if (universe === "All") {
            setTeam("All")
        }
    }

    function changeByTeam(event){
        setTeam(event.target.value)
    }

    function changeStat(event){
        setSelectedStat(event.target.outerText)
    }

    function changeHowMany(event){
        setHowManyRef(event.target.value)
    }
    

    function getPublisherImg(publisher){
        let img = ""
        switch (publisher) {
            case "Marvel Comics":
                img = "https://media.tenor.com/yuMS24ShcxQAAAAC/marvel-studios.gif"
            break;

            case "DC Comics":
                img = "https://img.wattpad.com/136b18152c06ba98fc0975c35e8718b1b5d71f75/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f3852596d354861383930497349513d3d2d3339363830323632332e313462343261626138353034393866363334393330313331313336322e676966"
            break;

            case "George Lucas":
                img = "https://www.citypng.com/public/uploads/preview/-51608494060e1tvtjfsry.png"
            break;

            case "Dark Horse Comics":
                img = "https://1000logos.net/wp-content/uploads/2020/09/Dark-Horse-Comics-Logo-1991.png"
            break;
        
            default:
                img = "https://images.generation-msx.nl/company/0388910c.png"
            break;
        }
        return img
    }

    const [character, setCharacter] = React.useState([])

    const characterRef = React.useRef('')

    function findByName(){
        const charactersArr = []
        /* const info =  */allCharacters.map(charac => {
            const name = charac.name.toLowerCase();
            const nameintro = characterRef.current.value.toLowerCase();
            const result = name.includes(nameintro)

            if (result===true) {
                charactersArr.push({
                    id: charac.id,
                    name: charac.name,
                    images: {md: charac.images.md},
                    appearance:{
                        gender: charac.appearance.gender,
                        race: charac.appearance.race,
                        height: charac.appearance.height,
                        weight: charac.appearance.weight,
                        eyeColor: charac.appearance.eyeColor,
                        hairColor: charac.appearance.hairColor,
                    },
                    powerstats: {
                        intelligence: charac.powerstats.intelligence,
                        strength: charac.powerstats.strength,
                        speed: charac.powerstats.speed,
                        durability: charac.powerstats.durability,
                        power: charac.powerstats.power, 
                        combat: charac.powerstats.combat,
                    },
                    biography: { 
                        fullName: charac.biography.fullName,
                        alignment: charac.biography.alignment,
                        publisher: charac.biography.publisher,
                        firstAppearance: charac.biography.firstAppearance,
                        alterEgos: charac.biography.alterEgos,
                        placeOfBirth: charac.biography.placeOfBirth,
                        aliases: charac.biography.aliases,
                        
                    },
                    work: {
                        occupation: charac.work.occupation
                    },
                    connections:{
                        groupAffiliation: charac.connections.groupAffiliation,
                    },
                    publisherIMG: getPublisherImg(charac.biography.publisher)
                })
            }
            return result // esto es innecesario
             
        })
        setInitialCharacters(charactersArr)
        setHiddeCharacters(false)
        setHiddeCharacter(true)
        
        characterRef.current.value = ""
    }

    function findByNameClick(idSended){
        // console.log(idSended)

        const charactersArr = []
        allCharacters.map(charac => {
            if (idSended===charac.id) {
                let occupation = charac.work.occupation.split(",")
                occupation = occupation.map((current) => {
                    return current.split(";")
                })
                let occupationArr = []
                occupation = occupation.map(current => {   
                    occupationArr.push(...current)
                    return current
                })
                occupation = occupationArr

                occupation = occupation.map(occupation => {
                    if(occupation.charAt(0) === " "){
                        return occupation.charAt(1).toUpperCase() + occupation.slice(2)
                    }
                    return occupation.charAt(0).toUpperCase() + occupation.slice(1)
                })
                // console.log(occupation)

                let groups = charac.connections.groupAffiliation.split(",")
                groups = groups.map((current) => {
                    return current.split(";")
                })
                let groupsArr = []
                groups = groups.map(current => {   
                    groupsArr.push(...current)
                    return current
                })
                groups = groupsArr

                groups = groups.map(groups => {
                    if(groups.charAt(0) === " "){
                        return groups.charAt(1).toUpperCase() + groups.slice(2)
                    }
                    return groups.charAt(0).toUpperCase() + groups.slice(1)
                })
                // console.log(groups)

                let alteregos
                if(charac.biography.alterEgos !== "No alter egos found."){
                    alteregos = charac.biography.alterEgos.split(",")
                }else{
                    alteregos = ["-"]
                }
                // console.log(alteregos)

                

                charactersArr.push({
                    // charac
                    id: charac.id,
                    name: charac.name,
                    images: {md: charac.images.md},
                    appearance:{
                        gender: charac.appearance.gender,
                        race: charac.appearance.race,
                        height: charac.appearance.height,
                        weight: charac.appearance.weight,
                        eyeColor: charac.appearance.eyeColor,
                        hairColor: charac.appearance.hairColor,
                    },
                    powerstats: {
                        intelligence: charac.powerstats.intelligence,
                        strength: charac.powerstats.strength,
                        speed: charac.powerstats.speed,
                        durability: charac.powerstats.durability,
                        power: charac.powerstats.power, 
                        combat: charac.powerstats.combat,
                    },
                    biography: { 
                        fullName: charac.biography.fullName,
                        alignment: charac.biography.alignment,
                        publisher: charac.biography.publisher,
                        firstAppearance: charac.biography.firstAppearance,
                        alterEgos: alteregos,
                        placeOfBirth: charac.biography.placeOfBirth,
                        aliases: charac.biography.aliases,
                    },
                    work: {
                        occupation: occupation
                    },
                    connections:{
                        groupAffiliation: groups,
                    },
                    publisherIMG: getPublisherImg(charac.biography.publisher)
                })
            }
            return charac // esto es innecesario
             
        })
        setHiddeCharacters(true)
        setHiddeCharacter(false)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setCharacter(charactersArr)
    }

    function getBack(){
        setHiddeCharacters(false)
        setHiddeCharacter(true)
    }

    return (
        <div className='character-module'>
            <div className='find-container'>
                
                <input className="find-by-name" type="text" placeholder='Enter name'ref={characterRef}/>

                <button className='character--button' onClick={findByName}>Find character</button>

                <input className='input-howMany' type="number" name="howMany" id="" value={howManyRef} onChange={event => changeHowMany(event)} placeholder={team !== "All" ? 'All' : 6} max={100} min={0}/>

                <select className='select-category' name="" id="" onChange={event => changeBySide(event)}>
                    <option value="All">Hero and Villain</option>
                    <option value="good">Hero 🦸‍♂️</option>
                    <option value="bad">Villain 🦹‍♂️</option>
                </select>

                <select className='select-category' name="" id="" onChange={event => changeByUniverse(event)}>
                    <option className='all' value="All">All universes</option>
                    <option className='marvel' value="Marvel Comics">Marvel</option>
                    <option className='dc' value="DC Comics">DC</option>
                    <option className='dark-horse' value="Dark Horse Comics">Dark Horse Comics</option>
                    <option className='george-lucas' value="George Lucas">George Lucas</option>
                    <option className='shueisha' value="Shueisha">Shueisha</option>
                    
                </select>

                {
                    universe === "Marvel Comics" &&
                    <select className='select-category' name="" id="" onChange={event => changeByTeam(event)}>
                        <option value="All">All Teams</option>
                        <option value="Avengers">Avengers</option>
                        <option value="Illuminati">Illuminati</option>
                        <option value="Inhumans">Inhumans</option>
                        <option value="X-Men">X-Men</option>
                        <option value="X-Force">X-Force</option>
                        <option value="Guardians of the Galaxy">Guardians of the Galaxy</option>
                        <option value="Defenders">Defenders</option>
                        <option value="Secret Avengers">Secret Avengers</option>
                        <option value="Marvel Knights">Marvel Knights</option>
                        <option value="Fantastic Four">Fantastic Four</option>
                        <option value="Sinister Six">Sinister Six</option>
                        <option value="Midnight Sons">Midnight Sons</option>
                    </select>
                }

                {
                    universe === "DC Comics" &&
                    <select className='select-category' name="" id="" onChange={event => changeByTeam(event)}>
                        <option value="All">All Teams</option>
                        <option value="Justice League">Justice League</option>
                        <option value="Suicide Squad">Suicide Squad</option>
                        <option value="Teen Titans">Teen Titans</option>
                        <option value="Green Lantern">Green Lantern Corps</option>
                        <option value="Batman Family">Batman Family</option>
                        <option value="Teenage Mutant Ninja Turtles">Teenage Mutant Ninja Turtles</option>

                    </select>
                }

                {
                    universe === "Dark Horse Comics" &&
                    <select className='select-category' name="" id="" onChange={event => changeByTeam(event)}>
                        <option value="All">All Teams</option>
                        <option value="Incredible Family">Incredible Family</option>
                    </select>
                }
            </div>
            
            {/* characters--container */}
            {
                hiddeChacters === false && initialCharacters.length !== 0 &&
                <div className='characters--container'>
                    {
                        hiddeChacters === false && initialCharacters.length !== 0 &&
                        initialCharacters.map((current)=> {
                            return (
                                <div className='character' onClick={() => findByNameClick(current.id)}>
                                    <img className='character--img' src={current.images.md} alt="logo" />
                                    <p className='character--name'>{current.name}</p>
                                    {/* <p className='character--fullname'>{current.biography.fullName}</p> */}
                                </div>
                            )
                        })
                    }
                </div>
            }
            {/* characters--container */}

            <div className='character--container--withInfo'>
                {
                    hiddeChacter === false && character.length !== 0 &&
                    character.map((current)=> (
                        <div>
                            <div className='button-back' onClick={getBack}>
                                <img className='button-back-img' src="https://cdn-icons-png.flaticon.com/512/5708/5708793.png" alt="" />
                            </div>

                            <div className='character--withInfo'>
                                <img className='character--withInfo--img' src={current.images.md} alt="logo" />
                                <p className='character--withInfo--name'>Name: {current.name}</p>
                                <p className='character--withInfo--fullname'>Full Name: {current.biography.fullName}</p>
                                <div className='character--withInfo--alignment'>
                                    {current.biography.alignment==="good" ? 
                                        <p className='character--alignment'>Aligment: SuperHero </p>
                                        : 
                                        <p className='character--alignment'>Aligment: Super Villian</p>
                                    }
                                </div>
                            </div>


                            <div className='character--withInfo--info'>
                                    
                                    <div className='character--withInfo--statSelectors'>
                                        <div className={selectedStat === "Powerstats" ? 'statSelectors-selected' : 'statSelectors'} onClick={(event) => changeStat(event)} value="Powerstats">Powerstats</div>
                                        <div className={selectedStat === "Biography" ? 'statSelectors-selected' : 'statSelectors'} onClick={(event) => changeStat(event)} value="Biography">Biography</div>
                                        <div className={selectedStat === "Appearance" ? 'statSelectors-selected' : 'statSelectors'} onClick={(event) => changeStat(event)} value="Appearance">Appearance</div>
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
                                                        {/* <img className='stat--logo' src="https://cdn-icons-png.flaticon.com/512/929/929926.png" alt="" /> */}
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

                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Character;

/* all */ 
// const url = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`

/* specific */
// const url2 = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${num}.json`





/* BEFORE */

/* <div className='main-withInfo'>
                {
                    hiddeChacter === false && character.length !== 0 &&
                    character.map((current)=> (
                        <div>
                            <div className='main-withInfo-inside'>
                                <div onClick={getBack} className='button-back'>
                                    <h1>Back</h1>
                                </div>
                                
                                <div className='stats-left'>
                                    <div className='stat'>
                                        <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/1787/1787077.png" alt="" />
                                        <p className='character--stat'>Intelligence: {current.powerstats.intelligence}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/1599/1599755.png" alt="" />
                                        <p className='character--stat'>Strength: {current.powerstats.strength}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/4357/4357645.png" alt="" />
                                        <p className='character--stat'>Speed: {current.powerstats.speed}</p>
                                    </div>
                            
                                    <div className='stat'>
                                        <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/2592/2592317.png" alt="" />
                                        <p className='character--stat'>Durability: {current.powerstats.durability}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/3103/3103567.png" alt="" />
                                        <p className='character--stat'>Power: {current.powerstats.power}</p>
                                    </div>
            
                                    <div className='stat'>
                                        <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/6027/6027161.png" alt="" />
                                        <p className='character--stat'>Combat: {current.powerstats.combat}</p>
                                    </div> 
                                       
                                    <div className='alignment'>
                                    {current.biography.alignment==="good" ? 
                                        <p className='character--alignment'>Alignement: SuperHero </p>
                                        : 
                                        <p className='character--alignment'>Alignement: Super Villian</p>
                                    }
                                    {current.biography.alignment==="good" ? 
                                        <img className="character-aligment-icon" src="https://cdn-icons-png.flaticon.com/512/1538/1538455.png" alt="" /> 
                                        : 
                                        <img className="character-aligment-icon" src="https://cdn-icons-png.flaticon.com/512/10/10925.png" alt="" /> 
                                    }
                                    </div>            
                                </div>
                                <div className='character--withInfo'>
                                    <img src={current.images.md} alt="logo" className='character--img'/>
                                    <p className='character--name'>{current.name}</p>
                                    <p className='character--fullname'>{current.biography.fullName}</p>
                                    
                                    
                                </div>
                                <div className='stats-right'>
                                    <div className='stat'>
                                        
                                        {current.work.occupation[0] === '-' ?
                                            <div className='character--stat-other'>Ocuppations:
                                                <div className='character-occupations'>
                                                    <p>None</p>
                                                </div>
                                            </div>
                                            :
                                            <div className='character--stat-other'>Ocuppations:
                                                {current.work.occupation.map((current, index) => {
                                                    if(index < 3){
                                                        return (
                                                            <div className='character-occupations'>
                                                                <p>{current}</p>
                                                            </div>
                                                        )
                                                    }
                                                    return undefined
                                                })}
                                            </div>
                                        }
                                    </div> 
                                    {current.biography.publisher !== null &&
                                        <div className='stat'>
                                        {(current.biography.publisher === 'Marvel Comics' || current.biography.firstAppearance.includes("X-Men")
                                        || current.biography.firstAppearance.includes("Mutants") || current.biography.firstAppearance.includes("Venom")
                                        || current.name.includes("Thor") || current.name.includes("Hawkeye") || current.name.includes("Ant-Man")
                                        ) &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    
                                                    <img className='character-publisher-logo' src="https://media.tenor.com/yuMS24ShcxQAAAAC/marvel-studios.gif" alt="" />
                                                
                                            </div>
                                        }
                                        {(current.biography.publisher === 'DC Comics' || current.biography.firstAppearance.includes("Batman") 
                                        || current.biography.firstAppearance.includes("Detective Comics") || current.name.includes("Batman") || current.name.includes("Flash")
                                        || current.biography.publisher.includes("Batgirl")) &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo-DC' src="https://media0.giphy.com/media/ensd2k3UXTw2ErdEet/giphy.gif?cid=6c09b952ydv0a23o0yggdx1rf8920swxptjrsa0cmxnp2zsb&rid=giphy.gif&ct=s" alt="" />
                                                
                                            </div>
                                        }
                                        {current.biography.publisher === 'George Lucas' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://www.citypng.com/public/uploads/preview/-51608494060e1tvtjfsry.png" alt="" />
                                                
                                            </div>
                                        }
                                        {current.biography.publisher === 'Dark Horse Comics' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://1000logos.net/wp-content/uploads/2020/09/Dark-Horse-Comics-Logo-1991.png" alt="" />
                                                
                                            </div>
                                        }
                                        {current.biography.publisher === 'Shueisha' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://www.shueisha.co.jp/wp-content/themes/shueisha/image/en/mv/mv_subtitle_01.png" alt="" />
                                               
                                            </div>
                                        }

                                        {current.biography.publisher === 'ABC Studios' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://www.nicepng.com/png/detail/135-1359251_abc-studios-abc-studios-logo-png.png" alt="" />
                                                
                                            </div>
                                        }
                                        {current.biography.publisher === 'Icon Comics' &&
                                            <div className='character--publisher'>Publisher:
                                            
                                                    <img className='character-publisher-logo' src="http://theconventioncollective.com/wp-content/uploads/2018/10/logo-Icon-Comics-Marvel-Comics-imprint.jpg" alt="" />
                                                
                                            </div>
                                        }
                                        {current.biography.publisher === 'NBC - Heroes' &&
                                            <div className='character--publisher'>Publisher:
                                               
                                                    <img className='character-publisher-logo' src="https://i.pinimg.com/originals/58/61/58/5861580619bb38f6a3913578481ec0e2.jpg" alt="" />
                                                
                                            </div>
                                        }

                                        {current.biography.publisher === 'SyFy' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/SYFY_Logo_2020.png/800px-SYFY_Logo_2020.png?20200702203840" alt="" />
                                                
                                            </div>
                                        }

                                        {current.biography.publisher === 'J. K. Rowling' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://www.pngitem.com/pimgs/m/98-988630_jk-rowlings-wizarding-world-logo-hd-png-download.png" alt="" />
                                                
                                            </div>
                                        }

                                        {current.biography.publisher === 'Titan Books' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://images1.the-dots.com/1536879/33081662-10156390140289710-2792200823730339840-n.jpeg?p=squareContained" alt="" />
                                               
                                            </div>
                                        }
                                        {current.biography.publisher === 'Star Trek' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://1000logos.net/wp-content/uploads/2017/06/Star-Trek-Logo.png" alt="" />
                                                
                                            </div>
                                        }
                                        {current.biography.publisher === 'Image Comics' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://i2.wp.com/www.comicsbeat.com/wp-content/uploads/2021/11/image-comics-logo-1.jpeg?fit=2000%2C1069&ssl=1" alt="" />
                                                
                                            </div>
                                        }
                                        {current.biography.publisher === 'J. R. R. Tolkien' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://64.media.tumblr.com/1f17fb10e74fa3e54e3b7f793196ba08/tumblr_n62cpeHfUB1s3bdn5o2_1280.gif" alt="" />
                                               
                                            </div>
                                        }
                                        {current.biography.publisher === 'IDW Publishing' &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/IDW_Publishing_logo.svg/1200px-IDW_Publishing_logo.svg.png" alt="" />
                                                
                                            </div>
                                        }
                                        {(current.biography.publisher === '' || current.biography.publisher === null) &&
                                            <div className='character--publisher'>Publisher:
                                                
                                                    <img className='character-publisher-logo' src="https://images.generation-msx.nl/company/0388910c.png" alt="" />
                                            
                                            </div>
                                        }
                                    </div>
                                    }
                                    <div className='stat'>
                                        <div className='character--stat-other'>First appearance:
                                            <div className='character-occupations'>
                                                {   
                                                    current.biography.firstAppearance !== "-" ?
                                                    <p>{current.biography.firstAppearance}</p>
                                                    :
                                                    <p>Unknown</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    ))
                }
            </div> */


/* BEFORE */


















/* 
const [character, setCharacter] = React.useState({
         name: heroes[number].name,
        images: {md: heroes[number].images.md},
        powerstats: {
            intelligence: heroes[number].powerstats.intelligence,
            strength: heroes[number].powerstats.strength,
            speed: heroes[number].powerstats.speed,
            durability: heroes[number].powerstats.durability,
            power: heroes[number].powerstats.power, 
            combat: heroes[number].powerstats.combat,
        } 
    })


<div className='main'>
                    <div className='character'>
                        <img src={character.images.md} alt="logo" className='character--img'/>
                        <p className='character--name'>{character.name}</p>
                    </div>
                    <div className='stats'>
                        <div className='stat'>
                            <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/1787/1787077.png" alt="" />
                            <p className='character--stat'>Intelligence: {character.powerstats.intelligence}</p>
                        </div>

                        <div className='stat'>
                            <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/1599/1599755.png" alt="" />
                            <p className='character--stat'>Strength: {character.powerstats.strength}</p>
                        </div>

                        <div className='stat'>
                            <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/4357/4357645.png" alt="" />
                            <p className='character--stat'>Speed: {character.powerstats.speed}</p>
                        </div>
                
                        <div className='stat'>
                            <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/2592/2592317.png" alt="" />
                            <p className='character--stat'>Durability: {character.powerstats.durability}</p>
                        </div>

                        <div className='stat'>
                            <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/3103/3103567.png" alt="" />
                            <p className='character--stat'>Power: {character.powerstats.power}</p>
                        </div>

                        <div className='stat'>
                            <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/6027/6027161.png" alt="" />
                            <p className='character--stat'>Combat: {character.powerstats.combat}</p>
                        </div>                
                    </div>
                </div> */



                /* const info = allCharacters.map(charac => {
            const name = charac.name.toLowerCase();
            const nameintro = characterRef.current.value.toLowerCase();
            const result = name.includes(nameintro)

            for (let i = 0; i < already.length; i++) {
                if (already[i].name==charac.name) {
                    itis = true;
                }
            }

            if (result===true) {
                const itis = false;
                
                
                console.log(already)

                if(itis==false){
                    setCharacter({
                        name: charac.name,
                        images: {md: charac.images.md},
                        powerstats: {
                            intelligence: charac.powerstats.intelligence,
                            strength: charac.powerstats.strength,
                            speed: charac.powerstats.speed,
                            durability: charac.powerstats.durability,
                            power: charac.powerstats.power, 
                            combat: charac.powerstats.combat,
                        }
                    })
                }
            } 
        }) */





/* md, lg */

/* <div className='main'>
            <div className='character'>
            <img src={character.images.md} alt="logo" className='character--img'/>
            <p className='character--name'>{character.name}</p>
            
            <button
                className='character--button'
                onClick={setNewCharacter}
            >
                Change character
            </button>
        </div>
        <div className='stats'>
            <div className='stat'>
                <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/1787/1787077.png" alt="" />
                <p className='character--stat'>Intelligence: {character.powerstats.intelligence}</p>
            </div>

            <img className="stat-logo" src="" alt="" />
            <p className='character--stat'>Strength: {character.powerstats.strength}</p>

            <img className="stat-logo" src="" alt="" />
            <p className='character--stat'>Speed: {character.powerstats.speed}</p>

            <img className="stat-logo" src="" alt="" />
            <p className='character--stat'>Durability: {character.powerstats.durability}</p>

            <img className="stat-logo" src="" alt="" />
            <p className='character--stat'>Power: {character.powerstats.power}</p>

            <img className="stat-logo" src="" alt="" />
            <p className='character--stat'>Combat: {character.powerstats.combat}</p>
        </div>
        </div> */





        /*  <div className='character'>
            <img src={character.images.md} alt="logo" className='character--img'/>
            <p className='character--name'>{character.name}</p>
            <div className='stats'>
                <div className='stat'>
                    <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/1787/1787077.png" alt="" />
                    <p className='character--stat'>Intelligence: {character.powerstats.intelligence}</p>
                </div>

                <div className='stat'>
                    <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/1599/1599755.png" alt="" />
                    <p className='character--stat'>Strength: {character.powerstats.strength}</p>
                </div>

                <div className='stat'>
                    <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/1267/1267761.png" alt="" />
                    <p className='character--stat'>Speed: {character.powerstats.speed}</p>
                </div>
        
                <div className='stat'>
                    <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/2592/2592317.png" alt="" />
                    <p className='character--stat'>Durability: {character.powerstats.durability}</p>
                </div>

                <div className='stat'>
                    <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/3103/3103567.png" alt="" />
                    <p className='character--stat'>Power: {character.powerstats.power}</p>
                </div>

                <div className='stat'>
                    <img className="stat-logo" src="https://cdn-icons-png.flaticon.com/512/2277/2277272.png" alt="" />
                    <p className='character--stat'>Combat: {character.powerstats.combat}</p>
                </div>                

            </div>
            <button
                className='character--button'
                onClick={setNewCharacter}
            >
                Change character
            </button>
        </div> */