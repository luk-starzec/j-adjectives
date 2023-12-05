import PropTypes from "prop-types";
import { useId, useState } from "react"
import MenuButton from "./MenuButton"

const values = [5, 10, 15]

export default function SubMenuQuiz({ itemsCount, itemsCountChanged }) {
  const [isExpanded, setIsExpanded] = useState()
  const id = useId();

  const renderListItem = (value) => (
    <li key={id + '-li-' + value}>
      <input type="radio" id={id + '-' + value + '-Radio'} checked={itemsCount === value} onChange={() => itemsCountChanged(value)} />
      <label htmlFor={id + '-' + value + '-Radio'}>{value}</label>
    </li>
  )

  return (
    <div className='submenu'>
      <MenuButton isExpanded={isExpanded} handleClick={() => setIsExpanded(!isExpanded)}>
        <span>Cards</span>
      </MenuButton>
      {isExpanded &&
        <ul>
          {values.map(v => renderListItem(v))}
        </ul>}
    </div>
  )
}

SubMenuQuiz.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  itemsCountChanged: PropTypes.func.isRequired
}