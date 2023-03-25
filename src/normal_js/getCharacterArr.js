import organizeCharacterData from './organizeCharacterData'

function organizedComicsProperty(comics, publisher){
    if(comics === undefined){
        switch(publisher){
            case "Marvel Comics":
            return [
                "https://i.annihil.us/u/prod/marvel/i/mg/5/04/5d5d4cbf869ff/clean.jpg",
                "https://upload.wikimedia.org/wikipedia/en/1/19/Marvel_Universe_%28Civil_War%29.jpg",
                "https://cdn.marvel.com/u/prod/marvel/i/mg/f/70/5d5aaf2e85d4d/clean.jpg",
                "https://i5.walmartimages.com/asr/4bb4cfc9-ce7f-4d44-821d-dff6eae1f38b.fbf723c17381a38682b8660aaed481d9.jpeg",
                "https://images.saymedia-content.com/.image/t_share/MTc0MzA1MTk3OTc4Mjk4MjM2/getting-into-comics-a-general-guide.jpg",

                "https://i5.walmartimages.com/asr/4bb4cfc9-ce7f-4d44-821d-dff6eae1f38b.fbf723c17381a38682b8660aaed481d9.jpeg",
                "https://i5.walmartimages.com/asr/4bb4cfc9-ce7f-4d44-821d-dff6eae1f38b.fbf723c17381a38682b8660aaed481d9.jpeg",
                "https://i5.walmartimages.com/asr/4bb4cfc9-ce7f-4d44-821d-dff6eae1f38b.fbf723c17381a38682b8660aaed481d9.jpeg",
            ]
        
            case "DC Comics":
            return [
                "http://www.moviepostersetc.com/_staticProxy/content/ff808081163c05b001169d6655243ae9/Justice_League_of_America_poster_Issue_1.jpg",

                "https://cdn.europosters.eu/image/1300/julisteet/dc-comics-collage-i15088.jpg",
                "https://d.newsweek.com/en/full/975273/heroes-crisis-tom-king-clay-mann-dc-comics.jpg",
                "https://i.pinimg.com/originals/02/fb/e3/02fbe3db4a82b9b15c9afefe2b9799a9.png",
                "https://i0.wp.com/batman-news.com/wp-content/uploads/2018/05/9781608878321.jpg?fit=696%2C862&quality=80&strip=info&ssl=1",
                "https://www.previewsworld.com/news_images/177217_889486_3.jpg",
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

function organizedAlterEgosProperty(alterEgos){
    if (alterEgos !== undefined) {
        if((alterEgos !== "No alter egos found." || alterEgos !== "-") && alterEgos.includes(",")){
            return alterEgos.split(",")
        }
    }
    return ["-"]
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

function getCharacterArr(idSended, allCharactersByAPI){
    const charactersArr = []
    allCharactersByAPI.forEach((charac) => {
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

export default getCharacterArr