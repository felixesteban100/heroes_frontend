

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
}

export default saveAndFilter