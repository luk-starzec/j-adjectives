import PropTypes from "prop-types";
import Card from "../Card";
import { AllKanaOptions } from "../../enums/kanaOptions";

export default function CardsView({ items, options }) {
    return (
        <div className="cards-view">
            {items.map(item => (<Card item={item} options={options} key={item.id} />))}
        </div>
    )
}

CardsView.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(Card.propTypes)),
    options: PropTypes.arrayOf(PropTypes.oneOf(AllKanaOptions))
}