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