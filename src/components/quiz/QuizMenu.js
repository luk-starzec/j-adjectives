import PropTypes from "prop-types";
import { useState } from "react";
import { AllKanaOptions } from "../../enums/kanaOptions";
import MenuButton from "../menu/MenuButton";
import SubMenuKana from "../menu/SubMenuKana";
import SubMenuTime from "../menu/SubMenuTime";
import SubMenuQuiz from "../menu/SubMenuQuiz";

export default function QuizMenu(props) {
    const {
        itemsCount,
        itemsCountChanged,
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
                    <SubMenuQuiz itemsCount={itemsCount} itemsCountChanged={itemsCountChanged} />
                    <SubMenuTime label="Question" time={questionTime} timeChanged={questionTimeChanged} />
                    <SubMenuTime label="Answer" time={answerTime} timeChanged={answerTimeChanged} />
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