import { Component } from 'react'

import styles from './NewTaskForm.module.css'

class NewTaskForm extends Component {
  state = {
    newTaskValue: '',
  }

  inputChangeHandler = (e) => {
    this.setState({ newTaskValue: e.target.value })
  }

  taskSubmitHandler = (e) => {
    e.preventDefault()

    if (this.state.newTaskValue.trim()) {
      this.props.addTask(this.state.newTaskValue)
      this.setState({ newTaskValue: '' })
    }
  }

  render() {
    return (
      <form onSubmit={this.taskSubmitHandler}>
        <input
          className={styles.newTaskForm}
          placeholder="What needs to be done?"
          value={this.state.newTaskValue}
          onChange={this.inputChangeHandler}
        />
      </form>
    )
  }
}

export default NewTaskForm
