import { Component } from 'react'
import PropTypes from 'prop-types'

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
    const { newTaskValue } = this.state
    return (
      <form onSubmit={this.taskSubmitHandler}>
        <input
          className={styles.newTaskForm}
          placeholder="What needs to be done?"
          value={newTaskValue}
          onChange={this.inputChangeHandler}
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}

export default NewTaskForm
