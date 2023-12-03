import PropTypes from "prop-types";
import Card from "../Card";
import { AllKanaOptions } from "../../enums/kanaOptions";

export default function OppositeView({ pairs, options }) {
    return (
        <div className="opposite-view">
            {pairs.map(pair => (
                <div className="opposite-pair" key={pair.item1.id + '_' + pair.item2.id}>

                    <Card item={pair.item1} options={options} key={pair.item1.id} />

                    <div className="separator">
                        {'<>'}
                    </div>

                    <Card item={pair.item2} options={options} key={pair.item2.id} />

                </div>
            ))}
        </div>
    )
}

OppositeView.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            item1: PropTypes.shape(Card.propTypes.item),
            item2: PropTypes.shape(Card.propTypes.item),
        })),
    options: PropTypes.arrayOf(PropTypes.oneOf(AllKanaOptions))
}