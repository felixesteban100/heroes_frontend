import React from 'react'
import './index.css'

function FilterBar({characterRef, findByName, changeFilter, changeByComics, changeByUniverse, howManyRef, changeHowMany, changeBySide, changeByTeam, team, universe, side, filterSystemButtons}) {
  return (
    <div>
        {
            filterSystemButtons === false &&
            <div className='animate__animated animate__lightSpeedInLeft find-container'>
                <input className="find-by-name" type="text" placeholder='Enter name'ref={characterRef}/>
                <button id='character--button' className='character--button' onClick={findByName}>Find character</button>
                <button id='character--button' className='character--button' onClick={() => changeFilter()}>Change filter</button>
            </div>
        }
        
        {
            filterSystemButtons === true &&
            <div className='animate__animated animate__lightSpeedInRight find-container'>
                <button id='character--button' className='character--button' onClick={() => changeByComics()}>Get Comics</button>
                <input className='input-howMany' type="number" name="howMany" id="" value={howManyRef} onChange={event => changeHowMany(event)} placeholder={(team !== "All" || universe !== "All" || side !== "All") ? 'All' : 6} max={100} min={0}/>
                <select className='select-category' name="" id="" onChange={event => changeBySide(event)}>
                    <option value="All">All sides</option>
                    <option value="good">Hero 🦸‍♂️</option>
                    <option value="bad">Villain 🦹‍♂️</option>
                    <option value="neutral">Anti-hero 🦸‍♂️🦹‍♂️</option>
                </select>

                <select className='select-category' name="" id="" onChange={event => changeByUniverse(event)}>
                    <option className='all' value="All">All universes</option>
                    <option className='marvel' value="Marvel Comics">Marvel</option>
                    <option className='dc' value="DC Comics">DC</option>
                    <option className='dark-horse' value="Dark Horse Comics">Dark Horse Comics</option>
                    <option className='george-lucas' value="George Lucas">George Lucas</option>
                    <option className='shueisha' value="Shueisha">Shueisha</option>
                    <option className='idwPublishing' value="IDW Publishing">IDW Publishing</option>
                    <option className='imagecomics' value="Image Comics">Image Comics</option>
                    
                    
                </select>

                {
                    (universe === "Marvel Comics" && universe !== "All") &&
                    <select className='select-category' name="" id="" onChange={event => changeByTeam(event)}>
                        <option value="All">All Teams</option>
                        <option value="Avengers">Avengers</option>
                        <option value="Avengers (Original)">Avengers (Original)</option>
                        <option value="Illuminati">Illuminati</option>
                        <option value="Inhumans">Inhumans</option>
                        <option value="X-Men">X-Men</option>
                        <option value="X-Force">X-Force</option>
                        <option value="Guardians of the Galaxy">Guardians of the Galaxy</option>
                        <option value="Defenders">Defenders</option>
                        <option value="Secret Avengers">Secret Avengers</option>
                        <option value="Marvel Knights">Marvel Knights</option>
                        <option value="Fantastic Four">Fantastic Four</option>
                        <option value="Fantastic Four(Original)">Fantastic Four Original</option>
                        <option value="Sinister Six">Sinister Six</option>
                        <option value="Midnight Sons">Midnight Sons</option>
                        <option value="Heroes For Hire">Heroes For Hire</option>
                        <option value="Thunderbolts">Thunderbolts</option>
                        <option value="Hulk Family">Gamma / Hulk Family</option>
                        <option value="Brotherhood of Evil Mutants">Brotherhood of Evil Mutants</option>
                        <option value="Black Order">Black Order</option>
                        <option value="Spider-Army">Spider-Army</option>
                        <option value="Dark avengers">Dark avengers</option>
                        <option value="Hydra">Hydra</option>
                        <option value="Young avengers">Young avengers</option>
                        <option value="Ultimates">Ultimates</option>
                        <option value="Weapon X">Weapon X</option>
                        <option value="Future Foundation">Future Foundation</option>
                        <option value="Asgardians">Asgardians</option>
                        <option value="Legion of Monsters">Legion of Monsters</option>
                        <option value="Symbiotes">Symbiotes</option>
                        {/* New Mutans */}
                    </select>
                }

                {
                    (universe === "DC Comics"&& universe !== "All") &&
                    <select className='select-category' name="" id="" onChange={event => changeByTeam(event)}>
                        <option value="All">All Teams</option>
                        <option value="Justice League">Justice League</option>
                        <option value="Justice League (Original)">Justice League (Original)</option>
                        <option value="Justice Society of America">Justice Society of America</option>
                        <option value="Suicide Squad">Suicide Squad</option>
                        <option value="Teen Titans">Teen Titans</option>
                        <option value="Green Lantern Corps">Green Lantern Corps</option>
                        <option value="Batman Family">Batman Family</option>
                        <option value="Flash Family">Flash Family</option>
                        <option value="Justice League Dark">Justice League Dark</option>
                        <option value="Crimebusters">Crimebusters / Watchmen</option>
                        <option value="Legion of Super-Heroes">Legion of Super-Heroes</option>
                        <option value="Assorted Batman rogues">Assorted Batman rogues</option>
                        <option value="Injustice">Injustice League</option>
                        <option value="Birds of Prey">Birds of Prey</option>
                        <option value="Secret Society of Super Villains">Secret Society of Super Villains</option>
                        <option value="Marvel Family">Marvel Family</option>
                        <option value="Aquaman Family">Aquaman Family</option>
                        <option value="Outsiders">Outsiders</option>
                        <option value="Superman Family">Superman Family / Kriptonian</option>
                        <option value="Lantern Corps">All Lanterns Corps</option>
                        <option value="New Guardians">New Guardians Corps</option>
                        {/* <option value="Legion of Super-Villains">Legion of Super-Villains</option> */}
                    </select>
                }

                {
                    (universe === "Dark Horse Comics"&& universe !== "All") &&
                    <select className='select-category' name="" id="" onChange={event => changeByTeam(event)}>
                        <option value="All">All Teams</option>
                        <option value="Incredible Family">Incredible Family</option>
                    </select>
                }

                {
                    (universe === "IDW Publishing"&& universe !== "All") &&
                    <select className='select-category' name="" id="" onChange={event => changeByTeam(event)}>
                        <option value="All">All Teams</option>
                        <option value="Teenage Mutant Ninja Turtles">Teenage Mutant Ninja Turtles</option>
                    </select>
                }
                <button id='character--button' className='character--button' onClick={() => changeFilter()}>Change Filter</button>
            </div> 
        }
        
    </div>
  )
}

export default FilterBar