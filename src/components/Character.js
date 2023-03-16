import React, { /* useCallback */ useRef, useState } from 'react'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import FilterBar from '../components/FilterBar';
import CharacterInfo from '../components/CharacterInfo'
import Pagination from './Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import axios from 'axios'
import 'animate.css';
// import { AnimationOnScroll } from 'react-animation-on-scroll';

const queryClient = new QueryClient()

function Character() {
    const [initialCharacters, setInitialCharacters] = useState([])
    const [firstLoad, setFirstLoad] = useState(false)

    const [hideCharacters, setHideCharacters] = useState(false)
    const [hideCharacter, setHideCharacter] = useState(true)

    // const [filterSystemButtons, setFilterSystemButtons] = useState(false)

    const characterRef = useRef('')
    const [namesFilterExact, setNamesFilterExact] = useState(true)
    
    const [howMany, setHowMany] = useState(6)

    const [side, setSide] = useState("All")
    const [universe, setUniverse] = useState("All")
    const [team, setTeam] = useState("All")
    const [gender, setGender] = useState("All")

    const [character, setCharacter] = useState([])
    const [imageSize, setImageSize] = useState(false)
    const [selectedStat, setSelectedStat] = useState("Powerstats")
    const [lastWindowPosition, setLastWindowPosition] = useState() 

    const [currentPage, setCurrentPage] = useState(0)


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
        const saveGender = localStorage.getItem('gender')
        const saveByComics = localStorage.getItem('bycomics')
        const saveFilterSystemButtons = localStorage.getItem('filterButtons')
        let saveHowMany = localStorage.getItem('howManyRef')

        saveHowMany = saveHowMany === null ? "" : saveHowMany

        return {saveSide, saveUniverse, saveTeam, saveByComics, saveHowMany, saveGender, saveFilterSystemButtons}
    }

    //for the beginning
    if (firstLoad === false && (initialCharacters[0] === undefined) && data !== undefined) {
        let { saveSide, saveUniverse, saveTeam, saveByComics, saveHowMany, saveGender/* , saveFilterSystemButtons */ } = gettingTheLocalStorageData()

        saveSide = saveSide ?? "All" 
        saveUniverse = saveUniverse ?? "All" 
        saveTeam = saveTeam ?? "All" 
        saveHowMany = saveHowMany ?? "" 
        saveGender = saveGender ?? "All"

        setSide(saveSide)
        setUniverse(saveUniverse)
        setTeam(saveTeam)
        setHowMany(saveHowMany)
        setGender(saveGender)
        // const isTrueSet = (saveFilterSystemButtons === 'true')
        // setFilterSystemButtons(isTrueSet)

        filterData("begin", saveByComics, saveTeam, saveUniverse, saveSide, saveHowMany, saveGender)

        const saveCharacters = JSON.parse(localStorage.getItem('initialcharacters'))
        if (saveCharacters !== undefined && saveCharacters !== null) {
            setInitialCharacters(saveCharacters)
        }
    }
    //for the beginning

    function filterData(where, bycomicsSended, teamSended, universeSended, sideSended, howManySended, genderSended){
        // console.log(`////from ${where}//// \n bycomicsSended: ${bycomicsSended}, teamSended: ${teamSended}, universeSended: ${universeSended}, sideSended: ${sideSended}, howManySended: ${howManySended} genderSended: ${genderSended}`)

        let selectedOnes = []
        let result = []

        if (teamSended === "All") {
            data.forEach((current, index) => {
                const currentReturned = whenItNotNecessaryThatTheTeamCoincide(current, index, sideSended, universeSended, genderSended)
                // console.log(currentReturned)
                if (currentReturned !== undefined) {
                    selectedOnes.push(currentReturned.index)
                    result.push(currentReturned.current)
                }
            })
        }
        
        if (teamSended !== "All") { 
            data.forEach((current, index) => {
                if (current.connections.groupAffiliation.includes(teamSended)) {
                    let currentReturned = whenTeamCoincide(current, index, sideSended, universeSended, genderSended)
                    if (currentReturned !== undefined) {
                        selectedOnes.push(currentReturned.index)
                        result.push(currentReturned.current)
                    }
                }
            }) 
        }

        if (bycomicsSended === true) {
            result = []
            data.forEach((current) => {
                if (current.comics !== undefined) {
                    result.push(current)
                }
            })
        }

        if ((howManySended > 0 || howManySended !== "") && bycomicsSended !== true) {
            let finalSelectedIndex = []
            for(let i = 0; i < howManySended; i++){
                finalSelectedIndex.push(selectedOnes[Math.floor(Math.random()*selectedOnes.length)])
            } 
            result = []
            data.forEach((current, index) => {
                if (finalSelectedIndex.includes(index)) {
                    result.push(current)
                }
            })
        }

        
        // if ((teamSended === undefined || teamSended === "All") && sideSended === "All" && universeSended === "All" && bycomicsSended !== true && (howManySended < 0 || howManySended === "")) {
        if ((howManySended < 0 || howManySended === "") && ((teamSended === undefined || teamSended === null) || teamSended === "All") && sideSended === "All" && universeSended === "All" && bycomicsSended !== true) {
            let finalSelectedIndex = []
            for(let i = 0; i < 6; i++){
                finalSelectedIndex.push(selectedOnes[Math.floor(Math.random()*selectedOnes.length)])
            } 
            result = []
            data.forEach((current, index) => {
                if (finalSelectedIndex.includes(index)) {
                    result.push(current)
                }
            })
        }

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        setInitialCharacters([undefined])

        if (result[0] !== undefined) {
            setInitialCharacters(result)
        }

        if (result[0] !== undefined && where !== "begin") {
            localStorage.setItem('initialcharacters', JSON.stringify(result))
        }
    }

    function whenTeamCoincide(current,index, sideSended, universeSended, genderSended){        
        if (sideSended === "All" && universeSended === "All" && genderSended === "All") return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended === "All" && genderSended === "All" && (current.biography.alignment === sideSended)) return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended !== "All" && genderSended === "All" && (current.biography.alignment === sideSended) && (current.biography.publisher === universeSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended !== "All" && genderSended === "All" && (current.biography.publisher === universeSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended !== "All" && genderSended !== "All" && (current.biography.publisher === universeSended) && (current.appearance.gender === genderSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended === "All" && genderSended !== "All" && (current.appearance.gender === genderSended)) return {"index": index, "current": current}
        if (current.biography.alignment === sideSended && current.biography.publisher === universeSended && current.appearance.gender === genderSended) return {"index": index, "current": current}
    }

    function whenItNotNecessaryThatTheTeamCoincide(current, index, sideSended, universeSended, genderSended){
        if (sideSended === "All" && universeSended === "All" && genderSended === "All") return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended === "All" && genderSended === "All" && (current.biography.alignment === sideSended)) return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended !== "All" && genderSended === "All" && (current.biography.alignment === sideSended) && (current.biography.publisher === universeSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended !== "All" && genderSended === "All" && (current.biography.publisher === universeSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended !== "All" && genderSended !== "All" && (current.biography.publisher === universeSended) && (current.appearance.gender === genderSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended === "All" && genderSended !== "All" && (current.appearance.gender === genderSended)) return {"index": index, "current": current}
        /* if (side !== "All" && universe !== "All" && teams !== "All") */
        if (current.biography.alignment === sideSended && current.biography.publisher === universeSended && current.appearance.gender === genderSended) return {"index": index, "current": current}
    }

    function saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected){
        /* FOR TESTING PURPOSES */
        // console.log("---------------------------")
        // console.log(bycomicsSelected)
        // console.log(howManySelected)
        // console.log(sideSelected)
        // console.log(universeSelected)
        // console.log(teamSelected)
        // console.log("---------------------------")

        filterData("getCharacters", bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected)
        
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

        localStorage.setItem('gender', "All")
        if (genderSelected !== null && genderSelected !== undefined) {
            localStorage.setItem('gender', genderSelected)
        }

        localStorage.setItem('howMany', 6)
        if (howManySelected === null) {
            localStorage.setItem('howMany', "")
        }
        if (howManySelected !== null && howManySelected !== undefined) {
            localStorage.setItem('howMany', howManySelected)
        }
        // localStorage.setItem('filterButtons', filterSystemButtons)
        setCurrentPage(0)
    }

    function getCharacters(type, event){
        let {saveSide: sideSelected, saveUniverse: universeSelected, saveTeam: teamSelected, saveByComics: bycomicsSelected, saveHowMany: howManySelected, saveGender: genderSelected} = gettingTheLocalStorageData()

        switch(type){
            case "gender":
                bycomicsSelected = false
                setGender(event.target.value)
                genderSelected = event.target.value

                if (universeSelected === "All" && universeSelected === "All") {
                    howManySelected = 6
                }
                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected)
            break;

            case "side":
                bycomicsSelected = false
                setSide(event.target.value)
                sideSelected = event.target.value

                if (universeSelected === "All" && universeSelected === "All") {
                    howManySelected = 6
                }
                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected)
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
                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected)
            break;

            case "team":
                bycomicsSelected = false
                setTeam(event.target.value)
                teamSelected = event.target.value
                
                if (event.target.value !== "All") {
                    setHowMany("")
                }
                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected)
            break;

            case "how":
                bycomicsSelected = false
                setHowMany(event.target.value)
                howManySelected = event.target.value

                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected)
            break;

            case "comics":
                bycomicsSelected = !(bycomicsSelected === "true")
                saveAndFilter(bycomicsSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected)
            break;

            // case 'filterButtons': 
            //     setFilterSystemButtons(event);
            //     localStorage.setItem('filterButtons', event)
            // break;

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

    function organizeCharacterData(charac, comics, alteregos, occupation, groups){
        return {
            id: charac.id,
            name: charac.name,
            images: {
                xs: charac.images.xs,
                sm: charac.images.sm,
                md: charac.images.md,
                lg: charac.images.lg
            },
            comics: comics ?? charac.comics,
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
                alterEgos: alteregos ?? charac.biography.alterEgos,
                placeOfBirth: charac.biography.placeOfBirth,
                aliases: charac.biography.aliases,
            },
            work: {
                occupation: occupation ?? charac.work.occupation
            },
            connections:{
                groupAffiliation: groups ?? charac.connections.groupAffiliation,
                relatives: charac.connections.relatives
            },
            publisherIMG: getPublisherImg(charac.biography.publisher),
            // boxShadowColor: getAverageRGB(charac.images.md)
        }
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
                let result
                if(namesFilterExact) result = name.includes(nameintro)
                if(!namesFilterExact) result = name === nameintro
    
                if (result === true) {
                    charactersArr.push(organizeCharacterData(charac))
                }
            })
        })

        for (let i = charactersArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [charactersArr[i], charactersArr[j]] = [charactersArr[j], charactersArr[i]];
        }
        setTimeout(() => {
            setHideCharacters(true)
            setInitialCharacters(charactersArr)
        }, 300);

        setTimeout(() => {
            setHideCharacters(false)
        }, 500);

        setTimeout(() => {
            if (charactersArr[0] === undefined && characterRef.current.value !== "") {
                setFirstLoad(true)
            }
            setCurrentPage(0)
        }, 800)

        if (charactersArr[0] !== undefined) {
            localStorage.setItem('initialcharacters', JSON.stringify(charactersArr))
        }
        
    }

    function findByNameClick(idSended){
        setHideCharacters(true)
        setHideCharacter(false)
        // if (filterSystemButtons === false) {
        //     characterRef.current.value = ""
        // }
        const charactersArr = []
        data.forEach(charac => {
            if (idSended===charac.id) {
                let occupation = charac.work.occupation.split(",").map((current) => current.split(";"))
                let occupationArr = []
                occupation = occupation.map(current => {   
                    occupationArr.push(...current)
                    return current
                })
                occupation = occupationArr.map(occupation => {
                    if(occupation.charAt(0) === " "){
                        return occupation.charAt(1).toUpperCase() + occupation.slice(2)
                    }
                    return occupation.charAt(0).toUpperCase() + occupation.slice(1)
                })

                let groups = charac.connections.groupAffiliation.split(",").map((current) => current.split(";"))
                let groupsArr = []
                groups = groups.map(current => {   
                    groupsArr.push(...current)
                    return current
                })
                groups = groupsArr.map(groups => {
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

                let comics = charac.comics !== undefined ? charac.comics : []

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
                charactersArr.push(organizeCharacterData(charac, comics, alteregos, occupation, groups))
            }             
        })

        setLastWindowPosition(window.pageYOffset)

        setCharacter(charactersArr)

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function getBack(){
        setHideCharacters(false)
        setHideCharacter(true)
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
                    hideCharacter === true &&
                    <FilterBar 
                        characterRef={characterRef}
                        team={team}
                        universe={universe}
                        side={side}
                        howMany={howMany}
                        gender={gender}              
                        /* filterSystemButtons={filterSystemButtons} */
                        getCharacters={getCharacters}
                        findByName={findByName}
                        namesFilterExact={namesFilterExact}
                        setNamesFilterExact={setNamesFilterExact}
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
                    (hideCharacters === false && initialCharacters[0] !== undefined && initialCharacters[0] !== null) &&
                    <Pagination 
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={window.innerWidth < 1200 ? 4 : 3}
                        initialCharacters={initialCharacters}
                        findByNameClick={findByNameClick}
                    />
                }

                {
                    isLoading === false &&
                    (hideCharacters === false && initialCharacters[0] === undefined && firstLoad === true) &&
                    <div className='character--withInfo-unknown'>
                        <img className='animate__animated animate__fadeIn character--withInfo--img--unknown'  src="https://www.pngitem.com/pimgs/m/52-526033_unknown-person-icon-png-transparent-png.png" alt="logo" />                                                    
                        <p className='animate__animated animate__fadeIn animate__delay-1s character--withInfo--unknown--info'>Sorry but we don't have that character </p>
                    </div>
                }
                    

                {
                    isLoading === false &&
                    (hideCharacter === false) &&
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