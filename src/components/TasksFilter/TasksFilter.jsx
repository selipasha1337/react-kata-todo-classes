import { Component } from 'react'
import './TasksFilter.css'
import PropTypes from 'prop-types'

import Button from '../UI/Button'

class TasksFilter extends Component {
  filterButtonsRender = () => {
    const { filterStatus, changeFilter } = this.props
    const buttons = [{ title: 'all' }, { title: 'active' }, { title: 'completed' }]

    return buttons.map(({ title }) => {
      return (
        <li key={title}>
          <Button className={filterStatus === title ? 'selected' : ''} onClick={() => changeFilter(title)}>
            {title}
          </Button>
        </li>
      )
    })
  }

  render() {
    return <ul className="filters">{this.filterButtonsRender()}</ul>
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
