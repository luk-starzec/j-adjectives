import PropTypes from "prop-types";
import { useId, useState } from "react";
import { AllTypeOptions, TypeOptions } from "../../enums/typeOption";
import MenuButton from "./MenuButton";

export default function SubMenuType({ options, optionsChanged }) {
    const [isExpanded, setIsExpanded] = useState()
    const id = useId();

    return (
        <div className='submenu'>
            <MenuButton isExpanded={isExpanded} handleClick={() => setIsExpanded(!isExpanded)}>
                <span>Type</span>
            </MenuButton>
            {isExpanded &&
                <ul className="type-options">
                    <li>
                        <input type="checkbox" id={id + '-iCheckbox'} checked={options.includes(TypeOptions.I_TYPE)} onChange={() => optionsChanged(TypeOptions.I_TYPE)} />
                        <label htmlFor={id + '-iCheckbox'}>i</label>
                    </li>
                    <li>
                        <input type="checkbox" id={id + '-naCheckbox'} checked={options.includes(TypeOptions.NA_TYPE)} onChange={() => optionsChanged(TypeOptions.NA_TYPE)} />
                        <label htmlFor={id + '-naCheckbox'}>na</label>
                    </li>
                </ul>}
        </div>
    )
}

SubMenuType.propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOf(AllTypeOptions)),
    optionsChanged: PropTypes.func.isRequired
}