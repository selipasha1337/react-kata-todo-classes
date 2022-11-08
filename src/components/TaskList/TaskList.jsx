import { Component } from 'react'
import './TaskList.css'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

class TaskList extends Component {
  renderTasks = () => {
    const { tasks, removeTask, toggleTask, editTask, editId, saveTask, countdown } = this.props

    if (tasks.length) {
      return tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            removeTask={removeTask}
            toggleTask={toggleTask}
            editTask={editTask}
            editId={editId}
            saveTask={saveTask}
            countdown={countdown}
          />
        )
      })
    } else {
      return <h2 style={{ textAlign: 'center' }}>Task list is empty</h2>
    }
  }

  render() {
    return <ul className="todo-list">{this.renderTasks()}</ul>
  }
}

TaskList.defaultProps = {
  tasks: [],
  editId: null,
  toggleTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
  saveTask: () => {},
  countdown: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  editId: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
  toggleTask: PropTypes.func,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
  saveTask: PropTypes.func,
  countdown: PropTypes.func,
}

export default TaskList
