import getCharactersByNameSended from '../pureFunctions/getCharactersByNameSended'
import getCharactersByTeamNotSended from '../pureFunctions/getCharactersByTeamNotSended'
import getCharactersByTeamSended from '../pureFunctions/getCharactersByTeamSended'

function shuffleCharacters(result){
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result
}

function filterData(where, nameSended, teamSended, universeSended, sideSended, howManySended, genderSended, AllCharactersFromAPI, namesFilterExact){
    // console.log(`////from ${where}//// \n nameSended: ${nameSended} teamSended: ${teamSended}, universeSended: ${universeSended}, sideSended: ${sideSended}, howManySended: ${howManySended} genderSended: ${genderSended}`)

    let result = []
    let firstFilter = []

    if (nameSended === "") firstFilter = AllCharactersFromAPI

    if (nameSended !== "") firstFilter = getCharactersByNameSended(nameSended, AllCharactersFromAPI, namesFilterExact)

    if (teamSended === "All") result = getCharactersByTeamNotSended(firstFilter, sideSended, universeSended, genderSended, teamSended)

    if (teamSended !== "All") result = getCharactersByTeamSended(firstFilter, sideSended, universeSended, genderSended, teamSended)
    
    if (!isNaN(howManySended) && howManySended > 0) result = result.slice(0, howManySended)

    result = shuffleCharacters(result)

    return result
}

export default filterData