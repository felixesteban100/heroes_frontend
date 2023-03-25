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

export default organizeCharacterData