import { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './TaskCount.module.css'

class TaskCount extends Component {
  render() {
    const { count } = this.props
    return (
      <span className={count > 0 ? styles.taskCount : styles.taskCount__hidden}>{`${count} ${
        count > 1 ? 'items' : 'item'
      } left`}</span>
    )
  }
}

TaskCount.defaultProps = {
  count: 0,
}

TaskCount.propTypes = {
  count: PropTypes.number,
}

export default TaskCount
