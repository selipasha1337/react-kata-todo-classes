import { Component } from 'react'

import styles from './Main.module.css'

class Main extends Component {
  render() {
    const { children } = this.props

    return <section className={styles.main}>{children}</section>
  }
}

export default Main
