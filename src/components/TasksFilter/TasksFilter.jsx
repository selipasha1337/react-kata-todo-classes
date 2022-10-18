import { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../UI/Button/Button'

import styles from './TasksFilter.module.css'

class TasksFilter extends Component {
  buttons = [{ title: 'all' }, { title: 'active' }, { title: 'completed' }]

  render() {
    const { filterStatus, changeFilter } = this.props
    const buttons = this.buttons.map(({ title }) => {
      return (
        <li className={styles.tasksFilters__item} key={title}>
          <Button
            className={`${styles.tasksFilters__button} ${
              filterStatus === title ? styles.tasksFilters__button_selected : ''
            }`}
            onClick={() => changeFilter(title)}
          >
            {title}
          </Button>
        </li>
      )
    })

    return <ul className={styles.tasksFilters}>{buttons}</ul>
  }
}

TasksFilter.defaultProps = {
  filterStatus: 'all',
  changeFilter: () => {},
}

TasksFilter.propTypes = {
  filterStatus: PropTypes.string,
  changeFilter: PropTypes.func,
}

export default TasksFilter
