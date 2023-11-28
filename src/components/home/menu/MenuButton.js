import PropTypes from "prop-types";

export default function MenuButton({ children, isExpanded, isVertical, handleClick }) {

    const css = 'expander ' + (isExpanded ? 'visible' : '') + ' ' + (isVertical ? 'vertical' : '')

    return (
        <button className="menu-button" onClick={handleClick}>
            <span className={css}>{'<'}</span>
            {children}
        </button>
    )
}

MenuButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    isExpanded: PropTypes.bool,
    isVertical: PropTypes.bool,
    handleClick: PropTypes.func
}