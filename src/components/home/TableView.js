import PropTypes from "prop-types";
import { AllKanaOptions, HIRAGANA_VIEW, KANJI_VIEW, ROMAJI_VIEW } from "../../enums/kanaOptions";
import { AllDataTypes, getTypeLabel } from "../../enums/typeOption";
import { renderKanjiWithFurigana } from "../../helpers/kanjiHelper";

export default function TableView({ items, options }) {

    const showKanji = options?.includes(KANJI_VIEW)
    const showHiragana = options?.includes(HIRAGANA_VIEW)
    const showRomaji = options?.includes(ROMAJI_VIEW)

    return (
        <div className="table-view">
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>Type</th>
                        {showKanji &&
                            <th>Kanji</th>
                        }
                        {showHiragana &&
                            <th>Hiragana</th>
                        }
                        {showRomaji &&
                            <th>Romaji</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {items.map(item =>
                    (<tr key={`${item.id}_row`}>
                        <td className="eng">
                            {item.eng}
                        </td>
                        <td className="type">
                            {getTypeLabel(item.type)}
                        </td>
                        {showKanji &&
                            <td className="kanji">
                                {renderKanjiWithFurigana(item.kanji, item.furigana, item.id)}
                            </td>
                        }
                        {showHiragana &&
                            <td className="hiragana">
                                {item.hiragana}
                            </td>
                        }
                        {showRomaji &&
                            <td className="romaji">
                                {item.romaji}
                            </td>
                        }
                    </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}


TableView.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            eng: PropTypes.string.isRequired,
            type: PropTypes.oneOf(AllDataTypes).isRequired,
            kanji: PropTypes.string,
            furigana: PropTypes.string,
            hiragana: PropTypes.string.isRequired,
            romaji: PropTypes.string.isRequired
        })),
    options: PropTypes.arrayOf(PropTypes.oneOf(AllKanaOptions))
}