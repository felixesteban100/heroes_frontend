import React, { useEffect, useState } from 'react'
// import Carousel from './Carousel.js'
import Carousel3d from './Carousel3d';
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
        if (allCharacters[0] === undefined) {
            // axios.get("http://localhost:3001/") // change the url to the one deploy in the web, and then deploy this frontend(push origin main)
            axios.get("https://heroes-backend.onrender.com")
            .then(res => setAllCharacters(res.data.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase())))
        }
        // if (allCharacters[0] !== undefined) {
            // look how to sort an array of objects javascript
            let arr = allCharacters
            // arr.filter(current => current !== undefined)
            // arr.forEach(current => console.log(current.name))
            
            let selectedOnes = []
            let result = []
            if (team !== "All") { 
                result = []
                
                arr.forEach((current, index) => {
                    if (current.connections.groupAffiliation.includes(team)) {
                        if (side === "All" && universe === "All") {
                            selectedOnes.push(index)
                            result.push(current)
                        }else if (side === 'All' && universe !== "All" && (current.biography.publisher === universe)) {
                            selectedOnes.push(index)
                            result.push(current)
                        }else if (side !== 'All' && universe === "All" && (current.biography.alignment === side)) {
                            selectedOnes.push(index)
                            result.push(current)
                        }else {
                            if (current.biography.alignment === side && current.biography.publisher === universe) {
                                selectedOnes.push(index)
                                result.push(current)
                            }
                        }   
                    }
                }) 
            }else{
                result = []
                arr.forEach((current, index) => {
                    if (side === "All" && universe === "All") {
                        selectedOnes.push(index)
                        result.push(current)
                    }else if (side === 'All' && universe !== "All") {
                        if (current.biography.publisher === universe) {
                            selectedOnes.push(index)
                            result.push(current)
                        }
                    }else if (side !== 'All' && universe === "All") {
                        if (current.biography.alignment === side) {
                            selectedOnes.push(index)
                            result.push(current)
                        }
                    }else /* if (side !== "All" && universe !== "All" && teams !== "All") */ {
                        if (current.biography.alignment === side && current.biography.publisher === universe) {
                            selectedOnes.push(index)
                            result.push(current)
                        }
                    }
                })
            }

            if (howManyRef > 0 && howManyRef !== "") {
                let finalSelectedIntex = []
                for(let i = 0; i < howManyRef; i++){
                    finalSelectedIntex.push(selectedOnes[Math.floor(Math.random()*selectedOnes.length)])
                } 

                result = []
                arr.forEach((current, index) => {
                    if (finalSelectedIntex.includes(index)) {
                        result.push(current)
                    }
                })
            }

            if (team === "All" && side === "All" && universe === "All") {
                let finalSelectedIntex = []
                for(let i = 0; i < 6; i++){
                    finalSelectedIntex.push(selectedOnes[Math.floor(Math.random()*selectedOnes.length)])
                } 

                result = []
                arr.forEach((current, index) => {
                    if (finalSelectedIntex.includes(index)) {
                        result.push(current)
                    }
                })
            }
            // console.log(result)
            // console.log(result.map(current => console.log(current.name, ":", current.connections.groupAffiliation)))
            setInitialCharacters(result)
        // }

    }, [side, universe, team, howManyRef, allCharacters])


    function changeBySide(event){
        setSide(event.target.value)
    }

    function changeByUniverse(event){
        if (event.target.value === "All") {
            setTeam("All")
        }
        setUniverse(event.target.value)
    }

    function changeByTeam(event){   
        setTeam(event.target.value)
        if (event.target.value !== "All") {
            setHowManyRef("")
        }
    }

    function changeHowMany(event){
        setHowManyRef(event.target.value)
    }

    function changeStat(event){
        setSelectedStat(event.target.outerText)
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
        allCharacters.map(charac => {
            const name = charac.name.toLowerCase();
            const nameintro = characterRef.current.value.toLowerCase();
            const result = name.includes(nameintro)

            if (result===true) {
                charactersArr.push({
                    id: charac.id,
                    name: charac.name,
                    images: {
                        xs: charac.images.xs,
                        sm: charac.images.sm,
                        md: charac.images.md,
                        lg: charac.images.lg
                    },
                    comics: charac.comics,
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
                        relatives: charac.connections.relatives
                    },
                    publisherIMG: getPublisherImg(charac.biography.publisher)
                })
            }
            return result // esto es innecesario
             
        })
        setInitialCharacters(charactersArr)
        setHiddeCharacters(false)
        setHiddeCharacter(true)
        // setSide("All")
        // setUniverse("All")
        // setTeam("All")
        // setHowManyRef("")
    }

    function findByNameClick(idSended){
        // console.log(idSended)
        characterRef.current.value = ""
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

                let comics = []
                if (charac.comics !== undefined) {
                    comics = charac.comics
                }else{
                    switch(charac.biography.publisher){
                        case "Marvel Comics":
                            comics = [
                                "https://i.annihil.us/u/prod/marvel/i/mg/5/04/5d5d4cbf869ff/clean.jpg",
                                "https://i.annihil.us/u/prod/marvel/i/mg/5/04/5d5d4cbf869ff/clean.jpg",
                                "https://i.annihil.us/u/prod/marvel/i/mg/5/04/5d5d4cbf869ff/clean.jpg",
                                "https://i.annihil.us/u/prod/marvel/i/mg/5/04/5d5d4cbf869ff/clean.jpg"
                            ]
                        break;
                        case "DC Comics":
                            comics = [
                                "http://www.moviepostersetc.com/_staticProxy/content/ff808081163c05b001169d6655243ae9/Justice_League_of_America_poster_Issue_1.jpg",
                                "http://www.moviepostersetc.com/_staticProxy/content/ff808081163c05b001169d6655243ae9/Justice_League_of_America_poster_Issue_1.jpg",
                                "http://www.moviepostersetc.com/_staticProxy/content/ff808081163c05b001169d6655243ae9/Justice_League_of_America_poster_Issue_1.jpg",
                                "http://www.moviepostersetc.com/_staticProxy/content/ff808081163c05b001169d6655243ae9/Justice_League_of_America_poster_Issue_1.jpg"
                            ]
                        break;
                        default:
                            comics = [
                                "https://img.freepik.com/free-vector/comics-poster-template_225004-800.jpg?w=2000",
                                "https://img.freepik.com/free-vector/comics-poster-template_225004-800.jpg?w=2000",
                                "https://img.freepik.com/free-vector/comics-poster-template_225004-800.jpg?w=2000",
                                "https://img.freepik.com/free-vector/comics-poster-template_225004-800.jpg?w=2000"
                            ]
                        break;
                    }
                }

                charactersArr.push({
                    // charac
                    id: charac.id,
                    name: charac.name,
                    images: {
                        xs: charac.images.xs,
                        sm: charac.images.sm,
                        md: charac.images.md,
                        lg: charac.images.lg
                    },
                    comics: comics,
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
                        relatives: charac.connections.relatives
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

                <input className='input-howMany' type="number" name="howMany" id="" value={howManyRef} onChange={event => changeHowMany(event)} placeholder={(team !== "All" || universe !== "All" || side !== "All" || characterRef !== "") ? 'All' : 6} max={100} min={0}/>

                <select className='select-category' name="" id="" onChange={event => changeBySide(event)}>
                    <option value="All">All sides</option>
                    <option value="good">Hero 🦸‍♂️</option>
                    <option value="bad">Villain 🦹‍♂️</option>
                    <option value="neutral">Anti-hero 🦸‍♂️🦹‍♂️</option>
                </select>

                <select className='select-category' name="" id="" onChange={event => changeByUniverse(event)}>
                    <option className='all' value="All">All universes</option>
                    <option className='marvel' value="Marvel Comics">Marvel</option>
                    <option className='dc' value="DC Comics">DC</option>
                    <option className='dark-horse' value="Dark Horse Comics">Dark Horse Comics</option>
                    <option className='george-lucas' value="George Lucas">George Lucas</option>
                    <option className='shueisha' value="Shueisha">Shueisha</option>
                    <option className='idwPublishing' value="IDW Publishing">IDW Publishing</option>
                    
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
                        <option value="Fantastic Four(Original)">Fantastic Four Original</option>
                        <option value="Sinister Six">Sinister Six</option>
                        <option value="Midnight Sons">Midnight Sons</option>
                        <option value="Heroes For Hire">Heroes For Hire</option>
                        <option value="Thunderbolts">Thunderbolts</option>
                        <option value="Hulk Family">Hulk Family</option>
                        <option value="Brotherhood of Evil Mutants">Brotherhood of Evil Mutants</option>
                        <option value="Black Order">Black Order</option>
                        <option value="Spider-Army">Spider-Army</option>
                        <option value="Dark Avengers">Dark Avengers</option>
                        {/* Hydra */}
                        {/* Young Avengers */}
                    </select>
                }

                {
                    universe === "DC Comics" &&
                    <select className='select-category' name="" id="" onChange={event => changeByTeam(event)}>
                        <option value="All">All Teams</option>
                        <option value="Justice League">Justice League</option>
                        <option value="Suicide Squad">Suicide Squad</option>
                        <option value="Teen Titans">Teen Titans</option>
                        <option value="Green Lantern Corps">Green Lantern Corps</option>
                        <option value="Batman Family">Batman Family</option>
                        <option value="Flash Family">Flash Family</option>
                        <option value="Justice League Dark">Justice League Dark</option>
                        <option value="Crimebusters">Crimebusters / Watchmen</option>
                        <option value="Legion of Super-Heroes">Legion of Super-Heroes</option>
                        <option value="Assorted Batman rogues">Assorted Batman rogues</option>
                        <option value="Injustice">Injustice League</option>
                        <option value="Birds of Prey">Birds of Prey</option>
                        <option value="Secret Society of Super Villains">Secret Society of Super Villains</option>
                        <option value="Marvel Family">Marvel Family</option>
                        <option value="Aquaman Family">Aquaman Family</option>
                        
                        {/* Aquaman Family */}
                        {/* Legion of Super-Villains */}
                        {/* Justice Society of America */}
                    </select>
                }

                {
                    universe === "Dark Horse Comics" &&
                    <select className='select-category' name="" id="" onChange={event => changeByTeam(event)}>
                        <option value="All">All Teams</option>
                        <option value="Incredible Family">Incredible Family</option>
                    </select>
                }

                {
                    universe === "IDW Publishing" &&
                    <select className='select-category' name="" id="" onChange={event => changeByTeam(event)}>
                        <option value="All">All Teams</option>
                        <option value="Teenage Mutant Ninja Turtles">Teenage Mutant Ninja Turtles</option>
                    </select>
                }
            </div>
            
            {/* characters--container */}
            {
                hiddeChacters === false && initialCharacters.length !== 0 &&
                <div className='characters--container'>
                    {
                        hiddeChacters === false && initialCharacters.length !== 0 &&
                        initialCharacters.map((current, index)=> {
                            return (
                                <div key={index} className='character' onClick={() => findByNameClick(current.id)}>
                                    <img className='character--img' src={current.images.md} alt="logo" />
                                    <p className='character--name'>{current.name}</p>
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
                    character.map((current, index)=> (
                        <div>
                            <div className='button-back' onClick={getBack}>
                                <img className='button-back-img' src="https://cdn-icons-png.flaticon.com/512/5708/5708793.png" alt="" />
                            </div>

                            <div key={index} className='character--withInfo'>
                                <img className='character--withInfo--img' src={current.images.md} alt="logo" />
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
                            </div>
                            <div className='character--withInfo'>
                                <p className='character--withInfo--name'>Comics</p>
                            </div>
                            <Carousel3d 
                                comics={current.comics}
                            />
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
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Character;
