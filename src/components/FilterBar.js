import React, { useEffect } from 'react'
// import Toggle  from './Toggle'

function FilterBar({characterRef, team, universe, side, /* filterSystemButtons, */ howMany, gender, findByName, getCharacters, noCharacter, namesFilterExact, setNamesFilterExact}) {
  
    const dcComicsTeams = [
        {
            name: "Aquaman Family",
            value: "Aquaman Family"
        },
        {
            name: 'Assorted Batman rogues',
            value: 'Assorted Batman rogues',
        },
        {
            name: "Batman Family",
            value: "Batman Family",
        },
        {
            name: "Birds of Prey",
            value: "Birds of Prey",
        },
        {
            name: "Crimebusters / Watchmen",
            value: "Crimebusters",
        },
        {
            name: "Flash Family / Speedsters",
            value: "Flash Family",
        },
        {
            name: "Green Lantern Corps",
            value: "Green Lantern Corps",
        },
        {
            name: "Injustice League",
            value: "Injustice League",
        },
        {
            name: "Justice League",
            value: "Justice League",
        },
        {
            name: "Justice League (Original)",
            value: "Justice League (Original)",
        },
        {
            name: "Justice League Dark",
            value: "Justice League Dark",
        },
        {
            name: "Justice Society of America",
            value: "Justice Society of America",
        },
        {
            name: "Lanterns Corps (All)",
            value: "Lantern Corps",
        },
        {
            name:  "Legion of Super-Heroes",
            value:  "Legion of Super-Heroes",
        },
        {
            name:  "Marvel Family",
            value:  "Marvel Family",
        },
        {
            name:  "New Guardians Corps",
            value:  "New Guardians",
        },
        {
            name:  "Outsiders",
            value:  "Outsiders",
        },
        {
            name:  "Secret Society of Super Villains",
            value:  "Secret Society of Super Villains",
        },
        {
            name:  "Suicide Squad",
            value:  "Suicide Squad",
        },
        {
            name:  "Superman Family / Kriptonian",
            value:  "Superman Family",
        },
        {
            name:  "Teen Titans",
            value:  "Teen Titans",
        }
    ]

    const marvelComicsTeams = [
        {
            name: "Asgardians",
            value: "Asgardians"
        },
        {
            name: "Avengers",
            value: "Avengers"
        },
        {
            name: "Avengers (Original)",
            value: "Avengers (Original)"
        },
        {
            name: "Black Order",
            value: "Black Order"
        },
        {
            name: "Brotherhood of Evil Mutants",
            value: "Brotherhood of Evil Mutants"
        },
        {
            name: "Dark avengers",
            value: "Dark avengers"
        },
        {
            name: "Defenders",
            value: "Defenders"
        },
        {
            name: "Fantastic Four",
            value: "Fantastic Four"
        },
        {
            name: "Fantastic Four(Original)",
            value: "Fantastic Four(Original)"
        },
        {
            name: "Future Foundation",
            value: "Future Foundation"
        },
        {
            name: "Guardians of the Galaxy",
            value: "Guardians of the Galaxy"
        },
        {
            name: "Heroes For Hire",
            value: "Heroes For Hire"
        },
        {
            name: "Hulk Family",
            value: "Hulk Family"
        },
        {
            name: "Hydra",
            value: "Hydra"
        },
        {
            name: "Illuminati",
            value: "Illuminati"
        },
        {
            name: "Inhumans",
            value: "Inhumans"
        },
        {
            name: "Asgardians",
            value: "Asgardians"
        },
        {
            name: "Legion of Monsters",
            value: "Legion of Monsters"
        },
        {
            name: "Marvel Knights",
            value: "Marvel Knights"
        },
        {
            name: "Midnight Sons",
            value: "Midnight Sons"
        },
        {
            name: "New Mutans",
            value: "New Mutans"
        },
        {
            name: "New Warriors",
            value: "New Warriors"
        },
        {
            name: "Secret Avengers",
            value: "Secret Avengers"
        },
        {
            name: "Sinister Six",
            value: "Sinister Six"
        },
        {
            name: "Spider-Army",
            value: "Spider-Army"
        },
        {
            name: "Symbiotes",
            value: "Symbiotes"
        },
        {
            name: "Thunderbolts",
            value: "Thunderbolts"
        },
        {
            name: "Ultimates",
            value: "Ultimates"
        },
        {
            name: "Weapon X",
            value: "Weapon X"
        },
        {
            name: "X-Force",
            value: "X-Force"
        },
        {
            name: "X-Men",
            value: "X-Men"
        },
        {
            name: "X-Men (Original)",
            value: "X-Men (Original)"
        },
        {
            name: "Young avengers",
            value: "Young avengers"
        },
    ]

    const style = noCharacter === false ? { color: "red" } : {}

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
          if (e.key === "Enter") {
            findByName()
          }
        })
    }, [findByName])

    return (
        <div>
            <div className='animate__animated animate__fadeIn'>
                <div className='find-container-searchBar'>
                    <input className="find-by-name" type="text" placeholder='Batman, Robin, Spider-Man ...' ref={characterRef} style={style}/>
                    <button id='character--button' className='character--button' onClick={findByName} >Find</button>
                </div>
                
                {/* <div className='find-container-searchBar'>
                    {
                        namesFilterExact ?
                        <button className='character--button' onClick={() => setNamesFilterExact(prev => !prev)}>Find exact Name</button>
                        :
                        <button className='character--button' onClick={() => setNamesFilterExact(prev => !prev)}>Find Include Name</button>
                    }
                </div> */}
                {/* <button id='character--button' className='character--button' onClick={() => getCharacters("filterButtons", true)}>Find by category</button> */}
                {/* <button id='character--button' className='character--button' onClick={() => getCharacters("comics", "Nothing here")} >Get Comics</button> */}
            </div>            
            <div className='animate__animated animate__fadeIn find-container-inside'>
                <div className='input-label-container'>
                    <label className='label-filterBar' htmlFor=""># Heroes</label>
                    <input className='select-category' type="number" value={howMany} onChange={(event) => getCharacters("how", event)} placeholder={(team !== "All" || universe !== "All" || side !== "All") ? 'All' : 6} max={100} min={0}/>
                </div>

                <div className='input-label-container'>
                    <label className='label-filterBar' htmlFor="">Alignment</label>
                    <select className='select-category' onChange={event => getCharacters("side", event)} value={side}>
                        <option value="All">All sides</option>
                        <option value="good">Hero 🦸‍♂️</option>
                        <option value="bad">Villain 🦹‍♂️</option>
                        <option value="neutral">Anti-hero 🦸‍♂️🦹‍♂️</option>
                    </select>
                </div>

                
                <div className='input-label-container'>
                    <label className='label-filterBar' htmlFor="">Gender</label>
                    <select className='select-category' onChange={event => getCharacters("gender", event)} value={gender}>
                        <option value="All">Both genders</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>

                <div className='input-label-container'>
                    <label className='label-filterBar' htmlFor="">Universe</label>
                    <select className='select-category' onChange={(event) => getCharacters("universe", event)} value={universe}>
                        <option className='all' value="All">All universes</option>
                        <option className='marvel' value="Marvel Comics">Marvel</option>
                        <option className='dc' value="DC Comics">DC</option>
                        <option className='shueisha' value="Shueisha">Shueisha</option>
                        <option className='dark-horse' value="Dark Horse Comics">Dark Horse Comics</option>
                        <option className='george-lucas' value="George Lucas">George Lucas</option>
                        <option className='idwPublishing' value="IDW Publishing">IDW Publishing</option>
                        <option className='imagecomics' value="Image Comics">Image Comics</option>                        
                    </select>
                </div>

                <div className='input-label-container'>
                    <label className='label-filterBar' htmlFor="">Teams</label>
                    {
                        (universe === "All" || universe === "George Lucas" || universe === "Image Comics" || universe === "Shueisha") &&
                        <select className='select-category' name="" id="" onChange={(event) => getCharacters("team", event)} value={team}>
                            <option value="All">All Teams</option>
                        </select>
                    }

                    {
                        (universe === "Marvel Comics" && universe !== "All") &&
                        <select className='select-category' name="" id="" onChange={(event) => getCharacters("team", event)} value={team}>
                            <option value="All">All Teams</option>
                            {
                                marvelComicsTeams.map((current, index) => (
                                    // <option key={index} value={current.value}><p className='option-text'>{current.name}</p></option>
                                    <option key={index} value={current.value} className='option-text'>{current.name}</option>
                                ))
                            }
                        </select>
                    }

                    {
                        (universe === "DC Comics" && universe !== "All") &&
                        <select className='select-category' name="" id="" onChange={(event) => getCharacters("team", event)} value={team}>
                            <option value="All">All Teams</option>
                            {
                                dcComicsTeams.map((current, index) => (
                                    <option key={index} value={current.value}>{current.name}</option>
                                ))
                            }
                        </select>
                    }

                    {
                        (universe === "Dark Horse Comics" && universe !== "All") &&
                        <select className='select-category' name="" id="" onChange={(event) => getCharacters("team", event)} value={team}>
                            <option value="All">All Teams</option>
                            <option value="Incredible Family">Incredible Family</option>
                        </select>
                    }

                    {
                        (universe === "IDW Publishing"&& universe !== "All") &&
                        <select className='select-category' name="" id="" onChange={(event) => getCharacters("team", event)} value={team}>
                            <option value="All">All Teams</option>
                            <option value="Teenage Mutant Ninja Turtles">Teenage Mutant Ninja Turtles</option>
                        </select>
                    }
                </div>

                <div className='input-label-container'>
                    <label className='label-filterBar' htmlFor="">&nbsp;</label>
                    <div className='checkToggle'>
                        <input className="toggle-input" id='toggle-input' type="checkbox" defaultChecked={!namesFilterExact} onClick={() => setNamesFilterExact(prev => !prev)} />
                        <label htmlFor="toggle-input" className='toggle-label'>Exact name</label>
                    </div>
                </div>


            </div>
        </div>
  )
}

