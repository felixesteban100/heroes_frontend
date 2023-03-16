import { useState } from 'react'

function Toggle({ label, toggled, onClick }){
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <label className='toggle-label'>
            <input className='toggle-input' type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span className='toggle-span'>
                <strong className='toggle-strong'>{label}</strong>
            </span>
        </label>
    )
}

export default Toggle