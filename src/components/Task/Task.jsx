import { Component } from 'react'
import { formatDistance } from 'date-fns'

import '../UI/Icon.css'
import styles from './Task.module.css'

class Task extends Component {
  state = {
    newTaskValue: this.props.task.title,
  }

  inputChangeHandler = (e) => {
    this.setState({ newTaskValue: e.target.value })
  }

  render() {
    const { task, toggleTask, deleteTask, editTask, edit, saveTask } = this.props
    const { newTaskValue } = this.state
    const getTimeAgo = formatDistance(new Date(task.createdAt), new Date(), { addSuffix: true })

    return (
      <li className={task.isCompleted ? [styles.task, styles.task_completed].join(' ') : styles.task}>
        <div className={styles.task__view}>
          {edit === task.id ? (
            <form onSubmit={(e) => saveTask(e, task.id, newTaskValue)}>
              <input
                type="text"
                className={styles.task__edit}
                value={this.state.newTaskValue}
                onChange={this.inputChangeHandler}
              />
            </form>
          ) : (
            <div>
              <input
                className={styles.task__toggle}
                type="checkbox"
                defaultChecked={task.isCompleted}
                onClick={toggleTask}
              />
              <div className={styles.task__info}>
                <span className={styles.task__infoDescription}>{task.title}</span>
                <span className={styles.task__infoCreated}>{getTimeAgo}</span>
              </div>
              <button className="icon icon__edit" type="button" aria-label="edit" onClick={editTask} />
              <button className="icon icon__destroy" type="button" aria-label="delete" onClick={deleteTask} />
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default Task
