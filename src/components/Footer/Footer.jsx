import { Component } from 'react'

import styles from './Footer.module.css'

class Footer extends Component {
  render() {
    const { children } = this.props

    return <footer className={styles.footer}>{children}</footer>
  }
}

export default Footer
