import PropTypes from "prop-types";
import { useState } from "react";
import { AllViewOptions } from "../../enums/viewOptions";
import { AllTypeOptions } from "../../enums/typeOption";
import { AllKanaOptions } from "../../enums/kanaOptions";
import SubMenuView from "../menu/SubMenuView";
import SubMenuType from "../menu/SubMenuType";
import SubMenuKana from "../menu/SubMenuKana";
import MenuButton from "../menu/MenuButton";

export default function HomeMenu(props) {
    const {
        viewOption,
        viewOptionChanged,
        typeOptions,
        typeOptionsChanged,
        kanaOptions,
        kanaOptionsChanged } = props
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    return (
        <div className="menu">
            <MenuButton isExpanded={isMenuVisible} handleClick={() => setIsMenuVisible(!isMenuVisible)} isVertical={true} >
                ...
            </MenuButton>
            {isMenuVisible &&
                <>
                    <SubMenuView option={viewOption} optionChanged={viewOptionChanged} />
                    <SubMenuType options={typeOptions} optionsChanged={typeOptionsChanged} />
                    <SubMenuKana options={kanaOptions} optionsChanged={kanaOptionsChanged} />
                    <div className="mask" onClick={()=>setIsMenuVisible(false)}></div>
                </>}
        </div>
    )
}

HomeMenu.propTypes = {
    viewOption: PropTypes.oneOf(AllViewOptions),
    viewOptionChanged: PropTypes.func.isRequired,
    typeOptions: PropTypes.arrayOf(PropTypes.oneOf(AllTypeOptions)),
    typeOptionsChanged: PropTypes.func.isRequired,
    kanaOptions: PropTypes.arrayOf(PropTypes.oneOf(AllKanaOptions)),
    kanaOptionsChanged: PropTypes.func.isRequired
}