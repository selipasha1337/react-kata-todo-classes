import { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

import styles from './TaskList.module.css'

class TaskList extends Component {
  render() {
    const { tasks, edit, toggleTask, deleteTask, editTask, saveTask } = this.props

    return (
      <ul className={styles.taskList}>
        {!tasks.length && <h2 className={styles.taskList__empty}>Task list is empty</h2>}
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              deleteTask={() => deleteTask(task.id)}
              toggleTask={() => toggleTask(task.id)}
              editTask={() => editTask(task.id)}
              saveTask={saveTask}
              edit={edit}
            />
          )
        })}
      </ul>
    )
  }
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  edit: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
  toggleTask: PropTypes.func,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
  saveTask: PropTypes.func,
}

export default TaskList
