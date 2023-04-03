import { useState } from 'react'
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

// import created modules/functions/hooks
import getCharacterArr from '../pureFunctions/getCharacterArr'
import filterData from '../pureFunctions/filterData'
import useLocalStorage from '../customHooks/useLocalStorage';


const queryClient = new QueryClient()

function Character() {
    const [initialCharacters, setInitialCharacters] = useState([])

    const [hideCharacters, setHideCharacters] = useState(false)
    const [hideCharacter, setHideCharacter] = useState(true)

    const [namesFilterExact, setNamesFilterExact] = useState(true)

    const [characterName, setCharacterName] = useLocalStorage("name", "")
    const [howMany, setHowMany] = useLocalStorage("howMany","")
    const [side, setSide] = useLocalStorage("side", "All")
    const [universe, setUniverse] = useLocalStorage("universe", "All")
    const [team, setTeam] = useLocalStorage("team", "All")
    const [gender, setGender] = useLocalStorage("gender", "All")

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

    // for the beginning
    if ((initialCharacters[0] === undefined) && data !== undefined) {
        const resultByFilterData = filterData(characterName, team, universe, side, howMany, gender, data, namesFilterExact)

        if (resultByFilterData[0] !== undefined) setData(resultByFilterData, "begin")

        const saveCharacters = JSON.parse(localStorage.getItem('initialcharacters'))
        if (saveCharacters !== undefined && saveCharacters !== null) {
            setInitialCharacters(saveCharacters)
        }
    }
    // for the beginning

    function setData(result, where){
        setInitialCharacters(result) 
        setExits(true)
        if (where !== "begin") localStorage.setItem('initialcharacters', JSON.stringify(result)) 
    }

    function getCharacters(type, event){
        let nameSelected = characterName;
        let sideSelected = side;
        let universeSelected = universe;
        let teamSelected = team;
        let howManySelected = howMany;
        let genderSelected = gender;

        switch(type){
            case "marvel":
                setUniverse("Marvel Comics")
                universeSelected = "Marvel Comics"

                setTeam("All")
                teamSelected = "All"
            break;

            case "dc":
                setUniverse("DC Comics")
                universeSelected = "DC Comics"

                setTeam("All")
                teamSelected = "All"
            break;

            case "byName":
                setCharacterName(event.target.value)    
                nameSelected = event.target.value
            break;

            case "gender":
                setGender(event.target.value)
                genderSelected = event.target.value
            break;

            case "side":
                setSide(event.target.value)
                sideSelected = event.target.value
            break;

            case "universe":
                setUniverse(event.target.value)
                universeSelected = event.target.value

                setTeam("All")
                if (event.target.value !== "All") {
                    teamSelected = "All"
                }
            break;

            case "team":
                setTeam(event.target.value)
                teamSelected = event.target.value
            break;

            case "how":
                setHowMany(parseInt(event.target.value))
                howManySelected = parseInt(event.target.value)
            break;

            default:
            break;
        }

        setCurrentPage(0)
        const resultByFilterData = filterData(nameSelected, teamSelected, universeSelected, sideSelected, howManySelected, genderSelected, data, namesFilterExact)
        console.log("resultByFilterData", resultByFilterData)
        setExits(false)
        if (resultByFilterData[0] !== undefined) setData(resultByFilterData, "notBegin")
    }  

    function findByNameClick(idSended){
        setHideCharacters(true)
        setHideCharacter(false)
        setCharacter(getCharacterArr(idSended, data))
        setLastWindowPosition(window.pageYOffset)
        scrollTop()
    }

    function changeStat(event){
        setSelectedStat(event.target.outerText)
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
                    ((isLoading === false || window.innerWidth > 700) && hideCharacter === true) &&
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