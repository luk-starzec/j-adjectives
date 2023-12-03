import PropTypes from "prop-types";
import { useId, useState } from "react";
import { AllKanaOptions, HIRAGANA_VIEW, KANJI_VIEW, ROMAJI_VIEW } from "../../enums/kanaOptions";
import MenuButton from "./MenuButton";

export default function SubMenuKana({ options, optionsChanged }) {
    const [isExpanded, setIsExpanded] = useState()
    const id = useId();

    return (
        <div className='submenu'>
            <MenuButton isExpanded={isExpanded} handleClick={() => setIsExpanded(!isExpanded)}>
                <span>Kana</span>
            </MenuButton>
            {isExpanded &&
                <ul className="kana-options">
                    <li>
                        <input type="checkbox" id={id + '-kanjiCheckbox'} checked={options.includes(KANJI_VIEW)} onChange={() => optionsChanged(KANJI_VIEW)} />
                        <label htmlFor={id + '-kanjiCheckbox'}>kanji</label>
                    </li>
                    <li>
                        <input type="checkbox" id={id + '-hiraganaCheckbox'} checked={options.includes(HIRAGANA_VIEW)} onChange={() => optionsChanged(HIRAGANA_VIEW)} />
                        <label htmlFor={id + '-hiraganaCheckbox'}>hiragana</label>
                    </li>
                    <li>
                        <input type="checkbox" id={id + '-romajiCheckbox'} checked={options.includes(ROMAJI_VIEW)} onChange={() => optionsChanged(ROMAJI_VIEW)} />
                        <label htmlFor={id + '-romajiCheckbox'}>romaji</label>
                    </li>
                </ul>
            }
        </div>
    )
}

SubMenuKana.propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOf(AllKanaOptions)),
    optionsChanged: PropTypes.func.isRequired
}