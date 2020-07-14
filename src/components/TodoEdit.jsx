import React, { Component } from "react";
import "../styles/TodoEdit.css";
import { updateTodo } from "../redux/actions/todoActions";
import { connect } from "react-redux";
import axios from 'axios'

class TodoEdit extends Component {
  state = {
    content: "fetching.....",
    isCompleted: false
  };
  componentDidMount(){
    fetch(`https://corsanywhere.herokuapp.com/https://5f07031f9c5c25001630671e.mockapi.io/todo/${this.props.currentTodoId}`)
    .then(res => res.json())
    .then(json => {
      this.setState({ content: json.content })
      this.setState({ isCompleted: json.isCompleted })
    });
  }

  handleContent = e => {
    this.setState({ content: e.target.value });
  };

  handleIsCompleted = e => {
    this.setState({ isCompleted: e.target.checked });
  };

  handleSubmit = async e => {
    e.preventDefault();
    // Editing the todo and then switching off the modal
    this.props.updateTodo(this.props.currentTodoId, {
      content: this.state.content,
      isCompleted: this.state.isCompleted
    });
    this.props.switchOffEdit();
    await axios.patch(`https://corsanywhere.herokuapp.com/https://5f07031f9c5c25001630671e.mockapi.io/todo/${this.props.currentTodoId}`, {
      content: this.state.content,
      isCompleted: this.state.isCompleted
    })
    this.props.history.push("/todos");
  };

  render() {
    return (
      <div className="todo__edit">
        <h2>Edit Todo</h2>
        <div className="container-edit">
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleContent}
              value={this.state.content}
              className="edit-input-todo"
              type="text"
              name="content"
            />
            <input
              onChange={this.handleIsCompleted}
              type="checkbox"
              name="isCompleted"
              checked={this.state.isCompleted}
            />
            <input type="submit" className="btn btn-edit" value="Edit" />
          </form>
          <div className="edit__buttons">
            <button
              onClick={this.props.switchOffEdit}
              className="btn btn-delete"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTodo: (todoId, newTodo) => dispatch(updateTodo(todoId, newTodo))
  };
};

export default connect(null, mapDispatchToProps)(TodoEdit);
