import PropTypes from "prop-types";
import { renderKanjiWithFurigana } from "../helpers/kanjiHelper"
import { AllDataTypes, getTypeLabel } from "../enums/typeOption";
import { AllKanaOptions, HIRAGANA_VIEW, KANJI_VIEW, ROMAJI_VIEW } from "../enums/kanaOptions";

export default function Card({ item, options, isQuizMode }) {

    const isKanji = item.kanji != null;
    const showKanji = options?.includes(KANJI_VIEW)
    const showHiragana = options?.includes(HIRAGANA_VIEW)
    const showRomaji = options?.includes(ROMAJI_VIEW)

    const cssKanji = showKanji ? "large" : "";
    const cssHiragana = showKanji ? "" : "large";

    return (
        <div className="card">

            <div className="header">
                <span className="eng">
                    {item.eng}
                </span>
                <span className="type">
                    {getTypeLabel(item.type)}
                </span>
            </div>

            <div className="body">
                {showKanji && !isQuizMode &&
                    <div className={`kanji ${cssKanji}`}>
                        {isKanji
                            ? renderKanjiWithFurigana(item.kanji, item.furigana, item.id)
                            : item.hiragana}
                    </div>
                }
                {showHiragana && !isQuizMode &&
                    <div className={`hiragana ${cssHiragana}`}>
                        {isKanji || !showKanji ? item.hiragana : null}
                    </div>
                }
                {showRomaji && !isQuizMode &&
                    <div className="romaji">
                        {item.romaji}
                    </div>
                }
                {isQuizMode &&
                    <div className="quiz">
                        ?
                    </div>
                }
            </div>
        </div>
    )
}

Card.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        eng: PropTypes.string.isRequired,
        type: PropTypes.oneOf(AllDataTypes).isRequired,
        kanji: PropTypes.string,
        furigana: PropTypes.string,
        hiragana: PropTypes.string.isRequired,
        romaji: PropTypes.string.isRequired
    }),
    options: PropTypes.arrayOf(PropTypes.oneOf(AllKanaOptions)),
    isQuizMode: PropTypes.bool
}