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

function getCharactersByTeamNotSended(firstFilter, sideSended, universeSended, genderSended, teamSended){
    let resultArr = []
    firstFilter.forEach((current, index) => {
        const currentReturned = whenItNotNecessaryThatTheTeamCoincide(current, index, sideSended, universeSended, genderSended)
        if (currentReturned !== undefined) resultArr.push(currentReturned.current)

    })
    return resultArr
}

export default getCharactersByTeamNotSended