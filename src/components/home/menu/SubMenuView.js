import PropTypes from "prop-types";
import { useId, useState } from "react";
import { AllViewOptions, CARDS_VIEW, TABLE_VIEW } from '../../../enums/viewOptions';
import MenuButton from "./MenuButton";

export default function SubMenuView({ option, optionChanged }) {
    const [isExpanded, setIsExpanded] = useState()
    const id = useId();

    return (
        <div className='submenu'>
            <MenuButton isExpanded={isExpanded} handleClick={() => setIsExpanded(!isExpanded)}>
                View
            </MenuButton>
            {isExpanded &&
                <ul>
                    <li>
                        <input type="radio" id={id + '-tableRadio'} checked={option === TABLE_VIEW} onChange={() => optionChanged(TABLE_VIEW)} />
                        <label htmlFor={id + '-tableRadio'}>table</label>
                    </li>
                    <li>
                        <input type="radio" id={id + '-cardsRadio'} checked={option === CARDS_VIEW} onChange={() => optionChanged(CARDS_VIEW)} />
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