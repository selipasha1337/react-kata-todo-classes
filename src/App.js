import { Component } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'

import Header from './components/Header/Header'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import Main from './components/Main/Main'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'
import TaskCount from './components/TaskCount/TaskCount'
import Button from './components/UI/Button/Button'
import TasksFilter from './components/TasksFilter/TasksFilter'
import buttonClear from './components/UI/Button/ButtonClear.module.css'

class App extends Component {
  state = {
    tasks: [
      { id: uuidv4(), title: 'Task 1', createdAt: new Date(1914, 7, 28), isCompleted: true },
      { id: uuidv4(), title: 'Task 2', createdAt: new Date(1941, 6, 22), isCompleted: false },
      { id: uuidv4(), title: 'Task 3', createdAt: new Date(2022, 2, 24), isCompleted: false },
    ],
    filterStatus: 'all',
    edit: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks !== this.state.tasks) {
      this.setState({ filterStatus: 'all' })
    }
  }

  addTaskHandler = (text) => {
    const newTask = {
      id: uuidv4(),
      title: text,
      createdAt: new Date(),
      isCompleted: false,
    }

    this.setState((prevState) => {
      return {
        tasks: [...prevState.tasks, newTask],
      }
    })
  }

  deleteTaskHandler = (id) => {
    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.filter((task) => task.id !== id),
      }
    })
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

  clearCompletedHandler = () => {
    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.filter((task) => !task.isCompleted),
      }
    })
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

  editTaskHandler = (id) => {
    this.setState({ edit: id })
  }

  saveTaskHandler = (e, id, title) => {
    e.preventDefault()

    this.setState({
      tasks: this.state.tasks.map((task) => {
        return task.id === id ? { ...task, title } : { ...task }
      }),
    })

    this.setState({ edit: null })
  }

  render() {
    const { tasks, filterStatus, edit } = this.state
    const activeTasksCount = tasks.filter((task) => !task.isCompleted).length

    return (
      <div className="app">
        <Header>
          <NewTaskForm addTask={this.addTaskHandler} />
        </Header>
        <Main>
          <TaskList
            tasks={this.filterTasksHandler(tasks, filterStatus)}
            deleteTask={this.deleteTaskHandler}
            toggleTask={this.toggleTaskHandler}
            editTask={this.editTaskHandler}
            saveTask={this.saveTaskHandler}
            edit={edit}
          />
        </Main>
        <Footer>
          <TaskCount count={activeTasksCount} />
          <TasksFilter filterStatus={filterStatus} changeFilter={this.changeFilterHandler} />
          <Button type="button" className={buttonClear.buttonClear} onClick={this.clearCompletedHandler}>
            Clear completed
          </Button>
        </Footer>
      </div>
    )
  }
}

export default App
