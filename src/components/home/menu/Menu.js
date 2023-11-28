import PropTypes from "prop-types";
import { useState } from "react";
import { AllViewOptions } from "../../../enums/viewOptions";
import { AllTypeOptions } from "../../../enums/typeOption";
import { AllKanaOptions } from "../../../enums/kanaOptions";
import SubMenuView from "./SubMenuView";
import SubMenuType from "./SubMenuType";
import SubMenuKana from "./SubMenuKana";
import MenuButton from "./MenuButton";

export default function Menu(props) {
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
                </>}
        </div>
    )
}

Menu.propTypes = {
    viewOption: PropTypes.oneOf(AllViewOptions),
    viewOptionChanged: PropTypes.func.isRequired,
    typeOptions: PropTypes.arrayOf(PropTypes.oneOf(AllTypeOptions)),
    typeOptionsChanged: PropTypes.func.isRequired,
    kanaOptions: PropTypes.arrayOf(PropTypes.oneOf(AllKanaOptions)),
    kanaOptionsChanged: PropTypes.func.isRequired
}