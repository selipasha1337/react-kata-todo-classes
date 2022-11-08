import { Component } from 'react'
import { formatDistance } from 'date-fns'

import TaskCountdown from '../TaskCountdown/TaskCountdown'

class Task extends Component {
  state = {
    newTaskValue: this.props.task.title,
  }

  inputChangeHandler = (e) => {
    this.setState({ newTaskValue: e.target.value })
  }

  timeAgoFormat = (date) => {
    return formatDistance(new Date(date), new Date(), { addSuffix: true })
  }

  editFormRender = () => {
    const { newTaskValue } = this.state
    const { saveTask, task } = this.props

    return (
      <form onSubmit={(e) => saveTask(e, task.id, newTaskValue)}>
        <input type="text" className="edit" value={newTaskValue} onChange={this.inputChangeHandler} />
      </form>
    )
  }

  taskClassFormat = () => {
    const { editId, task } = this.props

    if (editId === task.id) {
      return 'editing'
    } else if (task.isCompleted) {
      return 'completed'
    } else {
      return ''
    }
  }

  render() {
    const { task, removeTask, toggleTask, editTask, editId, countdown } = this.props

    return (
      <li className={this.taskClassFormat()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={() => toggleTask(task.id)}
            defaultChecked={task.isCompleted}
          />
          <div className="list-label">
            <span className="title">{task.title}</span>
            <TaskCountdown task={task} countdown={countdown} />
            <span className="description">{this.timeAgoFormat(task.createdAt)}</span>
          </div>
          <button className="icon icon-edit" onClick={() => editTask(task.id)}></button>
          <button className="icon icon-destroy" onClick={() => removeTask(task.id)}></button>
        </div>
        {editId === task.id ? this.editFormRender() : null}
      </li>
    )
  }
}

export default Task
