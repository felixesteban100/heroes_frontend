/* THIS WON'T BE NECESSARY WHEN I USE THE useLocalStorage (custom hook)*/


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

export default gettingTheLocalStorageData

/* THIS WON'T BE NECESSARY WHEN I USE THE useLocalStorage (custom hook)*/
