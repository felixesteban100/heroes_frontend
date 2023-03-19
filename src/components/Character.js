import React, { /* useCallback */ useState } from 'react'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import Header from '../components/Header';
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

    const [hideCharacters, setHideCharacters] = useState(false)
    const [hideCharacter, setHideCharacter] = useState(true)

    const [characterName, setCharacterName] = useState("")
    const [namesFilterExact, setNamesFilterExact] = useState(true)
    
    const [howMany, setHowMany] = useState("")

    const [side, setSide] = useState("All")
    const [universe, setUniverse] = useState("All")
    const [team, setTeam] = useState("All")
    const [gender, setGender] = useState("All")

    const [character, setCharacter] = useState([])
    const [imageSize, setImageSize] = useState(false)
    const [selectedStat, setSelectedStat] = useState("Powerstats")
    const [lastWindowPosition, setLastWindowPosition] = useState() 

    const [currentPage, setCurrentPage] = useState(0)

    const [exits, setExits] = useState(true)


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
        return {
            saveName: localStorage.getItem('name'), 
            saveSide: localStorage.getItem('side'), 
            saveUniverse: localStorage.getItem('universe'), 
            saveTeam: localStorage.getItem('team'), 
            saveHowMany: localStorage.getItem('howMany'), 
            saveGender: localStorage.getItem('gender')
        }
    }

    //for the beginning
    if ((initialCharacters[0] === undefined) && data !== undefined) {
        let { saveName, saveSide, saveUniverse, saveTeam, saveHowMany, saveGender } = gettingTheLocalStorageData()
        saveName = saveName ?? ""
        saveSide = saveSide ?? "All" 
        saveUniverse = saveUniverse ?? "All" 
        saveTeam = saveTeam ?? "All" 
        saveHowMany = parseInt(saveHowMany) ?? NaN
        saveGender = saveGender ?? "All"

        setCharacterName(saveName)
        setSide(saveSide)
        setUniverse(saveUniverse)
        setTeam(saveTeam)
        setHowMany(saveHowMany)
        setGender(saveGender)

        filterData("begin", saveName, saveTeam, saveUniverse, saveSide, saveHowMany, saveGender)

        const saveCharacters = JSON.parse(localStorage.getItem('initialcharacters'))
        if (saveCharacters !== undefined && saveCharacters !== null) {
            setInitialCharacters(saveCharacters)
        }
    }
    //for the beginning

    function setData(result, where){
        setInitialCharacters(result) 
        setExits(true)
        if (where !== "begin") localStorage.setItem('initialcharacters', JSON.stringify(result)) 
    }

    function filterData(where, nameSended, teamSended, universeSended, sideSended, howManySended, genderSended){
        console.log(`////from ${where}//// \n nameSended: ${nameSended} teamSended: ${teamSended}, universeSended: ${universeSended}, sideSended: ${sideSended}, howManySended: ${howManySended} genderSended: ${genderSended}`)

        setInitialCharacters([undefined])

        let result = []
        let firstFilter = []

        if (nameSended === "") firstFilter = data

        if (nameSended !== "") firstFilter = getCharactersByNameSended(nameSended)

        if (teamSended === "All") result = getCharactersByTeamNotSended(firstFilter, sideSended, universeSended, genderSended, teamSended)

        if (teamSended !== "All") result = getCharactersByTeamSended(firstFilter, sideSended, universeSended, genderSended, teamSended)
        
        if (!isNaN(howManySended) && howManySended > 0) result = result.slice(0, howManySended)

        result = shuffleCharacters(result)

        setExits(false)
        if (result[0] !== undefined) setData(result, where)
    }

    function getCharactersByNameSended(nameSended){
        let resultArr = []
        let name = [nameSended]
        if (nameSended.includes(",")) name = nameSended.split(",").map(current => current.trim())

        name.forEach((currentName) => {
            data.forEach(charac => {
                const name = charac.name.toLowerCase();
                const nameintro = currentName.toLowerCase();
                let answer
                if(namesFilterExact) answer = name.includes(nameintro)
                if(!namesFilterExact) answer = name === nameintro
    
                if (answer === true) {
                    resultArr.push(organizeCharacterData(charac))
                }
            })
        })

        console.log("resultArr", resultArr)
        return resultArr
    }

    function getCharactersByTeamNotSended(firstFilter, sideSended, universeSended, genderSended, teamSended){
        let resultArr = []
        firstFilter.forEach((current, index) => {
            const currentReturned = whenItNotNecessaryThatTheTeamCoincide(current, index, sideSended, universeSended, genderSended)
            if (currentReturned !== undefined) resultArr.push(currentReturned.current)

        })
        return resultArr
    }

    function getCharactersByTeamSended(firstFilter, sideSended, universeSended, genderSended, teamSended){
        let resultArr = []
        firstFilter.forEach((current, index) => {
            if (current.connections.groupAffiliation.includes(teamSended)) {
                let currentReturned = whenTeamCoincide(current, index, sideSended, universeSended, genderSended)
                if (currentReturned !== undefined) resultArr.push(currentReturned.current)
            }
        }) 
        return resultArr
    }

    function shuffleCharacters(result){
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result
    }


    function whenTeamCoincide(current,index, sideSended, universeSended, genderSended){        
        if (sideSended === "All" && universeSended === "All" && genderSended === "All") return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended === "All" && genderSended === "All" && (current.biography.alignment === sideSended)) return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended === "All" && genderSended !== "All" && (current.biography.alignment === sideSended) && (current.appearance.gender === genderSended)) return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended !== "All" && genderSended === "All" && (current.biography.alignment === sideSended) && (current.biography.publisher === universeSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended !== "All" && genderSended === "All" && (current.biography.publisher === universeSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended !== "All" && genderSended !== "All" && (current.biography.publisher === universeSended) && (current.appearance.gender === genderSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended === "All" && genderSended !== "All" && (current.appearance.gender === genderSended)) return {"index": index, "current": current}
        if (current.biography.alignment === sideSended && current.biography.publisher === universeSended && current.appearance.gender === genderSended) return {"index": index, "current": current}
    }

    function whenItNotNecessaryThatTheTeamCoincide(current, index, sideSended, universeSended, genderSended){
        if (sideSended === "All" && universeSended === "All" && genderSended === "All") return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended === "All" && genderSended === "All" && (current.biography.alignment === sideSended)) return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended === "All" && genderSended !== "All" && (current.biography.alignment === sideSended) && (current.appearance.gender === genderSended)) return {"index": index, "current": current}
        if (sideSended !== 'All' && universeSended !== "All" && genderSended === "All" && (current.biography.alignment === sideSended) && (current.biography.publisher === universeSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended !== "All" && genderSended === "All" && (current.biography.publisher === universeSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended !== "All" && genderSended !== "All" && (current.biography.publisher === universeSended) && (current.appearance.gender === genderSended)) return {"index": index, "current": current}
        if (sideSended === 'All' && universeSended === "All" && genderSended !== "All" && (current.appearance.gender === genderSended)) return {"index": index, "current": current}
        if (current.biography.alignment === sideSended && current.biography.publisher === universeSended && current.appearance.gender === genderSended) return {"index": index, "current": current}
    }

    function saveAndFilter(where, nameSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected){
        /* FOR TESTING PURPOSES */
        // console.log("---------------------------")
        // console.log(nameSelected)
        // console.log(teamSelected)
        // console.log(universeSelected)
        // console.log(sideSelected)
        // console.log(howManySelected)
        // console.log(genderSelected)
        // console.log("---------------------------")

        localStorage.setItem('side', (sideSelected ?? "All"))

        localStorage.setItem('universe', (universeSelected ?? "All"))

        localStorage.setItem('team', (teamSelected ?? "All"))

        localStorage.setItem('gender', (genderSelected ?? "All"))
  
        localStorage.setItem('howMany', (howManySelected ?? 0))
        
        localStorage.setItem('name', (nameSelected ?? ""))

        setCurrentPage(0)

        filterData(where, nameSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected)
    }

    function getCharacters(type, event){
        let { saveName: nameSelected, saveSide: sideSelected, saveUniverse: universeSelected, saveTeam: teamSelected, saveHowMany: howManySelected, saveGender: genderSelected } = gettingTheLocalStorageData()

        let where 
        switch(type){
            case "marvel":
                setUniverse("Marvel Comics")
                universeSelected = "Marvel Comics"

                setTeam("All")
                teamSelected = "All"
                where = "marvel"
            break;

            case "dc":
                setUniverse("DC Comics")
                universeSelected = "DC Comics"

                setTeam("All")
                teamSelected = "All"
                where = "dc"
            break;

            case "byName":
                setCharacterName(event.target.value)    
                nameSelected = event.target.value
                where = "byName"
            break;

            case "gender":
                setGender(event.target.value)
                genderSelected = event.target.value
                where = "gender"
            break;

            case "side":
                setSide(event.target.value)
                sideSelected = event.target.value
                where = "side"
            break;

            case "universe":
                setUniverse(event.target.value)
                universeSelected = event.target.value

                setTeam("All")
                if (event.target.value !== "All") {
                    teamSelected = "All"
                }
                where = "universe"
            break;

            case "team":
                setTeam(event.target.value)
                teamSelected = event.target.value
                where = "team"
            break;

            case "how":
                setHowMany(parseInt(event.target.value))
                howManySelected = parseInt(event.target.value)

                where = "how"
            break;

            default:
            break;
        }

        saveAndFilter(where, nameSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected)
    }

    function changeStat(event){
        setSelectedStat(event.target.outerText)
    }

    function getPublisherImg(publisher){
        switch (publisher) {
            case "Marvel Comics":
                return "https://media.tenor.com/yuMS24ShcxQAAAAC/marvel-studios.gif"

            case "DC Comics":
                return "https://img.wattpad.com/136b18152c06ba98fc0975c35e8718b1b5d71f75/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f3852596d354861383930497349513d3d2d3339363830323632332e313462343261626138353034393866363334393330313331313336322e676966"
            
            case "George Lucas":
                return "https://bestanimations.com/media/star-wars/1037554235star-wars-animated-gif-32.gif"

            case 'IDW Publishing':
                return"https://static.wikia.nocookie.net/silent/images/8/85/Idwlogo.png" 

            case "Dark Horse Comics":
                return "https://1000logos.net/wp-content/uploads/2020/09/Dark-Horse-Comics-Logo-1991.png"
            
            case "Shueisha":
                return "https://static.wikia.nocookie.net/logopedia/images/5/5f/Shueisha_Logo_with_English_text.png/revision/latest?cb=20211106075538"
            
            default:
                return "https://images.generation-msx.nl/company/0388910c.png"
        }
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

    function findByNameClick(idSended){
        setHideCharacters(true)
        setHideCharacter(false)
        setCharacter(getCharacterArr(idSended))
        setLastWindowPosition(window.pageYOffset)
        scrollTop()
    }

    function getCharacterArr(idSended){
        const charactersArr = []
        console.log(data)
        data.forEach((charac) => {
            if (idSended === charac.id) {
                const occupation = organizedOccupationProperty(charac.work.occupation)
                const groups = organizedGroupsProperty(charac.connections.groupAffiliation)
                const alteregos = organizedAlterEgosProperty(charac.biography.alterEgos)
                const comics = organizedComicsProperty(charac.comics, charac.biography.publisher)
                charactersArr.push(organizeCharacterData(charac, comics, alteregos, occupation, groups))
            }             
        })
        return charactersArr
    }

    function organizedOccupationProperty(occupation){
        let occupationArr1 = occupation.split(",").map((current) => current.split(";"))
        let occupationArr2 = []
        occupationArr1 = occupationArr1.map(current => {   
            occupationArr2.push(...current)
            return current
        })
        return occupationArr2.map(current => {
            if(current.charAt(0) === " "){
                return current.charAt(1).toUpperCase() + current.slice(2)
            }
            return current.charAt(0).toUpperCase() + current.slice(1)
        })
    }

    function organizedGroupsProperty(groups){
        let groupsArr1 = groups.split(",").map((current) => current.split(";"))
        let groupsArr2 = []
        groupsArr1 = groupsArr1.map(current => {   
            groupsArr2.push(...current)
            return current
        })
        return groupsArr2.map(current => {
            if(current.charAt(0) === " "){
                return current.charAt(1).toUpperCase() + current.slice(2)
            }
            return current.charAt(0).toUpperCase() + current.slice(1)
        })
    }

    function organizedAlterEgosProperty(alterEgos){
        if (alterEgos !== undefined) {
            if((alterEgos !== "No alter egos found." || alterEgos !== "-") && alterEgos.includes(",")){
                return alterEgos.split(",")
            }
        }
        return ["-"]
    }

    function organizedComicsProperty(comics, publisher){
        if(comics === undefined){
            switch(publisher){
                case "Marvel Comics":
                return [
                    "https://i.annihil.us/u/prod/marvel/i/mg/5/04/5d5d4cbf869ff/clean.jpg",
                    "https://i.annihil.us/u/prod/marvel/i/mg/5/04/5d5d4cbf869ff/clean.jpg",
                    "https://i.annihil.us/u/prod/marvel/i/mg/5/04/5d5d4cbf869ff/clean.jpg",
                    "https://i.annihil.us/u/prod/marvel/i/mg/5/04/5d5d4cbf869ff/clean.jpg"
                ]
            
                case "DC Comics":
                return [
                    "http://www.moviepostersetc.com/_staticProxy/content/ff808081163c05b001169d6655243ae9/Justice_League_of_America_poster_Issue_1.jpg",
                    "http://www.moviepostersetc.com/_staticProxy/content/ff808081163c05b001169d6655243ae9/Justice_League_of_America_poster_Issue_1.jpg",
                    "http://www.moviepostersetc.com/_staticProxy/content/ff808081163c05b001169d6655243ae9/Justice_League_of_America_poster_Issue_1.jpg",
                    "http://www.moviepostersetc.com/_staticProxy/content/ff808081163c05b001169d6655243ae9/Justice_League_of_America_poster_Issue_1.jpg"
                ]
            
                case "Shueisha":
                return [
                    "https://cdn.animenewsnetwork.com/hotlink/thumbnails/max1000x1500/cms/interest/134237/jump_1833_fixw_640_hq.jpg",
                    "https://cdn.animenewsnetwork.com/hotlink/thumbnails/max1000x1500/cms/interest/134237/jump_1833_fixw_640_hq.jpg",
                    "https://cdn.animenewsnetwork.com/hotlink/thumbnails/max1000x1500/cms/interest/134237/jump_1833_fixw_640_hq.jpg",
                    "https://cdn.animenewsnetwork.com/hotlink/thumbnails/max1000x1500/cms/interest/134237/jump_1833_fixw_640_hq.jpg"
                ]

                case "IDW Publishing":
                return [
                    "https://images.squarespace-cdn.com/content/v1/593f201de3df288fc6465e6f/1643902801105-VUT092WGQWT7VUD66Y8M/Teenage+Mutant+Ninja+Turtles+Reborn+Vol.+1.jpg?format=1000w",
                    "https://d1466nnw0ex81e.cloudfront.net/n_iv/600/2066186.jpg",
                    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81j8N4V4pIL.jpg",
                    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/91L4+Vf8YWL._AC_UF1000,1000_QL80_.jpg"
                ]

                case "George Lucas":
                return [
                    "https://static.wikia.nocookie.net/starwars/images/c/c0/StarWars1977-80.jpg/revision/latest?cb=20210930204523",
                    "https://cdn.marvel.com/u/prod/marvel/i/mg/c/00/5ff32d6aad522/clean.jpg",
                    "https://tools.toywiz.com/_images/_webp/_products/lg/apr221023.webp",
                    "https://i0.wp.com/MynockManor.com/wp-content/uploads/2020/11/Star-Wars-11-Full-Cover-Vol-2.jpeg?ssl=1",
                    "https://storage.googleapis.com/hipcomic/p/007ce152f644d7971541cb74253b82cf.jpg"
                ]
            
                default:
                return [
                    "https://img.freepik.com/free-vector/comics-poster-template_225004-800.jpg?w=2000",
                    "https://img.freepik.com/free-vector/comics-poster-template_225004-800.jpg?w=2000",
                    "https://img.freepik.com/free-vector/comics-poster-template_225004-800.jpg?w=2000",
                    "https://img.freepik.com/free-vector/comics-poster-template_225004-800.jpg?w=2000"
                ]
            
            }
        }
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

    function scrollTop(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className='character-module'>
            <Header 
                getCharacters={getCharacters}
            />
            <QueryClientProvider client={queryClient}>
                {
                    (isLoading === false && hideCharacter === true) &&
                    <FilterBar 
                        characterName={characterName}
                        team={team}
                        universe={universe}
                        side={side}
                        howMany={howMany}
                        gender={gender}              
                        getCharacters={getCharacters}
                        namesFilterExact={namesFilterExact}
                        setNamesFilterExact={setNamesFilterExact}
                        exits={exits}
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
                    (hideCharacters === false && initialCharacters[0] === undefined) &&
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