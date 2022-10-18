import { Component } from 'react'

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

export default Button
