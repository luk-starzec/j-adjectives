import PropTypes from "prop-types";
import { useId, useState } from "react";
import { AllViewOptions, ViewOptions } from '../../enums/viewOptions';
import MenuButton from "./MenuButton";

export default function SubMenuView({ option, optionChanged }) {
    const [isExpanded, setIsExpanded] = useState()
    const id = useId();

    return (
        <div className='submenu'>
            <MenuButton isExpanded={isExpanded} handleClick={() => setIsExpanded(!isExpanded)}>
                <span>View</span>
            </MenuButton>
            {isExpanded &&
                <ul>
                    <li>
                        <input type="radio" id={id + '-tableRadio'} checked={option === ViewOptions.TABLE_VIEW} onChange={() => optionChanged(ViewOptions.TABLE_VIEW)} />
                        <label htmlFor={id + '-tableRadio'}>table</label>
                    </li>
                    <li>
                        <input type="radio" id={id + '-cardsRadio'} checked={option === ViewOptions.CARDS_VIEW} onChange={() => optionChanged(ViewOptions.CARDS_VIEW)} />
                        <label htmlFor={id + '-cardsRadio'}>cards</label>
                    </li>
                </ul>
            }
        </div>
    )
}

SubMenuView.propTypes = {
    option: PropTypes.oneOf(AllViewOptions),
    optionChanged: PropTypes.func.isRequired
}