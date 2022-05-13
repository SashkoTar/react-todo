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
    /*
    function changeState2(prevState, id) {
      return {
        todos: [{
          id: 3,
          title: "Deploy to live server",
          completed: !prevState.todos[0].completed
        }]   
      }
    } */

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


  render() {
    return (
      <div>
        <Header />
        <InputTodo addTodoProps={this.addTodoItem} />
        <TodoList todos={this.state.todos} handleChangeProps={this.handleChange} deleteHandler={this.deleteItem} />
      </div>
    )
  }
}
export default TodoContainer