import { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  render() {
    const { children, type, onClick, className } = this.props

    return (
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default Button
