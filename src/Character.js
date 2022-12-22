import React, { useEffect, useRef, useState } from 'react'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import FilterBar from './FilterBar';
import CharacterInfo from './CharacterInfo'
import Loading from './Loading';
import Error from './Error';
import axios from 'axios'
import 'animate.css';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const queryClient = new QueryClient()

function Character() {
    const [initialCharacters, setInitialCharacters] = useState([])
    const [firstLoad, setFirstLoad] = useState(false)

    const [hiddeChacters, setHiddeCharacters] = useState(false)
    const [hiddeChacter, setHiddeCharacter] = useState(true)

    const [filterSystemButtons, setFilterSystemButtons] = useState(false)

    const characterRef = useRef('')
    
    const [howMany, setHowMany] = useState(6)
    const howManyRef = useRef()

    const [bycomics, setByComics] = useState(false)
    const byComicsRef = useRef()

    const [side, setSide] = useState("All")
    const sideRef = useRef()
    const [universe, setUniverse] = useState("All")
    const universeRef = useRef()
    const [team, setTeam] = useState("All")
    const teamRef = useRef()

    const [character, setCharacter] = React.useState([])
    const [imageSize, setImageSize] = React.useState(false)
    const [selectedStat, setSelectedStat] = useState("Powerstats")
    const [lastWindowPosition, setLastWindowPosition] = useState() 

    const { isLoading, error, data } = useQuery('data', () => {
        return axios.get("https://heroes-backend.onrender.com")
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
            return dataOrganized
        })
    })

    // find a way get the localstorage data at the beginning in react without useEffect hook
    useEffect(() => {
        const saveSide = localStorage.getItem('side')
        const saveUniverse = localStorage.getItem('universe')
        const saveTeam = localStorage.getItem('team')
        const saveByComics = localStorage.getItem('bycomics')
        const saveHowMany = localStorage.getItem('howMany')
        const savefilterSystemButtons = localStorage.getItem('filterButtons')

        console.log("saveSide", saveSide)
        console.log("saveUniverse", saveUniverse)
        console.log("saveTeam", saveTeam)
        console.log("saveByComics", saveByComics)
        console.log("saveHowMany", saveHowMany)
        console.log("savefilterSystemButtons",savefilterSystemButtons)


        if (saveSide !== undefined && saveSide !== null) {
            setSide(saveSide)
        }
        if (saveUniverse !== undefined || saveUniverse !== null) {
            setUniverse(saveUniverse)
        }  
        if (saveTeam !== undefined && saveTeam !== null) {
            setTeam(saveTeam)
        }
        if (saveByComics !== undefined && saveByComics !== null) {
            const isTrueSet = (saveByComics === 'true')
            setByComics(isTrueSet)
        }
        if (saveHowMany !== undefined && saveHowMany !== null) {
            setHowMany(saveHowMany)
        }
        if (savefilterSystemButtons !== undefined && savefilterSystemButtons !== null) {
            const isTrueSet = (savefilterSystemButtons === 'true')
            setFilterSystemButtons(isTrueSet)
        }
    }, [data])

    function getCharacters(type, event){
        switch(type){
            case "side":
                setByComics(false)
                setSide(event.target.value)
                if (universeRef.current === "All" && teamRef.current === "All") {
                    howManyRef.current = 6
                }
            break;

            case "universe":
                setUniverse(event.target.value)
                // teamRef.current.value = "All"
                setByComics(false)
            break;

            case "team":
                setTeam(event.target.value)
                if (teamRef.current.value !== "All") {
                    setHowMany("")
                }
                setByComics(false)
            break;

            case "how":
                setByComics(false)
                setHowMany(event.target.value)
            break;

            default:

            break;
        }


        // FOR TESTING PURPOSES
        // console.log("---------------------------")
        // console.log("howmanyref", howManyRef.current.value)
        // console.log("side", sideRef.current.value)
        // console.log("universe", universeRef.current.value)
        // console.log("teamRef.current", teamRef.current)
        // if (teamRef.current !== undefined && teamRef.current !== null) {
        //     console.log("team", teamRef.current.value)
        // }
        // console.log("---------------------------")
        

        let selectedOnes = []
        let result = []
        if (bycomics === true) {
            data.forEach((current) => {
                if (current.comics !== undefined) {
                    result.push(current)
                }
            })
        }else{
            if ((teamRef.current !== undefined && teamRef.current !== null) && teamRef.current.value !== "All") { 
                data.forEach((current, index) => {
                    if (current.connections.groupAffiliation.includes(teamRef.current.value)) {
                        if (sideRef.current.value === "All" && universeRef.current.value === "All") {
                            selectedOnes.push(index)
                            result.push(current)
                        }else if (sideRef.current.value === 'All' && universeRef.current.value !== "All" && (current.biography.publisher === universeRef.current.value)) {
                            selectedOnes.push(index)
                            result.push(current)
                        }else if (sideRef.current.value !== 'All' && universeRef.current.value === "All" && (current.biography.alignment === sideRef.current.value)) {
                            selectedOnes.push(index)
                            result.push(current)
                        }else {
                            if (current.biography.alignment === sideRef.current.value && current.biography.publisher === universeRef.current.value) {
                                selectedOnes.push(index)
                                result.push(current)
                            }
                        }   
                    }
                }) 
            }else{
                data.forEach((current, index) => {
                    if (sideRef.current.value === "All" && universeRef.current.value === "All") {
                        selectedOnes.push(index)
                        result.push(current)
                    }else if (sideRef.current.value === 'All' && universeRef.current.value !== "All") {
                        if (current.biography.publisher === universeRef.current.value) {
                            selectedOnes.push(index)
                            result.push(current)
                        }
                    }else if (sideRef.current.value !== 'All' && universeRef.current.value === "All") {
                        if (current.biography.alignment === sideRef.current.value) {
                            selectedOnes.push(index)
                            result.push(current)
                        }
                    }else /* if (side !== "All" && universe !== "All" && teams !== "All") */ {
                        if (current.biography.alignment === sideRef.current.value && current.biography.publisher === universeRef.current.value) {
                            selectedOnes.push(index)
                            result.push(current)
                        }
                    }
                })
            }
        }

        if ((howManyRef.current.value > 0 || howManyRef.current.value !== "") && bycomics !== true) {
            let finalSelectedIntex = []
            for(let i = 0; i < howManyRef.current.value; i++){
                finalSelectedIntex.push(selectedOnes[Math.floor(Math.random()*selectedOnes.length)])
            } 
            result = []
            data.forEach((current, index) => {
                if (finalSelectedIntex.includes(index)) {
                    result.push(current)
                }
            })
        }

        // if ((teamRef.current === undefined || teamRef.current === "All") && sideRef.current.value === "All" && universeRef.current.value === "All" && bycomics !== true && (howManyRef.current.value < 0 || howManyRef.current.value === "")) {
        if (((teamRef.current === undefined || teamRef.current === null) || teamRef.current.value === "All") && sideRef.current.value === "All" && universeRef.current.value === "All" && bycomics !== true && (howManyRef.current.value < 0 || howManyRef.current.value === "")) {
            let finalSelectedIntex = []
            for(let i = 0; i < 6; i++){
                finalSelectedIntex.push(selectedOnes[Math.floor(Math.random()*selectedOnes.length)])
            } 

            result = []
            data.forEach((current, index) => {
                if (finalSelectedIntex.includes(index)) {
                    result.push(current)
                }
            })
        }

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        setInitialCharacters(result)

        localStorage.setItem('side', side)
        if (universe === null) {
            localStorage.setItem('universe', "All")
        }else{
            localStorage.setItem('universe', universe)
        }
        
        if (teamRef.current !== undefined && teamRef.current !== null) {
            localStorage.setItem('team', teamRef.current.value)
        }

        localStorage.setItem('bycomics', bycomics)
        localStorage.setItem('howManyRef', howManyRef.current.value)
        localStorage.setItem('filterButtons', filterSystemButtons)
    }

    function changeByComics(){
        setByComics(prev => !prev)
        getCharacters("comics", "Nothing here")
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

            case "Shueisha":
                img = "https://static.wikia.nocookie.net/logopedia/images/5/5f/Shueisha_Logo_with_English_text.png/revision/latest?cb=20211106075538"
            break;
        
            default:
                img = "https://images.generation-msx.nl/company/0388910c.png"
            break;
        }
        return img
    }
    
    function findByName(){
        const charactersArr = []
        let names 

        if (characterRef.current.value.includes(",")) {
            names = characterRef.current.value
            .split(",")
            .map(current => current.trim())
        }else{
            names = [characterRef.current.value]
        }

        names.forEach((currentName) => {
            data.map(charac => {
                const name = charac.name.toLowerCase();
                const nameintro = currentName.toLowerCase();
                // const result = name.includes(nameintro)
                const result = name === nameintro
    
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
        })

        for (let i = charactersArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [charactersArr[i], charactersArr[j]] = [charactersArr[j], charactersArr[i]];
        }
        setTimeout(() => {
            setHiddeCharacters(true)
            setInitialCharacters(charactersArr)
        }, 300);

        setTimeout(() => {
            setHiddeCharacters(false)
        }, 500);

        setTimeout(() => {
            if (charactersArr[0] === undefined && characterRef.current.value !== "") {
                setFirstLoad(true)
            }
            // setIsloading(false)
        }, 800)

        // delayTheApp(charactersArr)
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
        data.map(charac => {
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

                let alteregos = []
                if (charac.biography.alterEgos !== undefined) {
                    if((charac.biography.alterEgos !== "No alter egos found." || charac.biography.alterEgos !== "-") && charac.biography.alterEgos.includes(",")){
                        alteregos = charac.biography.alterEgos.split(",")
                    }else{
                        alteregos = ["-"]
                    }
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
                        case "Shueisha":
                            comics = [
                                "https://cdn.animenewsnetwork.com/hotlink/thumbnails/max1000x1500/cms/interest/134237/jump_1833_fixw_640_hq.jpg",
                                "https://cdn.animenewsnetwork.com/hotlink/thumbnails/max1000x1500/cms/interest/134237/jump_1833_fixw_640_hq.jpg",
                                "https://cdn.animenewsnetwork.com/hotlink/thumbnails/max1000x1500/cms/interest/134237/jump_1833_fixw_640_hq.jpg",
                                "https://cdn.animenewsnetwork.com/hotlink/thumbnails/max1000x1500/cms/interest/134237/jump_1833_fixw_640_hq.jpg"
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
                    publisherIMG: getPublisherImg(charac.biography.publisher),
                    // boxShadowColor: getAverageRGB(charac.images.md)
                })
            }
            return charac // esto es innecesario
             
        })

        setLastWindowPosition(window.pageYOffset)

        setCharacter(charactersArr)

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function getBack(){
        setHiddeCharacters(false)
        setHiddeCharacter(true)
        setImageSize(false)
        // setUniverse("All")
        // setBycomics(false)

        window.scrollTo({
            top: lastWindowPosition,
            behavior: "smooth"
        });
    }

    return (
        <div className='character-module'>
            <QueryClientProvider client={queryClient}>
                {
                    hiddeChacter === true &&
                    <FilterBar 
                        characterRef={characterRef}
                        team={team}
                        teamRef={teamRef}
                        universe={universe}
                        universeRef={universeRef}
                        side={side}
                        sideRef={sideRef}
                        howMany={howMany}
                        howManyRef={howManyRef}
                        filterSystemButtons={filterSystemButtons}
                        getCharacters={getCharacters}
                        findByName={findByName}
                        setFilterSystemButtons={setFilterSystemButtons}
                        changeByComics={changeByComics}
                        byComicsRef={byComicsRef}                        
                    />
                }
                
                {(error) && 
                    <Error
                        error={error}
                    />
                }

                {(isLoading) && 
                    <Loading/>
                }
                    
                {
                    isLoading === false &&
                    (hiddeChacters === false && initialCharacters[0] !== undefined) &&
                    // <AnimationOnScroll initiallyVisible={false} animateIn={"animate__fadeIn"} animateOut={"animate__fadeOut"} duration={2}>
                        <div className='characters--container'>
                            {
                                initialCharacters.map((current, index)=> (
                                    // <AnimationOnScroll key={index} initiallyVisible={true} animateIn={"animate__flip"} animateOut={"animate__fadeOut"} duration={2}>
                                        <div key={index} className={`animate__animated animate__fadeIn character`} onClick={() => findByNameClick(current.id)}>
                                            <div className='character--img--container'>
                                                <img className='character--img' src={current.images.md} alt="logo" />
                                            </div>
                                            <p className='character--name'>{current.name}</p>
                                        </div>
                                    // </AnimationOnScroll>
                                ))
                            }
                        </div>
                    // </AnimationOnScroll>
                }

                {
                    isLoading === false &&
                    (hiddeChacters === false && initialCharacters[0] === undefined && firstLoad === true) &&
                    <div className='character--withInfo-unknown'>
                        <img className='animate__animated animate__fadeIn character--withInfo--img--unknown'  src="https://www.pngitem.com/pimgs/m/52-526033_unknown-person-icon-png-transparent-png.png" alt="logo" />                                                    
                        <p className='animate__animated animate__fadeIn animate__delay-1s character--withInfo--unknown--info'>Sorry but we dont have that character </p>
                    </div>
                }
                    

                {
                    isLoading === false &&
                    (hiddeChacter === false) &&
                    <div className='character--container--withInfo'>
                        {
                            character.length !== 0 &&
                            character.map((current, index)=> (
                                <CharacterInfo 
                                    current={current}
                                    key={index}
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
            </QueryClientProvider>
        </div>
    );
}

export default Character;



// useEffect(() => {
    //     const saveSide = localStorage.getItem('side')
    //     const saveUniverse = localStorage.getItem('universe')
    //     const saveTeam = localStorage.getItem('team')
    //     const saveByComics = localStorage.getItem('bycomics')
    //     const saveHowManyRef = localStorage.getItem('howManyRef')
    //     const savefilterSystemButtons = localStorage.getItem('filterButtons')
    //     if (saveSide !== undefined && saveSide !== null) {
    //         setSide(saveSide)
    //     }
    //     if (saveUniverse !== undefined || saveUniverse !== null) {
    //         setUniverse(saveUniverse)
    //     }  
    //     if (saveTeam !== undefined && saveTeam !== null) {
    //         setTeam(saveTeam)
    //     }
    //     if (saveByComics !== undefined && saveByComics !== null) {
    //         const isTrueSet = (saveByComics === 'true')
    //         setBycomics(isTrueSet)
    //     }
    //     if (saveHowManyRef !== undefined && saveHowManyRef !== null) {
    //         setHowManyRef(saveHowManyRef)
    //     }
    //     if (savefilterSystemButtons !== undefined && savefilterSystemButtons !== null) {
    //         const isTrueSet = (savefilterSystemButtons === 'true')
    //         setFilterSystemButtons(isTrueSet)
    //     }
    //     getCharacters()
    // }, [])



    /* 
    // setIsloading(true)

    // localStorage.setItem('side', side)
    // if (universe === null) {
    //     localStorage.setItem('universe', "All")
    // }else{
    //     localStorage.setItem('universe', universe)
    // }
    // localStorage.setItem('team', team)
    // localStorage.setItem('bycomics', bycomics)
    // localStorage.setItem('howManyRef', howManyRef)
    // localStorage.setItem('filterButtons', filterSystemButtons) */