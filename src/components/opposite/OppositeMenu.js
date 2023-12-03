import PropTypes from "prop-types";
import { useState } from "react";
import MenuButton from "../menu/MenuButton";
import SubMenuKana from "../menu/SubMenuKana";
import { AllKanaOptions } from "../../enums/kanaOptions";

export default function OppositeMenu({ kanaOptions, kanaOptionsChanged }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <div className="menu">
      <MenuButton isExpanded={isMenuVisible} handleClick={() => setIsMenuVisible(!isMenuVisible)} isVertical={true} >
        ...
      </MenuButton>
      {isMenuVisible &&
        <>
          <SubMenuKana options={kanaOptions} optionsChanged={kanaOptionsChanged} />
          <div className="mask" onClick={() => setIsMenuVisible(false)}></div>
        </>}
    </div>
  )
}

OppositeMenu.propTypes = {
  kanaOptions: PropTypes.arrayOf(PropTypes.oneOf(AllKanaOptions)),
  kanaOptionsChanged: PropTypes.func.isRequired
}