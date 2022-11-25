import React, { useEffect, useRef, useState } from 'react'
import FilterBar from './FilterBar';
import CharacterInfo from './CharacterInfo'
import axios from 'axios'
import 'animate.css';


function Character() {
    const [allCharacters, setAllCharacters] = useState([]);
    const [initialCharacters, setInitialCharacters] = useState([])
    const [firstLoad, setFirstLoad] = useState(false)

    const [hiddeChacters, setHiddeCharacters] = useState(false)
    const [hiddeChacter, setHiddeCharacter] = useState(true)
    const [character, setCharacter] = React.useState([])
    const characterRef = useRef('')

    const [imageSize, setImageSize] = React.useState(false)

    const [filterSystemButtons, setFilterSystemButtons] = useState(false)
    const [howManyRef, setHowManyRef] = React.useState(6)
    const [bycomics, setBycomics] = React.useState(false)
    const [side, setSide] = useState("All")
    const [universe, setUniverse] = useState("All")
    const [team, setTeam] = useState("All")

    const [selectedStat, setSelectedStat] = useState("Powerstats")


    useEffect(() => {
        axios.get("https://heroes-backend.onrender.com")
        .then(res => {
            let dataOrganized = res.data.sort((a,b) => {
                let fa = a.name.toLowerCase() 
                let fb = b.name.toLowerCase()

                if (fa < fb){
                    return -1
                }
                if (fa > fb) {
                    return 1
                }
                return 0
            })
            setAllCharacters(dataOrganized) // the data is sorted by names
        })
    }, [])

    useEffect(() => {
        let arr = allCharacters
        
        let selectedOnes = []
        let result = []
        if (bycomics === true) {
            allCharacters.forEach((current) => {
                if (current.comics !== undefined) {
                    result.push(current)
                }
            })
        }else{
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
        }

        if (howManyRef > 0 && howManyRef !== "" && bycomics !== true) {
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

        if (team === "All" && side === "All" && universe === "All" && bycomics !== true) {
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

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        delayTheApp(result)
        
        
    }, [side, universe, team, bycomics, howManyRef, allCharacters])

    function delayTheApp(result){
        if (result[0] !== undefined && firstLoad === false) {
            setFirstLoad(true)
            setInitialCharacters(result)
            console.log('ok')
        }else{
            if (hiddeChacters === false && hiddeChacter === true)  {
                setTimeout(() => {
                    setHiddeCharacters(true)
                    setInitialCharacters(result)
                }, 300);
        
                setTimeout(() => {
                    setHiddeCharacters(false)
                }, 500);
                
            }else{
                setInitialCharacters(result)
            }
        }
        
    }
    
    function changeBySide(event){
        setSide(event.target.value)
        setBycomics(false)
        if (universe === "All" && team === "All") {
            setHowManyRef(6)
        }
    }

    function changeByUniverse(event){
        setTeam("All")
        setUniverse(event.target.value)
        setBycomics(false)
    }

    function changeByTeam(event){   
        setTeam(event.target.value)
        if (event.target.value !== "All") {
            setHowManyRef("")
        }
        setBycomics(false)
    }

    function changeHowMany(event){
        setHowManyRef(event.target.value)
        setBycomics(false)
    }

    function changeByComics(){
        setBycomics(true)
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
                img = "https://bestanimations.com/media/star-wars/1037554235star-wars-animated-gif-32.gif"
            break;

            case 'IDW Publishing':
                img ="https://static.wikia.nocookie.net/silent/images/8/85/Idwlogo.png" 
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
        delayTheApp(charactersArr)
        // setHiddeCharacters(false)
        // setHiddeCharacter(true)
        // setSide("All")
        // setUniverse("All")
        // setTeam("All")
        // setHowManyRef("")
        
    }

    function findByNameClick(idSended){
        setHiddeCharacters(true)
        setHiddeCharacter(false)
        if (filterSystemButtons === false) {
            characterRef.current.value = ""
        }
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

                let alteregos
                if(charac.biography.alterEgos !== "No alter egos found."){
                    alteregos = charac.biography.alterEgos.split(",")
                }else{
                    alteregos = ["-"]
                }

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
        
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setCharacter(charactersArr)
    }

    function changeFilter(){
        setFilterSystemButtons(prevValue => !prevValue)
    }

    function getBack(){
        setHiddeCharacters(false)
        setHiddeCharacter(true)
        // setImageSize(false)
        // setUniverse("All")
        // setBycomics(false)
    }

    // console.log(initialCharacters)

    return (
        <div className='character-module'>
            {
                hiddeChacter === true &&
                <FilterBar 
                    characterRef={characterRef}
                    findByName={findByName}
                    changeFilter={changeFilter}
                    changeByComics={changeByComics}
                    howManyRef={howManyRef}
                    changeHowMany={changeHowMany}
                    changeBySide={changeBySide}
                    changeByTeam={changeByTeam}
                    changeByUniverse={changeByUniverse}
                    team={team}
                    universe={universe}
                    side={side}
                    filterSystemButtons={filterSystemButtons}
                />
            }
            
                
            {
                (hiddeChacters === false && initialCharacters[0] !== undefined) &&
                <div className='characters--container'>
                    {
                        initialCharacters.map((current, index)=> (
                            /* <Fade top cascade key={index}> */
                                <div key={index} className={`animate__animated animate__zoomIn character`} /* className={`animate__animated animate__zoomIn animate__delay-${index}s character`} */  onClick={() => findByNameClick(current.id)}>
                                    <div className='character--img--container'>
                                        <img className='character--img' src={current.images.md} alt="logo" />
                                    </div>
                                    <p className='character--name'>{current.name}</p>
                                </div>
                            /* </Fade> */
                        ))
                    }
                </div>
            }

            {
                (hiddeChacters === true && initialCharacters[0] === undefined && firstLoad === true) &&
                /* <div className='character--container--withInfo'> */
                    <div className='character--withInfo-unknown'>
                        <img className='animate__animated animate__fadeIn character--withInfo--img--unknown'  src="https://www.pngitem.com/pimgs/m/52-526033_unknown-person-icon-png-transparent-png.png" alt="logo" />                                                    
                        <p className='animate__animated animate__fadeIn animate__delay-1s character--withInfo--unknown--info'>Sorry but we dont have that character </p>
                    </div>
                /* </div> */
            }
                

            {
                hiddeChacter === false &&
                <div className='character--container--withInfo'>
                    {
                        character.length !== 0 &&
                        character.map((current, index)=> (
                            <CharacterInfo 
                                current={current}
                                index={index}
                                imageSize={imageSize}
                                setImageSize={setImageSize}
                                getBack={getBack}
                                selectedStat={selectedStat}
                                changeStat={changeStat}
                            />
                            
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default Character;



// /* VARIABLES */

// --background-general: black;

// --header-background: rgb(7, 7, 7);
// --header-text: white;

// /* --background-find-container: rgb(29, 29, 36); */
// --background-find-container: rgba(0, 0, 0, 0);

// --character-textbox-first: rgba(0, 0, 0, 0.788);
// --character-textbox-second: rgb(4, 13, 31);
// --input-howMany-border-color: white;

// --character-button-first: rgb(0, 0, 0);
// --character-button-second: rgb(4, 13, 31);

// --button-color: rgb(255, 255, 255);
// --finder--border: white;

// /* --character-box-first: rgb(15,15,50);
// --character-box-second: gray; */
// --character-box-first: rgba(0, 0, 0, 0);
// --character-box-second: rgb(5, 5, 19);


// --character--name-color: white /* black */;

// --character--withInfo--name-color: white;
// --character--withInfo--fullname-color: white;
// --character--withInfo--alignment-color: white;

// /* --character--withInfo-background: rgba(101, 101, 101, 0);*/
// --character--withInfo-background: rgba(7, 0, 0, 0);

// --character--withInfo--statSelectors-background: rgb(3, 3, 8);
// --statSelectors-color: rgb(23, 49, 85);
// --statSelectors-selected-color: rgb(33, 87, 248);

// /* --character--withInfo--info-background: rgb(16, 14, 43);  */
// --character--withInfo--info-background: rgba(16, 14, 43, 0.342);

// --stat-info-color: white;