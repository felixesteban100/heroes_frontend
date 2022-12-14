import React, { /* useCallback, useEffect, */ useRef, useState } from 'react'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import FilterBar from '../components/FilterBar';
import CharacterInfo from '../components/CharacterInfo'
import Loading from '../components/Loading';
import Error from '../components/Error';
import axios from 'axios'
import 'animate.css';
// import { AnimationOnScroll } from 'react-animation-on-scroll';

const queryClient = new QueryClient()

function Character() {
    const [initialCharacters, setInitialCharacters] = useState([])
    const [firstLoad, setFirstLoad] = useState(false)

    const [hiddeChacters, setHiddeCharacters] = useState(false)
    const [hiddeChacter, setHiddeCharacter] = useState(true)

    const [filterSystemButtons, setFilterSystemButtons] = useState(false)

    const characterRef = useRef('')
    
    const [howMany, setHowMany] = useState(6)
    // const howManyRef = useRef(null)

    // const [bycomics, setByComics] = useState(false)

    const [side, setSide] = useState("All")
    const [universe, setUniverse] = useState("All")
    const [team, setTeam] = useState("All")

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

    function gettingTheLocalStorageData(){
        const saveSide = localStorage.getItem('side')
        const saveUniverse = localStorage.getItem('universe')
        const saveTeam = localStorage.getItem('team')
        const saveByComics = localStorage.getItem('bycomics')
        const savefilterSystemButtons = localStorage.getItem('filterButtons')
        let saveHowMany = localStorage.getItem('howManyRef')

        saveHowMany = saveHowMany === null ? "" : saveHowMany

        return {saveSide, saveUniverse, saveTeam, saveByComics, saveHowMany, savefilterSystemButtons}
    }

    //for the beggining
    if ((initialCharacters[0] === undefined) && data !== undefined) {
        let { saveSide, saveUniverse, saveTeam, saveByComics, saveHowMany, savefilterSystemButtons } = gettingTheLocalStorageData()

        saveSide = saveSide !== null ? saveSide : "All" 
        saveUniverse = saveUniverse !== null ? saveUniverse : "All" 
        saveTeam = saveTeam !== null ? saveTeam : "All" 
        saveHowMany = saveHowMany !== null ? saveHowMany : "" 

        setSide(saveSide)
        setUniverse(saveUniverse)
        setTeam(saveTeam)
        setHowMany(saveHowMany)
        const isTrueSet = (savefilterSystemButtons === 'true')
        setFilterSystemButtons(isTrueSet)

        filterData("begin", saveByComics, saveTeam, saveUniverse, saveSide, saveHowMany)

        const saveCharacters = JSON.parse(localStorage.getItem('initialcharacters'))
        if (saveCharacters !== undefined && saveCharacters !== null) {
            setInitialCharacters(saveCharacters)
        }
    }
    //for the beggining

    function filterData(where, bycomicsSended, teamSended, universeSended, sideSended, howManySended){
        // console.log(`////from ${where}//// \n bycomicsSended: ${bycomicsSended}, teamSended: ${teamSended}, universeSended: ${universeSended}, sideSended: ${sideSended}, howManySended: ${howManySended}`)

        let selectedOnes = []
        let result = []

        if (teamSended === "All") {
            data.forEach((current, index) => {
                let currentReturned = whenItNotNecessaryThatTheTeamCoincide(current, index, sideSended, universeSended)
                if (currentReturned !== undefined) {
                    selectedOnes.push(currentReturned.index)
                    result.push(currentReturned.current)
                }
            })
        }
        
        if (teamSended !== "All") { 
            data.forEach((current, index) => {
                if (current.connections.groupAffiliation.includes(teamSended)) {
                    let currentReturned = whenTeamCoincide(current,index, sideSended, universeSended)
                    if (currentReturned !== undefined) {
                        selectedOnes.push(currentReturned.index)
                        result.push(currentReturned.current)
                    }
                }
            }) 
        }
        
        if (bycomicsSended === true) {
            data.forEach((current) => {
                if (current.comics !== undefined) {
                    result.push(current)
                }
            })
        }

        if ((howManySended > 0 || howManySended !== "") && bycomicsSended !== true) {
            let finalSelectedIntex = []
            for(let i = 0; i < howManySended; i++){
                finalSelectedIntex.push(selectedOnes[Math.floor(Math.random()*selectedOnes.length)])
            } 
            result = []
            data.forEach((current, index) => {
                if (finalSelectedIntex.includes(index)) {
                    result.push(current)
                }
            })
        }

        // if ((teamSended === undefined || teamSended === "All") && sideSended === "All" && universeSended === "All" && bycomicsSended !== true && (howManySended < 0 || howManySended === "")) {
        if ((howManySended < 0 || howManySended === "") && ((teamSended === undefined || teamSended === null) || teamSended === "All") && sideSended === "All" && universeSended === "All" && bycomicsSended !== true) {
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

        if (result[0] !== undefined && where !== "begin") {
            localStorage.setItem('initialcharacters', JSON.stringify(result))
        }
    }

    function whenTeamCoincide(current,index, sideSended, universeSended){
        if (sideSended === "All" && universeSended === "All") return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended !== "All" && (current.biography.publisher === universeSended)) return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended === "All" && (current.biography.alignment === sideSended)) return {"index": index, "current": current}
        if (current.biography.alignment === sideSended && current.biography.publisher === universeSended) return {"index": index, "current": current}
    }

    function whenItNotNecessaryThatTheTeamCoincide(current, index, sideSended, universeSended){
        if (sideSended === "All" && universeSended === "All") return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended !== "All" && (current.biography.publisher === universeSended)) return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended === "All" && (current.biography.alignment === sideSended)) return {"index": index, "current": current}
        /* if (side !== "All" && universe !== "All" && teams !== "All") */
        if (current.biography.alignment === sideSended && current.biography.publisher === universeSended) return {"index": index, "current": current}
    }

    function saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected){
        /* FOR TESTING PURPOSES */
        // console.log("---------------------------")
        // console.log(bycomicsSelected)
        // console.log(howManySelected)
        // console.log(sideSelected)
        // console.log(universeSelected)
        // console.log(teamSelected)
        // console.log("---------------------------")

        filterData("getCharacters", bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected)
        
        localStorage.setItem('bycomics', false)
        if (bycomicsSelected !== null && bycomicsSelected !== undefined) {
            localStorage.setItem('bycomics', bycomicsSelected)
        }

        localStorage.setItem('side', "All")
        if (sideSelected !== null && sideSelected !== undefined) {
            localStorage.setItem('side', sideSelected)
        }

        localStorage.setItem('universe', "All")
        if (universeSelected !== null && universeSelected !== undefined) {
            localStorage.setItem('universe', universeSelected)
        }

        localStorage.setItem('team', "All")
        if (teamSelected !== null && teamSelected !== undefined) {
            localStorage.setItem('team', teamSelected)
        }

        localStorage.setItem('howMany', 6)
        if (howManySelected === null) {
            localStorage.setItem('howMany', "")
        }
        if (howManySelected !== null && howManySelected !== undefined) {
            localStorage.setItem('howMany', howManySelected)
        }
        localStorage.setItem('filterButtons', filterSystemButtons)
    }

    function getCharacters(type, event){
        let {saveSide: sideSelected, saveUniverse: universeSelected, saveTeam: teamSelected, saveByComics: bycomicsSelected, saveHowMany: howManySelected} = gettingTheLocalStorageData()

        switch(type){
            case "side":
                bycomicsSelected = false
                setSide(event.target.value)
                sideSelected = event.target.value

                if (universeSelected === "All" && universeSelected === "All") {
                    howManySelected = 6
                }
                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected)
            break;

            case "universe":
                bycomicsSelected = false
                setUniverse(event.target.value)
                universeSelected = event.target.value

                setTeam("All")
                if (event.target.value !== "All") {
                    teamSelected = "All"
                }
                if (universeSelected === "All" && teamSelected === "All") {
                    howManySelected = 6
                }
                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected)
            break;

            case "team":
                bycomicsSelected = false
                setTeam(event.target.value)
                teamSelected = event.target.value
                
                if (event.target.value !== "All") {
                    setHowMany("")
                }
                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected)
            break;

            case "how":
                bycomicsSelected = false
                setHowMany(event.target.value)
                howManySelected = event.target.value

                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected)
            break;

            case "comics":
                bycomicsSelected = !(bycomicsSelected === "true")
                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected)
            break;

            case 'filterButtons': 
                setFilterSystemButtons(event);
                localStorage.setItem('filterButtons', event)
            break;

            default:
            break;
        }
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
        let names = [characterRef.current.value]

        if (characterRef.current.value.includes(",")) {
            names = characterRef.current.value
            .split(",")
            .map(current => current.trim())
        }

        names.forEach((currentName) => {
            data.forEach(charac => {
                const name = charac.name.toLowerCase();
                const nameintro = currentName.toLowerCase();
                // const result = name.includes(nameintro)
                const result = name === nameintro
    
                if (result === true) {
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
        }, 800)

        if (charactersArr[0] !== undefined) {
            localStorage.setItem('initialcharacters', JSON.stringify(charactersArr))
        }
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

                let alteregos = ["-"]
                if (charac.biography.alterEgos !== undefined) {
                    if((charac.biography.alterEgos !== "No alter egos found." || charac.biography.alterEgos !== "-") && charac.biography.alterEgos.includes(",")){
                        alteregos = charac.biography.alterEgos.split(",")
                    }
                }

                let comics = []
                if (charac.comics !== undefined) {
                    comics = charac.comics
                }

                if(charac.comics === undefined){
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
                        universe={universe}
                        side={side}
                        howMany={howMany}
                        filterSystemButtons={filterSystemButtons}
                        getCharacters={getCharacters}
                        findByName={findByName}                 
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
                    (hiddeChacters === false && initialCharacters[0] !== undefined && initialCharacters[0] !== null) &&
                    // <AnimationOnScroll initiallyVisible={true} animateIn={"animate__fadeIn"} animateOut={"animate__fadeOut"} duration={2}>
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