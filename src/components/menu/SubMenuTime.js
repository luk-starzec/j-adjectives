import PropTypes from "prop-types";
import { useState } from "react";
import MenuButton from "./MenuButton";

export default function SubMenuTime({ label, time, timeChanged }) {
    const [isExpanded, setIsExpanded] = useState()

    return (
        <div className='submenu'>
            <MenuButton isExpanded={isExpanded} handleClick={() => setIsExpanded(!isExpanded)}>
                <span>{label}</span>
            </MenuButton>
            {isExpanded &&
                <div className="time-options">
                    <input type="number" min={1} max={10} value={time} onChange={(e) => timeChanged(Number(e.target.value))} /> s
                </div>}
        </div>
    )
}

SubMenuTime.propTypes = {
    label: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    timeChanged: PropTypes.func.isRequired
}