import PropTypes from "prop-types";
import { useState } from "react";
import { AllKanaOptions } from "../../enums/kanaOptions";
import MenuButton from "../menu/MenuButton";
import SubMenuKana from "../menu/SubMenuKana";
import SubMenuTime from "../menu/SubMenuTime";

export default function QuizMenu(props) {
    const {
        questionTime,
        questionTimeChanged,
        answerTime,
        answerTimeChanged,
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
                    <SubMenuTime label="Question" time={questionTime} timeChanged={(t) => questionTimeChanged(t)} />
                    <SubMenuTime label="Answer" time={answerTime} timeChanged={(t) => answerTimeChanged(t)} />
                    <SubMenuKana options={kanaOptions} optionsChanged={kanaOptionsChanged} />
                    <div className="mask" onClick={() => setIsMenuVisible(false)}></div>
                </>}
        </div>
    )
}
QuizMenu.propTypes = {
    questionTime: PropTypes.number.isRequired,
    questionTimeChanged: PropTypes.func.isRequired,
    answerTime: PropTypes.number.isRequired,
    answerTimeChanged: PropTypes.func.isRequired,
    kanaOptions: PropTypes.arrayOf(PropTypes.oneOf(AllKanaOptions)),
    kanaOptionsChanged: PropTypes.func.isRequired
}