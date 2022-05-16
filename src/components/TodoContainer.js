import React from "react"
import TodoList from "./TodoList"
import Header from "./Header"
import InputTodo from "./InputTodo"
import { v4 as uuidv4 } from "uuid";

class TodoContainer extends React.Component {

  state = {
    todos: [
      {
        id: 1,
        title: "Setup development environment",
        completed: true
      },
      {
        id: 2,
        title: "Develop website and add content",
        completed: false
      },
      {
        id: 3,
        title: "Deploy to live server",
        completed: false
      }
    ]
  };

  handleChange = (id) => {
    function changeState(prevState, id) {
      return {
        todos: prevState.todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed,
            }
          }
          return todo
        })
      }
    }
    this.setState(prevState => changeState(prevState, id))
  }

  deleteItem = id => {
    console.log("Delete", id)
    this.setState(
      {
        todos: this.state.todos.filter(todo => {
          return todo.id !== id;
        })
      }
    )
  }


  addTodoItem = title => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle
        }
        return todo
      }),
    })
  }

  componentDidMount() {
    console.log("componentDidMount");
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    if(prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }

  render() {
    console.log("render");
    return (
      <div className="container">
        <div className="inner">
        <Header />
        <InputTodo addTodoProps={this.addTodoItem} />
        <TodoList todos={this.state.todos} handleChangeProps={this.handleChange} deleteHandler={this.deleteItem} setUpdate={this.setUpdate} />
        </div>
      </div>
    )
  }
}
export default TodoContainer