import PropTypes from "prop-types";
import Card from "./Card";
import { AllDataTypes } from "../../enums/typeOption";
import { AllKanaOptions } from "../../enums/kanaOptions";

export default function CardsView({ items, options }) {
    return (
        <div className="cards-view">
            {items.map(item => (<Card item={item} options={options} key={item.id} />))}
        </div>
    )
}

CardsView.propTypes = {
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