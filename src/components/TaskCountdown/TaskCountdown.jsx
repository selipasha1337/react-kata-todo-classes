import { Component } from 'react'

class TaskCountdown extends Component {
  state = {
    isStart: false,
    isDisabled: false,
    timerID: null,
  }

  componentDidMount() {
    const { task } = this.props

    if (task.isCompleted) {
      this.setState({ isDisabled: true })
    }
  }

  componentDidUpdate(prevProps) {
    const { task } = this.props

    if (prevProps.task.isCompleted !== task.isCompleted) {
      if (task.isCompleted) {
        this.setState({ isDisabled: true })
        this.setState({ isStart: false })
        this.pause()
      } else {
        this.setState({ isDisabled: false })
      }
    }
  }

  componentWillUnmount() {
    this.pause()
  }

  tick = () => {
    const { countdown, task } = this.props

    if (task.time > 0) {
      countdown(task.id, task.time - 1)
    } else if (task.time === 0) {
      this.setState({ isStart: false })
      this.setState({ isDisabled: true })
    }
  }

  start = () => {
    this.setState({ timerID: setInterval(() => this.tick(), 1000) })
  }

  pause = () => {
    clearInterval(this.state.timerID)
  }

  change = () => {
    const { isStart } = this.state
    if (!isStart) {
      this.start()
      this.setState({ isStart: true })
    } else {
      this.pause()
      this.setState({ isStart: false })
    }
  }

  disabledHandler = () => {
    return this.state.isDisabled ? { cursor: 'not-allowed' } : { cursor: 'pointer' }
  }

  padTo2Digits = (num) => {
    return num.toString().padStart(2, '0')
  }

  render() {
    const { isStart, isDisabled } = this.state
    const { task } = this.props

    const minutes = Math.floor(task.time / 60)
    const seconds = task.time % 60

    return (
      <span className="description">
        <button
          className={`icon icon-${isStart ? 'pause' : 'play'}`}
          onClick={this.change}
          disabled={isDisabled}
          style={this.disabledHandler()}
        ></button>
        {this.padTo2Digits(minutes)}:{this.padTo2Digits(seconds)}
      </span>
    )
  }
}

export default TaskCountdown
