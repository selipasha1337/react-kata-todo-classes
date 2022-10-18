import { Component } from 'react'

import Task from '../Task/Task'

import styles from './TaskList.module.css'

class TaskList extends Component {
  render() {
    const { tasks, toggleTask, deleteTask, editTask, edit, saveTask } = this.props

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

export default TaskList