export default FilterBar

/* <div className='find-container-toggle'>
                        {
                            namesFilterExact ?
                            <label className='label-filterBar' htmlFor="">Exact name</label>
                            :
                            <label className='label-filterBar' htmlFor="">Exact name</label>
                        }
                        <Toggle
                            label={namesFilterExact ? "Exact name" : "Contain name"}
                            toggled={!namesFilterExact}
                            onClick={() => setNamesFilterExact(prev => !prev)}
                        />
                    </div> */

 /* {
                filterSystemButtons === true &&
                <div className='animate__animated animate__fadeIn find-container'>
                    <div className='input-label-container'>
                        <label className='label-filterBar' htmlFor=""># Heroes</label>
                        <input className='select-category' type="number" value={howMany} onChange={(event) => getCharacters("how", event)} placeholder={(team !== "All" || universe !== "All" || side !== "All") ? 'All' : 6} max={100} min={0}/>
                    </div>

                    <div className='input-label-container'>
                        <label className='label-filterBar' htmlFor="">Alignment</label>
                        <select className='select-category' onChange={event => getCharacters("side", event)} value={side}>
                            <option value="All">All sides</option>
                            <option value="good">Hero 🦸‍♂️</option>
                            <option value="bad">Villain 🦹‍♂️</option>
                            <option value="neutral">Anti-hero 🦸‍♂️🦹‍♂️</option>
                        </select>
                    </div>

                    
                    <div className='input-label-container'>
                        <label className='label-filterBar' htmlFor="">Gender</label>
                        <select className='select-category' onChange={event => getCharacters("gender", event)} value={gender}>
                            <option value="All">Both genders</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </div>

                    <div className='input-label-container'>
                        <label className='label-filterBar' htmlFor="">Universe</label>
                        <select className='select-category' onChange={(event) => getCharacters("universe", event)} value={universe}>
                            <option className='all' value="All">All universes</option>
                            <option className='marvel' value="Marvel Comics">Marvel</option>
                            <option className='dc' value="DC Comics">DC</option>
                            <option className='shueisha' value="Shueisha">Shueisha</option>
                            <option className='dark-horse' value="Dark Horse Comics">Dark Horse Comics</option>
                            <option className='george-lucas' value="George Lucas">George Lucas</option>
                            <option className='idwPublishing' value="IDW Publishing">IDW Publishing</option>
                            <option className='imagecomics' value="Image Comics">Image Comics</option>                        
                        </select>
                    </div>

                    <div className='input-label-container'>
                        <label className='label-filterBar' htmlFor="">Teams</label>
                        {
                            (universe === "All" || universe === "George Lucas" || universe === "Image Comics" || universe === "Shueisha") &&
                            <select className='select-category' name="" id="" onChange={(event) => getCharacters("team", event)} value={team}>
                                <option value="All">All Teams</option>
                            </select>
                        }

                        {
                            (universe === "Marvel Comics" && universe !== "All") &&
                            <select className='select-category' name="" id="" onChange={(event) => getCharacters("team", event)} value={team}>
                                <option value="All">All Teams</option>
                                {
                                    marvelComicsTeams.map((current, index) => (
                                        // <option key={index} value={current.value}><p className='option-text'>{current.name}</p></option>
                                        <option key={index} value={current.value} className='option-text'>{current.name}</option>
                                    ))
                                }
                            </select>
                        }

                        {
                            (universe === "DC Comics" && universe !== "All") &&
                            <select className='select-category' name="" id="" onChange={(event) => getCharacters("team", event)} value={team}>
                                <option value="All">All Teams</option>
                                {
                                    dcComicsTeams.map((current, index) => (
                                        <option key={index} value={current.value}>{current.name}</option>
                                    ))
                                }
                            </select>
                        }

                        {
                            (universe === "Dark Horse Comics" && universe !== "All") &&
                            <select className='select-category' name="" id="" onChange={(event) => getCharacters("team", event)} value={team}>
                                <option value="All">All Teams</option>
                                <option value="Incredible Family">Incredible Family</option>
                            </select>
                        }

                        {
                            (universe === "IDW Publishing"&& universe !== "All") &&
                            <select className='select-category' name="" id="" onChange={(event) => getCharacters("team", event)} value={team}>
                                <option value="All">All Teams</option>
                                <option value="Teenage Mutant Ninja Turtles">Teenage Mutant Ninja Turtles</option>
                            </select>
                        }
                    </div>
                    <div className='input-label-container'>
                        <label className='label-filterBar' htmlFor="">&nbsp;</label>
                        <button id='character--button' className='character--button' onClick={() => getCharacters("filterButtons", false)}>Find by name</button>
                    </div>
                </div> 
            } */