import getCharactersByNameSended from '../pureFunctions/getCharactersByNameSended'
import getCharactersByTeamNotSended from '../pureFunctions/getCharactersByTeamNotSended'
import getCharactersByTeamSended from '../pureFunctions/getCharactersByTeamSended'

function shuffleCharacters(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function filterData(nameSended, teamSended, universeSended, sideSended, howManySended, genderSended, AllCharactersFromAPI, namesFilterExact){
    console.log(`\n nameSended: ${nameSended} teamSended: ${teamSended}, universeSended: ${universeSended}, sideSended: ${sideSended}, howManySended: ${howManySended} genderSended: ${genderSended}`)

    const dataShuffled = shuffleCharacters(AllCharactersFromAPI)

    dataShuffled.forEach((current) => {
        console.log(current.name)
    })

    let result = []
    let firstFilter = []

    if (nameSended === "") firstFilter = dataShuffled

    if (nameSended !== "") firstFilter = getCharactersByNameSended(nameSended, AllCharactersFromAPI, namesFilterExact)

    if (teamSended === "All") result = getCharactersByTeamNotSended(firstFilter, sideSended, universeSended, genderSended, teamSended)

    if (teamSended !== "All") result = getCharactersByTeamSended(firstFilter, sideSended, universeSended, genderSended, teamSended)
    
    if (!isNaN(howManySended) && howManySended > 0) result = result.slice(0, howManySended)

    return result
}

export default filterData