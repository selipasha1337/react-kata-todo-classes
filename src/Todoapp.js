import { Component } from 'react'
import './Todoapp.css'
import { v4 as uuidv4 } from 'uuid'

import Header from './components/Header/Header'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import Main from './components/Main/Main'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'
import TasksFilter from './components/TasksFilter/TasksFilter'
import Button from './components/UI/Button'
import TaskCount from './components/TaskCount/TaskCount'

class Todoapp extends Component {
  getLocalStorage = () => {
    let tasks = window.localStorage.getItem('tasks')
    if (tasks) {
      return JSON.parse(localStorage.getItem('tasks'))
    } else {
      return [
        {
          id: uuidv4(),
          title: 'Task 1',
          createdAt: new Date(1914, 7, 28),
          isCompleted: true,
          time: 61,
        },
        {
          id: uuidv4(),
          title: 'Task 2',
          createdAt: new Date(1941, 6, 22),
          isCompleted: false,
          time: 2,
        },
        {
          id: uuidv4(),
          title: 'Task 3',
          createdAt: new Date(2022, 2, 24),
          isCompleted: false,
          time: 999999,
        },
      ]
    }
  }

  state = {
    tasks: this.getLocalStorage(),
    editId: null,
    filterStatus: 'all',
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state

    if (prevState.tasks !== this.state.tasks) {
      window.localStorage.setItem('tasks', JSON.stringify(tasks))
      this.setState({ filterStatus: 'all' })
    }
  }

  createNewTask = (title, minutes, seconds) => {
    return {
      id: uuidv4(),
      title,
      createdAt: new Date(),
      isCompleted: false,
      time: minutes * 60 + seconds,
    }
  }

  addTaskHandler = (title, minutes, seconds) => {
    const { tasks } = this.state
    const newTask = this.createNewTask(title, minutes, seconds)
    this.setState({ tasks: [...tasks, newTask] })
  }

  removeTaskHandler = (id) => {
    const { tasks } = this.state
    this.setState({ tasks: tasks.filter((task) => task.id !== id) })
  }

  toggleTaskHandler = (id) => {
    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.map((task) => {
          return task.id === id ? { ...task, isCompleted: !task.isCompleted } : { ...task }
        }),
      }
    })
  }

  editTaskHandler = (id) => {
    this.setState({ editId: id })
  }

  saveTaskHandler = (e, id, title) => {
    const { tasks } = this.state

    e.preventDefault()
    if (title.trim()) {
      this.setState({
        tasks: tasks.map((task) => {
          return task.id === id ? { ...task, title } : { ...task }
        }),
      })
      this.setState({ editId: null })
    }
  }

  filterTasksHandler = (tasks, filterStatus) => {
    switch (filterStatus) {
      case 'active':
        return tasks.filter((item) => !item.isCompleted)
      case 'completed':
        return tasks.filter((item) => item.isCompleted)
      default:
        return tasks
    }
  }

  changeFilterHandler = (filterStatus) => {
    this.setState({ filterStatus })
  }

  clearCompletedHandler = () => {
    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.filter((task) => !task.isCompleted),
      }
    })
  }

  countdownHandler = (id, time) => {
    const { tasks } = this.state

    this.setState({
      tasks: tasks.map((task) => {
        return task.id === id ? { ...task, time } : { ...task }
      }),
    })
  }

  render() {
    const { tasks, editId, filterStatus } = this.state
    const activeTasksCount = tasks.filter((task) => !task.isCompleted).length

    return (
      <div className="todoapp">
        <Header>
          <NewTaskForm addTask={this.addTaskHandler} />
        </Header>
        <Main>
          <TaskList
            tasks={this.filterTasksHandler(tasks, filterStatus)}
            removeTask={this.removeTaskHandler}
            editTask={this.editTaskHandler}
            toggleTask={this.toggleTaskHandler}
            editId={editId}
            saveTask={this.saveTaskHandler}
            countdown={this.countdownHandler}
          />
          <Footer>
            <TaskCount count={activeTasksCount} />
            <TasksFilter filterStatus={filterStatus} changeFilter={this.changeFilterHandler} />
            <Button type="button" className="clear-completed" onClick={this.clearCompletedHandler}>
              Clear completed
            </Button>
          </Footer>
        </Main>
      </div>
    )
  }
}

export default Todoapp
