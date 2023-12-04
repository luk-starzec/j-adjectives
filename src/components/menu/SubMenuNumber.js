import { useId, useState } from "react"
import MenuButton from "./MenuButton"

export default function SubMenuNumber({ number, numberChanged }) {
  const [isExpanded, setIsExpanded] = useState()
  const id = useId();

  return (
    <div className='submenu'>
      <MenuButton isExpanded={isExpanded} handleClick={() => setIsExpanded(!isExpanded)}>
        <span>Number</span>
      </MenuButton>
      {isExpanded &&
        <ul>
          <li>
            <input type="radio" id={id + '-5Radio'} checked={number === 5} onChange={() => numberChanged(5)} />
            <label htmlFor={id + '-5Radio'}>5</label>
          </li>
          <li>
            <input type="radio" id={id + '-10Radio'} checked={number === 10} onChange={() => numberChanged(10)} />
            <label htmlFor={id + '-10Radio'}>10</label>
          </li>
          <li>
            <input type="radio" id={id + '-15Radio'} checked={number === 15} onChange={() => numberChanged(15)} />
            <label htmlFor={id + '-15Radio'}>15</label>
          </li>
        </ul>}
    </div>
  )
}
