import organizeCharacterData from './organizeCharacterData'

function getCharactersByNameSended(nameSended, data, namesFilterExact){
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

    // console.log("resultArr", resultArr)
    return resultArr
}

export default getCharactersByNameSended